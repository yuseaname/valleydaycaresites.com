import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import Stripe from "stripe";
import { initializeOnboarding } from "@/lib/onboarding";
import { db } from "@/lib/db";
import { PlanType, OrderStatus } from "@prisma/client";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

// Stripe Price IDs (set these in .env after creating products in Stripe)
const STRIPE_PRICES = {
  free_sample: process.env.STRIPE_PRICE_FREE_SAMPLE || "",
  monthly_hosting: process.env.STRIPE_PRICE_MONTHLY_HOSTING || "",
};

interface CheckoutRequest {
  plan: "free_sample" | "monthly_hosting";
  customer: {
    name: string;
    email: string;
    phone: string;
    daycare: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
  payment?: {
    cardNumber: string;
    expiry: string;
    cvc: string;
    nameOnCard: string;
  };
}

interface CheckoutResponse {
  success: boolean;
  orderId?: string;
  checkoutUrl?: string; // Stripe Checkout URL
  message?: string;
  error?: string;
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone format (basic)
 */
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\(\)]+$/;
  return phone.length >= 10 && phoneRegex.test(phone);
}

/**
 * Validate card number (basic Luhn check)
 */
function isValidCardNumber(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, "");
  if (digits.length < 13 || digits.length > 19) return false;

  // Basic Luhn algorithm
  let sum = 0;
  let isEven = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0;
}

/**
 * Validate expiry date
 */
function isValidExpiry(expiry: string): boolean {
  const match = expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/);
  if (!match) return false;

  const month = parseInt(expiry.split("/")[0], 10);
  const year = parseInt("20" + expiry.split("/")[1], 10);
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;
  return true;
}

/**
 * POST /api/payment/checkout
 * Process checkout and initiate onboarding
 */
export async function POST(request: NextRequest): Promise<NextResponse<CheckoutResponse>> {
  try {
    const body: CheckoutRequest = await request.json();

    // Validate plan
    if (!body.plan || !["free_sample", "monthly_hosting"].includes(body.plan)) {
      return NextResponse.json(
        { success: false, error: "Invalid plan selected" },
        { status: 400 }
      );
    }

    // Validate customer details
    const { customer } = body;
    if (!customer.name || customer.name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide your full name" },
        { status: 400 }
      );
    }
    if (!customer.email || !isValidEmail(customer.email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address" },
        { status: 400 }
      );
    }
    if (!customer.phone || !isValidPhone(customer.phone)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid phone number" },
        { status: 400 }
      );
    }
    if (!customer.daycare || customer.daycare.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide your daycare name" },
        { status: 400 }
      );
    }

    // Generate unique order ID
    const orderId = `ORD-${uuidv4()}`;

    // Convert plan to Prisma enum format
    const planType: PlanType = body.plan === "free_sample" ? "FREE_SAMPLE" : "MONTHLY_HOSTING";

    // Handle Free Sample (no payment needed)
    if (body.plan === "free_sample") {
      // Initialize onboarding process
      const result = await initializeOnboarding(
        {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          daycare: customer.daycare,
          address: customer.address,
          city: customer.city,
          state: customer.state,
          zip: customer.zip,
        },
        planType,
        orderId
      );

      if (!result.success) {
        return NextResponse.json(
          { success: false, error: result.error || "Failed to initialize onboarding" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        orderId,
        message: "Your free sample request has been submitted. We'll have your sample ready within 48 hours.",
      });
    }

    // Handle Monthly Hosting (paid plan via Stripe)
    if (body.plan === "monthly_hosting") {
      // Check if Stripe is configured
      if (!process.env.STRIPE_SECRET_KEY) {
        console.warn("Stripe not configured - processing order without payment");
        
        // Fallback: Process without Stripe (for development/testing)
        const result = await initializeOnboarding(
          {
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            daycare: customer.daycare,
            address: customer.address,
            city: customer.city,
            state: customer.state,
            zip: customer.zip,
          },
          planType,
          orderId
        );

        if (!result.success) {
          return NextResponse.json(
            { success: false, error: result.error || "Failed to initialize onboarding" },
            { status: 500 }
          );
        }

        return NextResponse.json({
          success: true,
          orderId,
          message: "Payment successful! Your subscription is now active.",
        });
      }

      // Create Stripe Checkout Session
      const priceId = STRIPE_PRICES.monthly_hosting;
      
      if (!priceId) {
        console.error("STRIPE_PRICE_MONTHLY_HOSTING not configured");
        return NextResponse.json(
          { success: false, error: "Payment system not properly configured. Please contact support." },
          { status: 500 }
        );
      }

      try {
        // Create or retrieve Stripe customer
        const existingCustomers = await stripe.customers.list({
          email: customer.email,
          limit: 1,
        });

        let stripeCustomer;
        if (existingCustomers.data.length > 0) {
          stripeCustomer = existingCustomers.data[0];
        } else {
          stripeCustomer = await stripe.customers.create({
            email: customer.email,
            name: customer.name,
            phone: customer.phone,
            metadata: {
              daycare: customer.daycare,
            },
          });
        }

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
          customer: stripeCustomer.id,
          mode: "subscription",
          payment_method_types: ["card"],
          line_items: [
            {
              price: priceId,
              quantity: 1,
            },
          ],
          success_url: `${process.env.NEXTAUTH_URL || "https://valleydaycaresites.com"}/payment/success?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
          cancel_url: `${process.env.NEXTAUTH_URL || "https://valleydaycaresites.com"}/payment?canceled=true`,
          metadata: {
            orderId,
            plan: body.plan,
            daycare: customer.daycare,
            phone: customer.phone,
          },
          subscription_data: {
            metadata: {
              orderId,
              daycare: customer.daycare,
            },
          },
        });

        // Initialize onboarding (pending payment confirmation)
        const onboardingResult = await initializeOnboarding(
          {
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            daycare: customer.daycare,
            address: customer.address,
            city: customer.city,
            state: customer.state,
            zip: customer.zip,
          },
          planType,
          orderId
        );

        return NextResponse.json({
          success: true,
          orderId,
          checkoutUrl: session.url || undefined,
          message: "Redirecting to payment...",
        });
      } catch (stripeError) {
        console.error("Stripe error:", stripeError);
        return NextResponse.json(
          { success: false, error: "Payment initialization failed. Please try again." },
          { status: 500 }
        );
      }
    }

    // This shouldn't be reached, but handle it anyway
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred while processing your request. Please try again.",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/payment/validate
 * Validate payment details without processing
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const cardNumber = searchParams.get("cardNumber");
  const expiry = searchParams.get("expiry");

  if (!cardNumber || !expiry) {
    return NextResponse.json(
      { valid: false, error: "Missing card number or expiry" },
      { status: 400 }
    );
  }

  const isCardValid = isValidCardNumber(cardNumber);
  const isExpiryValid = isValidExpiry(expiry);

  return NextResponse.json({
    valid: isCardValid && isExpiryValid,
    cardValid: isCardValid,
    expiryValid: isExpiryValid,
  });
}