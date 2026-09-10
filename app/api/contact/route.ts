// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { safePrismaQuery } from "@/lib/prisma";
import { z } from "zod";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  company: z.string().max(100, "Company name too long").optional().nullable(),
  email: z.string().email("Invalid email address").max(255, "Email too long"),
  phone: z.string().max(50, "Phone too long").optional().nullable(),
  subject: z.string().min(1, "Subject is required").max(200, "Subject too long"),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000, "Message too long"),
});

/**
 * POST /api/contact
 * Handle contact form submissions
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("[CONTACT] Received data:", JSON.stringify(body, null, 2));

    // Validate input
    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      console.error("[CONTACT] Validation failed:", validation.error.errors);
      return NextResponse.json(
        { 
          error: "Invalid input", 
          details: validation.error.errors,
          received: body 
        },
        { status: 400 }
      );
    }

    const { name, company, email, phone, subject, message } = validation.data;

    // Save to database with auto-reconnect
    let contactMessage;
    try {
      console.log("[CONTACT] Attempting to save to database...");
      
      contactMessage = await safePrismaQuery(async (client) => {
        console.log("[CONTACT] Inside safePrismaQuery, creating contact message...");
        return client.contactMessage.create({
          data: {
            name: name.trim(),
            company: company?.trim() || null,
            email: email.trim().toLowerCase(),
            phone: phone?.trim() || null,
            subject: subject.trim(),
            message: message.trim(),
          },
        });
      }, 3); // 3 retries
      
      console.log("[CONTACT] Message saved successfully:", contactMessage.id);
    } catch (dbError: any) {
      console.error("[CONTACT] Database error:", {
        message: dbError.message,
        code: dbError.code,
        meta: dbError.meta,
        stack: dbError.stack?.substring(0, 500)
      });
      
      // Return error to user so they know to try again
      return NextResponse.json(
        {
          error: "Database connection failed",
          message: "Unable to save your message. Please try again or contact us directly at admin@veyratech.com",
          details: process.env.NODE_ENV === 'development' ? {
            errorMessage: dbError.message,
            errorCode: dbError.code
          } : undefined
        },
        { status: 503 }
      );
    }

    // Create notification for all active admins (non-blocking)
    safePrismaQuery(async (client) => {
      const activeAdmins = await client.admin.findMany({
        where: { status: "ACTIVE" },
        select: { id: true },
      });

      if (activeAdmins.length > 0) {
        await client.notification.createMany({
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
      
      return activeAdmins.length;
    }, 2).catch(error => {
      console.error("[CONTACT] Failed to create notifications:", error.message);
    });

    // Send multi-channel notifications (Email, SMS, WhatsApp) - non-blocking
    (async () => {
      try {
        const { sendContactNotifications } = await import("@/lib/notifications");
        
        await sendContactNotifications({
          name,
          email,
          company: company || undefined,
          phone: phone || undefined,
          subject,
          message,
        });
        console.log("[CONTACT] Notifications sent successfully");
      } catch (notificationError) {
        console.error("[CONTACT] Failed to send notifications:", notificationError instanceof Error ? notificationError.message : String(notificationError));
        // Don't fail the request if notifications fail
      }
    })();

    console.log("[CONTACT] Request completed successfully");

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully! We'll get back to you soon.",
        id: contactMessage.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[CONTACT] Unexpected error:", error);
    return NextResponse.json(
      { 
        error: "Failed to send message",
        message: "An unexpected error occurred. Please try again or contact us directly at admin@veyratech.com"
      },
      { status: 500 }
    );
  }
}
