import twilio from "twilio";

// Initialize Twilio client
const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

const TWILIO_PHONE = process.env.TWILIO_PHONE_NUMBER;
const TWILIO_WHATSAPP = process.env.TWILIO_WHATSAPP_NUMBER || "whatsapp:+14155238886"; // Twilio sandbox
const ADMIN_PHONE = process.env.ADMIN_PHONE_NUMBER;
const ADMIN_WHATSAPP = process.env.ADMIN_WHATSAPP_NUMBER;

/**
 * Send SMS notification to admin about new consultation
 */
export async function sendConsultationSMS(data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
}) {
  if (!twilioClient || !TWILIO_PHONE || !ADMIN_PHONE) {
    console.log("[SMS] Twilio not configured, skipping SMS");
    return;
  }

  try {
    await twilioClient.messages.create({
      body: `🔔 New Consultation Request

Name: ${data.name}
Company: ${data.company || "N/A"}
Email: ${data.email}
Phone: ${data.phone || "N/A"}

View details at: ${process.env.NEXT_PUBLIC_APP_URL}/admin/consultations`,
      from: TWILIO_PHONE,
      to: ADMIN_PHONE,
    });
    console.log("[SMS] Consultation SMS sent to admin");
  } catch (error) {
    console.error("[SMS] Failed to send SMS:", error);
  }
}

/**
 * Send WhatsApp notification to admin about new consultation
 */
export async function sendConsultationWhatsApp(data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  businessChallenge?: string;
}) {
  if (!twilioClient || !ADMIN_WHATSAPP) {
    console.log("[WHATSAPP] WhatsApp not configured, skipping");
    return;
  }

  try {
    let message = `🔔 *New Consultation Request*

*Name:* ${data.name}
*Company:* ${data.company || "N/A"}
*Email:* ${data.email}
*Phone:* ${data.phone || "N/A"}`;

    if (data.businessChallenge) {
      message += `\n\n*Challenge:*\n${data.businessChallenge.substring(0, 200)}${data.businessChallenge.length > 200 ? "..." : ""}`;
    }

    message += `\n\n👉 View full details: ${process.env.NEXT_PUBLIC_APP_URL}/admin/consultations`;

    await twilioClient.messages.create({
      body: message,
      from: TWILIO_WHATSAPP,
      to: `whatsapp:${ADMIN_WHATSAPP}`,
    });
    console.log("[WHATSAPP] Consultation WhatsApp sent to admin");
  } catch (error) {
    console.error("[WHATSAPP] Failed to send WhatsApp:", error);
  }
}

/**
 * Send SMS notification about new contact message
 */
export async function sendContactSMS(data: {
  name: string;
  email: string;
  subject: string;
}) {
  if (!twilioClient || !TWILIO_PHONE || !ADMIN_PHONE) {
    console.log("[SMS] Twilio not configured, skipping SMS");
    return;
  }

  try {
    await twilioClient.messages.create({
      body: `💬 New Contact Message

From: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

View at: ${process.env.NEXT_PUBLIC_APP_URL}/admin/contact-messages`,
      from: TWILIO_PHONE,
      to: ADMIN_PHONE,
    });
    console.log("[SMS] Contact SMS sent to admin");
  } catch (error) {
    console.error("[SMS] Failed to send SMS:", error);
  }
}

/**
 * Send WhatsApp notification about new contact message
 */
export async function sendContactWhatsApp(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  if (!twilioClient || !ADMIN_WHATSAPP) {
    console.log("[WHATSAPP] WhatsApp not configured, skipping");
    return;
  }

  try {
    const body = `💬 *New Contact Message*

*From:* ${data.name}
*Email:* ${data.email}
*Subject:* ${data.subject}

*Message:*
${data.message.substring(0, 200)}${data.message.length > 200 ? "..." : ""}

👉 View full message: ${process.env.NEXT_PUBLIC_APP_URL}/admin/contact-messages`;

    await twilioClient.messages.create({
      body,
      from: TWILIO_WHATSAPP,
      to: `whatsapp:${ADMIN_WHATSAPP}`,
    });
    console.log("[WHATSAPP] Contact WhatsApp sent to admin");
  } catch (error) {
    console.error("[WHATSAPP] Failed to send WhatsApp:", error);
  }
}

/**
 * Send all notifications for a new consultation (Email, SMS, WhatsApp)
 */
export async function sendConsultationNotifications(data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  industry?: string;
  businessChallenge?: string;
  consultationId: string;
  scheduledAt?: Date;
  wasRescheduled?: boolean;
  googleMeetLink?: string;
  meetingType?: string;
}) {
  // Send in parallel for faster response
  await Promise.allSettled([
    // Email notifications
    (async () => {
      const { sendConsultationNotification, sendConsultationConfirmation } = await import("@/lib/email");
      await sendConsultationNotification({
        ...data,
        consultationId: data.consultationId,
      });
      await sendConsultationConfirmation({
        name: data.name,
        email: data.email,
        company: data.company,
        scheduledAt: data.scheduledAt,
        meetingType: data.meetingType,
        googleMeetLink: data.googleMeetLink,
        wasRescheduled: data.wasRescheduled,
      });
    })(),
    // SMS notification
    sendConsultationSMS(data),
    // WhatsApp notification
    sendConsultationWhatsApp(data),
  ]);
}

/**
 * Send all notifications for a new contact message (Email, SMS, WhatsApp)
 */
export async function sendContactNotifications(data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  // Send in parallel for faster response
  await Promise.allSettled([
    // Email notifications
    (async () => {
      const { sendContactNotification, sendContactConfirmation } = await import("@/lib/email");
      await sendContactNotification(data);
      await sendContactConfirmation({
        name: data.name,
        email: data.email,
      });
    })(),
    // SMS notification
    sendContactSMS(data),
    // WhatsApp notification
    sendContactWhatsApp(data),
  ]);
}
