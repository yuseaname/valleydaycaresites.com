"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Clock, CreditCard, RefreshCw, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function RefundPolicy() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">Refund & Cancellation Policy</h1>
          <p className="text-muted-foreground">Last updated: March 24, 2026</p>
        </div>

        <Card className="border-border bg-card">
          <CardContent className="p-6 prose max-w-3xl">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              Our Commitment to You
            </h2>

            <p className="text-muted-foreground mb-4">
              At Valley Daycare Sites, we want you to be completely satisfied with your purchase. If you're not happy, we'll make it right. Here's what you can do to help.
            </p>

            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Free Sample Refund
            </h3>
            <p className="text-muted-foreground mb-4">
              Since the free sample is delivered within 48 hours at if you're not completely satisfied, simply let us know and we will provide a full refund.
            </p>

            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-primary" />
              Monthly Subscription
            </h3>

            <h4 className="font-semibold text-foreground mb-2">Cancellation Within first 24 hours</h4>
            <p className="text-muted-foreground mb-4">
              You may cancel your subscription within the first 24 hours. After your initial payment. No questions asked.
            </p>

            <h4 className="font-semibold text-foreground mb-2">After 3 months</h4>
            <p className="text-muted-foreground mb-4">
              After 3 months of you own your custom domain and can take it with you at no additional cost.
            </p>

            <Separator className="my-6" />

            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Monthly Subscription Refunds
            </h3>

            <div className="bg-muted/30 p-6 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">First 24 hours:</h4>
              <p className="text-sm text-muted-foreground mb-4">
                If you request a refund within the24 hours of the free sample period:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Full refund of no questions asked</li>
                <li>Sample must be delivered within 48 hours</li>
                <li>Refund processed within 3-5 business days</li>
              </ul>
            </div>

            <h4 className="font-semibold text-foreground mb-2">After 3 months:</h4>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Refund processed within 3-5 business days</li>
              <li>After 3 months, no refunds are available</li>
            </ul>

            <h4 className="font-semibold text-foreground mb-2 mt-4">No Refunds After:</h4>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>After the 3-month period ends</li>
              <li>For cancelled or terminated accounts</li>
              <li>For websites removed from our servers</li>
            </ul>

            <Separator className="my-6" />

            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              No Refunds For Free Samples
            </h3>
            <p className="text-muted-foreground mb-4">
              Free samples are provided at no cost to let you evaluate our services. If you decide not to proceed after viewing your sample, no refunds will be provided.
            </p>

            <Separator className="my-6" />

            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Processing Time
            </h3>
            <p className="text-muted-foreground mb-4">
              Refund requests are typically processed within 5-7 business days. The exact timeline depends on your bank and payment method.
            </p>

            <Separator className="my-6" />

            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <ArrowLeft className="h-5 w-5 text-primary" />
              How to Request a Refund
            </h3>

            <p className="text-muted-foreground mb-4">
              To request a refund, please contact our support team:
            </p>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>Email: contact@valleydaycaresites.com</span>
            </div>

            <Separator className="my-6" />

            <h3 className="font-semibold text-foreground mb-2">Exceptions</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Refunds may be denied if you violate our Terms of Service</li>
              <li>We reserve the right to refuse refunds for cases of suspected fraud</li>
              <li>Technical issues caused by customer actions are not eligible for refund</li>
            </ul>

            <Separator className="my-6" />

            <h3 className="font-semibold text-foreground mb-2">Domain Ownership</h3>
            <p className="text-muted-foreground mb-4">
              After 3 months of continuous subscription, you own your custom domain. If you cancel before 3 months, you may transfer the domain to another registrar at your option. No refund is provided for domain registration fees.
            </p>

            <Separator className="my-6" />

            <h3 className="font-semibold text-foreground mb-2">Contact Support</h3>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>Email: contact@valleydaycaresites.com</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>Phone: (747) 315-8215</span>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/payment">Get Started</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/terms">Terms of Service</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/privacy">Privacy Policy</Link>
          </Button>
        </div>
      </div>

      <Footer />
    </main>
  );
}
