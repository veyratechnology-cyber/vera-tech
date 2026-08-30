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
      slug,
      tagline,
      description,
      features,
      benefits,
      displayOrder,
      isActive,
    } = body;

    const service = await prisma.service.create({
      data: {
        name,
        slug,
        description: description || "",
        displayOrder: displayOrder || 0,
        published: isActive !== undefined ? isActive : true,
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        adminId: session.user.id,
        action: "SERVICE_UPDATED",
        resource: "Service",
        resourceId: service.id,
        result: "SUCCESS",
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}
