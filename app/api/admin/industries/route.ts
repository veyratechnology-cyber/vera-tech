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
      challenges,
      solutions,
      displayOrder,
      isActive,
    } = body;

    const industry = await prisma.industryPage.create({
      data: {
        name,
        slug,
        industry: "TECHNOLOGY" as any,
        description: description || "",
        challenges: challenges ? JSON.stringify(challenges) : null,
        solutions: solutions ? JSON.stringify(solutions) : null,
        displayOrder: displayOrder || 0,
        published: isActive !== undefined ? isActive : true,
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        adminId: session.user.id,
        action: "SERVICE_UPDATED",
        resource: "IndustryPage",
        resourceId: industry.id,
        result: "SUCCESS",
      },
    });

    return NextResponse.json(industry, { status: 201 });
  } catch (error) {
    console.error("Error creating industry:", error);
    return NextResponse.json(
      { error: "Failed to create industry" },
      { status: 500 }
    );
  }
}
