'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Star,
  Shield,
  Heart,
  Users,
  Clock,
  Phone,
  Mail,
  MapPin,
  Award,
  Baby,
  BookOpen,
  Palette,
  GraduationCap,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  ChevronUp,
} from 'lucide-react';

/* ─── Animation helpers ─── */
function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ScaleIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Data ─── */
const programs = [
  {
    icon: Baby,
    title: 'Infant Care',
    ages: '6 weeks – 12 months',
    image: '/images/demos/bright-start-academy/infant-care.png',
    color: 'bg-coral-50',
    iconColor: 'text-coral-500',
    description:
      'A warm, nurturing environment where your baby receives individualized attention, gentle stimulation, and the love they deserve. Our trained caregivers follow each infant\'s natural rhythm for feeding, napping, and play.',
    highlights: ['1:3 caregiver ratio', 'Sensory development', 'Daily progress reports'],
  },
  {
    icon: Sparkles,
    title: 'Toddler Program',
    ages: '1 – 2 years',
    image: '/images/demos/bright-start-academy/toddler-program.png',
    color: 'bg-warm-50',
    iconColor: 'text-warm-500',
    description:
      'Curious toddlers thrive in our structured-yet-flexible program designed to build language, motor skills, and social confidence. Daily activities include music, movement, art, and outdoor exploration.',
    highlights: ['Language development', 'Creative play', 'Safe exploration zones'],
  },
  {
    icon: Palette,
    title: 'Preschool Program',
    ages: '3 – 4 years',
    image: '/images/demos/bright-start-academy/preschool-program.png',
    color: 'bg-sage-50',
    iconColor: 'text-sage-600',
    description:
      'Our play-based preschool curriculum prepares children for kindergarten through hands-on STEM activities, phonics, art projects, and collaborative group work—all while having fun.',
    highlights: ['Kindergarten readiness', 'STEM activities', 'Social-emotional skills'],
  },
  {
    icon: GraduationCap,
    title: 'After-School Care',
    ages: '5 – 12 years',
    image: '/images/demos/bright-start-academy/afterschool-care.png',
    color: 'bg-sky-50',
    iconColor: 'text-sky-600',
    description:
      'A safe, enriching environment for school-aged children with homework help, creative projects, physical activities, and leadership-building opportunities. Transportation from local schools available.',
    highlights: ['Homework support', 'Enrichment activities', 'Transportation provided'],
  },
];

const whyChooseUs = [
  {
    icon: Shield,
    title: 'Safety-First Environment',
    description: 'Secure entry systems, trained staff, and rigorous safety protocols give you complete peace of mind every day.',
  },
  {
    icon: Users,
    title: 'Experienced & Caring Staff',
    description: 'Our educators hold early childhood degrees and average 8+ years of experience. They genuinely love what they do.',
  },
  {
    icon: BookOpen,
    title: 'Structured Learning + Play',
    description: 'Research-backed curriculum blending academics with creative play to develop the whole child.',
  },
  {
    icon: Heart,
    title: 'Clean & Nurturing Space',
    description: 'Hospital-grade cleaning, natural materials, and thoughtfully designed rooms that feel like a second home.',
  },
];

const whyUsItems = [
  {
    icon: Shield,
    title: 'Licensed & Insured',
    description: 'Fully licensed facility with comprehensive insurance, background-checked staff, and strict safety protocols for your peace of mind.',
  },
  {
    icon: Heart,
    title: 'Small Class Sizes',
    description: 'Low teacher-to-child ratios ensure every child gets individual attention, personalized care, and the support they need to thrive.',
  },
  {
    icon: Star,
    title: 'Age-Appropriate Curriculum',
    description: 'Research-based learning activities tailored to each developmental stage -- from infant sensory play to pre-K readiness skills.',
  },
];

const stats = [
  { value: 'Your Number', label: 'Years of Experience (Example)' },
  { value: 'Your Number', label: 'Families Served (Example)' },
  { value: 'Your Stat', label: 'Your Key Metric (Example)' },
  { value: 'Your Rating', label: 'Your Rating (Example)' },
];

/* ─── Main Page ─── */
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    childAge: '',
    email: '',
    phone: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed');
      setFormStatus('success');
      setFormData({ parentName: '', childAge: '', email: '', phone: '' });
    } catch {
      setFormStatus('error');
    }
  };

  const navLinks = [
    { label: 'Programs', href: '#programs' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Why Choose Us', href: '#why-us' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* ═══ NAVIGATION ═══ */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border/60">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-sage-600 flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              Bright Start Academy
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button asChild className="rounded-full bg-gradient-to-r from-teal-600 to-sage-600 hover:from-teal-700 hover:to-sage-700 shadow-md shadow-teal-200">
              <a href="#contact">Schedule a Tour</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t border-border/60 bg-white"
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                  >
                    {link.label}
                  </a>
                ))}
                <Button asChild className="rounded-full bg-gradient-to-r from-teal-600 to-sage-600 w-full mt-1">
                  <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                    Schedule a Tour
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ═══ DEMO BANNER ═══ */}
      <div className="bg-amber-100 border-b border-amber-200 text-center py-2.5 px-4">
        <p className="text-sm font-semibold text-amber-800">
          Demo Website -- For Demonstration Only
        </p>
      </div>

      <main className="flex-1">
        {/* ═══ HERO SECTION ═══ */}
        <section className="relative bg-gradient-hero overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="text-center lg:text-left"
              >
                <Badge
                  variant="secondary"
                  className="mb-5 px-4 py-1.5 text-sm font-semibold bg-white/80 text-teal-700 border-teal-100 shadow-sm"
                >
                  <Star className="w-3.5 h-3.5 mr-1.5 fill-warm-400 text-warm-400" />
                  Demo Site -- Not a Real Business
                </Badge>

                <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.1] tracking-tight text-foreground mb-5">
                  Where Every Child{' '}
                  <span className="text-gradient-warm">Learns, Grows & Thrives</span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                  Safe, nurturing childcare with structured learning programs designed to give your child the brightest start. Licensed, experienced, and loved by families in our community (demo).
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start mb-8">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-gradient-to-r from-teal-600 to-sage-600 hover:from-teal-700 hover:to-sage-700 shadow-lg shadow-teal-200 text-base px-8 py-5.5"
                  >
                    <a href="#contact">
                      Schedule a Tour
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-full border-2 border-teal-200 text-teal-700 hover:bg-teal-50 text-base px-8"
                  >
                    <a href="#programs">Explore Programs</a>
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center gap-5 justify-center lg:justify-start text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-sage-500" />
                    State Licensed
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-sage-500" />
                    CPR Certified Staff
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-sage-500" />
                    Secure Facility
                  </span>
                </div>
              </motion.div>

              {/* Right Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-warm-lg">
                  <img
                    src="/images/demos/bright-start-academy/hero-daycare.png"
                    alt="Happy children playing at Bright Start Academy daycare center"
                    className="w-full h-auto object-cover"
                    loading="eager"
                  />
                </div>

                {/* Demo badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="absolute -top-3 -right-3 sm:top-6 sm:-right-6 bg-white rounded-2xl shadow-warm-lg p-3 sm:p-4 border border-warm-100"
                >
                  <p className="text-xs font-semibold text-muted-foreground">Demo Website</p>
                  <p className="text-[10px] text-muted-foreground">Layout Example</p>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Decorative shapes */}
          <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-warm-200/30 blur-2xl" />
          <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-teal-200/30 blur-2xl" />
        </section>

        {/* ═══ STATS BAR ═══ */}
        <section className="bg-white border-y border-border/60 py-10 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
              {stats.map((stat, i) => (
                <FadeIn key={stat.label} delay={i * 0.08}>
                  <div className="text-center">
                    <p className="text-3xl sm:text-4xl font-extrabold text-gradient-warm">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mt-1 font-medium">{stat.label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-6">
              All examples shown are for demonstration purposes only.
              Your website will be built with your real content and details.
            </p>
          </div>
        </section>
        <section id="programs" className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <Badge variant="secondary" className="mb-4 px-3 py-1 text-xs font-semibold bg-sage-50 text-sage-700 border-sage-100">
                Our Programs
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
                Tailored Programs for Every Age
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                From infants to school-age children, our trusted daycare center (demo) offers enriching childcare programs designed around your child&apos;s developmental needs.
              </p>
            </FadeIn>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {programs.map((program, i) => (
                <ScaleIn key={program.title} delay={i * 0.08}>
                  <Card className="group h-full rounded-2xl border-0 shadow-warm hover:shadow-warm-lg transition-all duration-300 overflow-hidden hover:-translate-y-1">
                    <div className={`relative h-48 ${program.color} overflow-hidden`}>
                      <img
                        src={program.image}
                        alt={`${program.title} at Bright Start Academy`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        <div className={`w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm`}>
                          <program.icon className={`w-5 h-5 ${program.iconColor}`} />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">{program.ages}</p>
                      <h3 className="text-lg font-bold text-foreground mb-2">{program.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{program.description}</p>
                      <ul className="space-y-1.5">
                        {program.highlights.map((h) => (
                          <li key={h} className="flex items-center gap-2 text-xs font-medium text-foreground">
                            <CheckCircle className="w-3.5 h-3.5 text-sage-500 shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </ScaleIn>
              ))}
            </div>

            <FadeIn className="text-center mt-10">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-2 border-teal-200 text-teal-700 hover:bg-teal-50 px-8"
              >
                <a href="#contact">
                  Check Availability
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </FadeIn>
          </div>
        </section>

        {/* ═══ WHY CHOOSE US ═══ */}
        <section id="why-us" className="py-16 sm:py-20 lg:py-24 bg-gradient-warm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image Side */}
              <FadeIn>
                <div className="relative">
                  <div className="rounded-3xl overflow-hidden shadow-warm-lg">
                    <img
                      src="/images/demos/bright-start-academy/about-daycare.png"
                      alt="Experienced daycare teachers at Bright Start Academy"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-warm-lg p-5 border border-sage-100">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sage-500 to-sage-600 flex items-center justify-center">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">State Licensed</p>
                        <p className="text-xs text-muted-foreground">& Certified Staff</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Content Side */}
              <div>
                <FadeIn>
                  <Badge variant="secondary" className="mb-4 px-3 py-1 text-xs font-semibold bg-teal-50 text-teal-700 border-teal-100">
                    Why Choose Us
                  </Badge>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
                    A Trusted Daycare Center Parents Rely On (Demo)
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    Choosing the right childcare near you is one of the most important decisions you&apos;ll make. At Bright Start Academy, we combine safety, expertise, and genuine care to create an environment where children flourish.
                  </p>
                </FadeIn>

                <div className="grid sm:grid-cols-2 gap-5">
                  {whyChooseUs.map((item, i) => (
                    <FadeIn key={item.title} delay={i * 0.1}>
                      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-warm hover:shadow-warm-lg transition-shadow border border-border/40">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-sage-500 flex items-center justify-center mb-3">
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-base font-bold text-foreground mb-1.5">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </FadeIn>
                  ))}
                </div>

                <FadeIn delay={0.35}>
                  <div className="mt-8">
                    <Button
                      asChild
                      size="lg"
                      className="rounded-full bg-gradient-to-r from-teal-600 to-sage-600 hover:from-teal-700 hover:to-sage-700 shadow-md shadow-teal-200"
                    >
                      <a href="#contact">
                        Enroll Today
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ WHY CHOOSE US ═══ */}
        <section id="why-us" className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <Badge variant="secondary" className="mb-4 px-3 py-1 text-xs font-semibold bg-warm-50 text-warm-500 border-warm-100">
                Demo Website -- Layout Example
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
                Why Families Choose Us
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                This is an example layout for a childcare center -- warm colors, structured program descriptions, enrollment-focused layout. Built to highlight your unique value.
              </p>
              <p className="text-xs text-muted-foreground mt-2 italic">
                Demo Website -- all content shown is for demonstration purposes only.
              </p>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-6">
              {whyUsItems.map((item, i) => (
                <ScaleIn key={item.title} delay={i * 0.1}>
                  <Card className="h-full rounded-2xl border-0 shadow-warm hover:shadow-warm-lg transition-shadow bg-white">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-sage-500 flex items-center justify-center mb-4">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </ScaleIn>
              ))}
            </div>

            <p className="text-xs text-muted-foreground text-center mt-8">
              All examples shown are for demonstration purposes only.
              Your website will be built with your real content and details.
            </p>
          </div>
        </section>
        <section className="py-14 sm:py-16 bg-gradient-to-r from-teal-600 via-teal-600 to-sage-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-40 h-40 rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-52 h-52 rounded-full bg-white blur-3xl" />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Give Your Child the Brightest Start
              </h2>
              <p className="text-teal-100 text-lg mb-8 max-w-2xl mx-auto">
                Spots fill quickly at our trusted daycare center (demo). Schedule a tour today and see why families choose Bright Start Academy for their childcare needs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-white text-teal-700 hover:bg-warm-50 shadow-lg text-base px-8 font-semibold"
                >
                  <a href="#contact">
                    Schedule a Tour
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-2 border-white/30 text-white hover:bg-white/10 text-base px-8"
                >
                  <a href="tel:+15551234567">
                    <Phone className="w-4 h-4 mr-2" />
                    Call (555) 123-4567
                  </a>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══ LEAD CAPTURE / CONTACT ═══ */}
        <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-gradient-warm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Info Side */}
              <FadeIn>
                <div>
                  <Badge variant="secondary" className="mb-4 px-3 py-1 text-xs font-semibold bg-teal-50 text-teal-700 border-teal-100">
                    Check Availability
                  </Badge>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
                    Ready to Enroll? Let&apos;s Get Started
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    Fill out the form and our enrollment team will reach out within 24 hours with availability, pricing, and next steps. No commitment required.
                  </p>

                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-warm flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Visit Us</p>
                        <p className="text-sm text-muted-foreground">
                          123 Sunshine Boulevard, Suite 100<br />
                          Maplewood, Your State 12345
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-warm flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Call Us</p>
                        <p className="text-sm text-muted-foreground">(555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-warm flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Email Us</p>
                        <p className="text-sm text-muted-foreground">info@brightstartacademy.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-warm flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Hours</p>
                        <p className="text-sm text-muted-foreground">
                          Mon – Fri: 6:30 AM – 6:30 PM<br />
                          Sat – Sun: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Form Side */}
              <FadeIn delay={0.15}>
                <Card className="rounded-2xl border-0 shadow-warm-lg bg-white p-6 sm:p-8">
                  <AnimatePresence mode="wait">
                    {formStatus === 'success' ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-10"
                      >
                        <div className="w-16 h-16 rounded-full bg-sage-50 flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="w-8 h-8 text-sage-600" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">Thank You!</h3>
                        <p className="text-muted-foreground">
                          We&apos;ve received your inquiry. Our team will contact you within 24 hours.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <h3 className="text-xl font-bold text-foreground mb-1">Check Availability</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                          No obligation. We&apos;ll respond within 24 hours.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="parentName" className="text-sm font-medium">
                              Parent / Guardian Name <span className="text-coral-500">*</span>
                            </Label>
                            <Input
                              id="parentName"
                              required
                              placeholder="Your full name"
                              value={formData.parentName}
                              onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                              className="rounded-xl h-11"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="childAge" className="text-sm font-medium">
                              Child&apos;s Age <span className="text-coral-500">*</span>
                            </Label>
                            <Input
                              id="childAge"
                              required
                              placeholder="e.g., 18 months, 3 years"
                              value={formData.childAge}
                              onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                              className="rounded-xl h-11"
                            />
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="email" className="text-sm font-medium">
                                Email <span className="text-coral-500">*</span>
                              </Label>
                              <Input
                                id="email"
                                type="email"
                                required
                                placeholder="you@email.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="rounded-xl h-11"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone" className="text-sm font-medium">
                                Phone <span className="text-coral-500">*</span>
                              </Label>
                              <Input
                                id="phone"
                                type="tel"
                                required
                                placeholder="(555) 000-0000"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="rounded-xl h-11"
                              />
                            </div>
                          </div>

                          <Button
                            type="submit"
                            disabled={formStatus === 'submitting'}
                            className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-sage-600 hover:from-teal-700 hover:to-sage-700 shadow-md shadow-teal-200 h-12 text-base font-semibold mt-2"
                          >
                            {formStatus === 'submitting' ? (
                              <span className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Submitting...
                              </span>
                            ) : (
                              <span className="flex items-center gap-2">
                                Check Availability
                                <ArrowRight className="w-4 h-4" />
                              </span>
                            )}
                          </Button>

                          {formStatus === 'error' && (
                            <p className="text-sm text-coral-500 text-center">
                              Something went wrong. Please try again or call us directly.
                            </p>
                          )}

                          <p className="text-xs text-muted-foreground text-center mt-3">
                            By submitting, you agree to be contacted about enrollment. We respect your privacy.
                          </p>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ═══ LOCAL SEO CONTENT ═══ */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="prose prose-gray max-w-none">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4 text-center">
                  Your Trusted Daycare Center in Maplewood (Demo)
                </h2>
                <div className="text-muted-foreground leading-relaxed space-y-4 text-base">
                  <p>
                    Looking for reliable <strong className="text-foreground">childcare near you</strong>? Bright Start Academy (demo) has been serving families in Maplewood and surrounding communities. As a <strong className="text-foreground">licensed daycare center</strong>, we provide a safe, stimulating environment where children from 6 weeks to 12 years old learn, play, and grow.
                  </p>
                  <p>
                    Our experienced early childhood educators create individualized learning plans tailored to each child&apos;s developmental stage. From our infant care program to after-school care, every classroom is designed to foster curiosity, build confidence, and develop essential social skills.
                  </p>
                  <p>
                    We understand that choosing the right <strong className="text-foreground">daycare</strong> is a big decision. That&apos;s why we invite every family to schedule a personal tour, meet our teachers, and see our classrooms in action. (Demo -- this is example content for demonstration purposes.)
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-foreground text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-sage-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">Bright Start Academy</span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed mb-4">
                A trusted daycare center (demo) providing safe, nurturing childcare and early education for children in Maplewood and surrounding areas.
              </p>
              <div className="flex items-center gap-2 text-sm text-white/50">
                <CheckCircle className="w-4 h-4 text-sage-400" />
                State Licensed & Insured
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white/80">Quick Links</h4>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white/80">Programs</h4>
              <ul className="space-y-2.5">
                {programs.map((p) => (
                  <li key={p.title}>
                    <a href="#programs" className="text-sm text-white/50 hover:text-white transition-colors">
                      {p.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white/80">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
                  <span className="text-sm text-white/50">123 Sunshine Blvd, Suite 100<br />Maplewood, Your State 12345</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-white/40 shrink-0" />
                  <a href="tel:+15551234567" className="text-sm text-white/50 hover:text-white transition-colors">
                    (555) 123-4567
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-white/40 shrink-0" />
                  <a href="mailto:info@brightstartacademy.com" className="text-sm text-white/50 hover:text-white transition-colors">
                    info@brightstartacademy.com
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
                  <span className="text-sm text-white/50">Mon – Fri: 6:30 AM – 6:30 PM</span>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8 bg-white/10" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              &copy; {new Date().getFullYear()} Bright Start Academy. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-white/40">
              <div className="flex items-center gap-1.5 text-xs">
                <Shield className="w-3.5 h-3.5" />
                Licensed & Insured
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <Award className="w-3.5 h-3.5" />
                CPR Certified
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <Heart className="w-3.5 h-3.5" />
                Background Checked
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ═══ DEMO DISCLAIMER ═══ */}
      <div className="bg-gray-100 border-t border-gray-200 text-center py-4 px-4">
        <p className="text-xs text-gray-500">
          This is a demo site -- all content shown is for demonstration purposes only.
        </p>
      </div>

      {/* ═══ SCROLL TO TOP ═══ */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-gradient-to-br from-teal-600 to-sage-600 text-white shadow-lg shadow-teal-200 flex items-center justify-center hover:from-teal-700 hover:to-sage-700 transition-colors"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* TrendingUp icon (used in hero) */
function TrendingUp({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
