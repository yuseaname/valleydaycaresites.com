"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Shield } from "lucide-react";

import { cn } from "@/lib/utils";

const footerLinks = {
  company: [
    { name: "About Us", href: "#about" },
    { name: "Our Process", href: "#process" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Blog", href: "#blog" },
  ],
  services: [
    { name: "Custom Website Design", href: "#services" },
    { name: "Website Redesign", href: "#services" },
    { name: "Mobile Optimization", href: "#services" },
    { name: "Local SEO", href: "#services" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Refund Policy", href: "/refund" },
    { name: "Disclaimer", href: "/disclaimer" },
    { name: "Earnings Disclaimer", href: "/earnings-disclaimer" },
    { name: "Testimonials Policy", href: "/testimonials-policy" },
  ],
  support: [
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
    { name: "Pricing", href: "#pricing" },
  ],
};

export function Footer() {
  const pathname = usePathname();

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      if (pathname === "/") {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        window.location.href = "/" + href;
      }
    }
  };

  return (
    <footer className="bg-foreground/5 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg gradient-sage flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">V</span>
              </div>
              <div>
                <span className="font-display font-semibold text-lg text-foreground">Valley</span>
                <span className="font-display font-light text-lg text-muted-foreground ml-1">Daycare Sites</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm mb-6">
              Professional website design and hosting for daycare centers. Simple, affordable, and built to help parents find you.
            </p>
            <Button
              asChild
              className="gradient-sage text-primary-foreground hover:opacity-90 transition-opacity shadow-premium"
            >
              <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}>
                Get Your Free Sample
              </a>
            </Button>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith("#") ? (
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith("#") ? (
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>&copy; {new Date().getFullYear()} Valley Daycare Sites. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/refund" className="hover:text-foreground transition-colors">Refund</Link>
            <Link href="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</Link>
            <Link href="/earnings-disclaimer" className="hover:text-foreground transition-colors">Earnings Disclaimer</Link>
            <Link href="/testimonials-policy" className="hover:text-foreground transition-colors">Testimonials Policy</Link>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <p className="mt-6 text-xs text-muted-foreground/70 text-center max-w-3xl mx-auto">
          Valley Daycare Sites provides website design and hosting services. Demo sites and example content shown on this website are for illustrative purposes only and do not represent actual client results. We do not guarantee specific business outcomes. See our{" "}
          <Link href="/disclaimer" className="underline hover:text-muted-foreground">Disclaimer</Link> and{" "}
          <Link href="/earnings-disclaimer" className="underline hover:text-muted-foreground">Earnings Disclaimer</Link> for details.
        </p>
      </div>
    </footer>
  );
}
