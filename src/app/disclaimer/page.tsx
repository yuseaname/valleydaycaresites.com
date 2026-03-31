"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Globe, FileText, Users, Shield } from "lucide-react";
import Link from "next/link";

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">Disclaimer</h1>
          <p className="text-muted-foreground">Last updated: March 31, 2026</p>
        </div>

        <Card className="border-border bg-card">
          <CardContent className="p-6 prose max-w-3xl">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              General Disclaimer
            </h2>

            <p className="text-muted-foreground mb-4">
              The information provided on Valley Daycare Sites (valleydaycaresites.com) is for general informational purposes only. While we strive to keep information accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information, products, services, or related graphics contained on this website.
            </p>

            <Separator className="my-6" />

            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              No Guarantee of Results
            </h3>
            <p className="text-muted-foreground mb-4">
              Valley Daycare Sites does not guarantee any specific results from using our services. We do not promise or imply that our website design services will:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Increase enrollment numbers or inquiries</li>
              <li>Generate specific amounts of revenue or business growth</li>
              <li>Improve search engine rankings to any particular position</li>
              <li>Result in any specific number of parent contacts or tour requests</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Results depend on many factors outside our control, including your local market, competition, business practices, and the quality of your childcare services.
            </p>

            <Separator className="my-6" />

            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Demo Websites
            </h3>
            <p className="text-muted-foreground mb-4">
              The demo websites displayed in our portfolio section are example layouts created for demonstration purposes only. These are not actual client websites unless explicitly stated. The daycare names, testimonials, reviews, statistics, and other content shown on demo pages are fictional and used solely to illustrate what a website could look like.
            </p>

            <Separator className="my-6" />

            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Content on Demo Sites
            </h3>
            <p className="text-muted-foreground mb-4">
              Any testimonials, reviews, ratings, or success metrics displayed on our demo sites are example content only. They do not represent real customers or actual results. We do not fabricate endorsements or misrepresent our services.
            </p>

            <Separator className="my-6" />

            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Not Affiliated
            </h3>
            <p className="text-muted-foreground mb-4">
              Valley Daycare Sites is a website design service. We are not affiliated with any specific daycare center, childcare provider, or early childhood education organization unless explicitly stated in writing.
            </p>

            <Separator className="my-6" />

            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Limitation of Liability
            </h3>
            <p className="text-muted-foreground mb-4">
              In no event shall Valley Daycare Sites be liable for any loss or damage including, without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website or our services.
            </p>

            <Separator className="my-6" />

            <h3 className="font-semibold text-foreground mb-2">External Links</h3>
            <p className="text-muted-foreground mb-4">
              This website may contain links to external websites. We have no control over the content and nature of these sites and are not responsible for their content or privacy practices.
            </p>

            <Separator className="my-6" />

            <h3 className="font-semibold text-foreground mb-2">Contact</h3>
            <p className="text-muted-foreground mb-4">
              If you have questions about this disclaimer, please contact us at:
            </p>
            <p className="text-muted-foreground">
              Email: contact@valleydaycaresites.com<br />
              Phone: (747) 315-8215
            </p>
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
            <Link href="/refund">Refund Policy</Link>
          </Button>
        </div>
      </div>

      <Footer />
    </main>
  );
}
