import { NextRequest, NextResponse } from "next/server";
import {
  sendNotificationEmail,
  sendConfirmationEmail,
} from "@/lib/emailit";
import { db } from "@/lib/db";

/**
 * Contact Form Submission Schema
 *
 * Matches the production site's contact.html form fields
 */
interface ContactFormData {
  name: string;
  daycare: string;
  email: string;
  location: string;
  type?: string;
  "current-site"?: string;
  message?: string;
}

/**
 * POST /api/contact
 *
 * Handle contact form submissions:
 * 1. Save as lead in database
 * 2. Send notification email to admin
 * 3. Send confirmation email to user
 */
export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json();

    // Validate required fields
    const requiredFields: (keyof ContactFormData)[] = ["name", "daycare", "email", "location"];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Check for spam indicators
    const spamIndicators = [
      formData.name.includes("http"),
      formData.daycare.includes("http"),
      formData.message?.includes("http") && (formData.message?.match(/http/g) || []).length > 3,
    ];

    if (spamIndicators.some(Boolean)) {
      // Silently reject spam
      return NextResponse.json({ success: true });
    }

    // Create or update lead in database
    let lead;
    try {
      lead = await db.lead.findUnique({
        where: { email: formData.email },
      });

      if (!lead) {
        lead = await db.lead.create({
          data: {
            email: formData.email,
            name: formData.name,
            business: formData.daycare,
            location: formData.location,
            daycareType: formData.type,
            currentSite: formData["current-site"],
            temperature: "WARM", // Contact form submissions are warm leads
            status: "NEW",
            source: "contact_form",
            notes: formData.message,
          },
        });
      } else {
        // Update existing lead
        lead = await db.lead.update({
          where: { id: lead.id },
          data: {
            name: formData.name,
            business: formData.daycare,
            location: formData.location,
            daycareType: formData.type,
            currentSite: formData["current-site"],
            notes: formData.message,
            status: "IN_PROGRESS",
            updatedAt: new Date(),
          },
        });
      }
    } catch (dbError) {
      // Continue without database - still send emails
      console.error("Database error (non-blocking):", dbError);
    }

    // Send notification to admin
    const notificationData: Record<string, unknown> = {
      Name: formData.name,
      "Daycare Name": formData.daycare,
      Email: formData.email,
      Location: formData.location,
      "Daycare Type": formData.type || "Not specified",
      "Current Website": formData["current-site"] || "Not specified",
      Message: formData.message || "None",
    };

    const notificationResult = await sendNotificationEmail(
      "New Sample Request",
      notificationData
    );

    if (!notificationResult.success) {
      console.error("Failed to send notification:", notificationResult.error);
      // Don't fail the request - user still gets confirmation
    }

    // Send confirmation to user
    const confirmationMessage = `Hi ${formData.name},

Thanks for requesting a free sample homepage for ${formData.daycare}! We received your request and will get started right away.

**What happens next:**
1. We'll review your information
2. Within 48 hours, we'll create a sample homepage tailored to your daycare
3. You'll receive a private link to view your sample
4. Take a look, share it with others, and decide if you want to keep it

No payment required - the sample is completely free with no obligation.

If you have any questions in the meantime, just reply to this email.

Best regards,
The Valley Daycare Sites Team`;

    const confirmationResult = await sendConfirmationEmail(
      formData.email,
      "We received your sample request!",
      confirmationMessage
    );

    if (!confirmationResult.success) {
      console.error("Failed to send confirmation:", confirmationResult.error);
    }

    return NextResponse.json({
      success: true,
      message: "Your request has been submitted. Check your email for confirmation.",
      leadId: lead?.id,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to submit form. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * GET /api/contact
 *
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Valley Daycare Sites Contact API",
  });
}
