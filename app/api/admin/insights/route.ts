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
      title,
      slug,
      excerpt,
      content,
      category,
      tags,
      isPublished,
    } = body;

    const insight = await prisma.insight.create({
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content: content || "",
        category,
        tags: tags || [],
        status: isPublished ? "PUBLISHED" : "DRAFT",
        publishedAt: isPublished ? new Date() : null,
        authorId: session.user.id,
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        adminId: session.user.id,
        action: "INSIGHT_PUBLISHED",
        resource: "Insight",
        resourceId: insight.id,
        result: "SUCCESS",
      },
    });

    return NextResponse.json(insight, { status: 201 });
  } catch (error) {
    console.error("Error creating insight:", error);
    return NextResponse.json(
      { error: "Failed to create insight" },
      { status: 500 }
    );
  }
}
