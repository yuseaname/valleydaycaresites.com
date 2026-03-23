/**
 * Emailit API Client
 *
 * Sends transactional emails via Emailit API.
 * API docs: https://api.emailit.com/v1/
 */

const EMAILIT_API_URL = "https://api.emailit.com/v1";

export interface EmailPayload {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  fromName?: string;
  replyTo?: string;
  tags?: string[];
}

export interface EmailResponse {
  success: boolean;
  id?: string;
  error?: string;
}

/**
 * Send an email via Emailit API
 */
export async function sendEmail(payload: EmailPayload): Promise<EmailResponse> {
  const apiKey = process.env.EMAILIT_API_KEY;
  const defaultFrom = process.env.EMAILIT_FROM_EMAIL || "contact@valleydaycaresites.com";
  const defaultFromName = process.env.EMAILIT_FROM_NAME || "Valley Daycare Sites";

  if (!apiKey) {
    console.error("EMAILIT_API_KEY not configured");
    return { success: false, error: "Email service not configured" };
  }

  const to = Array.isArray(payload.to) ? payload.to : [payload.to];

  try {
    const response = await fetch(`${EMAILIT_API_URL}/emails`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: payload.from || defaultFrom,
        to,
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
        reply_to: payload.replyTo,
        tags: payload.tags,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Emailit API error:", errorData);
      return {
        success: false,
        error: errorData.error || `HTTP ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      id: data.id,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to send email:", message);
    return { success: false, error: message };
  }
}

/**
 * Send a notification email to the site admin
 */
export async function sendNotificationEmail(
  subject: string,
  data: Record<string, unknown>
): Promise<EmailResponse> {
  const notifyEmail = process.env.EMAILIT_NOTIFY_EMAIL;
  const fromName = process.env.EMAILIT_FROM_NAME || "Valley Daycare Sites";

  if (!notifyEmail) {
    console.error("EMAILIT_NOTIFY_EMAIL not configured");
    return { success: false, error: "Notification email not configured" };
  }

  // Build HTML email from data
  const htmlRows = Object.entries(data)
    .map(([key, value]) => {
      const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
      return `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: 600;">${label}</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${value}</td></tr>`;
    })
    .join("");

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333; margin-bottom: 20px;">${subject}</h2>
      <table style="width: 100%; border-collapse: collapse;">
        ${htmlRows}
      </table>
      <p style="margin-top: 20px; color: #666; font-size: 12px;">
        Sent from ${fromName} website
      </p>
    </body>
    </html>
  `;

  // Build plain text version
  const textLines = Object.entries(data)
    .map(([key, value]) => {
      const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
      return `${label}: ${value}`;
    })
    .join("\n");

  const text = `${subject}\n${"=".repeat(subject.length)}\n\n${textLines}\n\nSent from ${fromName} website`;

  return sendEmail({
    to: notifyEmail,
    subject: `[${fromName}] ${subject}`,
    html,
    text,
    tags: ["notification", "contact-form"],
  });
}

/**
 * Send a confirmation email to the user who submitted a form
 */
export async function sendConfirmationEmail(
  to: string,
  subject: string,
  message: string
): Promise<EmailResponse> {
  const fromName = process.env.EMAILIT_FROM_NAME || "Valley Daycare Sites";

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #2563eb;">${fromName}</h2>
      <p style="color: #333; line-height: 1.6;">${message}</p>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
      <p style="color: #666; font-size: 14px;">
        ${fromName}<br>
        <a href="mailto:contact@valleydaycaresites.com" style="color: #2563eb;">contact@valleydaycaresites.com</a>
      </p>
    </body>
    </html>
  `;

  return sendEmail({
    to,
    subject,
    html,
    text: message,
    tags: ["confirmation"],
  });
}
