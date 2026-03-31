"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Shield, Star } from "lucide-react";
import Link from "next/link";

export default function TestimonialsPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">Testimonials Policy</h1>
          <p className="text-muted-foreground">Last updated: March 31, 2026</p>
        </div>

        <Card className="border-border bg-card">
          <CardContent className="p-6 prose max-w-3xl">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              Our Commitment to Honest Representation
            </h2>

            <p className="text-muted-foreground mb-4">
              Valley Daycare Sites is committed to using only real, genuine testimonials from actual customers. All testimonials displayed on our website represent the real experiences and opinions of real people. We will never use testimonials that could not be verified as a real customer endorsement. If we become aware that a testimonial is unverified or cannot be verified, we will promptly remove it and replace it with a compliant alternative.
            </p>

            <h3 className="font-semibold text-foreground mb-2">What We Display</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Only real, verified testimonials from actual customers will be used, with their name and permission</li>
              <li>Any illustrative or example content is clearly labeled as such</li>
              <li>Demo website content shown in the portfolio section is for demonstration purposes only. Names and daycare businesses may be changed</li>
              <li>Any income, enrollment, or business results claims are illustrative and not representative of actual results</li>
              <li>Demo sites displayed on our website are not real daycare businesses. They are purely examples of what your website could look like</li>
              <li>Any content suggesting guaranteed results, including increased enrollment, revenue, or business outcomes, will be removed</li>
              <li>Any testimonials referencing a guaranteed number of inquiries, sign-ups, or other inflated results claims will be removed or replaced with safe language</li>
              <li>All screenshots of review sites on this website have been staged (meaning they are not from a real third-party review site)</li>
              <li>Stock photos and placeholder images may be used in demo site examples</li>
              <li>Testimonials may include placeholder names or text that do not represent a real person</li>
              <li>All video testimonials, stock footage, or placeholder images may be used and are not representative of real reviews</li>
              <li>The names and contact information of business partners, including staff, must be verified to confirm they are real and consenting to the content</li>
              <li>Written consent for collection or processing of personal data is required</li>
            </ul>

            <h3 className="font-semibold text-foreground mb-2">
              Enforcement
            </h3>

            <p className="text-muted-foreground mb-4">
              If you have any questions about this policy, please contact us at:
            </p>

            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              Changes to This Policy
            </h2>
            <p className="text-muted-foreground mb-4">
              We may update this policy from time to time. Changes will be posted on this page and by updating the &ldquo;Last updated&rdquo; date. Your continued use of our website constitutes acceptance of the updated policy.
            </p>

            <h3 className="font-semibold text-foreground mb-2">
              Contact Us about testimonials
            </h3>

            <div className="flex flex-col gap-2 text-muted-foreground mb-2">
              <span>Email: contact@valleydaycaresites.com</span>
              <span>Phone: (747) 315-8215</span>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/privacy">Privacy Policy</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/terms">Terms of Service</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/disclaimer">Disclaimer</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/earnings-disclaimer">Earnings Disclaimer</Link>
          </Button>
        </div>
      </div>

      <Footer />
    </main>
  );
}
