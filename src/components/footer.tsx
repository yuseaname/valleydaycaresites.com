"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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
  support: [
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
    { name: "Pricing", href: "#pricing" },
  ],
};

const socialLinks = [
  { name: "Facebook", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "LinkedIn", href: "#" },
];

export function Footer() {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg gradient-sage flex items-center justify-center">
                  <span className="text-primary-foreground font-display font-bold text-lg">V</span>
                </div>
                <div>
                  <span className="font-display font-semibold text-lg text-foreground">
                    Valley
                  </span>
                  <span className="font-display font-light text-lg text-muted-foreground ml-1">
                    Daycare Sites
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-6">
                Simple, professional websites for daycare providers. See your homepage before you pay.
              </p>
              <Button
                asChild
                className="gradient-sage text-primary-foreground hover:opacity-90 shadow-premium-glow"
              >
                <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}>
                  Get Your Free Sample
                </a>
              </Button>
            </div>

            {/* Links Columns */}
            <div>
              <h3 className="font-display font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
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
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display font-semibold text-foreground mb-4">Services</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
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
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
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
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Valley Daycare Sites. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
