"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Eye, Database, Cookie, Globe, Bell, UserCheck } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: March 24, 2026</p>
        </div>

        <Card className="border-border bg-card">
          <CardContent className="p-6 prose max-w-3xl">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              Your Privacy Matters
            </h2>

            <p className="text-muted-foreground mb-4">
              At Valley Daycare Sites, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
            </p>

            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Information We Collect
            </h3>
            <p className="text-muted-foreground mb-4">
              When you use our services, we may collect:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-muted-foreground" />
                <span><strong>Personal Information:</strong> Name, email, phone number, business name</span>
              </li>
              <li className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-muted-foreground" />
                <span><strong>Business Information:</strong> Daycare name address, location, current website</span>
              </li>
              <li className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-muted-foreground" />
                <span><strong>Payment Information:</strong> Credit card details (processed securely, never stored)</span>
              </li>
              <li className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-muted-foreground" />
                <span><strong>Technical Data:</strong> Browser type, IP address, device information</span>
              </li>
            </ul>

            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              How We Use Your Information
            </h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>To create and maintain your website</li>
              <li>To process payments and manage subscriptions</li>
              <li>To communicate with you about your services</li>
              <li>To improve our services and user experience</li>
              <li>To send occasional promotional emails (with your consent)</li>
            </ul>

            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Data Security
            </h3>
            <p className="text-muted-foreground mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>SSL/TLS encryption for all data transmissions</li>
              <li>Secure payment processing through our payment provider</li>
              <li>Regular security assessments and updates</li>
              <li>Access restricted to authorized personnel only</li>
            </ul>

            <Separator className="my-6" />

            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Cookie className="h-5 w-5 text-primary" />
              Cookies and Tracking
            </h3>
            <p className="text-muted-foreground mb-4">
              We use cookies and similar tracking technologies to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Remember your preferences and settings</li>
              <li>Understand how you use our website</li>
              <li>Improve our services based on usage patterns</li>
              <li>Ensure secure login and authentication</li>
            </ul>

            <Separator className="my-6" />

            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              Information Sharing
            </h3>
            <p className="text-muted-foreground mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties except:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Payment processors (to complete transactions)</li>
              <li>Domain registrars (to set up your custom domain)</li>
              <li>Hosting providers (to deliver your website)</li>
              <li>Legal authorities (when required by law)</li>
            </ul>

            <Separator className="my-6" />

            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Data Retention
            </h3>
            <p className="text-muted-foreground mb-4">
              We retain your personal information for as long as necessary to provide our services and comply with legal obligations. You can request deletion of your data at any time.
            </p>

            <Separator className="my-6" />

            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Your Rights
            </h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Access: Request a copy of your personal data</li>
              <li>Correction: Request correction of inaccurate data</li>
              <li>Deletion: Request deletion of your data</li>
              <li>Portability: Request transfer of your data</li>
              <li>Objection: Object to processing of your data</li>
            </ul>

            <Separator className="my-6" />

            <h3 className="font-semibold text-foreground mb-2">Contact Us About Privacy</h3>
            <p className="text-muted-foreground mb-4">
              If you have questions about this Privacy Policy or wish to exercise your rights, contact us at:
            </p>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>Email: hello@valleydaycaresites.com</span>
            </div>

            <Separator className="my-6" />

            <h3 className="font-semibold text-foreground mb-2">Changes to This Policy</h3>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
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
            <Link href="/refund">Refund Policy</Link>
          </Button>
        </div>
      </div>

      <Footer />
    </main>
  );
}
