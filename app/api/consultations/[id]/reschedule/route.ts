// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { updateConsultationEvent } from "@/lib/google-calendar";
import { sendConsultationConfirmation } from "@/lib/email";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { newDateTime, reason } = await request.json();

    if (!newDateTime) {
      return NextResponse.json(
        { error: "New date and time required" },
        { status: 400 }
      );
    }

    const consultation = await prisma.consultation.findUnique({
      where: { id: params.id },
    });

    if (!consultation) {
      return NextResponse.json(
        { error: "Consultation not found" },
        { status: 404 }
      );
    }

    // Parse new date
    const newScheduledAt = new Date(newDateTime);

    // Update Google Calendar if event exists
    if (consultation.googleCalendarEventId) {
      try {
        await updateConsultationEvent(
          consultation.googleCalendarEventId,
          {
            start: newScheduledAt,
            end: new Date(newScheduledAt.getTime() + (consultation.meetingDuration || 60) * 60000),
          }
        );
      } catch (calendarError) {
        console.error("[RESCHEDULE] Failed to update Google Calendar:", calendarError);
        // Continue with database update even if calendar fails
      }
    }

    // Update consultation
    const updated = await prisma.consultation.update({
      where: { id: params.id },
      data: {
        actualScheduledAt: newScheduledAt,
        rescheduleCount: {
          increment: 1,
        },
      },
    });

    // Log history
    await prisma.consultationHistory.create({
      data: {
        consultationId: params.id,
        action: "RESCHEDULED",
        notes: reason || `Rescheduled to ${newScheduledAt.toISOString()}`,
      },
    });

    // Send notification to client
    try {
      await sendConsultationConfirmation({
        name: consultation.name,
        email: consultation.email,
        company: consultation.company,
        scheduledAt: newScheduledAt,
        meetingType: consultation.meetingType,
        googleMeetLink: consultation.googleMeetLink,
        wasRescheduled: true,
      });
    } catch (emailError) {
      console.error("[RESCHEDULE] Failed to send confirmation:", emailError);
    }

    return NextResponse.json({
      success: true,
      consultation: updated,
    });
  } catch (error) {
    console.error("[RESCHEDULE] Error:", error);
    return NextResponse.json(
      { error: "Failed to reschedule consultation" },
      { status: 500 }
    );
  }
}
