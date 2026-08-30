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
      leadSource,
      industry,
      budget,
      message,
      status,
    } = body;

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || null,
        leadSource,
        notes: message || null,
        status,
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        adminId: session.user.id,
        action: "LEAD_CREATED",
        resource: "Lead",
        resourceId: lead.id,
        result: "SUCCESS",
      },
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 }
    );
  }
}
