import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { OrderStatus } from "@prisma/client";
import crypto from "crypto";

// Unibee webhook secret for signature verification
const webhookSecret = process.env.UNIBEE_WEBHOOK_SECRET || "";

/**
 * Verify Unibee webhook signature
 */
function verifySignature(payload: string, signature: string, secret: string): boolean {
  if (!secret) {
    console.warn("UNIBEE_WEBHOOK_SECRET not configured");
    return true; // Skip verification in development
  }

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

/**
 * POST /api/webhooks/unibee
 * Handle Unibee webhook events
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.text();
  const signature = request.headers.get("x-unibee-signature") || 
                    request.headers.get("unibee-signature") || "";

  // Verify signature
  if (!verifySignature(body, signature, webhookSecret)) {
    console.error("Unibee webhook signature verification failed");
    return NextResponse.json(
      { error: "Signature verification failed" },
      { status: 401 }
    );
  }

  let data: any;
  try {
    data = JSON.parse(body);
  } catch (err) {
    console.error("Failed to parse webhook body:", err);
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const eventType = data.eventType || data.event || data.type;

  console.log(`Unibee webhook received: ${eventType}`, {
    timestamp: new Date().toISOString(),
    data: JSON.stringify(data).substring(0, 500),
  });

  try {
    switch (eventType) {
      case "payment.success":
      case "invoice.paid":
        await handlePaymentSuccess(data);
        break;

      case "payment.failed":
      case "invoice.payment_failed":
        await handlePaymentFailed(data);
        break;

      case "subscription.created":
        await handleSubscriptionCreated(data);
        break;

      case "subscription.updated":
        await handleSubscriptionUpdated(data);
        break;

      case "subscription.cancelled":
      case "subscription.deleted":
        await handleSubscriptionCancelled(data);
        break;

      case "refund.processed":
        await handleRefundProcessed(data);
        break;

      default:
        console.log(`Unhandled Unibee event type: ${eventType}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Error processing Unibee webhook:", err);
    return NextResponse.json(
      { error: "Error processing webhook" },
      { status: 500 }
    );
  }
}

/**
 * Handle successful payment
 */
async function handlePaymentSuccess(data: any) {
  const invoice = data.invoice || data.data || {};
  const subscriptionId = invoice.subscriptionId || invoice.subscription_id;
  const customerId = invoice.customerId || invoice.customer_id;

  console.log(`Payment success for subscription: ${subscriptionId}`);

  if (subscriptionId) {
    await db.order.updateMany({
      where: { stripeSubscriptionId: subscriptionId },
      data: {
        status: OrderStatus.PAID,
        paidAt: new Date(),
      },
    });
  }
}

/**
 * Handle failed payment
 */
async function handlePaymentFailed(data: any) {
  const invoice = data.invoice || data.data || {};
  const subscriptionId = invoice.subscriptionId || invoice.subscription_id;

  console.log(`Payment failed for subscription: ${subscriptionId}`);

  if (subscriptionId) {
    await db.order.updateMany({
      where: { stripeSubscriptionId: subscriptionId },
      data: {
        status: OrderStatus.FAILED,
      },
    });
  }
}

/**
 * Handle subscription created
 */
async function handleSubscriptionCreated(data: any) {
  const subscription = data.subscription || data.data || {};
  const subscriptionId = subscription.id || subscription.subscriptionId;
  const customerId = subscription.customerId || subscription.customer_id;

  console.log(`Subscription created: ${subscriptionId}`);

  // The order should already exist from checkout, just update references
  if (subscriptionId && customerId) {
    // Could update order with subscription details if needed
  }
}

/**
 * Handle subscription updated
 */
async function handleSubscriptionUpdated(data: any) {
  const subscription = data.subscription || data.data || {};
  const subscriptionId = subscription.id || subscription.subscriptionId;
  const status = subscription.status;

  console.log(`Subscription updated: ${subscriptionId}`, { status });

  const statusMap: Record<string, OrderStatus> = {
    active: OrderStatus.ACTIVE,
    past_due: OrderStatus.PAST_DUE,
    canceled: OrderStatus.CANCELLED,
    cancelled: OrderStatus.CANCELLED,
    unpaid: OrderStatus.FAILED,
    trialing: OrderStatus.TRIALING,
    paid: OrderStatus.PAID,
  };

  if (subscriptionId && status) {
    await db.order.updateMany({
      where: { stripeSubscriptionId: subscriptionId },
      data: {
        status: statusMap[status.toLowerCase()] || OrderStatus.ACTIVE,
      },
    });
  }
}

/**
 * Handle subscription cancelled
 */
async function handleSubscriptionCancelled(data: any) {
  const subscription = data.subscription || data.data || {};
  const subscriptionId = subscription.id || subscription.subscriptionId;

  console.log(`Subscription cancelled: ${subscriptionId}`);

  if (subscriptionId) {
    await db.order.updateMany({
      where: { stripeSubscriptionId: subscriptionId },
      data: {
        status: OrderStatus.CANCELLED,
        cancelledAt: new Date(),
      },
    });
  }
}

/**
 * Handle refund processed
 */
async function handleRefundProcessed(data: any) {
  const refund = data.refund || data.data || {};
  const paymentIntentId = refund.paymentIntentId || refund.payment_intent_id;

  console.log(`Refund processed for payment: ${paymentIntentId}`);

  // Could track refunds if needed
}

/**
 * GET /api/webhooks/unibee
 * Health check endpoint
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    status: "ok",
    message: "Unibee webhook endpoint is active",
  });
}