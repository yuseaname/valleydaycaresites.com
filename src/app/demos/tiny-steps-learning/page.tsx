'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import {
  MessageCircle,
  Phone,
  Mail,
  Clock,
  MapPin,
  Shield,
  Heart,
  BookOpen,
  Users,
  Camera,
  BarChart3,
  Smartphone,
  Star,
  CheckCircle,
  ChevronRight,
  Baby,
  Sparkles,
  GraduationCap,
  Send,
  Menu,
  X
} from 'lucide-react'

// Navigation Component
function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
              <Baby className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">Tiny Steps</span>
              <span className="text-xl font-light text-teal-600"> Learning</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#programs" className="text-gray-600 hover:text-teal-600 transition-colors font-medium">Programs</a>
            <a href="#communication" className="text-gray-600 hover:text-teal-600 transition-colors font-medium">Communication</a>
            <a href="#education" className="text-gray-600 hover:text-teal-600 transition-colors font-medium">Education</a>
            <a href="#testimonials" className="text-gray-600 hover:text-teal-600 transition-colors font-medium">Testimonials</a>
            <a href="#contact" className="text-gray-600 hover:text-teal-600 transition-colors font-medium">Contact</a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" className="text-teal-600">
              <Phone className="w-4 h-4 mr-2" />
              Call Us
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/25">
              Schedule a Tour
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              <a href="#programs" className="text-gray-600 hover:text-teal-600 transition-colors font-medium py-2">Programs</a>
              <a href="#communication" className="text-gray-600 hover:text-teal-600 transition-colors font-medium py-2">Communication</a>
              <a href="#education" className="text-gray-600 hover:text-teal-600 transition-colors font-medium py-2">Education</a>
              <a href="#testimonials" className="text-gray-600 hover:text-teal-600 transition-colors font-medium py-2">Testimonials</a>
              <a href="#contact" className="text-gray-600 hover:text-teal-600 transition-colors font-medium py-2">Contact</a>
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="outline" className="w-full justify-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us
                </Button>
                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                  Schedule a Tour
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 lg:pt-0 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-emerald-50" />
      
      {/* Decorative Elements */}
      <div className="absolute top-32 right-0 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Improved Parent Communication
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Where Learning and{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                Communication
              </span>{' '}
              Go Hand in Hand
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Stay connected with your child&apos;s daily adventures, milestones, and growth. 
              Experience transparent, real-time updates that keep you part of every precious moment.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white shadow-xl shadow-teal-600/25 text-lg px-8 py-6">
                Schedule a Tour
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-gray-200 hover:border-teal-300 hover:text-teal-600">
                Check Availability
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-teal-600" />
                Licensed & Insured
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-teal-600" />
                Background Checked Staff
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-teal-600" />
                Daily Updates
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-teal-600/20">
              <img
                src="/images/demos/tiny-steps-learning/hero-image.png"
                alt="Happy children learning and playing at Tiny Steps Learning daycare"
                className="w-full h-auto object-cover"
              />
              {/* Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Stay Connected</p>
                    <p className="text-sm text-gray-500">Real-time updates on your child&apos;s day</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Communication Section (Key Differentiator)
function CommunicationSection() {
  const features = [
    {
      icon: MessageCircle,
      title: 'Daily Updates',
      description: 'Receive detailed daily reports about your child\'s activities, meals, naps, and learning moments.'
    },
    {
      icon: Camera,
      title: 'Photos & Videos',
      description: 'See precious moments throughout the day with secure photo and video sharing.'
    },
    {
      icon: BarChart3,
      title: 'Progress Tracking',
      description: 'Monitor your child\'s developmental milestones and educational progress with detailed reports.'
    },
    {
      icon: Smartphone,
      title: 'Mobile App Access',
      description: 'Stay connected anywhere, anytime with our easy-to-use parent communication app.'
    }
  ]

  return (
    <section id="communication" className="py-20 lg:py-32 bg-gradient-to-b from-white to-teal-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-teal-100 text-teal-700 mb-4 px-4 py-2">
            <MessageCircle className="w-4 h-4 mr-2" />
            Communication First
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Always Know What&apos;s Happening
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We believe parents should never feel disconnected. Our comprehensive communication system 
            keeps you informed, involved, and connected every step of the way.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-teal-600/20">
              <img
                src="/images/demos/tiny-steps-learning/communication-image.png"
                alt="Parent receiving real-time updates about their child"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Features */}
          <div className="order-1 lg:order-2 space-y-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trust Banner */}
        <div className="mt-16 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-8 lg:p-12 text-center text-white">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-6 h-6" />
            <span className="text-lg font-semibold">Stay Connected With Your Child&apos;s Day</span>
          </div>
          <p className="text-teal-100 text-lg max-w-2xl mx-auto">
            Every moment matters. That&apos;s why we ensure you&apos;re always in the loop with secure, 
            instant updates about your child&apos;s care and development.
          </p>
        </div>
      </div>
    </section>
  )
}

// Education Section
function EducationSection() {
  const programs = [
    {
      icon: BookOpen,
      title: 'Early Learning',
      description: 'Age-appropriate curriculum designed to spark curiosity and build foundational skills.'
    },
    {
      icon: Heart,
      title: 'Social Development',
      description: 'Guided play and interaction that builds empathy, sharing, and friendship skills.'
    },
    {
      icon: GraduationCap,
      title: 'School Readiness',
      description: 'Preparing your child for a successful transition to kindergarten and beyond.'
    }
  ]

  return (
    <section id="education" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-emerald-100 text-emerald-700 mb-4 px-4 py-2">
            <GraduationCap className="w-4 h-4 mr-2" />
            Early Education
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Building Bright Futures
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Our play-based learning approach nurtures cognitive development, creativity, and a 
            lifelong love of learning in every child.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Programs */}
          <div className="space-y-6">
            {programs.map((program, index) => (
              <div key={index} className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                  <program.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{program.title}</h3>
                  <p className="text-gray-600">{program.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-emerald-600/20">
              <img
                src="/images/demos/tiny-steps-learning/education-image.png"
                alt="Children engaged in early learning activities"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Why Parents Love Us Section
function WhyParentsLoveUs() {
  const reasons = [
    {
      icon: MessageCircle,
      title: 'Transparent Communication',
      description: 'Never wonder what your child is doing. Get real-time updates throughout the day.'
    },
    {
      icon: Clock,
      title: 'Consistent Updates',
      description: 'Regular photos, progress reports, and daily summaries keep you informed.'
    },
    {
      icon: Shield,
      title: 'Trust & Accountability',
      description: 'Licensed facility with background-checked staff and open-door policy.'
    },
    {
      icon: Heart,
      title: 'Engaged Learning',
      description: 'Children thrive in our nurturing, play-based educational environment.'
    }
  ]

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-teal-50 to-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-teal-100 text-teal-700 mb-4 px-4 py-2">
            <Heart className="w-4 h-4 mr-2" />
            Why Parents Choose Us
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Peace of Mind for Parents
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Parents love knowing their child is safe, learning, and happy. Here&apos;s why families 
            trust Tiny Steps Learning for their childcare needs.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-white">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <reason.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{reason.title}</h3>
                <p className="text-gray-600 text-sm">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Programs Section
function ProgramsSection() {
  const programs = [
    {
      title: 'Infant Care',
      age: '6 weeks - 12 months',
      description: 'Nurturing care that supports early development with personalized attention, tummy time, and sensory exploration.',
      features: ['Individualized schedules', 'Sensory play', 'Daily communication', 'Safe sleep practices']
    },
    {
      title: 'Toddler Program',
      age: '1 - 2 years',
      description: 'Active exploration and discovery through structured play, language development, and social skill building.',
      features: ['Language enrichment', 'Motor skill development', 'Social interaction', 'Creative play']
    },
    {
      title: 'Early Preschool',
      age: '2 - 3 years',
      description: 'Building independence and school readiness through hands-on learning, routines, and collaborative activities.',
      features: ['Early literacy', 'Math concepts', 'Self-help skills', 'Group activities']
    },
    {
      title: 'Preschool',
      age: '3 - 5 years',
      description: 'Comprehensive kindergarten preparation with advanced academic concepts, social-emotional learning, and creative expression.',
      features: ['Kindergarten readiness', 'STEM exploration', 'Arts & creativity', 'Field trips']
    }
  ]

  return (
    <section id="programs" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-emerald-100 text-emerald-700 mb-4 px-4 py-2">
            <Users className="w-4 h-4 mr-2" />
            Our Programs
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Programs for Every Stage
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Age-appropriate programs designed to nurture growth, learning, and development 
            at every stage of your child&apos;s early years.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all group overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                    {program.title}
                  </CardTitle>
                  <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                    {program.age}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {program.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-2 text-sm text-gray-500">
                      <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/25">
            Check Availability
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Parent of 2-year-old',
      quote: "We always know what our child is doing throughout the day. The daily updates and photos give us such peace of mind while we're at work.",
      rating: 5
    },
    {
      name: 'Michael & Jennifer T.',
      role: 'Parents of twins',
      quote: "The communication is exceptional. We get real-time updates about meals, naps, and activities. It feels like we're right there with them.",
      rating: 5
    },
    {
      name: 'Amanda K.',
      role: 'Parent of 3-year-old',
      quote: "I love the progress tracking! Seeing my daughter's developmental milestones and growth has been incredible. Highly recommend!",
      rating: 5
    }
  ]

  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-gradient-to-b from-white to-teal-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-teal-100 text-teal-700 mb-4 px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            Testimonials
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What Parents Are Saying
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what families love about their experience 
            at Tiny Steps Learning.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg bg-white">
              <CardContent className="p-6">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-gray-600 mb-6 italic">&quot;{testimonial.quote}&quot;</p>
                
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Lead Capture Form Section
function LeadCaptureSection() {
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    childAge: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section id="contact" className="py-20 lg:py-32 bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-700">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white">
            <Badge className="bg-white/20 text-white mb-4 px-4 py-2">
              <Send className="w-4 h-4 mr-2" />
              Get Started
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Check Availability Today
            </h2>
            <p className="text-lg md:text-xl text-teal-100 mb-8">
              Ready to give your child the best start? Fill out the form and we&apos;ll reach out 
              with available spots and schedule a tour.
            </p>
            
            {/* Benefits */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-300" />
                <span className="text-white">Quick response within 24 hours</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-300" />
                <span className="text-white">Personalized tour scheduling</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-300" />
                <span className="text-white">We keep you informed every step of the way</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <Card className="border-0 shadow-2xl">
            <CardContent className="p-8">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600">
                    We&apos;ve received your inquiry and will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="parentName">Parent Name</Label>
                      <Input
                        id="parentName"
                        placeholder="Your name"
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="childAge">Child Age</Label>
                      <Input
                        id="childAge"
                        placeholder="Child's age"
                        value={formData.childAge}
                        onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your childcare needs..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white shadow-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Check Availability
                        <Send className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    By submitting, you agree to our privacy policy. We never share your information.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                <Baby className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">Tiny Steps</span>
                <span className="text-xl font-light text-teal-400"> Learning</span>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              An early education center near you, dedicated to nurturing young minds 
              and keeping parents connected every step of the way.
            </p>
            <div className="flex items-center gap-2 text-teal-400">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Licensed & Insured</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#programs" className="text-gray-400 hover:text-white transition-colors">Programs</a></li>
              <li><a href="#communication" className="text-gray-400 hover:text-white transition-colors">Communication</a></li>
              <li><a href="#education" className="text-gray-400 hover:text-white transition-colors">Education</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-teal-400" />
                <span>[Your Location Here]</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-teal-400" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-teal-400" />
                <span>info@tinysteps.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hours of Operation</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span>6:30 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>Closed</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-gray-800 rounded-lg">
              <p className="text-sm text-teal-400 font-medium">
                🌟 Schedule a tour today!
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Tiny Steps Learning. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main Page Component
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      <HeroSection />
      <CommunicationSection />
      <EducationSection />
      <WhyParentsLoveUs />
      <ProgramsSection />
      <TestimonialsSection />
      <LeadCaptureSection />
      <Footer />
    </main>
  )
}
