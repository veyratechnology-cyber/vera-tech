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
      name,
      email,
      phone,
      company,
      jobTitle,
      industry,
      qualificationScore,
      status,
      notes,
    } = body;

    const prospect = await prisma.prospect.create({
      data: {
        contactPerson: name,
        company: company || "Unknown",
        email,
        phone: phone || null,
        jobTitle: jobTitle || null,
        contactStatus: status as any,
        notes: notes || null,
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        adminId: session.user.id,
        action: "PROSPECT_CREATED",
        resource: "Prospect",
        resourceId: prospect.id,
        result: "SUCCESS",
      },
    });

    return NextResponse.json(prospect, { status: 201 });
  } catch (error) {
    console.error("Error creating prospect:", error);
    return NextResponse.json(
      { error: "Failed to create prospect" },
      { status: 500 }
    );
  }
}
