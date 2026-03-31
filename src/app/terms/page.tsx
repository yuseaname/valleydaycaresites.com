"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  Shield,
  Clock,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  FileText,
} from "lucide-react";
import Link from "next/link";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: March 24, 2026</p>
        </div>

        <Card className="border-border bg-card">
          <CardContent className="p-6 prose max-w-3xl">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              1. Acceptance of Terms
            </h2>

            <p className="text-muted-foreground mb-4">
              By accessing or using our services, you agree to be bound by these Terms of Service.
            </p>

            <h3 className="font-semibold text-foreground mb-2">1.1 Services</h3>
            <p className="text-muted-foreground mb-4">
              Valley Daycare Sites provides professional website design and hosting services specifically for daycare and childcare businesses. Our services include:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Custom website design and creation</li>
              <li>Website hosting and maintenance</li>
              <li>Domain registration assistance</li>
              <li>Technical support via email</li>
            </ul>

            <h3 className="font-semibold text-foreground mb-2">1.2 Free Sample Offer</h3>
            <p className="text-muted-foreground mb-4">
              We offer a free homepage sample to allow you to evaluate our design before committing. Terms:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Sample delivered within 48 hours</li>
              <li>No obligation to purchase</li>
              <li>No credit card required for the sample</li>
              <li>Your input is appreciated for best results</li>
            </ul>

            <h3 className="font-semibold text-foreground mb-2">1.3 Monthly Hosting</h3>
            <p className="text-muted-foreground mb-4">
              If you decide to proceed with a full website, the subscription includes:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Professional homepage</li>
              <li>Contact/inquiry page</li>
              <li>Custom domain setup (e.g., yourdaycare.com)</li>
              <li>SSL security certificate</li>
              <li>Mobile-responsive design</li>
              <li>Monthly hosting on updates</li>
              <li>Email support</li>
              <li>Cancel anytime</li>
            </ul>

            <Separator className="my-6" />

            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              2. Payment Terms
            </h2>

            <h3 className="font-semibold text-foreground mb-2">2.1 Subscription Billing</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Monthly subscription: $50/month</li>
              <li>Billed monthly on the date you sign up</li>
              <li>Automatic renewal unless cancelled</li>
            </ul>

            <h3 className="font-semibold text-foreground mb-2">2.2 Payment Methods</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>We accept major credit cards (Visa, MasterCard, American Express)</li>
              <li>Payments processed securely through our payment provider</li>
              <li>You will receive a receipt via email</li>
            </ul>

            <h3 className="font-semibold text-foreground mb-2">2.3 Taxes</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Prices do not include sales tax where applicable</li>
              <li>Tax is calculated based on your billing address</li>
              <li>You are responsible for any applicable taxes</li>
            </ul>

            <Separator className="my-6" />

            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              3. Intellectual Property
            </h2>

            <h3 className="font-semibold text-foreground mb-2">3.1 Website Content</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Content created specifically for your website belongs to you</li>
              <li>We retain ownership of any stock photography used</li>
              <li>You may not use our work without permission</li>
            </ul>

            <h3 className="font-semibold text-foreground mb-2">3.2 Custom Domain</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>If you provide a custom domain, you retain ownership</li>
              <li>Domain registration fees are your responsibility</li>
              <li>Domain must be renewed annually to maintain ownership</li>
            </ul>

            <Separator className="my-6" />

            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              4. Limitation of Liability
            </h2>

            <h3 className="font-semibold text-foreground mb-2">4.1 Service Availability</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>We strive for 99.9% uptime but but However, we do not guarantee uninterrupted service</li>
              <li>Scheduled maintenance may occur occasionally</li>
              <li>We will notify you of advance of scheduled maintenance</li>
            </ul>

            <h3 className="font-semibold text-foreground mb-2">4.2 Limitation of Damages</h3>
            <p className="text-muted-foreground mb-4">
              In no event shall Valley Daycare Sites, its directors, employees, or affiliates be liable for any direct, indirect, incidental, special, exemplary, or consequential damages arising out of or in connection with our services.
            </p>

            <h3 className="font-semibold text-foreground mb-2">4.3 Maximum Liability</h3>
            <p className="text-muted-foreground mb-4">
              Our total liability for any claim arising from these terms shall not exceed the amount paid by you for the services giving rise to the claim.
            </p>

            <Separator className="my-6" />

            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              5. Termination and Cancellation
            </h2>

            <h3 className="font-semibold text-foreground mb-2">5.1 Cancellation Policy</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>You may cancel your subscription at any time</li>
              <li>Cancellation takes effect at the end of the current billing period</li>
              <li>No refunds are provided for partial months</li>
              <li>After 3 months, you own your domain and may transfer it</li>
            </ul>

            <h3 className="font-semibold text-foreground mb-2">5.2 Termination by Us</h3>
            <p className="text-muted-foreground mb-4">
              We reserve the right to suspend or terminate your account if you violate these Terms of Service or for any other reason at our discretion.
            </p>

            <Separator className="my-6" />

            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              6. Governing Law
            </h2>

            <p className="text-muted-foreground mb-4">
              These Terms of Service shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
            </p>

            <Separator className="my-6" />

            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              7. Changes to Terms
            </h2>

            <p className="text-muted-foreground mb-4">
              We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new Terms of Service on this page. Your continued use of our services after any changes constitutes acceptance of the new terms.
            </p>

            <Separator className="my-6" />

            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              8. Contact Information
            </h2>

            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Mail className="h-4 w-4" />
              <span>Email: contact@valleydaycaresites.com</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>Phone: (747) 315-8215</span>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/payment">Get Started</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/privacy">Privacy Policy</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/refund">Refund Policy</Link>
          </Button>
        </div>
      </div>

      <Footer />
    </main>
  );
}
