import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { z } from "zod";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

/**
 * POST /api/contact
 * Handle contact form submissions
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.error.errors },
        { status: 400 }
      );
    }

    const { name, company, email, phone, subject, message } = validation.data;

    // Save to database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        company: company || null,
        email,
        phone: phone || null,
        subject,
        message,
      },
    });

    // Create notification for all active admins
    try {
      const activeAdmins = await prisma.admin.findMany({
        where: { status: "ACTIVE" },
        select: { id: true },
      });

      if (activeAdmins.length > 0) {
        await prisma.notification.createMany({
          data: activeAdmins.map((admin) => ({
            adminId: admin.id,
            type: "NEW_CONTACT",
            title: "New Contact Message",
            message: `${name} sent a message: ${subject}`,
            link: `/admin/contact-messages`,
            isRead: false,
          })),
        });
      }
    } catch (notificationError) {
      console.error("Failed to create notifications:", notificationError);
      // Don't fail the request if notification creation fails
    }

    // Send multi-channel notifications (Email, SMS, WhatsApp)
    try {
      const { sendContactNotifications } = await import("@/lib/notifications");
      
      await sendContactNotifications({
        name,
        email,
        company,
        phone,
        subject,
        message,
      });
    } catch (notificationError) {
      console.error("Failed to send notifications:", notificationError);
      // Don't fail the request if notifications fail
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
        id: contactMessage.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
