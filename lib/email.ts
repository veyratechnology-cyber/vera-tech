import { Resend } from "resend";
import { format } from "date-fns";

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.EMAIL_FROM || "VeyraTech <noreply@veyratech.com>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@veyratech.com";

/**
 * Send consultation confirmation with meeting details to client
 */
export async function sendConsultationConfirmation(data: {
  name: string;
  email: string;
  company?: string;
  scheduledAt?: Date;
  meetingType?: string;
  googleMeetLink?: string;
  wasRescheduled?: boolean;
}) {
  try {
    const meetingTypeLabel =
      data.meetingType === "GOOGLE_MEET"
        ? "Google Meet"
        : data.meetingType === "PHONE"
        ? "Phone Call"
        : data.meetingType === "IN_PERSON"
        ? "In-Person Meeting"
        : "To be confirmed";

    let meetingDetails = "";
    if (data.scheduledAt) {
      meetingDetails = `
        <h3>Meeting Details:</h3>
        <div style="background-color: #f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p style="margin: 0 0 8px 0;"><strong>📅 Date:</strong> ${format(
            data.scheduledAt,
            "EEEE, MMMM d, yyyy"
          )}</p>
          <p style="margin: 0 0 8px 0;"><strong>🕐 Time:</strong> ${format(
            data.scheduledAt,
            "h:mm a"
          )} EAT</p>
          <p style="margin: 0 0 8px 0;"><strong>⏱️ Duration:</strong> 60 minutes</p>
          <p style="margin: 0;"><strong>📍 Meeting Type:</strong> ${meetingTypeLabel}</p>
        </div>
      `;

      if (data.googleMeetLink) {
        meetingDetails += `
          <p style="margin: 24px 0;">
            <a href="${data.googleMeetLink}" 
               style="background-color: #FC8436; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">
              📹 Join Google Meet
            </a>
          </p>
        `;
      }

      if (data.wasRescheduled) {
        meetingDetails += `
          <div style="background-color: #FFF3E0; border-left: 4px solid #FC8436; padding: 12px; margin: 16px 0;">
            <p style="margin: 0; color: #E65100;">
              <strong>Note:</strong> Your preferred time was unavailable, so we've scheduled the closest available slot for you.
            </p>
          </div>
        `;
      }
    } else {
      meetingDetails = `
        <div style="background-color: #E3F2FD; border-left: 4px solid #2196F3; padding: 16px; margin: 16px 0;">
          <p style="margin: 0;">
            <strong>📋 Next Steps:</strong> Our team is reviewing your request and will contact you within 1-2 business days to schedule a consultation at a time that works for you.
          </p>
        </div>
      `;
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: data.scheduledAt
        ? "Your VeyraTech Consultation is Confirmed"
        : "We've Received Your Consultation Request",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #0D2340; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">VeyraTech</h1>
            <p style="color: #FC8436; margin: 8px 0 0 0; font-size: 14px;">Technology & AI Consulting</p>
          </div>
          
          <div style="background-color: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
            <h2 style="color: #0D2340; margin-top: 0;">${
              data.scheduledAt ? "✅ Consultation Confirmed!" : "Thank You for Your Interest!"
            }</h2>
            
            <p>Hi ${data.name},</p>
            
            <p>${
              data.scheduledAt
                ? "Your consultation with VeyraTech has been successfully scheduled."
                : "Thank you for requesting a consultation with VeyraTech. We've received your request and our team will review it shortly."
            }</p>

            ${meetingDetails}

            ${
              data.scheduledAt
                ? `
              <h3>What to Expect:</h3>
              <ol style="padding-left: 20px;">
                <li style="margin-bottom: 8px;">You'll receive calendar invites and reminders before the meeting</li>
                <li style="margin-bottom: 8px;">We'll discuss your challenges and business goals</li>
                <li style="margin-bottom: 8px;">We'll explore how VeyraTech can help</li>
                <li style="margin-bottom: 8px;">We'll outline potential next steps</li>
              </ol>
            `
                : `
              <h3>What Happens Next:</h3>
              <ol style="padding-left: 20px;">
                <li style="margin-bottom: 8px;">Our team reviews your request</li>
                <li style="margin-bottom: 8px;">We'll contact you to discuss your needs</li>
                <li style="margin-bottom: 8px;">We'll schedule a consultation at a convenient time</li>
                <li style="margin-bottom: 8px;">We'll discuss how we can help transform your business</li>
              </ol>
            `
            }

            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 6px; margin: 24px 0;">
              <p style="margin: 0 0 12px 0; font-weight: 600;">Questions or need to reschedule?</p>
              <p style="margin: 0 0 4px 0;">📧 <a href="mailto:${ADMIN_EMAIL}" style="color: #FC8436; text-decoration: none;">${ADMIN_EMAIL}</a></p>
              <p style="margin: 0;">📞 <a href="tel:+254745247211" style="color: #FC8436; text-decoration: none;">+254 745 247 211</a></p>
            </div>

            <p style="color: #666; font-size: 14px; margin-top: 24px;">
              We look forward to speaking with you!
            </p>
            
            <p style="margin-bottom: 0;">
              Best regards,<br>
              <strong>The VeyraTech Team</strong>
            </p>
          </div>

          <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p style="margin: 0 0 8px 0;">VeyraTech | Technology & AI Consulting</p>
            <p style="margin: 0 0 8px 0;">
              <a href="https://veyratech.com" style="color: #FC8436; text-decoration: none;">veyratech.com</a>
            </p>
            <p style="margin: 0;">Nairobi, Kenya</p>
          </div>
        </body>
        </html>
      `,
    });
    console.log("[EMAIL] Consultation confirmation sent to customer");
  } catch (error) {
    console.error("[EMAIL] Failed to send consultation confirmation:", error);
  }
}

/**
 * Send consultation notification to admin
 */
export async function sendConsultationNotification(data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  industry?: string;
  businessChallenge?: string;
  consultationId: string;
  scheduledAt?: Date;
  wasRescheduled?: boolean;
}) {
  try {
    let schedulingInfo = "";
    if (data.scheduledAt) {
      schedulingInfo = `
        <h3>Scheduled Meeting:</h3>
        <p><strong>Date:</strong> ${format(data.scheduledAt, "EEEE, MMMM d, yyyy")}</p>
        <p><strong>Time:</strong> ${format(data.scheduledAt, "h:mm a")} EAT</p>
        ${
          data.wasRescheduled
            ? '<p style="color: #FC8436;"><strong>Note:</strong> Automatically rescheduled (preferred time unavailable)</p>'
            : ""
        }
      `;
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Consultation Request from ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #0D2340;">🔔 New Consultation Request</h2>
          <p>You have received a new consultation request.</p>
          
          <h3>Contact Information:</h3>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Name:</strong> ${data.name}</li>
            <li><strong>Email:</strong> ${data.email}</li>
            <li><strong>Company:</strong> ${data.company || "N/A"}</li>
            <li><strong>Phone:</strong> ${data.phone || "N/A"}</li>
          </ul>

          ${data.industry ? `<p><strong>Industry:</strong> ${data.industry.replace(/_/g, " ")}</p>` : ""}
          
          ${schedulingInfo}

          ${
            data.businessChallenge
              ? `
            <h3>Business Challenge:</h3>
            <p>${data.businessChallenge}</p>
          `
              : ""
          }

          <p style="margin-top: 24px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/consultations/${
        data.consultationId
      }" 
               style="background-color: #FC8436; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View Consultation Details
            </a>
          </p>

          <hr style="margin: 24px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 12px;">This is an automated notification from VeyraTech.</p>
        </body>
        </html>
      `,
    });
    console.log("[EMAIL] Consultation notification sent to admin");
  } catch (error) {
    console.error("[EMAIL] Failed to send consultation notification:", error);
  }
}

/**
 * Send meeting reminder
 */
export async function sendMeetingReminder(data: {
  name: string;
  email: string;
  scheduledAt: Date;
  meetingType: string;
  googleMeetLink?: string;
  consultationId: string;
  timeUntil: "24h" | "1h" | "10m";
  isAdmin?: boolean;
}) {
  const timeLabels = {
    "24h": { subject: "tomorrow", body: "24 hours" },
    "1h": { subject: "in 1 hour", body: "1 hour" },
    "10m": { subject: "in 10 minutes", body: "10 minutes" },
  };

  const label = timeLabels[data.timeUntil];

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: `Reminder: Your VeyraTech consultation is ${label.subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="background-color: #FC8436; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0;">⏰ Meeting Reminder</h2>
          </div>
          
          <div style="padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
            <p>Hi ${data.name},</p>
            
            <p style="font-size: 18px; font-weight: 600; color: #0D2340;">
              Your VeyraTech consultation starts in ${label.body}
            </p>

            <div style="background-color: #f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <p style="margin: 0 0 8px 0;"><strong>📅 Date:</strong> ${format(
                data.scheduledAt,
                "EEEE, MMMM d, yyyy"
              )}</p>
              <p style="margin: 0;"><strong>🕐 Time:</strong> ${format(
                data.scheduledAt,
                "h:mm a"
              )} EAT</p>
            </div>

            ${
              data.googleMeetLink
                ? `
              <p style="text-align: center; margin: 24px 0;">
                <a href="${data.googleMeetLink}" 
                   style="background-color: #FC8436; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600; font-size: 16px;">
                  📹 Join Meeting Now
                </a>
              </p>
            `
                : ""
            }

            ${
              data.isAdmin
                ? `
              <p style="margin-top: 20px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/consultations/${data.consultationId}" 
                   style="color: #FC8436; text-decoration: none;">
                  View consultation details →
                </a>
              </p>
            `
                : ""
            }

            <p style="color: #666; font-size: 14px; margin-top: 24px;">
              See you soon!
            </p>
          </div>
        </body>
        </html>
      `,
    });
    console.log(`[EMAIL] ${label.body} reminder sent to ${data.isAdmin ? "admin" : "client"}`);
  } catch (error) {
    console.error("[EMAIL] Failed to send meeting reminder:", error);
  }
}

/**
 * Send contact form notification to admin
 */
export async function sendContactNotification(data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `Contact Form: ${data.subject}`,
      html: `
        <h2>New Contact Message</h2>
        <p>You have received a new message from your website contact form.</p>
        
        <h3>Contact Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${data.name}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Company:</strong> ${data.company || "N/A"}</li>
          <li><strong>Phone:</strong> ${data.phone || "N/A"}</li>
        </ul>

        <h3>Subject:</h3>
        <p>${data.subject}</p>

        <h3>Message:</h3>
        <p style="white-space: pre-wrap;">${data.message}</p>

        <p style="margin-top: 24px;">
          <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(
        data.subject
      )}" style="background-color: #FC8436; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Reply to ${
        data.name
      }</a>
        </p>

        <hr style="margin: 24px 0; border: none; border-top: 1px solid #ddd;">
        <p style="color: #666; font-size: 12px;">This is an automated notification from VeyraTech.</p>
      `,
    });
    console.log("[EMAIL] Contact notification sent to admin");
  } catch (error) {
    console.error("[EMAIL] Failed to send contact notification:", error);
  }
}

/**
 * Send contact confirmation to customer
 */
export async function sendContactConfirmation(data: {
  name: string;
  email: string;
}) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: "We've Received Your Message",
      html: `
        <h2>Thank You for Contacting Us!</h2>
        <p>Hi ${data.name},</p>
        
        <p>Thank you for reaching out to VeyraTech. We've received your message and will get back to you as soon as possible.</p>

        <p>Our team typically responds within 1 business day. We appreciate your patience and look forward to speaking with you.</p>

        <p>If you need immediate assistance, you can reach us at:<br>
        Email: <a href="mailto:${ADMIN_EMAIL}">${ADMIN_EMAIL}</a><br>
        Phone: 0745247211</p>

        <p>Best regards,<br>
        <strong>The VeyraTech Team</strong><br>
        Technology & AI Consulting</p>

        <hr style="margin: 24px 0; border: none; border-top: 1px solid #ddd;">
        <p style="color: #666; font-size: 12px;">
          VeyraTech | <a href="https://veyratech.com">veyratech.com</a><br>
          Email: ${ADMIN_EMAIL} | Phone: 0745247211
        </p>
      `,
    });
    console.log("[EMAIL] Contact confirmation sent to customer");
  } catch (error) {
    console.error("[EMAIL] Failed to send contact confirmation:", error);
  }
}
