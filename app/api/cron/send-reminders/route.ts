// @ts-nocheck
/**
 * Cron job endpoint for sending consultation reminders
 * 
 * This endpoint should be called periodically (every 15 minutes recommended)
 * to check for upcoming consultations and send reminders at appropriate times:
 * - 24 hours before
 * - 1 hour before
 * - 10 minutes before
 * 
 * Configure in vercel.json or use Vercel Cron Jobs
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMeetingReminder } from "@/lib/email";
import { addHours, addMinutes, isAfter, isBefore, subHours, subMinutes } from "date-fns";

export const runtime = "edge";
export const dynamic = "force-dynamic";

// Security: Verify cron job authorization
function verifyCronAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  
  // In development, allow without auth
  if (process.env.NODE_ENV === "development") {
    return true;
  }
  
  // In production, require CRON_SECRET
  if (!cronSecret) {
    console.error("[CRON] CRON_SECRET not configured");
    return false;
  }
  
  return authHeader === `Bearer ${cronSecret}`;
}

export async function GET(request: NextRequest) {
  console.log("[CRON] Reminder job started");
  
  // Verify authorization
  if (!verifyCronAuth(request)) {
    console.error("[CRON] Unauthorized cron job attempt");
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  
  try {
    const now = new Date();
    const remindersSent = {
      day_before: 0,
      hour_before: 0,
      ten_minutes: 0,
    };
    
    // Find all scheduled consultations in the next 25 hours
    // (to catch 24-hour reminders)
    const upcomingConsultations = await prisma.consultation.findMany({
      where: {
        status: "SCHEDULED",
        actualScheduledAt: {
          gte: now,
          lte: addHours(now, 25),
        },
      },
      orderBy: {
        actualScheduledAt: "asc",
      },
    });
    
    console.log(`[CRON] Found ${upcomingConsultations.length} upcoming consultations`);
    
    for (const consultation of upcomingConsultations) {
      if (!consultation.actualScheduledAt) continue;
      
      const scheduledTime = consultation.actualScheduledAt;
      
      // Calculate reminder times
      const dayBeforeTime = subHours(scheduledTime, 24);
      const hourBeforeTime = subHours(scheduledTime, 1);
      const tenMinutesBeforeTime = subMinutes(scheduledTime, 10);
      
      // Check if we need to send 24-hour reminder
      const needsDayReminder = await shouldSendReminder(
        consultation.id,
        "DAY_BEFORE",
        dayBeforeTime,
        now
      );
      
      if (needsDayReminder) {
        await sendReminderAndLog(
          consultation,
          "DAY_BEFORE",
          dayBeforeTime
        );
        remindersSent.day_before++;
      }
      
      // Check if we need to send 1-hour reminder
      const needsHourReminder = await shouldSendReminder(
        consultation.id,
        "HOUR_BEFORE",
        hourBeforeTime,
        now
      );
      
      if (needsHourReminder) {
        await sendReminderAndLog(
          consultation,
          "HOUR_BEFORE",
          hourBeforeTime
        );
        remindersSent.hour_before++;
      }
      
      // Check if we need to send 10-minute reminder
      const needsTenMinReminder = await shouldSendReminder(
        consultation.id,
        "TEN_MINUTES",
        tenMinutesBeforeTime,
        now
      );
      
      if (needsTenMinReminder) {
        await sendReminderAndLog(
          consultation,
          "TEN_MINUTES",
          tenMinutesBeforeTime
        );
        remindersSent.ten_minutes++;
      }
    }
    
    console.log("[CRON] Reminder job completed", remindersSent);
    
    return NextResponse.json({
      success: true,
      checked: upcomingConsultations.length,
      sent: remindersSent,
      timestamp: now.toISOString(),
    });
    
  } catch (error) {
    console.error("[CRON] Error sending reminders:", error);
    return NextResponse.json(
      { 
        error: "Failed to send reminders",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * Check if a reminder should be sent
 */
async function shouldSendReminder(
  consultationId: string,
  reminderType: "DAY_BEFORE" | "HOUR_BEFORE" | "TEN_MINUTES",
  reminderTime: Date,
  now: Date
): Promise<boolean> {
  // Check if reminder time has passed
  if (isBefore(now, reminderTime)) {
    return false;
  }
  
  // Check if it's too late (more than 15 minutes past reminder time)
  const fifteenMinutesAfter = addMinutes(reminderTime, 15);
  if (isAfter(now, fifteenMinutesAfter)) {
    return false; // Too late, skip this reminder
  }
  
  // Check if reminder already sent
  const existingReminder = await prisma.consultationReminder.findFirst({
    where: {
      consultationId,
      reminderType,
      sentAt: {
        not: null,
      },
    },
  });
  
  return !existingReminder;
}

/**
 * Send reminder email and log to database
 */
async function sendReminderAndLog(
  consultation: any,
  reminderType: "DAY_BEFORE" | "HOUR_BEFORE" | "TEN_MINUTES",
  scheduledFor: Date
) {
  try {
    // Send reminder email
    await sendMeetingReminder({
      name: consultation.name,
      email: consultation.email,
      company: consultation.company,
      scheduledAt: consultation.actualScheduledAt,
      meetingType: consultation.meetingType,
      googleMeetLink: consultation.googleMeetLink,
      reminderType: reminderType === "DAY_BEFORE" ? "24h" : 
                    reminderType === "HOUR_BEFORE" ? "1h" : "10m",
    });
    
    // Log reminder in database
    await prisma.consultationReminder.create({
      data: {
        consultationId: consultation.id,
        reminderType,
        scheduledFor,
        sentAt: new Date(),
      },
    });
    
    console.log(`[CRON] Sent ${reminderType} reminder for consultation ${consultation.id}`);
  } catch (error) {
    console.error(`[CRON] Failed to send ${reminderType} reminder:`, error);
    
    // Log failed attempt
    await prisma.consultationReminder.create({
      data: {
        consultationId: consultation.id,
        reminderType,
        scheduledFor,
        sentAt: null,
      },
    });
  }
}

// POST method for manual trigger (testing)
export async function POST(request: NextRequest) {
  return GET(request);
}
