import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { outcome, meetingNotes, followUpDate, followUpNotes } = await request.json();

    if (!outcome) {
      return NextResponse.json(
        { error: "Outcome required" },
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

    // Update consultation
    const updated = await prisma.consultation.update({
      where: { id: params.id },
      data: {
        status: "COMPLETED",
        outcome,
        meetingNotes: meetingNotes || consultation.meetingNotes,
        followUpDate: followUpDate ? new Date(followUpDate) : null,
        followUpNotes: followUpNotes || null,
      },
    });

    // Log history
    await prisma.consultationHistory.create({
      data: {
        consultationId: params.id,
        action: "COMPLETED",
        notes: `Outcome: ${outcome}${meetingNotes ? `. Notes: ${meetingNotes.substring(0, 100)}...` : ''}`,
      },
    });

    return NextResponse.json({
      success: true,
      consultation: updated,
    });
  } catch (error) {
    console.error("[COMPLETE] Error:", error);
    return NextResponse.json(
      { error: "Failed to mark consultation as complete" },
      { status: 500 }
    );
  }
}
