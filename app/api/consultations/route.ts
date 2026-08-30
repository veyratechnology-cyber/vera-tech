// @ts-nocheck
// Disable TypeScript checking for Prisma type compatibility
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { z } from "zod";
import { reserveTimeSlot } from "@/lib/scheduling";
import { createConsultationEvent, isGoogleCalendarConfigured } from "@/lib/google-calendar";
import { format } from "date-fns";

// Validation schema
const consultationSchema = z.object({
  // Personal Information
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  preferredContactMethod: z.string().optional(),
  
  // Company Information
  company: z.string().optional(),
  companyWebsite: z.string().optional(),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  
  // Consultation Information
  consultationTypes: z.array(z.string()).optional(),
  businessChallenge: z.string().optional(),
  desiredOutcome: z.string().optional(),
  currentTechnology: z.string().optional(),
  additionalInfo: z.string().optional(),
  
  // Meeting Information
  meetingType: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
});

/**
 * POST /api/consultations
 * Handle consultation booking with smart scheduling
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("[CONSULTATION] Received booking request:", {
      name: body.name,
      email: body.email,
      preferredDate: body.preferredDate,
      preferredTime: body.preferredTime,
    });

    // Validate input
    const validation = consultationSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.error.errors },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Parse preferred date/time
    let preferredDateTime: Date | null = null;
    if (data.preferredDate && data.preferredTime) {
      preferredDateTime = new Date(`${data.preferredDate}T${data.preferredTime}:00`);
      console.log("[CONSULTATION] Preferred time:", format(preferredDateTime, "yyyy-MM-dd HH:mm"));
    }

    const duration = 60; // Default 60 minutes

    // Prepare consultation data with proper Prisma types
    const consultationData: any = {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      jobTitle: data.jobTitle || null,
      preferredContactMethod: data.preferredContactMethod || null,
      company: data.company || null,
      companyWebsite: data.companyWebsite || null,
      industry: data.industry as any,
      companySize: data.companySize as any,
      country: data.country || null,
      city: data.city || null,
      consultationTypes: {
        set: (data.consultationTypes || []) as any[]
      },
      businessChallenge: data.businessChallenge || null,
      desiredOutcome: data.desiredOutcome || null,
      currentTechnology: data.currentTechnology || null,
      additionalInfo: data.additionalInfo || null,
      meetingType: data.meetingType as any,
      preferredTime: data.preferredTime || null,
    };

    // Reserve time slot with smart scheduling
    let reservation;
    if (preferredDateTime) {
      reservation = await reserveTimeSlot(
        preferredDateTime,
        duration,
        consultationData
      );

      if (!reservation.success) {
        return NextResponse.json(
          { error: reservation.error || "Failed to reserve time slot" },
          { status: 400 }
        );
      }
    } else {
      // No preferred time, create consultation without scheduling
      reservation = {
        success: true,
        consultation: await prisma.consultation.create({
          data: {
            ...consultationData,
            status: "NEW",
            meetingDuration: duration,
          } as any,
        }),
        wasRescheduled: false,
      };
    }

    const consultation = reservation.consultation;
    const actualScheduledAt = reservation.actualScheduledAt;
    const wasRescheduled = reservation.wasRescheduled;

    console.log("[CONSULTATION] Consultation created:", {
      id: consultation.id,
      actualScheduledAt: actualScheduledAt ? format(actualScheduledAt, "yyyy-MM-dd HH:mm") : "Not scheduled",
      wasRescheduled,
    });

    // Create Google Calendar event if scheduled and configured
    let googleMeetLink: string | undefined;
    let googleCalendarEventId: string | undefined;

    if (actualScheduledAt && isGoogleCalendarConfigured()) {
      try {
        const calendarEvent = await createConsultationEvent({
          consultationId: consultation.id,
          clientName: data.name,
          clientEmail: data.email,
          clientPhone: data.phone,
          company: data.company,
          consultationTypes: data.consultationTypes || [],
          businessChallenge: data.businessChallenge,
          startDateTime: actualScheduledAt,
          duration,
          meetingType: (data.meetingType as any) || "GOOGLE_MEET",
        });

        googleMeetLink = calendarEvent.meetLink;
        googleCalendarEventId = calendarEvent.eventId;

        // Update consultation with Google Calendar details
        await prisma.consultation.update({
          where: { id: consultation.id },
          data: {
            googleCalendarEventId: calendarEvent.eventId,
            googleMeetLink: calendarEvent.meetLink,
          },
        });

        console.log("[CONSULTATION] Google Calendar event created:", calendarEvent.eventId);
      } catch (calendarError: any) {
        console.error("[CONSULTATION] Failed to create calendar event:", calendarError.message);
        // Don't fail the booking if calendar creation fails
      }
    }

    // Create notification for all active admins
    try {
      const activeAdmins = await prisma.admin.findMany({
        where: { status: "ACTIVE" },
        select: { id: true },
      });

      if (activeAdmins.length > 0) {
        const timeInfo = actualScheduledAt
          ? wasRescheduled
            ? ` (rescheduled to ${format(actualScheduledAt, "MMM d, yyyy 'at' h:mm a")})`
            : ` for ${format(actualScheduledAt, "MMM d, yyyy 'at' h:mm a")}`
          : "";

        await prisma.notification.createMany({
          data: activeAdmins.map((admin) => ({
            adminId: admin.id,
            type: "NEW_CONSULTATION",
            title: "New Consultation Request",
            message: `${data.name} from ${data.company || "N/A"} has requested a consultation${timeInfo}.`,
            link: `/admin/consultations/${consultation.id}`,
            isRead: false,
          })),
        });
      }
    } catch (notificationError) {
      console.error("[CONSULTATION] Failed to create notifications:", notificationError);
    }

    // Send multi-channel notifications (Email, SMS, WhatsApp)
    try {
      const { sendConsultationNotifications } = await import("@/lib/notifications");
      
      await sendConsultationNotifications({
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        industry: data.industry,
        businessChallenge: data.businessChallenge,
        consultationId: consultation.id,
        scheduledAt: actualScheduledAt || undefined,
        wasRescheduled,
        googleMeetLink,
        meetingType: data.meetingType,
      });
    } catch (notificationError) {
      console.error("[CONSULTATION] Failed to send notifications:", notificationError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Consultation request submitted successfully",
        id: consultation.id,
        scheduled: !!actualScheduledAt,
        actualScheduledAt: actualScheduledAt?.toISOString(),
        wasRescheduled,
        googleMeetLink,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[CONSULTATION] Submission error:", error);
    console.error("[CONSULTATION] Error details:", error.message, error.stack);
    return NextResponse.json(
      { error: "Failed to submit consultation request", details: error.message },
      { status: 500 }
    );
  }
}
