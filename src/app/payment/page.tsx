"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";
import {
  ArrowLeft,
  Check,
  CheckCircle,
  CreditCard,
  Lock,
  Shield,
  Clock,
  HelpCircle,
} from "lucide-react";

// Plan configuration
const PLANS = {
  free_sample: {
    id: "free_sample",
    name: "Free Sample",
    price: 0,
    billing: "One-time",
    description: "Professional homepage sample delivered in 48 hours",
    features: [
      "Custom homepage design",
      "48-hour delivery",
      "Mobile responsive",
      "No obligation",
      "No credit card required",
    ],
  },
  monthly_hosting: {
    id: "monthly_hosting",
    name: "Monthly Hosting",
    price: 50,
    billing: "per month",
    description: "Complete website with hosting, updates, and support",
    features: [
      "Your homepage",
      "Contact page with inquiry form",
      "Custom domain (e.g., yourdaycare.com)",
      "SSL security certificate",
      "Mobile-friendly design",
      "Hosting included",
      "Monthly updates",
      "Email support",
      "Cancel anytime",
    ],
  },
};

export default function PaymentPage() {
  const [selectedPlan, setSelectedPlan] = useState<"free_sample" | "monthly_hosting">("free_sample");
  const [step, setStep] = useState<"plan" | "details" | "payment" | "confirm">("plan");

  // Customer details state
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phone: "",
    daycare: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  // Payment state
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    nameOnCard: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handlePlanSelect = (planId: "free_sample" | "monthly_hosting") => {
    setSelectedPlan(planId);
  };

  const handleCustomerChange = (field: string, value: string) => {
    setCustomerDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field: string, value: string) => {
    setPaymentDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    if (step === "plan") {
      setStep("details");
    } else if (step === "details") {
      setStep("payment");
    } else if (step === "payment") {
      handleSubmitOrder();
    }
  };

  const handleBack = () => {
    if (step === "details") {
      setStep("plan");
    } else if (step === "payment") {
      setStep("details");
    }
  };

  const handleSubmitOrder = async () => {
    setIsProcessing(true);

    try {
      const response = await fetch("/api/payment/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: selectedPlan,
          customer: customerDetails,
          payment: selectedPlan === "monthly_hosting" ? paymentDetails : null,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setOrderId(data.orderId);
        setOrderComplete(true);
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Order confirmation screen
  if (orderComplete) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <section className="py-16 lg:py-24">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-semibold text-foreground mb-4">
              {selectedPlan === "free_sample" ? "Request Submitted!" : "Payment Successful!"}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {selectedPlan === "free_sample"
                ? "We'll have your sample homepage ready within 48 hours. Check your email for confirmation."
                : "Your subscription is now active. You'll receive a confirmation email shortly."}
            </p>

            <Card className="border-border bg-card mb-8">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-2">Order ID</p>
                <p className="font-mono text-foreground">{orderId}</p>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a href="/">Return Home</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/#contact">Contact Support</a>
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="py-8 lg:py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {["plan", "details", "payment", "confirm"].map((s, i) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === s
                      ? "bg-primary text-primary-foreground"
                      : i < ["plan", "details", "payment", "confirm"].indexOf(step)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < ["plan", "details", "payment", "confirm"].indexOf(step) || step === s ? i + 1 : ""}
                </div>
                {i < 3 && (
                  <div className={`w-12 h-0.5 ${i < ["plan", "details", "payment", "confirm"].indexOf(step) ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="max-w-4xl mx-auto px-4">
          {/* Plan Selection */}
          {step === "plan" && (
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-semibold text-foreground text-center mb-6">
                Choose Your Plan
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {Object.values(PLANS).map((plan) => (
                  <Card
                    key={plan.id}
                    className={`cursor-pointer transition-all border-2 ${
                      selectedPlan === plan.id
                        ? "border-primary bg-primary/5 shadow-premium-glow"
                        : "border-border bg-card hover:border-primary/30"
                    }`}
                    onClick={() => handlePlanSelect(plan.id as "free_sample" | "monthly_hosting")}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-display text-lg font-semibold text-foreground">
                          {plan.name}
                        </h3>
                        {plan.price === 0 ? (
                          <Badge variant="outline" className="text-xs">Free</Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">${plan.price}/{plan.billing}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                      <ul className="space-y-2 mb-4">
                        {plan.features.slice(0, 4).map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Check className="h-4 w-4 text-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {plan.features.length > 4 && (
                        <p className="text-xs text-muted-foreground">+{plan.features.length - 4} more features</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button
                size="lg"
                className="w-full gradient-sage text-primary-foreground"
                onClick={handleContinue}
                disabled={!selectedPlan}
              >
                Continue
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </div>
          )}

          {/* Customer Details */}
          {step === "details" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <Button variant="ghost" size="sm" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <h2 className="font-display text-xl font-semibold text-foreground">Your Details</h2>
              </div>

              <Card className="border-border bg-card">
                <CardContent className="p-6 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={customerDetails.name}
                        onChange={(e) => handleCustomerChange("name", e.target.value)}
                        placeholder="Jane Smith"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerDetails.email}
                        onChange={(e) => handleCustomerChange("email", e.target.value)}
                        placeholder="jane@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={customerDetails.phone}
                        onChange={(e) => handleCustomerChange("phone", e.target.value)}
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="daycare">Daycare Name *</Label>
                      <Input
                        id="daycare"
                        value={customerDetails.daycare}
                        onChange={(e) => handleCustomerChange("daycare", e.target.value)}
                        placeholder="Happy Kids Daycare"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      value={customerDetails.address}
                      onChange={(e) => handleCustomerChange("address", e.target.value)}
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={customerDetails.city}
                        onChange={(e) => handleCustomerChange("city", e.target.value)}
                        placeholder="Los Angeles"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={customerDetails.state}
                        onChange={(e) => handleCustomerChange("state", e.target.value)}
                        placeholder="CA"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input
                        id="zip"
                        value={customerDetails.zip}
                        onChange={(e) => handleCustomerChange("zip", e.target.value)}
                        placeholder="90001"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                size="lg"
                className="w-full gradient-sage text-primary-foreground"
                onClick={handleContinue}
                disabled={!customerDetails.name || !customerDetails.email || !customerDetails.phone || !customerDetails.daycare}
              >
                {selectedPlan === "free_sample" ? "Submit Request" : "Continue to Payment"}
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </div>
          )}

          {/* Payment Details */}
          {step === "payment" && selectedPlan === "monthly_hosting" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <Button variant="ghost" size="sm" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <h2 className="font-display text-xl font-semibold text-foreground">Payment Details</h2>
              </div>

              {/* Order Summary */}
              <Card className="border-primary/20 bg-muted/30">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-foreground">Monthly Hosting</p>
                      <p className="text-sm text-muted-foreground">Billed monthly, cancel anytime</p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-2xl font-semibold text-foreground">$50</p>
                      <p className="text-sm text-muted-foreground">/month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Form */}
              <Card className="border-border bg-card">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <span className="font-medium text-foreground">Card Details</span>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number *</Label>
                    <Input
                      id="cardNumber"
                      value={paymentDetails.cardNumber}
                      onChange={(e) => handlePaymentChange("cardNumber", e.target.value.replace(/\D/g, "").slice(0, 16))}
                      placeholder="4242 4242 4242 4242"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date *</Label>
                      <Input
                        id="expiry"
                        value={paymentDetails.expiry}
                        onChange={(e) => handlePaymentChange("expiry", e.target.value)}
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC *</Label>
                      <Input
                        id="cvc"
                        value={paymentDetails.cvc}
                        onChange={(e) => handlePaymentChange("cvc", e.target.value.replace(/\D/g, "").slice(0, 4))}
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nameOnCard">Name on Card *</Label>
                    <Input
                      id="nameOnCard"
                      value={paymentDetails.nameOnCard}
                      onChange={(e) => handlePaymentChange("nameOnCard", e.target.value)}
                      placeholder="Jane Smith"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Security Notice */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span>Your payment is secured with 256-bit SSL encryption</span>
              </div>

              <Button
                size="lg"
                className="w-full gradient-sage text-primary-foreground"
                onClick={handleSubmitOrder}
                disabled={
                  isProcessing ||
                  !paymentDetails.cardNumber ||
                  !paymentDetails.expiry ||
                  !paymentDetails.cvc ||
                  !paymentDetails.nameOnCard
                }
              >
                {isProcessing ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Complete Purchase - $50/month
                    <Shield className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              {/* Help Link */}
              <div className="text-center">
                <a href="/#contact" className="text-sm text-muted-foreground hover:text-primary flex items-center justify-center gap-1">
                  <HelpCircle className="h-4 w-4" />
                  Having trouble? Contact support
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
