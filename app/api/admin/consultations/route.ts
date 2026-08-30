import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      prospectName,
      prospectEmail,
      scheduledAt,
      notes,
      status,
    } = body;

    const consultation = await prisma.consultation.create({
      data: {
        name: prospectName,
        email: prospectEmail,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        notes: notes || null,
        status: status || "NEW",
        assignedAdminId: session.user.id,
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        adminId: session.user.id,
        action: "CONSULTATION_CREATED",
        resource: "Consultation",
        resourceId: consultation.id,
        result: "SUCCESS",
      },
    });

    return NextResponse.json(consultation, { status: 201 });
  } catch (error) {
    console.error("Error creating consultation:", error);
    return NextResponse.json(
      { error: "Failed to create consultation" },
      { status: 500 }
    );
  }
}
