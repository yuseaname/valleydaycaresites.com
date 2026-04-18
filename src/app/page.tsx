"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  CheckCircle,
  Clock,
  Globe,
  Heart,
  Laptop,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Rocket,
  Shield,
  Smartphone,
  Star,
  Target,
  Users,
  Zap,
  Eye,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MousePointerClick,
  X,
} from "lucide-react";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";

/* ─── Animated Counter Hook ─── */
function useCountUp(end: number, duration: number = 2000, suffix: string = "") {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return { count, ref, display: `${count}${suffix}` };
}

/* ─── Scroll Reveal Hook ─── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-30px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isRevealed };
}

/* ─── Animated Number Stat Card ─── */
function NumberStatCard({ value, suffix, prefix, label, icon: Icon, description }: {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}) {
  const { count, ref } = useCountUp(value, 2000);
  return (
    <Card className="border-border bg-card card-hover text-center">
      <CardContent className="p-6">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Icon className="h-7 w-7 text-primary" />
        </div>
        <div ref={ref} className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-1">
          {prefix || ""}{count}<span className="text-primary">{suffix}</span>
        </div>
        <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

/* ─── FAQ Items (single source of truth) ─── */
const FAQ_ITEMS = [
  { question: "Is the sample really free?", answer: "Yes. We build a homepage for you at no cost. You only pay if you decide to keep it." },
  { question: "How long does the sample take?", answer: "We aim to have your sample ready within 48 hours of receiving your request." },
  { question: "What's included in the $50/month?", answer: "Your homepage, a contact page with inquiry form, your custom domain (e.g., yourdaycare.com), hosting, SSL security, mobile-friendly design, and support when you need it." },
  { question: "Can I cancel?", answer: "Yes, anytime. No contracts or penalties. After 3 months, you own your domain and can take it with you." },
  { question: "Will my site work on phones?", answer: "Yes. All our sites are mobile-friendly, so parents can view your site easily from any device." },
  { question: "How do payments work?", answer: "We use secure payment processing. Once you decide to keep your site, $50/month covers everything. No hidden fees, no setup charges." },
];

/* ─── Stat Item Component ─── */
function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref, display } = useCountUp(value, 2000, suffix);
  return (
    <div ref={ref} className="text-center p-6 rounded-xl bg-card border border-border card-hover">
      <div className="font-display text-3xl sm:text-4xl font-semibold text-primary mb-2">{display}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export default function Home() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    daycare: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Interactive preview state
  const [previewName, setPreviewName] = useState("");

  // Sticky CTA state
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [stickyCtaDismissed, setStickyCtaDismissed] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);

  // Before/After slider state
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const comparisonRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          daycare: formData.daycare,
          email: formData.email,
          phone: formData.phone || undefined,
          location: formData.location,
          type: undefined,
          "current-site": formData.website || undefined,
          message: formData.message || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          daycare: "",
          email: "",
          phone: "",
          location: "",
          website: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sticky CTA scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCta(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Before/After slider handlers
  const handleSliderMove = useCallback((clientX: number) => {
    if (!comparisonRef.current || !isDragging) return;
    const rect = comparisonRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, [isDragging]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleSliderMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => handleSliderMove(e.touches[0].clientX);
    const handleUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("mouseup", handleUp);
      window.addEventListener("touchend", handleUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
    };
  }, [isDragging, handleSliderMove]);

  const displayName = previewName.trim() || "YOUR DAYCARE";



  return (
    <main className="min-h-screen">
      {/* Structured Data - Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Valley Daycare Sites",
            url: "https://valleydaycaresites.com",
            logo: "https://valleydaycaresites.com/logo.svg",
            description: "Professional website design and management for daycare and childcare businesses. Free sample homepage, $50/month.",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+1-747-315-8215",
              contactType: "customer service",
              email: "contact@valleydaycaresites.com",
            },
            sameAs: [],
          }),
        }}
      />
      {/* Structured Data - FAQ (derived from FAQ_ITEMS) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_ITEMS.map(item => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />
      <Header />

      {/* ─── Hero Section ─── */}
      <section id="home" className="relative pt-28 lg:pt-36 pb-20 lg:pb-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 gradient-hero opacity-60" />
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-forest-light/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-gold/5 to-transparent rounded-full blur-3xl" />
        {/* Subtle dot pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #1B4332 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/5 border border-primary/15">
                <Sparkles className="h-4 w-4 text-gold" />
                <span className="text-sm font-medium text-primary">Free sample &bull; 48-hour setup &bull; No upfront cost</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold text-foreground leading-[1.1] mb-6">
                Your Daycare Deserves a Website That{" "}
                <span className="text-gradient-forest">Brings Parents to Your Door</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                See your custom homepage before you pay a cent. Beautiful, mobile-friendly, and built to fill your enrollment spots.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button size="lg" asChild className="gradient-forest text-primary-foreground hover:opacity-90 shadow-premium-glow text-base px-8 py-6 animate-pulse-cta btn-premium">
                  <a href="#contact">
                    Get Your Free Sample
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base px-8 py-6 border-primary/30 text-primary hover:bg-primary/5">
                  <a href="#process">See How It Works</a>
                </Button>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>No upfront cost</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>No pressure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>No contracts</span>
                </div>
              </div>
            </div>

            {/* Hero Mockup */}
            <div className="relative">
              <div className="relative rounded-2xl shadow-premium-lg overflow-hidden bg-card border border-border">
                {/* Browser Chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-foreground/[0.03] border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-4 py-1 rounded-md bg-background text-xs text-muted-foreground font-mono">
                      yourdaycare.com
                    </div>
                  </div>
                </div>

                {/* Website Preview */}
                <div className="aspect-[4/3] bg-gradient-to-br from-background to-muted/30 p-6 flex items-center justify-center relative overflow-hidden">
                  <Image
                    src="/images/hero-mockup.png"
                    alt="Professional daycare website mockup on laptop and tablet screens, featuring warm colors and a Schedule a Tour call-to-action"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-card rounded-xl shadow-premium p-4 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center">
                    <Check className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Free to preview</p>
                    <p className="text-xs text-muted-foreground mt-0.5">No pressure, no contracts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trust Logos ─── */}
      <section className="py-10 border-y border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground mb-6">
            Built for home daycares, preschools, and childcare centers
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 opacity-50">
            {["Home Daycares", "Montessori Schools", "Preschools", "Learning Centers", "Family Childcare"].map((name, i) => (
              <div key={i} className="font-display text-lg text-muted-foreground">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Interactive Preview: See Your Site in 30 Seconds ─── */}
      <section id="preview" className="py-20 lg:py-28 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20">
              <Eye className="h-4 w-4 text-gold-dark" />
              <span className="text-sm font-medium text-gold-dark">Try It Now</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              See Your Site in 30 Seconds
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Type your daycare name below and watch your future website come to life. This is just a preview — the real thing will be even better.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Input */}
            <div className="relative mb-8">
              <Input
                type="text"
                placeholder="Enter your daycare name..."
                value={previewName}
                onChange={(e) => setPreviewName(e.target.value)}
                className="w-full text-center text-lg py-6 px-6 border-2 border-primary/20 focus:border-primary/50 rounded-xl bg-card shadow-premium placeholder:text-muted-foreground/60"
              />
              <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gold/60" />
            </div>

            {/* Live Preview Card */}
            <div className="rounded-2xl shadow-premium-lg overflow-hidden border-2 border-primary/10 bg-card transition-all duration-300">
              {/* Mini browser bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-foreground/[0.03] border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-3 py-0.5 rounded bg-background text-[11px] text-muted-foreground font-mono">
                    {displayName.toLowerCase().replace(/\s+/g, "")}.com
                  </div>
                </div>
              </div>

              {/* Preview content */}
              <div className="relative">
                {/* Hero area */}
                <div className="bg-gradient-to-br from-forest via-forest-light to-forest-mid px-6 py-8 text-center text-white">
                  <p className="text-xs uppercase tracking-widest text-white/60 mb-2">Welcome to</p>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3 transition-all duration-300">
                    {displayName}
                  </h3>
                  <p className="text-sm text-white/80 max-w-xs mx-auto mb-4">Nurturing young minds in a safe, loving environment</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-forest text-sm font-semibold">
                    <MousePointerClick className="h-4 w-4" />
                    Schedule a Tour
                  </div>
                </div>

                {/* Mini sections */}
                <div className="px-6 py-4 border-b border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                      <Heart className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="h-2.5 w-24 bg-foreground/10 rounded" />
                      <div className="h-2 w-36 bg-foreground/5 rounded mt-1.5" />
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 border-b border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-gold/10 flex items-center justify-center">
                      <Star className="h-4 w-4 text-gold-dark" />
                    </div>
                    <div>
                      <div className="h-2.5 w-20 bg-foreground/10 rounded" />
                      <div className="h-2 w-32 bg-foreground/5 rounded mt-1.5" />
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="h-2.5 w-28 bg-foreground/10 rounded" />
                      <div className="h-2 w-16 bg-foreground/5 rounded mt-1.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-4">
              This is a simplified preview. <a href="#contact" className="text-primary underline hover:text-primary/80">Get your full free sample &rarr;</a>
            </p>
          </div>
        </div>
      </section>

      {/* ─── Problem/Solution Section ─── */}
      <section className="py-16 lg:py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Problem */}
            <div>
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-destructive/5 border border-destructive/15">
                <span className="text-sm font-medium text-destructive">The Problem</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Your Website Is Losing You Enrollments
              </h2>
              <div className="space-y-3">
                {[
                  "Parents judge your daycare in seconds based on your website",
                  "Outdated designs make you look unprofessional",
                  "Cluttered layouts confuse and overwhelm visitors",
                  "Generic templates don't capture your unique value",
                  "No clear path for parents to take action",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-lg bg-background/80">
                    <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-destructive">{i + 1}</span>
                    </div>
                    <p className="text-foreground text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solution */}
            <div className="bg-card rounded-2xl border border-border p-8 shadow-premium">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/15">
                <span className="text-sm font-medium text-primary">The Solution</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
                A Website That Works for Your Daycare
              </h2>
              <div className="space-y-3">
                {[
                  { icon: Shield, text: "Professional design that builds instant trust" },
                  { icon: Target, text: "Clear messaging that speaks to parents" },
                  { icon: Smartphone, text: "Mobile-first design that works everywhere" },
                  { icon: Zap, text: "Fast, modern, and enrollment-focused" },
                  { icon: Heart, text: "Warm, welcoming aesthetic that matches your values" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-foreground text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Benefits Section ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/15">
              <span className="text-sm font-medium text-primary">Why Choose Us</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Built Specifically for Daycare Businesses
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We understand the unique challenges daycare owners face. That&apos;s why every website we create
              is designed with your specific needs in mind.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Heart, title: "Parent-Focused Design", description: "Every element is designed to help parents feel confident and comfortable choosing your daycare." },
              { icon: Globe, title: "Daycare Specialists", description: "We don't build generic websites. We create sites specifically crafted for childcare businesses." },
              { icon: Clock, title: "No Technical Skills Needed", description: "We handle everything—design, hosting, your domain—so you can focus on running your daycare." },
              { icon: Smartphone, title: "Mobile-First Approach", description: "Parents browse on their phones. Your site will look perfect on every device." },
              { icon: Target, title: "Enrollment-Focused", description: "Clear calls-to-action and intuitive layouts guide parents toward scheduling a tour." },
              { icon: Shield, title: "Trust-Building Elements", description: "Accreditations, professional imagery, and clear messaging that build instant credibility from the first click." },
            ].map((benefit, i) => (
              <Card key={i} className="border-border bg-card card-hover group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Before/After Comparison ─── */}
      <section className="py-16 lg:py-24 bg-muted/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/15">
              <span className="text-sm font-medium text-primary">The Difference</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              See the Transformation
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Drag the slider to compare a typical daycare website with what we build for you.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div
              ref={comparisonRef}
              className="relative rounded-2xl overflow-hidden shadow-premium-lg border border-border cursor-col-resize select-none"
              onMouseDown={(e) => { setIsDragging(true); handleSliderMove(e.clientX); }}
              onTouchStart={(e) => { setIsDragging(true); handleSliderMove(e.touches[0].clientX); }}
            >
              {/* "Before" side (full width background) */}
              <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 relative">
                {/* Before content - ugly/generic site */}
                <div className="absolute inset-0 p-6 sm:p-10 flex flex-col items-center justify-center text-center">
                  <div className="w-full max-w-md">
                    <div className="h-4 w-32 bg-gray-400/50 rounded mx-auto mb-2" />
                    <div className="h-8 w-56 bg-gray-400/40 rounded mx-auto mb-4" />
                    <div className="h-2 w-full bg-gray-300/60 rounded mb-2" />
                    <div className="h-2 w-4/5 bg-gray-300/60 rounded mx-auto mb-2" />
                    <div className="h-2 w-3/5 bg-gray-300/60 rounded mx-auto mb-6" />
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      <div className="aspect-square bg-gray-300/40 rounded" />
                      <div className="aspect-square bg-gray-300/40 rounded" />
                      <div className="aspect-square bg-gray-300/40 rounded" />
                    </div>
                    <div className="h-8 w-32 bg-gray-400/30 rounded mx-auto" />
                  </div>
                </div>

                {/* "BEFORE" label */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 text-white text-xs font-semibold rounded-full">
                  TYPICAL SITE
                </div>

                {/* "After" side (clipped overlay) */}
                <div
                  className="absolute inset-0"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-forest via-forest-light to-forest-mid" />
                  <div className="absolute inset-0 p-6 sm:p-10 flex flex-col items-center justify-center text-center text-white">
                    <div className="w-full max-w-md">
                      <p className="text-xs uppercase tracking-widest text-white/60 mb-2">Welcome to</p>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold mb-2">Your Daycare Name</h3>
                      <p className="text-sm text-white/80 mb-4">Nurturing young minds in a safe, loving environment</p>
                      <div className="flex items-center justify-center gap-3 mb-4">
                        {[
                          { icon: Heart, label: "Programs" },
                          { icon: Star, label: "Testimonials" },
                          { icon: Shield, label: "Safety" },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/15 rounded-full text-xs">
                            <item.icon className="h-3 w-3" />
                            {item.label}
                          </div>
                        ))}
                      </div>
                      <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-lg text-forest text-sm font-semibold">
                        Schedule a Tour
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                    YOUR NEW SITE
                  </div>
                </div>

                {/* Slider handle */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white z-20 shadow-lg"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <ChevronLeft className="h-4 w-4 text-foreground" />
                    <ChevronRight className="h-4 w-4 text-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── About Section ─── */}
      <section id="about" className="py-16 lg:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/15">
                <span className="text-sm font-medium text-primary">About Us</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
                We Help Daycare Owners Look Professional Online
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Valley Daycare Sites exists to give small childcare providers a simple way to get online.
                  We build you a sample homepage first—free—so you can see what you&apos;re getting before you pay anything.
                </p>
                <p>
                  Most daycare owners don&apos;t have time to learn web design, and they shouldn&apos;t have to.
                  But they also shouldn&apos;t have to pay hundreds of dollars upfront for something they haven&apos;t even seen.
                </p>
                <p>
                  That&apos;s why we build free samples. You get to see what your homepage could look like,
                  think it over, and decide on your own timeline. If it&apos;s not right for you, you walk away
                  without paying a cent.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="text-center p-5 rounded-xl bg-muted/30 border border-border">
                  <div className="font-display text-3xl font-bold text-foreground">Free</div>
                  <div className="text-sm text-muted-foreground mt-1">Sample Homepage</div>
                </div>
                <div className="text-center p-5 rounded-xl bg-muted/30 border border-border">
                  <div className="font-display text-3xl font-bold text-foreground">$50</div>
                  <div className="text-sm text-muted-foreground mt-1">Per Month If You Keep It</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-muted/30 border border-border overflow-hidden shadow-premium">
                <Image
                  src="/images/about-workspace.png"
                  alt="Web design workspace with monitor showing Little Stars Daycare website mockup, color swatches, wireframes, and design materials"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Animated Stats ─── */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatItem value={48} suffix="hr" label="Sample Turnaround" />
            <StatItem value={100} suffix="%" label="Free to Preview" />
            <div className="text-center p-6 rounded-xl bg-card border border-border card-hover">
              <div className="font-display text-3xl sm:text-4xl font-semibold text-primary mb-2">$50<span className="text-lg">/mo</span></div>
              <div className="text-sm text-muted-foreground">Everything Included</div>
            </div>
            <StatItem value={0} suffix="" label="Upfront Cost" />
          </div>
        </div>
      </section>

      {/* ─── Services Section ─── */}
      <section id="services" className="py-16 lg:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/15">
              <span className="text-sm font-medium text-primary">Our Services</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything Your Daycare Needs Online
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From complete website design to ongoing support, we offer comprehensive services
              tailored specifically for daycare and childcare businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Globe, title: "Custom Daycare Website Design", description: "A complete website built specifically for your daycare — highlighting your programs, hours, philosophy, and everything parents need to trust you with their children.", features: ["Custom design", "Mobile responsive", "SEO optimized", "Fast loading"] },
              { icon: Laptop, title: "Website Refresh & Redesign", description: "Already have a site that feels outdated? We'll modernize your design, improve the content, and make it work better for attracting new families.", features: ["Design update", "Content migration", "Improved UX", "Modern aesthetics"] },
              { icon: Smartphone, title: "Mobile Optimization", description: "Over 70% of parents search for daycare on their phones. Your site will look and work perfectly on every screen size.", features: ["Responsive design", "Touch-friendly", "Fast mobile load", "Easy navigation"] },
              { icon: MessageSquare, title: "Inquiry Form Setup", description: "Turn visitors into inquiries. Our forms are designed to capture the information you need — tour requests, waitlist signups, and general questions — delivered straight to your email.", features: ["Contact forms", "Tour scheduling", "Waitlist signup", "Email notifications"] },
              { icon: Target, title: "Parent Trust Copy Structure", description: "We write copy that addresses parents' biggest concerns head-on: safety, qualifications, daily routines, and the experience their child will have.", features: ["Clear messaging", "Trust elements", "Value proposition", "Call-to-actions"] },
              { icon: Zap, title: "Local SEO Foundations", description: "We optimize your site so local parents actually find you when searching 'daycare near me' or 'childcare in [your city].'", features: ["Google optimization", "Local keywords", "Schema markup", "Directory setup"] },
            ].map((service, i) => (
              <Card key={i} className="border-border bg-card card-hover group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, j) => (
                          <Badge key={j} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Process Section ─── */}
      <section id="process" className="py-16 lg:py-24 bg-muted/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/15">
              <span className="text-sm font-medium text-primary">How It Works</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Simple Process, No Surprises
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We build you a sample homepage first. You look it over, think about it, and decide if you want to keep it.
              No calls, no pressure, just a straightforward process.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Fill Out the Form", description: "Tell us about your daycare—name, location, type, and a few details about what makes your program special. Takes about 5 minutes.", icon: Target },
              { step: "02", title: "We Build Your Sample", description: "Within 48 hours, we create a homepage tailored to your daycare with your name, location, and relevant content.", icon: Zap },
              { step: "03", title: "Review It", description: "We send you a private link. Look at it, show your family, take a few days. Ask for tweaks if you want.", icon: MessageSquare },
              { step: "04", title: "Decide", description: "Want to keep it? $50/month covers everything. Not for you? Walk away, no charge.", icon: Heart },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-card rounded-xl border border-border p-6 h-full card-hover group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl gradient-forest flex items-center justify-center">
                      <span className="text-sm font-bold text-primary-foreground">{item.step}</span>
                    </div>
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing Section ─── */}
      <section id="pricing" className="py-16 lg:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/15">
              <span className="text-sm font-medium text-primary">Simple Pricing</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Free Sample. $50/Month If You Keep It.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We build you a sample homepage at no cost. Look it over, show your family, take your time.
              If you want to keep it live, it&apos;s $50/month. That&apos;s it.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <Card className="border-primary/30 bg-card shadow-premium-glow">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">Everything Included</h3>
                  <div className="flex items-baseline justify-center gap-1 mt-4">
                    <span className="font-display text-5xl font-bold text-foreground">$50</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">No upfront cost &bull; Cancel anytime</p>
                </div>

                <Separator className="mb-6" />

                <ul className="space-y-4 mb-8">
                  {[
                    "Your homepage",
                    "Contact page with inquiry form",
                    "Custom domain (e.g., yourdaycare.com)",
                    "Hosting & SSL security",
                    "Mobile-friendly design",
                    "Help when you need it",
                    "Cancel anytime — no contracts",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-base">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button size="lg" asChild className="w-full gradient-forest text-primary-foreground hover:opacity-90 shadow-premium-glow btn-premium">
                  <a href="#contact">
                    Get Your Free Sample
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  After 3 months, you own your domain and can take it with you.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { q: "Do I pay anything upfront?", a: "No. The sample is completely free." },
              { q: "What if I need more pages?", a: "Most daycares do great with just a homepage and contact page. If you need more, we can add them." },
              { q: "Can I cancel?", a: "Yes, anytime. No contracts or penalties." },
              { q: "What if I don't like the sample?", a: "Just let us know. You can walk away, no charge." },
            ].map((item, i) => (
              <Card key={i} className="border-border bg-card">
                <CardContent className="p-4">
                  <h4 className="font-medium text-foreground text-sm mb-1">{item.q}</h4>
                  <p className="text-xs text-muted-foreground">{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Numbers That Matter Section ─── */}
      <section className="py-16 lg:py-24 bg-muted/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Numbers That Matter</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Built for Speed. Priced for Everyone.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              No hidden fees, no long waits, no tech skills required.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <NumberStatCard value={48} suffix="hrs" label="From request to live preview" icon={Clock} description="We move fast so you can see results quickly." />
            <NumberStatCard value={0} prefix="$" label="Upfront cost to get started" icon={Shield} description="See your site before you pay a single cent." />
            <NumberStatCard value={100} suffix="%" label="Mobile-responsive design" icon={Smartphone} description="Parents browse on phones. Your site works everywhere." />
            <NumberStatCard value={5} suffix="min" label="That's all we need from you" icon={Zap} description="Fill out a simple form and we handle the rest." />
          </div>
        </div>
      </section>

      {/* ─── Portfolio Section ─── */}
      <section id="portfolio" className="py-16 lg:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/15">
              <span className="text-sm font-medium text-primary">Portfolio</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Websites That Make an Impression
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse example website layouts built for different types of daycare businesses.
              These are demo sites — your website would be customized with your own details.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Bright Start Academy", type: "Large Center Demo", result: "Example website layout", image: "/images/demos/bright-start-academy.png", imageAlt: "Bright Start Academy daycare website demo with programs section and warm sage color theme", demoLink: "/demos/bright-start-academy" },
              { name: "Little Hearts Daycare", type: "Family Daycare Demo", result: "Example website layout", image: "/images/demos/little-hearts-daycare.png", imageAlt: "Little Hearts Daycare family daycare website demo with daily schedule section", demoLink: "/demos/little-hearts-daycare" },
              { name: "Sunshine Learning Center", type: "Preschool Demo", result: "Example website layout", image: "/images/demos/sunshine-learning-center.png", imageAlt: "Sunshine Learning Center preschool website demo with amber orange theme and tour booking", demoLink: "/demos/sunshine-learning-center" },
              { name: "Growing Minds Academy", type: "Multi-location Demo", result: "Example website layout", image: "/images/demos/growing-minds-academy.png", imageAlt: "Growing Minds Academy multi-location childcare center website demo with location finder", demoLink: "/demos/growing-minds-academy" },
              { name: "Happy Kids Childcare", type: "Home Daycare Demo", result: "Example website layout", image: "/images/demos/happy-kids-childcare.png", imageAlt: "Happy Kids Childcare home daycare website demo with purple theme and contact form", demoLink: "/demos/happy-kids-childcare" },
              { name: "Tiny Steps Learning", type: "Early Education Demo", result: "Example website layout", image: "/images/demos/tiny-steps-learning.png", imageAlt: "Tiny Steps Learning early education website demo with teal theme", demoLink: "/demos/tiny-steps-learning" },
            ].map((project, i) => (
              <a key={i} href={project.demoLink} className="block">
                <Card className="border-border bg-card overflow-hidden card-hover group">
                  <div className="aspect-[16/10] bg-muted/30 relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                        View Live Demo
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display font-semibold text-foreground">{project.name}</h3>
                      <Badge variant="secondary" className="text-xs">{project.type}</Badge>
                    </div>
                    <p className="text-sm text-primary">{project.result} — <span className="text-muted-foreground text-xs">Demo site</span></p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <a href="#contact">
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── FAQ Section (Trimmed to 6) ─── */}
      <section id="faq" className="py-16 lg:py-24 bg-muted/20 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/15">
              <span className="text-sm font-medium text-primary">FAQ</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              The most common questions about working with us.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-display font-medium text-foreground hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ─── Blog Section ─── */}
      <section id="blog" className="py-16 lg:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/15">
              <span className="text-sm font-medium text-primary">Blog</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Resources for Daycare Owners
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tips, insights, and strategies to help your daycare succeed online.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="border-border bg-card overflow-hidden card-hover group h-full">
                  <div className="aspect-[16/9] bg-muted/30 relative overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="outline" className="text-xs mb-2">{post.category}</Badge>
                    <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact Section ─── */}
      <section id="contact" className="py-16 lg:py-24 bg-muted/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div>
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/15">
                <span className="text-sm font-medium text-primary">Contact Us</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Request Your Free Sample
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Tell us about your daycare, and we&apos;ll build you a sample homepage within 48 hours.
                No pressure, no obligation—just see what&apos;s possible.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-medium text-foreground">contact@valleydaycaresites.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div className="font-medium text-foreground">(747) 315-8215</div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border shadow-premium">
                <h3 className="font-display font-semibold text-foreground mb-3">What happens next?</h3>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    We build your sample homepage
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    Ready within 48 hours
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    Review it with no pressure
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="border-border bg-card shadow-premium">
              <CardContent className="p-6 sm:p-8">
                {submitStatus === "success" ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      Request Submitted!
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Check your email for confirmation. We&apos;ll have your sample homepage ready within 48 hours.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setSubmitStatus("idle")}
                    >
                      Submit Another Request
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {submitStatus === "error" && (
                      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-sm text-destructive">
                        Something went wrong. Please try again or email us directly at contact@valleydaycaresites.com
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name *</Label>
                        <Input id="name" placeholder="Jane Smith" required value={formData.name} onChange={handleInputChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="daycare">Daycare Name *</Label>
                        <Input id="daycare" placeholder="Happy Kids Daycare" required value={formData.daycare} onChange={handleInputChange} />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" placeholder="jane@happykids.com" required value={formData.email} onChange={handleInputChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">City/State *</Label>
                        <Input id="location" placeholder="Portland, OR" required value={formData.location} onChange={handleInputChange} />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone (optional)</Label>
                        <Input id="phone" type="tel" placeholder="(555) 123-4567" value={formData.phone} onChange={handleInputChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Current Website (optional)</Label>
                        <Input id="website" type="url" placeholder="https://yourwebsite.com" value={formData.website} onChange={handleInputChange} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Tell us about your daycare</Label>
                      <Textarea
                        id="message"
                        placeholder="Share a bit about your daycare, what you're looking for, or any questions you have..."
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="flex items-start gap-2">
                      <Checkbox id="privacy-consent" required onCheckedChange={(checked) => setPrivacyConsent(checked === true)} />
                      <Label htmlFor="privacy-consent" className="text-xs text-muted-foreground font-normal leading-snug">
                        I agree to the{" "}
                        <Link href="/privacy" className="underline hover:text-foreground" target="_blank">Privacy Policy</Link>
                        {" "}and{" "}
                        <Link href="/terms" className="underline hover:text-foreground" target="_blank">Terms of Service</Link>
                        . You may contact me about my sample request.
                      </Label>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      No pressure. We&apos;ll send you a private link to view your sample within 48 hours.
                    </p>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full gradient-forest text-primary-foreground hover:opacity-90 shadow-premium-glow btn-premium"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Get Your Free Sample
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ─── Final CTA Section ─── */}
      <section className="py-20 lg:py-28 gradient-forest relative overflow-hidden">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ready to See Your New Homepage?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            There&apos;s no risk—just fill out the form and we&apos;ll have a sample ready for you in 48 hours.
            Look it over, think about it, decide when you&apos;re ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-base px-8 py-6 gradient-gold text-foreground hover:opacity-90 shadow-gold-glow btn-premium font-semibold">
              <a href="#contact">
                Get Your Free Sample
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" asChild variant="outline" className="text-base px-8 py-6 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <a href="#process">See How It Works</a>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Floating Sticky CTA (Mobile) ─── */}
      {showStickyCta && !stickyCtaDismissed && (
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-background/95 backdrop-blur-md border-t border-border p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] sticky-cta-enter">
          <Button asChild className="w-full gradient-forest text-primary-foreground shadow-premium-glow btn-premium">
            <a href="#contact">
              Get Your Free Sample
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <button onClick={() => setStickyCtaDismissed(true)} className="absolute top-1 right-2 text-muted-foreground text-xs hover:text-foreground transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <Footer />
    </main>
  );
}
