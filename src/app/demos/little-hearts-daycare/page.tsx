'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Heart,
  Clock,
  Shield,
  Baby,
  BookOpen,
  Utensils,
  Moon,
  Gamepad2,
  Phone,
  Mail,
  MapPin,
  Star,
  CheckCircle,
  Award,
  Users,
  Sparkles,
  Menu,
  X,
  ChevronRight,
  MessageCircle
} from 'lucide-react'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    childAge: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({ parentName: '', email: '', phone: '', childAge: '', message: '' })
    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground fill-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-foreground">Little Hearts</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Family Daycare</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">About</a>
              <a href="#programs" className="text-foreground hover:text-primary transition-colors font-medium">Programs</a>
              <a href="#testimonials" className="text-foreground hover:text-primary transition-colors font-medium">Testimonials</a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">Contact</a>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
                Schedule a Visit
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border animate-in slide-in-from-top-5">
              <div className="flex flex-col gap-4">
                <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium py-2" onClick={() => setMobileMenuOpen(false)}>About</a>
                <a href="#programs" className="text-foreground hover:text-primary transition-colors font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Programs</a>
                <a href="#testimonials" className="text-foreground hover:text-primary transition-colors font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
                <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Contact</a>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-full">
                  Schedule a Visit
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* DEMO BANNER */}
      <div className="bg-amber-100 border-b border-amber-200 text-center py-2.5 px-4">
        <p className="text-sm font-semibold text-amber-800">
          Demo Website -- For Demonstration Only
        </p>
      </div>

      {/* Hero Section */}
      <section className="relative bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <Badge className="bg-secondary text-secondary-foreground mb-4 sm:mb-6 px-4 py-1.5 text-sm font-medium rounded-full">
                <Sparkles className="w-4 h-4 mr-1" />
                A Home Away From Home
              </Badge>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-4 sm:mb-6 text-shadow-warm">
                A Loving, Safe Place for Your Child to{' '}
                <span className="text-primary">Grow</span>
              </h1>
              
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Small group care in a warm, nurturing home environment. Your little one deserves 
                personal attention, love, and a place where they truly belong.
              </p>

              {/* Urgency Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6 sm:mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Only a few spots available for enrollment
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 text-base sm:text-lg shadow-lg shadow-primary/25">
                  Schedule a Visit
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5 rounded-full px-8 text-base sm:text-lg">
                  Check Availability
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-8 sm:mt-10">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Licensed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">CPR Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Small Groups</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative order-1 lg:order-2">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl transform rotate-3" />
                <img
                  src="/images/demos/little-hearts-daycare/hero-daycare.png"
                  alt="Warm and welcoming daycare environment"
                  className="relative rounded-3xl shadow-2xl w-full object-cover"
                />
                
                {/* Floating Card */}
                <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white rounded-2xl shadow-xl p-4 sm:p-5 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 sm:w-6 sm:h-6 text-primary fill-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Example Trust Signal (Demo)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Trust Section */}
      <section id="about" className="py-16 sm:py-20 lg:py-28 bg-warm-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Caregiver Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl transform -rotate-3" />
              <img
                src="/images/demos/little-hearts-daycare/caregiver.png"
                alt="Sarah - Your dedicated caregiver"
                className="relative rounded-3xl shadow-xl w-full max-w-md mx-auto object-cover"
              />
              
              {/* Experience Badge */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-white rounded-2xl shadow-xl p-4 sm:p-5">
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-bold text-primary">10+</p>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </div>
              </div>

              {/* Certification Badge */}
              <div className="absolute -bottom-4 left-4 sm:-bottom-6 sm:left-6 bg-white rounded-2xl shadow-xl p-3 sm:p-4">
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-foreground">CPR & First Aid</p>
                    <p className="text-xs text-muted-foreground">Certified</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="text-center lg:text-left">
              <Badge className="bg-primary/10 text-primary-foreground mb-4 sm:mb-6 px-4 py-1.5 text-sm font-medium rounded-full">
                Meet Your Caregiver
              </Badge>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                Hi, I&apos;m Sarah — Your Child&apos;s Second Mom
              </h2>
              
              <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">
                With over 10 years of experience in childcare, I&apos;ve dedicated my life to creating 
                a nurturing, safe environment where children can thrive. Every child who walks 
                through my door becomes part of our family.
              </p>

              <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed">
                I believe in the power of small group care. With fewer children, I can give each 
                little one the individual attention, love, and guidance they deserve during these 
                precious early years.
              </p>

              {/* Certifications */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8">
                <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-border">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-2 sm:mb-3" />
                  <h4 className="font-semibold text-foreground text-sm sm:text-base">Licensed</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">State Certified Facility</p>
                </div>
                <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-border">
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-2 sm:mb-3" />
                  <h4 className="font-semibold text-foreground text-sm sm:text-base">CPR Certified</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Pediatric First Aid</p>
                </div>
                <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-border">
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-2 sm:mb-3" />
                  <h4 className="font-semibold text-foreground text-sm sm:text-base">Early Education</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Child Development Training</p>
                </div>
                <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-border">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-2 sm:mb-3" />
                  <h4 className="font-semibold text-foreground text-sm sm:text-base">Background Checked</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">FBI & State Verified</p>
                </div>
              </div>

              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8">
                Get to Know Me Better
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Parents Choose Us */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="bg-secondary text-secondary-foreground mb-4 px-4 py-1.5 text-sm font-medium rounded-full">
              Why Little Hearts
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6">
              Why Parents Choose Us
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Small group care means big love. Here&apos;s what makes our family daycare special.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: Users,
                title: 'Small Groups',
                description: 'Maximum 6 children means your little one gets the attention they deserve.',
                color: 'bg-primary/10 text-primary'
              },
              {
                icon: Heart,
                title: 'Loving Care',
                description: 'Every child is treated like family in our warm, nurturing home environment.',
                color: 'bg-secondary text-secondary-foreground'
              },
              {
                icon: Shield,
                title: 'Safe & Secure',
                description: 'Child-proofed home, secure outdoor play area, and constant supervision.',
                color: 'bg-accent text-accent-foreground'
              },
              {
                icon: MessageCircle,
                title: 'Open Communication',
                description: 'Daily updates, photos, and an open-door policy for peace of mind.',
                color: 'bg-primary/10 text-primary'
              }
            ].map((item, index) => (
              <Card key={index} className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl overflow-hidden">
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">{item.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Routine Section */}
      <section id="programs" className="py-16 sm:py-20 lg:py-28 bg-warm-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1">
              <Badge className="bg-primary/10 text-primary-foreground mb-4 sm:mb-6 px-4 py-1.5 text-sm font-medium rounded-full">
                Daily Schedule
              </Badge>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                A Day Filled with Love & Learning
              </h2>
              
              <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed">
                We follow a gentle routine that provides structure while remaining flexible 
                to each child&apos;s needs. Every day is an adventure in learning and fun!
              </p>

              {/* Timeline */}
              <div className="space-y-4 sm:space-y-6">
                {[
                  { time: '7:30 AM', activity: 'Welcome & Free Play', icon: Gamepad2, desc: 'Gentle arrival and settling in' },
                  { time: '9:00 AM', activity: 'Circle Time & Learning', icon: BookOpen, desc: 'Songs, stories, and educational activities' },
                  { time: '10:00 AM', activity: 'Snack Time', icon: Utensils, desc: 'Nutritious snacks provided' },
                  { time: '10:30 AM', activity: 'Outdoor Play', icon: Heart, desc: 'Fresh air and physical activity' },
                  { time: '12:00 PM', activity: 'Lunch Time', icon: Utensils, desc: 'Home-cooked, healthy meals' },
                  { time: '1:00 PM', activity: 'Nap / Quiet Time', icon: Moon, desc: 'Rest and rejuvenation' },
                  { time: '3:00 PM', activity: 'Creative Play', icon: Sparkles, desc: 'Arts, crafts, and imagination' },
                  { time: '5:30 PM', activity: 'Pickup Time', icon: Heart, desc: 'Sharing the day\'s adventures' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="w-16 sm:w-20 flex-shrink-0 text-right">
                      <span className="text-xs sm:text-sm font-semibold text-primary">{item.time}</span>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-md flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div className="flex-1 bg-white rounded-xl p-3 sm:p-4 shadow-sm group-hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-foreground text-sm sm:text-base">{item.activity}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative order-1 lg:order-2">
              <img
                src="/images/demos/little-hearts-daycare/children-playing.png"
                alt="Children enjoying daily activities"
                className="rounded-3xl shadow-xl w-full object-cover"
              />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-4 right-4 sm:-bottom-6 sm:right-6 bg-white rounded-2xl shadow-xl p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-foreground">Flexible Hours</p>
                    <p className="text-xs text-muted-foreground">7:30 AM - 5:30 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="bg-primary/10 text-primary-foreground mb-4 px-4 py-1.5 text-sm font-medium rounded-full">
              Demo Website -- Layout Example
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6">
              What Your Website Could Look Like
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              This is an example layout for a home daycare website -- warm colors, simple navigation, tour request form. Built to highlight your unique value.
            </p>
            <p className="text-xs text-muted-foreground mt-2 italic">
              Demo Website -- all content shown is for demonstration purposes only.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: 'Sample Name',
                child: 'Example Parent',
                quote: "Example testimonial -- feel free to request a free sample to see how your website could look."
              },
              {
                name: 'Sample Name',
                child: 'Example Parents',
                quote: "Example testimonial -- feel free to request a free sample to see how your website could look."
              },
              {
                name: 'Sample Name',
                child: 'Example Parent',
                quote: "Example testimonial -- feel free to request a free sample to see how your website could look."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow rounded-2xl overflow-hidden">
                <CardContent className="p-6 sm:p-8">
                  <p className="text-xs font-semibold text-muted-foreground/50 uppercase tracking-wide mb-4">Sample Demo Content</p>

                  <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-base sm:text-lg font-semibold text-primary">S</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm sm:text-base">{testimonial.name}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.child}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-center mt-8">
            All examples shown are for demonstration purposes only.
            Your website will be built with your real content and details.
          </p>
        </div>
      </section>
      <section className="py-16 sm:py-20 lg:py-28 bg-warm-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="bg-secondary text-secondary-foreground mb-4 px-4 py-1.5 text-sm font-medium rounded-full">
              Program Details
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6">
              Everything Your Child Needs
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Thoughtfully designed programs for children ages 6 weeks to 5 years.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {/* Ages */}
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                  <Baby className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 sm:mb-4">Ages Accepted</h3>
                <ul className="space-y-3">
                  {['Infants (6 weeks - 12 months)', 'Toddlers (1 - 2 years)', 'Preschoolers (3 - 5 years)'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm sm:text-base text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Hours */}
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-secondary rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                  <Clock className="w-7 h-7 sm:w-8 sm:h-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 sm:mb-4">Hours of Care</h3>
                <ul className="space-y-3">
                  {['Monday - Friday', '7:30 AM - 5:30 PM', 'Full-time & Part-time options', 'Flexible scheduling available'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm sm:text-base text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Meals */}
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-accent rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                  <Utensils className="w-7 h-7 sm:w-8 sm:h-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 sm:mb-4">Meals & Snacks</h3>
                <ul className="space-y-3">
                  {['Nutritious breakfast', 'Healthy lunch', 'Morning & afternoon snacks', 'Accommodates dietary needs'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm sm:text-base text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Lead Capture / Contact Form */}
      <section id="contact" className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Form */}
            <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardContent className="p-6 sm:p-8 lg:p-10">
                <Badge className="bg-primary/10 text-primary-foreground mb-4 px-4 py-1.5 text-sm font-medium rounded-full">
                  Limited Spots Available
                </Badge>
                
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 sm:mb-3">
                  Check Availability
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>

                {submitSuccess ? (
                  <div className="bg-secondary/50 rounded-2xl p-6 sm:p-8 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">Thank You!</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      We&apos;ll be in touch soon to discuss availability for your little one.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    <div>
                      <Label htmlFor="parentName" className="text-sm font-medium text-foreground">Parent/Guardian Name</Label>
                      <Input
                        id="parentName"
                        type="text"
                        placeholder="Your name"
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        required
                        className="mt-1.5 sm:mt-2 rounded-xl border-border h-10 sm:h-12"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="mt-1.5 sm:mt-2 rounded-xl border-border h-10 sm:h-12"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-sm font-medium text-foreground">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                          className="mt-1.5 sm:mt-2 rounded-xl border-border h-10 sm:h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="childAge" className="text-sm font-medium text-foreground">Child&apos;s Age</Label>
                      <Select value={formData.childAge} onValueChange={(value) => setFormData({ ...formData, childAge: value })}>
                        <SelectTrigger className="mt-1.5 sm:mt-2 rounded-xl border-border h-10 sm:h-12">
                          <SelectValue placeholder="Select age range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="infant">Infant (6 weeks - 12 months)</SelectItem>
                          <SelectItem value="toddler">Toddler (1 - 2 years)</SelectItem>
                          <SelectItem value="preschool">Preschooler (3 - 5 years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-sm font-medium text-foreground">Message (Optional)</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your childcare needs..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                        className="mt-1.5 sm:mt-2 rounded-xl border-border resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-5 sm:py-6 text-base sm:text-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-pulse">Sending...</span>
                        </>
                      ) : (
                        <>
                          Check Availability
                          <ChevronRight className="w-5 h-5 ml-1" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs sm:text-sm text-muted-foreground text-center">
                      <Shield className="w-4 h-4 inline mr-1" />
                      Your information is safe and will never be shared.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Info */}
            <div className="flex flex-col justify-center">
              <div className="mb-8 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                  Ready to Give Your Child the Best Start?
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  We understand choosing childcare is one of the most important decisions you&apos;ll 
                  make. Let&apos;s chat about how we can provide a safe, loving home for your little one.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-4 bg-muted rounded-2xl p-4 sm:p-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm sm:text-base">Call or Text</h4>
                    <p className="text-sm sm:text-base text-muted-foreground">(555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-muted rounded-2xl p-4 sm:p-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm sm:text-base">Email Us</h4>
                    <p className="text-sm sm:text-base text-muted-foreground">hello@littleheartsdaycare.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-muted rounded-2xl p-4 sm:p-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm sm:text-base">Location</h4>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      A safe, loving home daycare near you.<br />
                      Contact us for the exact address.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 sm:mt-10 p-4 sm:p-6 bg-primary/5 rounded-2xl border border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  <h4 className="font-semibold text-foreground text-sm sm:text-base">Schedule a Visit</h4>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  Come see our warm, nurturing space in person. We&apos;d love to meet you and your little one!
                </p>
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5 rounded-full">
                  Book a Tour
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 lg:py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
            Your Child Deserves a Loving Start
          </h2>
          <p className="text-base sm:text-lg opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join our family at Little Hearts Daycare. Limited spots are available — 
            secure your child&apos;s place today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-8 text-base sm:text-lg">
              Schedule a Visit
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8 text-base sm:text-lg">
              Check Availability
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 sm:gap-10 mb-8 sm:mb-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground fill-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold">Little Hearts</h3>
                  <p className="text-xs sm:text-sm opacity-70">Family Daycare</p>
                </div>
              </div>
              <p className="text-sm sm:text-base opacity-80 max-w-md mb-6">
                A loving, safe home daycare where every child is treated like family. 
                Small group care with big hearts — that&apos;s the Little Hearts difference.
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="text-xs sm:text-sm">Licensed</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="text-xs sm:text-sm">CPR Certified</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="text-xs sm:text-sm">Background Checked</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 sm:mb-6 text-sm sm:text-base">Quick Links</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li><a href="#about" className="text-sm sm:text-base opacity-80 hover:opacity-100 transition-opacity">About Us</a></li>
                <li><a href="#programs" className="text-sm sm:text-base opacity-80 hover:opacity-100 transition-opacity">Programs</a></li>
                <li><a href="#testimonials" className="text-sm sm:text-base opacity-80 hover:opacity-100 transition-opacity">Testimonials</a></li>
                <li><a href="#contact" className="text-sm sm:text-base opacity-80 hover:opacity-100 transition-opacity">Contact</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4 sm:mb-6 text-sm sm:text-base">Contact Us</h4>
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="text-sm sm:text-base opacity-80">(555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="text-sm sm:text-base opacity-80">hello@littleheartsdaycare.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm sm:text-base opacity-80">Mon - Fri</p>
                    <p className="text-sm sm:text-base opacity-80">7:30 AM - 5:30 PM</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs sm:text-sm opacity-70">
                © {new Date().getFullYear()} Little Hearts Daycare. All rights reserved.
              </p>
              <p className="text-xs sm:text-sm opacity-70">
                Family Daycare near you • Safe childcare in your area
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* DEMO DISCLAIMER */}
      <div className="bg-gray-100 border-t border-gray-200 text-center py-4 px-4">
        <p className="text-xs text-gray-500">
          This is a demo site -- all content shown is for demonstration purposes only.
        </p>
      </div>
    </div>
  )
}
