import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { OrderStatus } from "@prisma/client";

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

// Webhook secret for signature verification
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

/**
 * POST /api/webhooks/stripe
 * Handle Stripe webhook events
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature") || "";

  let event: Stripe.Event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  // Handle the event
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaid(invoice);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Error processing webhook:", err);
    return NextResponse.json(
      { error: "Error processing webhook" },
      { status: 500 }
    );
  }
}

/**
 * Handle checkout.session.completed event
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const customerId = session.customer as string;
  const customerEmail = session.customer_email || session.customer_details?.email;
  const metadata = session.metadata || {};
  
  console.log(`Checkout completed for: ${customerEmail}`, {
    customerId,
    orderId: metadata.orderId,
    plan: metadata.plan,
  });

  // Update order status if orderId exists in metadata
  if (metadata.orderId) {
    try {
      await db.order.update({
        where: { id: metadata.orderId },
        data: {
          status: OrderStatus.PAID,
          stripeCustomerId: customerId,
          stripeSubscriptionId: session.subscription as string,
          paidAt: new Date(),
        },
      });
    } catch (err) {
      console.error("Failed to update order:", err);
    }
  }
}

/**
 * Handle invoice.paid event
 */
async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  const subscriptionId = invoice.subscription as string;

  console.log(`Invoice paid for customer: ${customerId}`, {
    subscriptionId,
    amount: invoice.amount_paid,
  });

  // Update order status for recurring payments
  try {
    await db.order.updateMany({
      where: { stripeSubscriptionId: subscriptionId },
      data: {
        status: "PAID",
        paidAt: new Date(),
      },
    });
  } catch (err) {
    console.error("Failed to update order for invoice:", err);
  }
}

/**
 * Handle invoice.payment_failed event
 */
async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  const subscriptionId = invoice.subscription as string;

  console.log(`Payment failed for customer: ${customerId}`, {
    subscriptionId,
    attempt: invoice.attempt_count,
  });

  // Update order status
  try {
    await db.order.updateMany({
      where: { stripeSubscriptionId: subscriptionId },
      data: {
        status: "FAILED",
      },
    });
  } catch (err) {
    console.error("Failed to update order for failed payment:", err);
  }
}

/**
 * Handle customer.subscription.updated event
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const subscriptionId = subscription.id;
  const status = subscription.status;

  console.log(`Subscription updated: ${subscriptionId}`, { status });

  // Map Stripe status to our status
  const statusMap: Record<string, string> = {
    active: "PAID",
    past_due: "PAST_DUE",
    canceled: "CANCELLED",
    unpaid: "FAILED",
  };

  try {
    await db.order.updateMany({
      where: { stripeSubscriptionId: subscriptionId },
      data: {
        status: statusMap[status] || status.toUpperCase(),
      },
    });
  } catch (err) {
    console.error("Failed to update subscription status:", err);
  }
}

/**
 * Handle customer.subscription.deleted event
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const subscriptionId = subscription.id;

  console.log(`Subscription deleted: ${subscriptionId}`);

  try {
    await db.order.updateMany({
      where: { stripeSubscriptionId: subscriptionId },
      data: {
        status: "CANCELLED",
        cancelledAt: new Date(),
      },
    });
  } catch (err) {
    console.error("Failed to update subscription cancellation:", err);
  }
}

/**
 * GET /api/webhooks/stripe
 * Health check endpoint
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    status: "ok",
    message: "Stripe webhook endpoint is active",
  });
}