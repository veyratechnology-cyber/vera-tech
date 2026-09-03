// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cancelConsultationEvent } from "@/lib/google-calendar";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { reason } = await request.json();

    if (!reason || !reason.trim()) {
      return NextResponse.json(
        { error: "Cancellation reason required" },
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

    // Cancel Google Calendar event if exists
    if (consultation.googleCalendarEventId) {
      try {
        await cancelConsultationEvent(consultation.googleCalendarEventId);
      } catch (calendarError) {
        console.error("[CANCEL] Failed to cancel Google Calendar event:", calendarError);
        // Continue with database update even if calendar fails
      }
    }

    // Update consultation status
    const updated = await prisma.consultation.update({
      where: { id: params.id },
      data: {
        status: "CANCELLED",
        cancelledAt: new Date(),
        cancellationReason: reason,
      },
    });

    // Log history
    await prisma.consultationHistory.create({
      data: {
        consultationId: params.id,
        action: "CANCELLED",
        notes: reason,
      },
    });

    // Send cancellation email to client
    // TODO: Implement cancellation email notification
    console.log("[CANCEL] Cancellation email skipped - email system not configured");

    return NextResponse.json({
      success: true,
      consultation: updated,
    });
  } catch (error) {
    console.error("[CANCEL] Error:", error);
    return NextResponse.json(
      { error: "Failed to cancel consultation" },
      { status: 500 }
    );
  }
}
