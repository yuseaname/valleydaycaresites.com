"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  CreditCard,
  Globe,
  Heart,
  Laptop,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Rocket,
  Shield,
  Smartphone,
  Star,
  Target,
  Users,
  Zap,
} from "lucide-react";

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

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section id="home" className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 gradient-hero opacity-50" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-muted-sage/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-champagne/10 to-transparent rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm border-primary/30 text-primary bg-primary/5">
                Free sample • 48-hour setup • No upfront cost
              </Badge>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-6">
                See Your Daycare Homepage{" "}
                <span className="text-gradient-sage">Before You Pay</span>{" "}
                for Anything
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                We build you a sample homepage in 48 hours. Take a look, show it to a friend, think it over.
                If you want to keep it, it's $50/month. If not, no worries—no charge, no pressure.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button size="lg" asChild className="gradient-sage text-primary-foreground hover:opacity-90 shadow-premium-glow text-base px-8 py-6">
                  <a href="#contact">
                    Request Your Free Sample
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base px-8 py-6 border-border hover:bg-muted">
                  <a href="#process">How It Works</a>
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
              </div>
            </div>
            
            {/* Hero Image/Mockup */}
            <div className="relative">
              <div className="relative rounded-2xl shadow-premium-lg overflow-hidden bg-card border border-border">
                {/* Browser Chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-4 py-1 rounded-md bg-background text-xs text-muted-foreground">
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
              
              {/* Floating Elements */}
              <div className="absolute -bottom-4 -left-4 bg-card rounded-xl shadow-premium p-4 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center">
                    <Star className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">No pressure, no contracts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Logos */}
      <section className="py-12 border-y border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground mb-8">
            Built for home daycares, preschools, and childcare centers
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 opacity-60">
            {["Home Daycares", "Montessori Schools", "Preschools", "Learning Centers", "Family Childcare"].map((name, i) => (
              <div key={i} className="font-display text-lg text-muted-foreground">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Problem */}
            <div>
              <Badge variant="outline" className="mb-4 px-3 py-1 text-sm border-destructive/30 text-destructive bg-destructive/5">
                The Problem
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-6">
                Your Website Is Losing You Enrollments
              </h2>
              <div className="space-y-4">
                {[
                  "Parents judge your daycare in seconds based on your website",
                  "Outdated designs make you look unprofessional",
                  "Cluttered layouts confuse and overwhelm visitors",
                  "Generic templates don't capture your unique value",
                  "No clear path for parents to take action",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                    <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-destructive">{i + 1}</span>
                    </div>
                    <p className="text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Solution */}
            <div className="bg-card rounded-2xl border border-border p-8 shadow-premium">
              <Badge variant="outline" className="mb-4 px-3 py-1 text-sm border-primary/30 text-primary bg-primary/5">
                The Solution
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-6">
                A Website That Works for Your Daycare
              </h2>
              <div className="space-y-4">
                {[
                  { icon: Shield, text: "Professional design that builds instant trust" },
                  { icon: Target, text: "Clear messaging that speaks to parents" },
                  { icon: Smartphone, text: "Mobile-first design that works everywhere" },
                  { icon: Zap, text: "Fast, modern, and enrollment-focused" },
                  { icon: Heart, text: "Warm, welcoming aesthetic that matches your values" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="w-10 h-10 rounded-lg gradient-sage/10 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-sm border-primary/30 text-primary bg-primary/5">
              Why Choose Us
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-4">
              Built Specifically for Daycare Businesses
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We understand the unique challenges daycare owners face. That's why every website we create 
              is designed with your specific needs in mind.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Heart,
                title: "Parent-Focused Design",
                description: "Every element is designed to help parents feel confident and comfortable choosing your daycare.",
              },
              {
                icon: Globe,
                title: "Daycare Specialists",
                description: "We don't build generic websites. We create sites specifically crafted for childcare businesses.",
              },
              {
                icon: Clock,
                title: "No Technical Skills Needed",
                description: "We handle everything—design, hosting, your domain—so you can focus on running your daycare.",
              },
              {
                icon: Smartphone,
                title: "Mobile-First Approach",
                description: "Parents browse on their phones. Your site will look perfect on every device.",
              },
              {
                icon: Target,
                title: "Enrollment-Focused",
                description: "Clear calls-to-action and intuitive layouts guide parents toward scheduling a tour.",
              },
              {
                icon: Shield,
                title: "Trust-Building Elements",
                description: "Testimonials, accreditations, and professional imagery that build instant credibility.",
              },
            ].map((benefit, i) => (
              <Card key={i} className="border-border bg-card card-hover">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl gradient-sage/10 flex items-center justify-center mb-4">
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

      {/* About Section */}
      <section id="about" className="py-16 lg:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div>
              <Badge variant="outline" className="mb-4 px-3 py-1 text-sm border-primary/30 text-primary bg-primary/5">
                About Us
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-6">
                We Help Daycare Owners Look Professional Online
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Valley Daycare Sites exists to give small childcare providers a simple way to get online.
                  We build you a sample homepage first—free—so you can see what you're getting before you pay anything.
                </p>
                <p>
                  Most daycare owners don't have time to learn web design, and they shouldn't have to.
                  But they also shouldn't have to pay hundreds of dollars upfront for something they haven't even seen.
                </p>
                <p>
                  That's why we build free samples. You get to see what your homepage could look like,
                  think it over, and decide on your own timeline. If it's not right for you, you walk away
                  without paying a cent.
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="text-center p-4 rounded-lg bg-muted/30">
                  <div className="font-display text-3xl font-semibold text-foreground">Free</div>
                  <div className="text-sm text-muted-foreground">Sample Homepage</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/30">
                  <div className="font-display text-3xl font-semibold text-foreground">$50</div>
                  <div className="text-sm text-muted-foreground">Per Month If You Keep It</div>
                </div>
              </div>
            </div>
            
            {/* Image */}
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

      {/* Services Section */}
      <section id="services" className="py-16 lg:py-24 bg-muted/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-sm border-primary/30 text-primary bg-primary/5">
              Our Services
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-4">
              Everything Your Daycare Needs Online
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From complete website design to ongoing support, we offer comprehensive services 
              tailored specifically for daycare and childcare businesses.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Globe,
                title: "Custom Daycare Website Design",
                description: "A complete, custom-designed website built from scratch to showcase your unique daycare.",
                features: ["Custom design", "Mobile responsive", "SEO optimized", "Fast loading"],
              },
              {
                icon: Laptop,
                title: "Website Refresh & Redesign",
                description: "Transform your existing website into a modern, professional presence that converts.",
                features: ["Design update", "Content migration", "Improved UX", "Modern aesthetics"],
              },
              {
                icon: Smartphone,
                title: "Mobile Optimization",
                description: "Ensure your website works perfectly on phones and tablets where parents browse.",
                features: ["Responsive design", "Touch-friendly", "Fast mobile load", "Easy navigation"],
              },
              {
                icon: MessageSquare,
                title: "Inquiry Form Setup",
                description: "Simple, effective forms that make it easy for parents to reach out.",
                features: ["Contact forms", "Tour scheduling", "Waitlist signup", "Email notifications"],
              },
              {
                icon: Target,
                title: "Parent Trust Copy Structure",
                description: "Professional copywriting that speaks directly to parents' concerns and builds confidence.",
                features: ["Clear messaging", "Trust elements", "Value proposition", "Call-to-actions"],
              },
              {
                icon: Zap,
                title: "Local SEO Foundations",
                description: "Get found by local parents searching for daycare in your area.",
                features: ["Google optimization", "Local keywords", "Schema markup", "Directory setup"],
              },
            ].map((service, i) => (
              <Card key={i} className="border-border bg-card card-hover">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-sage/10 flex items-center justify-center flex-shrink-0">
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

      {/* Process Section */}
      <section id="process" className="py-16 lg:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-sm border-primary/30 text-primary bg-primary/5">
              How It Works
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-4">
              Simple Process, No Surprises
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We build you a sample homepage first. You look it over, think about it, and decide if you want to keep it.
              No calls, no pressure, just a straightforward process.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Fill Out the Form",
                description: "Tell us about your daycare—name, location, type, and a few details about what makes your program special. Takes about 5 minutes.",
                icon: Target,
              },
              {
                step: "02",
                title: "We Build Your Sample",
                description: "Within 48 hours, we create a homepage tailored to your daycare with your name, location, and relevant content.",
                icon: Zap,
              },
              {
                step: "03",
                title: "Review It",
                description: "We send you a private link. Look at it, show your family, take a few days. Ask for tweaks if you want.",
                icon: MessageSquare,
              },
              {
                step: "04",
                title: "Decide",
                description: "Want to keep it? $50/month covers everything. Not for you? Walk away, no charge.",
                icon: Heart,
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-card rounded-xl border border-border p-6 h-full card-hover">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl gradient-sage flex items-center justify-center">
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

      {/* Pricing Section */}
      <section id="pricing" className="py-16 lg:py-24 bg-muted/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-sm border-primary/30 text-primary bg-primary/5">
              Simple Pricing
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-4">
              Free Sample. $50/Month If You Keep It.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We build you a sample homepage at no cost. Look it over, show your family, take your time.
              If you want to keep it live, it's $50/month. That's it.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <Card className="border-primary bg-card shadow-premium-glow">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">Everything Included</h3>
                  <div className="flex items-baseline justify-center gap-1 mt-4">
                    <span className="font-display text-5xl font-semibold text-foreground">$50</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">No upfront cost • Cancel anytime</p>
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

                <Button size="lg" asChild className="w-full gradient-sage text-primary-foreground hover:opacity-90">
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

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 lg:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-sm border-primary/30 text-primary bg-primary/5">
              Portfolio
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-4">
              Websites That Make an Impression
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how we've helped daycare businesses transform their online presence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Bright Start Academy",
                type: "Large Center",
                result: "47% increase in inquiries",
                image: "/images/daycare-interior.png",
                imageAlt: "Successful daycare owner smiling at her laptop showing increased inquiries on her new daycare website",
              },
              {
                name: "Little Hearts Daycare",
                type: "Family Daycare",
                result: "Fully booked within 3 months",
                image: "/images/daycare-children.png",
                imageAlt: "Daycare owner celebrating business growth while viewing new enrollment inquiries on her phone",
              },
              {
                name: "Sunshine Learning Center",
                type: "Preschool",
                result: "Doubled tour requests",
                image: "/images/process-design.png",
                imageAlt: "Web design process showing wireframes, color palette cards, and daycare website mockup in progress",
              },
              {
                name: "Growing Minds Academy",
                type: "Multi-location",
                result: "Consistent branding across locations",
                image: "/images/contact-consultation.png",
                imageAlt: "Friendly website consultation meeting between a web designer and daycare owner at a coffee shop",
              },
              {
                name: "Happy Kids Childcare",
                type: "Home Daycare",
                result: "Professional online presence",
                image: "/images/about-workspace.png",
                imageAlt: "Professional web design workspace with daycare website mockups, color swatches, and design planning materials",
              },
              {
                name: "Tiny Steps Learning",
                type: "Early Education",
                result: "Improved parent communication",
                image: "/images/hero-mockup.png",
                imageAlt: "Professional daycare website mockup displayed on laptop and tablet, showcasing responsive web design",
              },
            ].map((project, i) => (
              <Card key={i} className="border-border bg-card overflow-hidden card-hover group">
                {/* Project Image */}
                <div className="aspect-[16/10] bg-muted/30 relative overflow-hidden">
                  <Image 
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-semibold text-foreground">{project.name}</h3>
                    <Badge variant="secondary" className="text-xs">{project.type}</Badge>
                  </div>
                  <p className="text-sm text-primary">{project.result}</p>
                </CardContent>
              </Card>
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

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-sm border-primary/30 text-primary bg-primary/5">
              Testimonials
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-4">
              What Daycare Owners Say
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                quote: "I was embarrassed by my old website. Now I'm proud to share it with parents. The Valley team understood exactly what I needed.",
                author: "Maria S.",
                role: "Little Stars Daycare",
                rating: 5,
              },
              {
                quote: "They made the whole process so easy. I'm not technical at all, but they guided me through everything. My new site is beautiful.",
                author: "Jennifer T.",
                role: "Happy Hearts Childcare",
                rating: 5,
              },
              {
                quote: "The increase in tour requests was immediate. Parents tell me all the time how professional our website looks.",
                author: "David L.",
                role: "Bright Beginnings Academy",
                rating: 5,
              },
            ].map((testimonial, i) => (
              <Card key={i} className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed mb-4">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 lg:py-24 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-sm border-primary/30 text-primary bg-primary/5">
              FAQ
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about working with us.
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              {
                question: "Is the sample really free?",
                answer: "Yes. We build a homepage for you at no cost. You only pay if you decide to keep it.",
              },
              {
                question: "How long does the sample take?",
                answer: "We aim to have your sample ready within 48 hours of receiving your request.",
              },
              {
                question: "What if I don't like the sample?",
                answer: "Just let us know. We can try a different direction, or you can simply walk away. Either way, no charge.",
              },
              {
                question: "What's included in the $50/month?",
                answer: "Your homepage, a contact page with inquiry form, your custom domain (e.g., yourdaycare.com), hosting, SSL security, mobile-friendly design, and support when you need it.",
              },
              {
                question: "Can I cancel?",
                answer: "Yes, anytime. No contracts or penalties. After 3 months, you own your domain and can take it with you.",
              },
              {
                question: "What if I want more pages?",
                answer: "Most daycares do well with just a homepage and contact page. If you need more, we can add them for a one-time setup fee.",
              },
              {
                question: "What do you need from me?",
                answer: "Just fill out the sample request form with basic info about your daycare. If you have a logo or photos, great—we can use them. If not, we can include quality stock images.",
              },
              {
                question: "Will my site work on phones?",
                answer: "Yes. All our sites are mobile-friendly, so parents can view your site easily from any device.",
              },
            ].map((item, i) => (
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

      {/* Blog Section */}
      <section id="blog" className="py-16 lg:py-24 bg-muted/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-sm border-primary/30 text-primary bg-primary/5">
              Blog
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-4">
              Resources for Daycare Owners
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tips, insights, and strategies to help your daycare succeed online.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "What Parents Notice First on a Daycare Website",
                excerpt: "Discover the key elements that shape a parent's first impression and learn how to optimize them.",
                category: "Design Tips",
              },
              {
                title: "How to Make Your Daycare Website Look More Trustworthy",
                excerpt: "Build instant credibility with these proven trust-building strategies for your website.",
                category: "Trust Building",
              },
              {
                title: "Why an Outdated Website Can Hurt Enrollment",
                excerpt: "Understanding the hidden costs of an old website and what you can do about it.",
                category: "Enrollment",
              },
              {
                title: "Best Photos to Use on Your Childcare Website",
                excerpt: "A guide to selecting and using images that showcase your daycare professionally.",
                category: "Content",
              },
              {
                title: "Daycare Website Must-Haves for 2026",
                excerpt: "Stay ahead with these essential features every modern daycare website needs.",
                category: "Trends",
              },
              {
                title: "Mobile Matters: Why Parents Browse on Phones",
                excerpt: "How to ensure your website works perfectly for mobile-first parents.",
                category: "Mobile",
              },
            ].map((post, i) => (
              <Card key={i} className="border-border bg-card overflow-hidden card-hover group">
                {/* Image Placeholder */}
                <div className="aspect-[16/9] bg-muted/30 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <Laptop className="h-10 w-10 opacity-20" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <Badge variant="outline" className="text-xs mb-2">{post.category}</Badge>
                  <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 lg:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div>
              <Badge variant="outline" className="mb-4 px-3 py-1 text-sm border-primary/30 text-primary bg-primary/5">
                Contact Us
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-4">
                Request Your Free Sample
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Tell us about your daycare, and we'll build you a sample homepage within 48 hours.
                No pressure, no obligation—just see what's possible.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-medium text-foreground">hello@valleydaycaresites.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div className="font-medium text-foreground">(555) 123-4567</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-xl p-6">
                <h3 className="font-display font-semibold text-foreground mb-2">What happens next?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    We build your sample homepage
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Ready within 48 hours
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
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
                      Check your email for confirmation. We'll have your sample homepage ready within 48 hours.
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
                        <Input
                          id="name"
                          placeholder="Jane Smith"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="daycare">Daycare Name *</Label>
                        <Input
                          id="daycare"
                          placeholder="Happy Kids Daycare"
                          required
                          value={formData.daycare}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="jane@happykids.com"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">City/State *</Label>
                        <Input
                          id="location"
                          placeholder="Portland, OR"
                          required
                          value={formData.location}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone (optional)</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Current Website (optional)</Label>
                        <Input
                          id="website"
                          type="url"
                          placeholder="https://yourwebsite.com"
                          value={formData.website}
                          onChange={handleInputChange}
                        />
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

                    <p className="text-xs text-muted-foreground">
                      No pressure. We'll send you a private link to view your sample within 48 hours.
                    </p>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full gradient-sage text-primary-foreground hover:opacity-90"
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

      {/* Final CTA Section */}
      <section className="py-16 lg:py-24 gradient-sage relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary-foreground mb-6">
            Ready to See Your New Homepage?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            There's no risk—just fill out the form and we'll have a sample ready for you in 48 hours.
            Look it over, think about it, decide when you're ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild variant="secondary" className="text-base px-8 py-6">
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

      <Footer />
    </main>
  );
}
