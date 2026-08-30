/**
 * Google Calendar Integration Service
 * 
 * Handles all Google Calendar operations for VeyraTech consultation bookings:
 * - OAuth authentication
 * - Create/update/delete calendar events
 * - Check availability and conflicts
 * - Generate Google Meet links
 * - Manage consultation scheduling
 */

import { google } from "googleapis";
import { addMinutes, parseISO, format } from "date-fns";

// Initialize Google Calendar API
const getCalendarClient = () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  // Set refresh token for server-side authentication
  if (process.env.GOOGLE_REFRESH_TOKEN) {
    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });
  }

  return google.calendar({ version: "v3", auth: oauth2Client });
};

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || "primary";
const TIMEZONE = process.env.TZ || "Africa/Nairobi";

/**
 * Check if Google Calendar is properly configured
 */
export function isGoogleCalendarConfigured(): boolean {
  return !!(
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_REFRESH_TOKEN
  );
}

/**
 * Create a Google Calendar event for a consultation
 */
export async function createConsultationEvent(data: {
  consultationId: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  company?: string;
  consultationTypes: string[];
  businessChallenge?: string;
  startDateTime: Date;
  duration: number; // in minutes
  meetingType: "GOOGLE_MEET" | "PHONE" | "IN_PERSON";
  location?: string;
}): Promise<{
  eventId: string;
  meetLink?: string;
  htmlLink: string;
}> {
  if (!isGoogleCalendarConfigured()) {
    throw new Error("Google Calendar is not configured");
  }

  const calendar = getCalendarClient();
  const endDateTime = addMinutes(data.startDateTime, data.duration);

  // Prepare event description with consultation details
  const description = `
VeyraTech Consultation

CLIENT INFORMATION:
Name: ${data.clientName}
Email: ${data.clientEmail}
${data.clientPhone ? `Phone: ${data.clientPhone}` : ""}
${data.company ? `Company: ${data.company}` : ""}

CONSULTATION TYPE:
${data.consultationTypes.map(t => `• ${t.replace(/_/g, " ")}`).join("\n")}

${data.businessChallenge ? `BUSINESS CHALLENGE:\n${data.businessChallenge}` : ""}

CONSULTATION ID: ${data.consultationId}
Admin Dashboard: ${process.env.NEXT_PUBLIC_APP_URL}/admin/consultations/${data.consultationId}
  `.trim();

  // Build event object
  const event: any = {
    summary: `VeyraTech Consultation — ${data.company || data.clientName}`,
    description,
    start: {
      dateTime: data.startDateTime.toISOString(),
      timeZone: TIMEZONE,
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: TIMEZONE,
    },
    attendees: [
      {
        email: data.clientEmail,
        displayName: data.clientName,
        responseStatus: "needsAction",
      },
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 }, // 24 hours
        { method: "popup", minutes: 60 }, // 1 hour
        { method: "popup", minutes: 10 }, // 10 minutes
      ],
    },
  };

  // Add Google Meet conference if requested
  if (data.meetingType === "GOOGLE_MEET") {
    event.conferenceData = {
      createRequest: {
        requestId: `veyratech-${data.consultationId}`,
        conferenceSolutionKey: {
          type: "hangoutsMeet",
        },
      },
    };
  }

  // Add location for in-person meetings
  if (data.meetingType === "IN_PERSON" && data.location) {
    event.location = data.location;
  }

  try {
    const response = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: event,
      conferenceDataVersion: data.meetingType === "GOOGLE_MEET" ? 1 : 0,
      sendUpdates: "all", // Send email invites to attendees
    });

    console.log("[GOOGLE_CALENDAR] Event created:", response.data.id);

    return {
      eventId: response.data.id!,
      meetLink: response.data.conferenceData?.entryPoints?.[0]?.uri,
      htmlLink: response.data.htmlLink!,
    };
  } catch (error: any) {
    console.error("[GOOGLE_CALENDAR] Failed to create event:", error.message);
    throw new Error(`Failed to create calendar event: ${error.message}`);
  }
}

/**
 * Update an existing Google Calendar event
 */
export async function updateConsultationEvent(
  eventId: string,
  updates: {
    startDateTime?: Date;
    duration?: number;
    clientName?: string;
    clientEmail?: string;
    company?: string;
    status?: "confirmed" | "tentative" | "cancelled";
  }
): Promise<void> {
  if (!isGoogleCalendarConfigured()) {
    throw new Error("Google Calendar is not configured");
  }

  const calendar = getCalendarClient();

  try {
    // Get existing event
    const existingEvent = await calendar.events.get({
      calendarId: CALENDAR_ID,
      eventId,
    });

    // Prepare updates
    const updatedEvent: any = { ...existingEvent.data };

    if (updates.startDateTime && updates.duration) {
      const endDateTime = addMinutes(updates.startDateTime, updates.duration);
      updatedEvent.start = {
        dateTime: updates.startDateTime.toISOString(),
        timeZone: TIMEZONE,
      };
      updatedEvent.end = {
        dateTime: endDateTime.toISOString(),
        timeZone: TIMEZONE,
      };
    }

    if (updates.clientName || updates.company) {
      updatedEvent.summary = `VeyraTech Consultation — ${updates.company || updates.clientName}`;
    }

    if (updates.status) {
      updatedEvent.status = updates.status;
    }

    await calendar.events.update({
      calendarId: CALENDAR_ID,
      eventId,
      requestBody: updatedEvent,
      sendUpdates: "all",
    });

    console.log("[GOOGLE_CALENDAR] Event updated:", eventId);
  } catch (error: any) {
    console.error("[GOOGLE_CALENDAR] Failed to update event:", error.message);
    throw new Error(`Failed to update calendar event: ${error.message}`);
  }
}

/**
 * Cancel a Google Calendar event
 */
export async function cancelConsultationEvent(
  eventId: string,
  reason?: string
): Promise<void> {
  if (!isGoogleCalendarConfigured()) {
    throw new Error("Google Calendar is not configured");
  }

  const calendar = getCalendarClient();

  try {
    await calendar.events.delete({
      calendarId: CALENDAR_ID,
      eventId,
      sendUpdates: "all", // Notify attendees
    });

    console.log("[GOOGLE_CALENDAR] Event cancelled:", eventId);
  } catch (error: any) {
    console.error("[GOOGLE_CALENDAR] Failed to cancel event:", error.message);
    throw new Error(`Failed to cancel calendar event: ${error.message}`);
  }
}

/**
 * Check availability for a specific time slot
 */
export async function checkAvailability(
  startDateTime: Date,
  duration: number // in minutes
): Promise<{
  isAvailable: boolean;
  conflicts: Array<{
    summary: string;
    start: string;
    end: string;
  }>;
}> {
  if (!isGoogleCalendarConfigured()) {
    console.warn("[GOOGLE_CALENDAR] Not configured, assuming available");
    return { isAvailable: true, conflicts: [] };
  }

  const calendar = getCalendarClient();
  const endDateTime = addMinutes(startDateTime, duration);

  try {
    const response = await calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: startDateTime.toISOString(),
      timeMax: endDateTime.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items || [];
    const conflicts = events
      .filter((e) => e.status !== "cancelled")
      .map((e) => ({
        summary: e.summary || "Busy",
        start: e.start?.dateTime || e.start?.date || "",
        end: e.end?.dateTime || e.end?.date || "",
      }));

    return {
      isAvailable: conflicts.length === 0,
      conflicts,
    };
  } catch (error: any) {
    console.error("[GOOGLE_CALENDAR] Failed to check availability:", error.message);
    // If calendar check fails, assume unavailable for safety
    return { isAvailable: false, conflicts: [] };
  }
}

/**
 * Get all busy periods for a date range
 */
export async function getBusyPeriods(
  startDate: Date,
  endDate: Date
): Promise<
  Array<{
    start: Date;
    end: Date;
    summary?: string;
  }>
> {
  if (!isGoogleCalendarConfigured()) {
    console.warn("[GOOGLE_CALENDAR] Not configured, returning empty busy periods");
    return [];
  }

  const calendar = getCalendarClient();

  try {
    const response = await calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: startDate.toISOString(),
      timeMax: endDate.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items || [];

    return events
      .filter((e) => e.status !== "cancelled")
      .map((e) => ({
        start: parseISO(e.start?.dateTime || e.start?.date || ""),
        end: parseISO(e.end?.dateTime || e.end?.date || ""),
        summary: e.summary,
      }));
  } catch (error: any) {
    console.error("[GOOGLE_CALENDAR] Failed to get busy periods:", error.message);
    return [];
  }
}

/**
 * Find next available time slot
 */
export async function findNextAvailableSlot(
  preferredStart: Date,
  duration: number,
  searchDays: number = 7
): Promise<Date | null> {
  if (!isGoogleCalendarConfigured()) {
    console.warn("[GOOGLE_CALENDAR] Not configured, returning preferred time");
    return preferredStart;
  }

  const endDate = new Date(preferredStart);
  endDate.setDate(endDate.getDate() + searchDays);

  const busyPeriods = await getBusyPeriods(preferredStart, endDate);

  // Start searching from preferred time
  let currentTime = new Date(preferredStart);
  const maxTime = endDate;

  while (currentTime < maxTime) {
    const slotEnd = addMinutes(currentTime, duration);

    // Check if this slot conflicts with any busy period
    const hasConflict = busyPeriods.some((busy) => {
      return (
        (currentTime >= busy.start && currentTime < busy.end) ||
        (slotEnd > busy.start && slotEnd <= busy.end) ||
        (currentTime <= busy.start && slotEnd >= busy.end)
      );
    });

    if (!hasConflict) {
      return currentTime;
    }

    // Move to next 15-minute slot
    currentTime = addMinutes(currentTime, 15);
  }

  return null;
}

/**
 * Get consultation event details
 */
export async function getEventDetails(eventId: string) {
  if (!isGoogleCalendarConfigured()) {
    throw new Error("Google Calendar is not configured");
  }

  const calendar = getCalendarClient();

  try {
    const response = await calendar.events.get({
      calendarId: CALENDAR_ID,
      eventId,
    });

    return {
      id: response.data.id!,
      summary: response.data.summary,
      description: response.data.description,
      start: response.data.start?.dateTime,
      end: response.data.end?.dateTime,
      meetLink: response.data.conferenceData?.entryPoints?.[0]?.uri,
      htmlLink: response.data.htmlLink,
      status: response.data.status,
    };
  } catch (error: any) {
    console.error("[GOOGLE_CALENDAR] Failed to get event:", error.message);
    throw new Error(`Failed to get calendar event: ${error.message}`);
  }
}
