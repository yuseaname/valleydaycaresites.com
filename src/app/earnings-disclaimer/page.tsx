"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function EarningsDisclaimerPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">Earnings &amp; Results Disclaimer</h1>
          <p className="text-muted-foreground">Last updated: March 31, 2026</p>
        </div>

        <Card className="border-border bg-card">
          <CardContent className="p-6 prose max-w-3xl">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              No Guaranteed Results
            </h2>

            <p className="text-muted-foreground mb-4">
              Valley Daycare Sites provides website design and hosting services. We do not guarantee any specific results, including but not limited to:
            </p>

            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Increased enrollment numbers</li>
              <li>Increased revenue or business growth</li>
              <li>Higher search engine rankings</li>
              <li>Specific number of website visitors or inquiries</li>
              <li>Any particular business outcome</li>
            </ul>

            <Separator className="my-6" />

            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Results Depend on Multiple Factors
            </h3>
            <p className="text-muted-foreground mb-4">
              The success of any daycare business depends on many factors outside of our control, including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Your local market and competition</li>
              <li>Your existing reputation and community presence</li>
              <li>Your marketing efforts beyond your website</li>
              <li>The quality of your daycare program</li>
              <li>Seasonal and economic conditions</li>
              <li>Parent demand in your area</li>
            </ul>

            <Separator className="my-6" />

            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              No "Get Rich Quick" Promise
            </h3>
            <p className="text-muted-foreground mb-4">
              Our service is a professional website design and hosting subscription. We do not offer business coaching, marketing consulting, or guaranteed income strategies. The $50/month fee covers website design, hosting, and technical support only.
            </p>

            <Separator className="my-6" />

            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Demo Websites Are Examples Only
            </h3>
            <p className="text-muted-foreground mb-4">
              The demo websites displayed in our portfolio section are example layouts created to show what a daycare website could look like. They are not real client websites and the results described (such as &quot;47% increase in inquiries&quot;) are fictional and used for illustrative purposes only.
            </p>

            <Separator className="my-6" />

            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Your Responsibility
            </h3>
            <p className="text-muted-foreground mb-4">
              You are responsible for your own business decisions. We encourage you to do your own research and consult with business advisors before making any decisions based on having a website. A website is one tool in your overall business strategy, not a guarantee of success.
            </p>

            <Separator className="my-6" />

            <h3 className="font-semibold text-foreground mb-2">Contact Us</h3>
            <p className="text-muted-foreground mb-4">
              If you have questions about this disclaimer, please contact us at:
            </p>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>Email: contact@valleydaycaresites.com</span>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/disclaimer">Disclaimer</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/privacy">Privacy Policy</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/terms">Terms of Service</Link>
          </Button>
        </div>
      </div>

      <Footer />
    </main>
  );
}
