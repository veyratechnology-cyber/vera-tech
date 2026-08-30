import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cancelConsultationEvent } from "@/lib/google-calendar";
import { sendEmail } from "@/lib/email";

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
    try {
      await sendEmail({
        to: consultation.email,
        subject: "Consultation Cancelled - VeyraTech",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a1a1a;">Consultation Cancelled</h2>
            
            <p>Dear ${consultation.name},</p>
            
            <p>Your consultation scheduled for ${consultation.actualScheduledAt ? new Date(consultation.actualScheduledAt).toLocaleString() : 'TBD'} has been cancelled.</p>
            
            <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Reason:</h3>
              <p style="margin-bottom: 0;">${reason}</p>
            </div>
            
            <p>If you would like to reschedule, please visit our booking page or contact us directly.</p>
            
            <p>We apologize for any inconvenience.</p>
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
            
            <p style="color: #666; font-size: 14px;">
              <strong>VeyraTech</strong><br>
              Email: admin@veyratech.com<br>
              Phone: +254 745 247 211
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("[CANCEL] Failed to send cancellation email:", emailError);
    }

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
