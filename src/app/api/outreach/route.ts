import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/emailit";

/**
 * Cold Email Data Schema
 */
interface ColdEmailPayload {
  to: string;
  subject: string;
  body: string;
  contactName: string;
  daycareName: string;
}

/**
 * POST /api/outreach
 *
 * Send a cold email to a daycare prospect
 */
export async function POST(request: NextRequest) {
  try {
    const data: ColdEmailPayload = await request.json();

    // Validate required fields
    if (!data.to || !data.subject || !data.body) {
      return NextResponse.json(
        { error: "Missing required fields: to, subject, body" },
        { status: 400 }
      );
    }

    // Build HTML email
    const html = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <p style="color: #333; line-height: 1.6; white-space: pre-wrap;">${data.body}</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 14px;">
          Valley Daycare Sites<br>
          <a href="mailto:contact@valleydaycaresites.com" style="color: #2563eb;">contact@valleydaycaresites.com</a><br>
          <a href="https://valleydaycaresites.com" style="color: #2563eb;">valleydaycaresites.com</a>
        </p>
      </body>
      </html>
    `;

    // Send email
    const result = await sendEmail({
      to: data.to,
      subject: data.subject,
      html,
      text: data.body,
      tags: ["outreach", "cold-email"],
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: result.id,
      message: `Email sent to ${data.to}`,
    });
  } catch (error) {
    console.error("Outreach email error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/outreach
 *
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Valley Daycare Sites Outreach API",
  });
}
