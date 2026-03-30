import { NextRequest, NextResponse } from "next/server";

/**
 * Email Sending API
 *
 * Sends emails via SendGrid (or fallback to console logging in development)
 * Called by the notifications library
 */

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  text: string;
}

/**
 * Send email via SendGrid API
 */
async function sendViaSendGrid(payload: EmailPayload): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.SENDGRID_API_KEY;

  if (!apiKey) {
    console.warn("SENDGRID_API_KEY not configured - email will be logged only");
    return { success: false, error: "SendGrid API key not configured" };
  }

  try {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: payload.to }],
            subject: payload.subject,
          },
        ],
        from: {
          email: process.env.FROM_EMAIL || "noreply@valleydaycaresites.com",
          name: "Valley Daycare Sites",
        },
        reply_to: {
          email: "contact@valleydaycaresites.com",
          name: "Valley Daycare Sites",
        },
        content: [
          {
            type: "text/plain",
            value: payload.text,
          },
          {
            type: "text/html",
            value: payload.html,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("SendGrid error:", errorText);
      return { success: false, error: `SendGrid error: ${response.status}` };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to send via SendGrid:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

/**
 * Log email to console (for development)
 */
function logEmail(payload: EmailPayload): void {
  console.log("\n" + "=".repeat(60));
  console.log("EMAIL NOTIFICATION");
  console.log("=".repeat(60));
  console.log(`To: ${payload.to}`);
  console.log(`Subject: ${payload.subject}`);
  console.log("-".repeat(60));
  console.log(payload.text);
  console.log("=".repeat(60) + "\n");
}

/**
 * POST /api/email/send
 * Send an email notification
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const payload: EmailPayload = await request.json();

    // Validate required fields
    if (!payload.to || !payload.subject || (!payload.html && !payload.text)) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: to, subject, html/text" },
        { status: 400 }
      );
    }

    // Always log the email (for debugging)
    logEmail(payload);

    // In production, send via SendGrid
    const isProduction = process.env.NODE_ENV === "production";

    if (isProduction && process.env.SENDGRID_API_KEY) {
      const result = await sendViaSendGrid(payload);

      if (!result.success) {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Email sent successfully",
        method: "sendgrid",
      });
    }

    // Development mode - email logged to console
    return NextResponse.json({
      success: true,
      message: "Email logged to console (development mode)",
      method: "console",
      preview: {
        to: payload.to,
        subject: payload.subject,
      },
    });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process email request" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/email/send
 * Check email service status
 */
export async function GET(): Promise<NextResponse> {
  const configured = !!process.env.SENDGRID_API_KEY;
  const isProduction = process.env.NODE_ENV === "production";

  return NextResponse.json({
    status: "ok",
    provider: configured ? "sendgrid" : "console",
    mode: isProduction ? "production" : "development",
    configured,
    fromEmail: process.env.FROM_EMAIL || "noreply@valleydaycaresites.com",
  });
}
