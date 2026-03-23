"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const templates = [
  {
    name: "Playful",
    slug: "playful",
    description: "Bright • Colorful • Cheerful",
    summary:
      "A lively starting point with friendly colors, playful shapes, and a welcoming feel for family-focused programs.",
    image: "/images/hero-playful.png",
  },
  {
    name: "Professional",
    slug: "professional",
    description: "Clean • Modern • Polished",
    summary:
      "A trust-first style with refined spacing, crisp layouts, and a polished look that feels confident and capable.",
    image: "/images/hero-professional.png",
  },
  {
    name: "Cozy",
    slug: "cozy",
    description: "Warm • Home-like • Soft",
    summary:
      "A comforting design direction with gentle tones and inviting visuals that feel personal, calm, and nurturing.",
    image: "/images/hero-cozy.png",
  },
  {
    name: "Modern",
    slug: "modern",
    description: "Sleek • Minimal • Fresh",
    summary:
      "A streamlined option with bold whitespace, clean typography, and a contemporary feel for standout presentation.",
    image: "/images/hero-modern.png",
  },
  {
    name: "Classic",
    slug: "classic",
    description: "Traditional • Established • Timeless",
    summary:
      "A familiar, dependable style built to feel established and reassuring for parents who value tradition.",
    image: "/images/hero-classic.png",
  },
];

export default function TemplatesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-24 lg:pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" className="mb-6 pl-0 text-muted-foreground hover:text-foreground">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to main site
            </Link>
          </Button>

          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-sm border-primary/30 text-primary bg-primary/5">
              Template Gallery
            </Badge>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-foreground mb-4">
              Choose Your Style
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              These templates are starting points for your free sample homepage. Pick the direction that feels
              closest to your daycare, and we&apos;ll tailor it to your brand, program, and location.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.slug} className="overflow-hidden border-border bg-card shadow-premium card-hover">
                <div className="relative aspect-[16/10] bg-muted/30">
                  <Image
                    src={template.image}
                    alt={`${template.name} daycare website template preview`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h2 className="font-display text-2xl font-semibold text-foreground">{template.name}</h2>
                    <Badge variant="secondary">{template.description}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {template.summary}
                  </p>
                  <Button asChild className="w-full gradient-sage text-primary-foreground hover:opacity-90">
                    <Link href={`/templates/${template.slug}.html`} target="_blank" rel="noreferrer">
                      Preview
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl gradient-sage p-8 sm:p-10 text-center shadow-premium-glow">
            <Badge variant="secondary" className="mb-4">
              Free sample included
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-primary-foreground mb-4">
              Like what you see? Request your free sample
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-6 max-w-2xl mx-auto">
              Tell us about your daycare and we&apos;ll turn your favorite style into a tailored homepage mockup.
            </p>
            <Button asChild size="lg" variant="secondary" className="text-base px-8 py-6">
              <Link href="/#contact">
                Request Your Free Sample
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
