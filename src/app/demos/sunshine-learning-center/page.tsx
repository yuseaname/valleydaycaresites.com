'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  GraduationCap, 
  Heart, 
  Users, 
  Star, 
  Clock, 
  Shield, 
  Sparkles,
  Phone, 
  Mail, 
  MapPin,
  CheckCircle2,
  ArrowRight,
  Menu,
  X,
  Baby,
  Palette,
  Brain,
  MessageCircle
} from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

// Navigation Component
function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-amber-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <Sun className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>
            <div>
              <span className="text-lg md:text-xl font-bold text-gray-900">Sunshine</span>
              <span className="text-lg md:text-xl font-light text-amber-600"> Learning Center</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#programs" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Programs</a>
            <a href="#why-us" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Why Us</a>
            <a href="#testimonials" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Testimonials</a>
            <a href="#contact" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Contact</a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all">
              Book a Tour
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden pb-4"
          >
            <div className="flex flex-col gap-4">
              <a href="#programs" className="text-gray-700 hover:text-amber-600 font-medium py-2">Programs</a>
              <a href="#why-us" className="text-gray-700 hover:text-amber-600 font-medium py-2">Why Us</a>
              <a href="#testimonials" className="text-gray-700 hover:text-amber-600 font-medium py-2">Testimonials</a>
              <a href="#contact" className="text-gray-700 hover:text-amber-600 font-medium py-2">Contact</a>
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold w-full rounded-full">
                Book a Tour
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

// Sun Icon Component
function Sun({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  )
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative pt-20 md:pt-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-sky-50 to-emerald-50" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl" />
      
      {/* Floating Elements */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 left-10 w-16 h-16 bg-amber-300/40 rounded-2xl rotate-12 hidden lg:block"
      />
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-48 right-20 w-12 h-12 bg-sky-300/40 rounded-full hidden lg:block"
      />
      <motion.div 
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-1/4 w-10 h-10 bg-emerald-300/40 rounded-lg rotate-45 hidden lg:block"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center lg:text-left"
          >
            {/* Trust Badge */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-lg border border-amber-100">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-semibold text-gray-700">Doubled Tour Requests This Year!</span>
              <Badge className="bg-emerald-500 text-white text-xs">Popular</Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
            >
              Preparing Your Child for a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                Bright Future
              </span>{' '}
              Starts Here
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Give your child the head start they deserve. Our proven early education program builds confidence, 
              social skills, and kindergarten readiness — preparing them for success in school and beyond.
            </motion.p>

            {/* Urgency Banner */}
            <motion.div 
              variants={fadeInUp}
              className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-4 mb-8"
            >
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-700 font-semibold">Spots filling fast for upcoming enrollment!</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all text-lg"
              >
                Book a Tour <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-sky-400 text-sky-600 hover:bg-sky-50 font-semibold px-8 py-6 rounded-full text-lg"
              >
                <Phone className="mr-2 w-5 h-5" /> Schedule a Call
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap gap-6 mt-10 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-600">200+ Happy Families</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-sm text-gray-600 ml-1">4.9/5 Rating</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/demos/sunshine-learning-center/hero-classroom.png"
                alt="Sunshine Learning Center bright classroom with children learning and playing, featuring warm colors and educational activities"
                width={512}
                height={512}
                className="w-full h-auto"
                priority
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent" />
            </div>

            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 bg-white rounded-xl p-3 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-sm font-semibold text-gray-700">Early Reading</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-4 -right-4 bg-white rounded-xl p-3 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-sky-600" />
                </div>
                <span className="text-sm font-semibold text-gray-700">Social Skills</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Education First Section
function EducationSection() {
  const features = [
    {
      icon: Brain,
      title: "Cognitive Development",
      description: "Problem-solving, memory, and critical thinking skills that form the foundation for academic success.",
      color: "bg-sky-100 text-sky-600"
    },
    {
      icon: BookOpen,
      title: "Early Literacy",
      description: "Letter recognition, phonics, and pre-reading skills that prepare children for reading success.",
      color: "bg-amber-100 text-amber-600"
    },
    {
      icon: Users,
      title: "Social Development",
      description: "Collaboration, sharing, and communication skills that help children thrive in group settings.",
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      icon: Palette,
      title: "Creative Expression",
      description: "Art, music, and imaginative play that nurtures creativity and self-expression.",
      color: "bg-purple-100 text-purple-600"
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 via-sky-400 to-emerald-400" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-sky-50 rounded-full px-4 py-2 mb-4">
            <GraduationCap className="w-5 h-5 text-sky-600" />
            <span className="text-sm font-semibold text-sky-700">Education-First Approach</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            More Than Just Childcare
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-2xl mx-auto">
            We&apos;re an early education center focused on developing the whole child. 
            Our curriculum is designed to give your child a strong foundation for lifelong learning.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-b from-white to-gray-50">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 md:mt-16 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl p-6 md:p-10 shadow-xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: "95%", label: "Kindergarten Ready" },
              { value: "15+", label: "Years of Excellence" },
              { value: "200+", label: "Happy Families" },
              { value: "8:1", label: "Student-Teacher Ratio" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-amber-100 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Programs Section
function ProgramsSection() {
  const programs = [
    {
      age: "Ages 2-3",
      title: "Early Explorers",
      subtitle: "Preschool Program",
      description: "Building foundational skills through play-based learning. Children develop curiosity, motor skills, and early social abilities.",
      outcomes: ["Language development", "Motor skill development", "Social confidence", "Routine familiarity"],
      color: "from-sky-400 to-sky-500",
      icon: Baby,
      image: "/images/demos/sunshine-learning-center/early-explorers.png"
    },
    {
      age: "Ages 3-4",
      title: "Bright Beginners",
      subtitle: "Pre-K Readiness",
      description: "Preparing for structured learning with focus on letters, numbers, and classroom routines. Building confidence for the next step.",
      outcomes: ["Letter & number recognition", "Following directions", "Independent tasks", "Peer collaboration"],
      color: "from-amber-400 to-orange-500",
      icon: BookOpen,
      featured: true,
      image: "/images/demos/sunshine-learning-center/bright-beginners.png"
    },
    {
      age: "Ages 4-5",
      title: "Kindergarten Prep",
      subtitle: "School Readiness",
      description: "Intensive preparation for kindergarten success. Advanced literacy, math concepts, and classroom independence.",
      outcomes: ["Reading readiness", "Math fundamentals", "Self-advocacy", "Emotional regulation"],
      color: "from-emerald-400 to-emerald-500",
      icon: GraduationCap,
      image: "/images/demos/sunshine-learning-center/kindergarten-prep.png"
    }
  ]

  return (
    <section id="programs" className="py-16 md:py-24 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-amber-100 rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span className="text-sm font-semibold text-amber-700">Age-Appropriate Programs</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Programs That Grow With Your Child
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every stage of early development matters. Our programs are carefully designed to meet children 
            where they are and help them reach their full potential.
          </motion.p>
        </motion.div>

        {/* Programs Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {programs.map((program, index) => (
            <motion.div key={index} variants={fadeInUp} className="relative">
              {program.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              <Card className={`h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden ${program.featured ? 'ring-2 ring-amber-400' : ''}`}>
                {/* Program Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={program.image}
                    alt={`${program.title} - ${program.subtitle} at Sunshine Learning Center`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-semibold text-white bg-white/30 backdrop-blur-sm rounded-full px-3 py-1">
                      {program.age}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${program.color} flex items-center justify-center shadow-lg`}>
                      <program.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-gray-500 bg-gray-100 rounded-full px-3 py-1">
                      {program.age}
                    </span>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${program.color} flex items-center justify-center shadow-lg`}>
                      <program.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{program.title}</h3>
                  <p className="text-amber-600 font-semibold mb-3">{program.subtitle}</p>
                  <p className="text-gray-600 mb-6">{program.description}</p>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-700">Key Outcomes:</p>
                    {program.outcomes.map((outcome, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm text-gray-600">{outcome}</span>
                      </div>
                    ))}
                  </div>

                  <Button className={`w-full mt-6 bg-gradient-to-r ${program.color} hover:opacity-90 text-white font-semibold rounded-full`}>
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Why Parents Choose Section
function WhyUsSection() {
  const reasons = [
    {
      icon: Shield,
      title: "Safe & Nurturing Environment",
      description: "Your child's safety is our top priority. Secure facility, background-checked staff, and a warm, welcoming atmosphere."
    },
    {
      icon: GraduationCap,
      title: "Qualified Teachers",
      description: "Our teachers are certified early childhood educators with ongoing professional development and a passion for teaching."
    },
    {
      icon: BookOpen,
      title: "Engaging Curriculum",
      description: "Research-based curriculum that makes learning fun while building essential skills for school success."
    },
    {
      icon: Users,
      title: "Small Class Sizes",
      description: "Low student-to-teacher ratios ensure every child gets individual attention and support."
    },
    {
      icon: Heart,
      title: "Focus on Kindergarten Readiness",
      description: "Every activity is designed to prepare your child for a successful transition to kindergarten."
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Full-day and half-day options to fit your family's busy schedule."
    }
  ]

  return (
    <section id="why-us" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Classroom Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/demos/sunshine-learning-center/classroom.png"
                alt="Sunshine Learning Center warm classroom with art supplies, reading corner, and circle time area"
                width={512}
                height={512}
                className="w-full h-auto"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent" />

              {/* Floating stats card */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-6 left-6 bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-500">4.9</div>
                    <div className="flex gap-0.5 justify-center">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <div className="h-10 w-px bg-gray-200" />
                  <div>
                    <p className="font-bold text-gray-900">200+</p>
                    <p className="text-xs text-gray-500">Happy Families</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-amber-200/50 rounded-xl rotate-12" />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-sky-200/50 rounded-full" />
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-emerald-100 rounded-full px-4 py-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">Why Parents Choose Us</span>
            </motion.div>
            
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              The Sunshine Difference
            </motion.h2>
            
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 mb-8">
              We&apos;re not just a preschool — we&apos;re partners in your child&apos;s early education journey. 
              Here&apos;s what sets us apart from other early education centers near you.
            </motion.p>

            <motion.div variants={staggerContainer} className="space-y-4">
              {reasons.map((reason, index) => (
                <motion.div key={index} variants={fadeInUp} className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center">
                    <reason.icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{reason.title}</h3>
                    <p className="text-gray-600 text-sm">{reason.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah M.",
      role: "Parent of Emma, Age 4",
      content: "Emma has grown so much in just 6 months! She's recognizing letters, writing her name, and is so much more confident. The teachers truly care about each child's progress.",
      rating: 5,
      image: "S",
      avatarColor: "from-amber-400 to-orange-500"
    },
    {
      name: "Michael T.",
      role: "Parent of Liam, Age 3",
      content: "We were worried about Liam's transition from staying home. The teachers made it so smooth! He now loves coming to school and talks about his friends constantly.",
      rating: 5,
      image: "M",
      avatarColor: "from-sky-400 to-sky-500"
    },
    {
      name: "Jennifer K.",
      role: "Parent of Sophia, Age 5",
      content: "Sophia is more than ready for kindergarten now. Her reading skills have improved dramatically, and she's learned to work well with other children. Best decision we made!",
      rating: 5,
      image: "J",
      avatarColor: "from-emerald-400 to-emerald-500"
    }
  ]

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-amber-100 rounded-full px-4 py-2 mb-4">
            <MessageCircle className="w-5 h-5 text-amber-600" />
            <span className="text-sm font-semibold text-amber-700">Parent Testimonials</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Hear From Happy Parents
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. See what other parents have to say about their 
            experience at Sunshine Learning Center.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all bg-white">
                <CardContent className="p-6 lg:p-8">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-700 mb-6 leading-relaxed">&quot;{testimonial.content}&quot;</p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.image}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          {[
            "State Licensed",
            "CPR Certified Staff",
            "Background Checked",
            "Insured"
          ].map((badge, index) => (
            <div key={index} className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-gray-700">{badge}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Lead Capture Form Section
function LeadCaptureSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    childAge: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/tour-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success('Tour request submitted! We\'ll contact you soon.')
        setFormData({ parentName: '', email: '', phone: '', childAge: '', message: '' })
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-sky-500 via-sky-600 to-sky-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-white"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-semibold">Schedule Your Visit</span>
            </motion.div>

            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Book Your Tour Today
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-xl text-sky-100 mb-8">
              See our classrooms in action, meet our caring teachers, and discover why 
              families choose Sunshine Learning Center for their child&apos;s early education.
            </motion.p>

            {/* Benefits */}
            <motion.div variants={staggerContainer} className="space-y-4 mb-8">
              {[
                "Personal classroom tour",
                "Meet our qualified teachers",
                "Learn about our curriculum",
                "Discuss your child's needs"
              ].map((benefit, index) => (
                <motion.div key={index} variants={fadeInUp} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-sky-100">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Urgency */}
            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" />
                <span className="text-white font-semibold">Limited spots available for Fall enrollment!</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-0 shadow-2xl bg-white">
              <CardContent className="p-6 lg:p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Book Your Tour
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="parentName" className="text-gray-700 font-medium">Parent/Guardian Name *</Label>
                    <Input
                      id="parentName"
                      placeholder="Your full name"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      required
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-medium">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-gray-700 font-medium">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="childAge" className="text-gray-700 font-medium">Child&apos;s Age *</Label>
                    <Select value={formData.childAge} onValueChange={(value) => setFormData({ ...formData, childAge: value })}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select age range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 years old</SelectItem>
                        <SelectItem value="3">3 years old</SelectItem>
                        <SelectItem value="4">4 years old</SelectItem>
                        <SelectItem value="5">5 years old</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-6 text-lg rounded-full shadow-lg"
                  >
                    {isSubmitting ? 'Submitting...' : 'Book Your Tour'}
                    {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5" />}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting, you agree to be contacted about tour scheduling.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Calendar icon for the form section
function Calendar({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

// Differentiation Section
function DifferentiationSection() {
  const features = [
    {
      title: "Hands-On Learning",
      description: "Every day includes interactive activities that make learning fun and memorable",
      icon: Palette
    },
    {
      title: "Individual Attention",
      description: "Small class sizes mean teachers can focus on each child's unique needs",
      icon: Heart
    },
    {
      title: "Safe Environment",
      description: "Secure facility with controlled access and constant supervision",
      icon: Shield
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Makes Us Different
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-2xl mx-auto">
            We go above and beyond to ensure every child thrives
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={fadeInUp} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-white">Sunshine</span>
                <span className="text-lg font-light text-amber-400"> Learning Center</span>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Providing quality early education that prepares children for a bright future. 
              Your trusted preschool near you for kindergarten readiness.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#programs" className="hover:text-amber-400 transition-colors">Programs</a></li>
              <li><a href="#why-us" className="hover:text-amber-400 transition-colors">Why Choose Us</a></li>
              <li><a href="#testimonials" className="hover:text-amber-400 transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>info@sunshinelearning.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 mt-1" />
                <span>123 Education Way<br />Your City, ST 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Hours */}
        <div className="border-t border-gray-800 pt-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="font-medium">Hours:</span>
              <span>Monday - Friday: 7:00 AM - 6:00 PM</span>
            </div>
            <div className="flex gap-4">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500">State Licensed</Badge>
              <Badge className="bg-sky-500/20 text-sky-400 border-sky-500">CPR Certified</Badge>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Sunshine Learning Center. All rights reserved.</p>
          <p className="mt-1">Quality early education center | Pre-K program near you</p>
        </div>
      </div>
    </footer>
  )
}

// Facebook and Instagram icons
function Facebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function Instagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

// Main Page Component
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      <main className="flex-grow">
        <HeroSection />
        <EducationSection />
        <ProgramsSection />
        <WhyUsSection />
        <TestimonialsSection />
        <LeadCaptureSection />
        <DifferentiationSection />
      </main>
      <Footer />
    </div>
  )
}
