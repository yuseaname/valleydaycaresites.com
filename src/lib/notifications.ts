/**
 * Notification utilities for sending emails
 */

import type { PlanType, OrderStatus } from "@prisma/client";

// Notification configuration
const NOTIFICATION_CONFIG = {
  adminEmail: process.env.ADMIN_EMAIL || "yuseaname@gmail.com",
  fromEmail: process.env.FROM_EMAIL || "noreply@valleydaycaresites.com",
  companyName: "Valley Daycare Sites",
};

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  text: string;
}

interface CustomerData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  daycare: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
}

interface OrderData {
  id: string;
  plan: PlanType;
  status: OrderStatus;
  amount: number;
  createdAt: Date;
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
 * Send email via SendGrid API
 */
async function sendViaSendGrid(payload: EmailPayload): Promise<boolean> {
  const apiKey = process.env.SENDGRID_API_KEY;

  if (!apiKey) {
    console.warn("SENDGRID_API_KEY not configured - email logged only");
    logEmail(payload);
    return true; // Return true so flow continues in dev
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
          email: NOTIFICATION_CONFIG.fromEmail,
          name: NOTIFICATION_CONFIG.companyName,
        },
        reply_to: {
          email: "contact@valleydaycaresites.com",
          name: NOTIFICATION_CONFIG.companyName,
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
      return false;
    }

    console.log(`Email sent successfully to ${payload.to}`);
    return true;
  } catch (error) {
    console.error("Failed to send via SendGrid:", error);
    return false;
  }
}

/**
 * Send email notification
 * Uses SendGrid in production, logs to console in development
 */
export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  // Always log for debugging
  logEmail(payload);

  // Send via SendGrid if configured
  return sendViaSendGrid(payload);
}

/**
 * Send admin notification for new order
 */
export async function notifyAdminOfNewOrder(
  order: OrderData,
  customer: CustomerData
): Promise<boolean> {
  const planName = order.plan === "FREE_SAMPLE" ? "Free Sample" : "Monthly Hosting ($50/month)";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #7a9178 0%, #9caf94 100%); padding: 30px; border-radius: 12px; margin-bottom: 20px;">
        <h1 style="color: white; margin: 0; font-size: 24px;">🎉 New Order Received!</h1>
      </div>

      <div style="background: #f9fafb; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #1a1a1a; margin-top: 0;">Order Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Order ID</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">${order.id}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Plan</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">${planName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Amount</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right; font-weight: bold; color: #7a9178;">$${order.amount}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666;">Status</td>
            <td style="padding: 10px 0; text-align: right; font-weight: bold;">${order.status.toUpperCase()}</td>
          </tr>
        </table>
      </div>

      <div style="background: #f9fafb; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #1a1a1a; margin-top: 0;">Customer Information</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Name</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">${customer.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right;">
              <a href="mailto:${customer.email}" style="color: #7a9178;">${customer.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Phone</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right;">${customer.phone || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Daycare</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">${customer.daycare}</td>
          </tr>
          ${customer.city ? `
          <tr>
            <td style="padding: 10px 0; color: #666;">Location</td>
            <td style="padding: 10px 0; text-align: right;">${customer.city}${customer.state ? `, ${customer.state}` : ""}${customer.zip ? ` ${customer.zip}` : ""}</td>
          </tr>
          ` : ""}
        </table>
      </div>

      <div style="text-align: center; margin-top: 30px; color: #999; font-size: 14px;">
        <p>This is an automated notification from Valley Daycare Sites</p>
        <p>
          <a href="https://valleydaycaresites.com/admin/orders" style="color: #7a9178;">View in Dashboard</a>
        </p>
      </div>
    </div>
  `;

  const text = `
NEW ORDER RECEIVED!

Order Details:
- Order ID: ${order.id}
- Plan: ${planName}
- Amount: $${order.amount}
- Status: ${order.status.toUpperCase()}

Customer Information:
- Name: ${customer.name}
- Email: ${customer.email}
- Phone: ${customer.phone || "N/A"}
- Daycare: ${customer.daycare}
${customer.city ? `- Location: ${customer.city}${customer.state ? `, ${customer.state}` : ""}${customer.zip ? ` ${customer.zip}` : ""}` : ""}

View in Dashboard: https://valleydaycaresites.com/admin/orders

---
This is an automated notification from Valley Daycare Sites
  `.trim();

  return sendEmail({
    to: NOTIFICATION_CONFIG.adminEmail,
    subject: `🎉 New Order: ${planName} - ${customer.daycare}`,
    html,
    text,
  });
}

/**
 * Send customer confirmation email
 */
export async function sendCustomerConfirmation(
  order: OrderData,
  customer: CustomerData
): Promise<boolean> {
  const planName = order.plan === "FREE_SAMPLE" ? "Free Sample Request" : "Monthly Hosting Subscription";
  const message = order.plan === "FREE_SAMPLE"
    ? "We'll have your sample homepage ready within 48 hours. You'll receive a private link to preview it."
    : "Your subscription is now active. We'll be in touch shortly to get started on your website.";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #7a9178 0%, #9caf94 100%); padding: 30px; border-radius: 12px; margin-bottom: 20px;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Thank You, ${customer.name.split(" ")[0]}!</h1>
      </div>

      <div style="background: #f9fafb; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #1a1a1a; margin-top: 0;">Your ${planName}</h2>
        <p style="color: #666; line-height: 1.6;">${message}</p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Order ID</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">${order.id}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666;">Status</td>
            <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #7a9178;">Confirmed</td>
          </tr>
        </table>
      </div>

      <div style="background: #f9fafb; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="color: #1a1a1a; margin-top: 0;">What's Next?</h3>
        <ul style="color: #666; line-height: 1.8; padding-left: 20px;">
          <li>Keep an eye on your inbox for updates</li>
          <li>We may reach out if we need more details</li>
          <li>Have questions? Just reply to this email</li>
        </ul>
      </div>

      <div style="text-align: center; margin-top: 30px; color: #999; font-size: 14px;">
        <p>Valley Daycare Sites</p>
        <p>
          <a href="mailto:contact@valleydaycaresites.com" style="color: #7a9178;">contact@valleydaycaresites.com</a>
        </p>
      </div>
    </div>
  `;

  const text = `
Thank You, ${customer.name.split(" ")[0]}!

Your ${planName}

${message}

Order Details:
- Order ID: ${order.id}
- Status: Confirmed

What's Next?
- Keep an eye on your inbox for updates
- We may reach out if we need more details
- Have questions? Just reply to this email

---
Valley Daycare Sites
contact@valleydaycaresites.com
  `.trim();

  return sendEmail({
    to: customer.email,
    subject: `Confirmation: Your ${planName} - Valley Daycare Sites`,
    html,
    text,
  });
}

/**
 * Send onboarding welcome email
 */
export async function sendOnboardingWelcome(customer: CustomerData): Promise<boolean> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #7a9178 0%, #9caf94 100%); padding: 30px; border-radius: 12px; margin-bottom: 20px;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Welcome to Valley Daycare Sites!</h1>
      </div>

      <div style="padding: 25px 0;">
        <p style="color: #333; line-height: 1.6; font-size: 16px;">
          Hi ${customer.name.split(" ")[0]},
        </p>
        <p style="color: #333; line-height: 1.6;">
          Thank you for choosing us to help with your daycare's online presence. We're excited to work with ${customer.daycare}!
        </p>
        <p style="color: #333; line-height: 1.6;">
          Here's what you can expect from us:
        </p>
        <ul style="color: #666; line-height: 1.8; padding-left: 20px;">
          <li>Professional, parent-focused design</li>
          <li>Mobile-friendly website that works everywhere</li>
          <li>Fast loading pages for busy parents</li>
          <li>Clear calls-to-action to boost enrollments</li>
        </ul>
        <p style="color: #333; line-height: 1.6; margin-top: 20px;">
          If you have any logos, photos, or specific content you'd like us to use, feel free to send them over.
        </p>
      </div>

      <div style="background: #f9fafb; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
        <p style="color: #666; margin: 0;">
          Questions? Just reply to this email or text us at 747 3158215.
        </p>
      </div>

      <div style="text-align: center; margin-top: 30px; color: #999; font-size: 14px;">
        <p>Valley Daycare Sites</p>
      </div>
    </div>
  `;

  const text = `
Welcome to Valley Daycare Sites!

Hi ${customer.name.split(" ")[0]},

Thank you for choosing us to help with your daycare's online presence. We're excited to work with ${customer.daycare}!

Here's what you can expect from us:
- Professional, parent-focused design
- Mobile-friendly website that works everywhere
- Fast loading pages for busy parents
- Clear calls-to-action to boost enrollments

If you have any logos, photos, or specific content you'd like us to use, feel free to send them over.

Questions? Just reply to this email or text us at 747 3158215.

---
Valley Daycare Sites
  `.trim();

  return sendEmail({
    to: customer.email,
    subject: `Welcome! Let's Build Something Great for ${customer.daycare}`,
    html,
    text,
  });
}
