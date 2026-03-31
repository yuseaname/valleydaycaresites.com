'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Image from 'next/image'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Star, 
  Shield, 
  Heart, 
  Users, 
  BookOpen, 
  Baby, 
  GraduationCap,
  CalendarDays,
  Award,
  CheckCircle2,
  Menu,
  X,
  ChevronRight,
  Building2,
  Sparkles,
  MessageCircle
} from 'lucide-react'

// Placeholder locations for multi-location finder
const LOCATIONS = [
  { id: '1', name: 'Downtown Center', address: '123 Main Street, Suite 100', phone: '(555) 123-4567', hours: '6:30 AM - 6:30 PM' },
  { id: '2', name: 'Westside Academy', address: '456 Oak Avenue', phone: '(555) 234-5678', hours: '6:00 AM - 7:00 PM' },
  { id: '3', name: 'Northgate Learning', address: '789 Pine Road', phone: '(555) 345-6789', hours: '6:30 AM - 6:00 PM' },
  { id: '4', name: 'Riverside Campus', address: '321 River Drive', phone: '(555) 456-7890', hours: '7:00 AM - 6:30 PM' },
  { id: '5', name: 'Eastside Early Learning', address: '567 Elm Street', phone: '(555) 567-8901', hours: '6:30 AM - 7:00 PM' },
]

const PROGRAMS = [
  {
    title: 'Infant Care',
    ages: '6 weeks - 12 months',
    icon: Baby,
    image: '/images/demos/growing-minds-academy/programs/infant.png',
    description: 'Nurturing environment with individualized care plans, sensory exploration, and secure attachment building.',
    features: ['Low infant-to-caregiver ratio', 'Daily activity reports', 'Safe sleep practices']
  },
  {
    title: 'Toddler Program',
    ages: '1 - 2 years',
    icon: Heart,
    image: '/images/demos/growing-minds-academy/programs/toddler.png',
    description: 'Active exploration and discovery through play-based learning that develops independence and social skills.',
    features: ['Language development', 'Motor skill activities', 'Potty training support']
  },
  {
    title: 'Preschool',
    ages: '3 - 4 years',
    icon: BookOpen,
    image: '/images/demos/growing-minds-academy/programs/preschool.png',
    description: 'School readiness curriculum fostering cognitive, social, and emotional development through structured play.',
    features: ['Pre-literacy skills', 'Math concepts', 'Social-emotional learning']
  },
  {
    title: 'After-School',
    ages: '5 - 12 years',
    icon: GraduationCap,
    image: '/images/demos/growing-minds-academy/programs/afterschool.png',
    description: 'Enriching after-school program with homework help, creative activities, and supervised outdoor play.',
    features: ['Homework assistance', 'Enrichment clubs', 'Transportation from local schools']
  }
]

const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    location: 'Downtown Center',
    rating: 5,
    text: 'The consistency across all Growing Minds locations is remarkable. We moved from the Westside to Downtown, and my daughter transitioned seamlessly because the quality is the same everywhere.',
    childAge: '3 years old'
  },
  {
    name: 'Michael T.',
    location: 'Northgate Learning',
    rating: 5,
    text: 'As a business owner with multiple locations myself, I appreciate how Growing Minds maintains brand consistency. Every center delivers the same professional, caring experience.',
    childAge: '2 years old'
  },
  {
    name: 'Jennifer L.',
    location: 'Riverside Campus',
    rating: 5,
    text: 'The staff at every location is trained to the same high standards. I know exactly what to expect, and my son loves going to school every day.',
    childAge: '4 years old'
  }
]

const TRUST_FACTORS = [
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'All locations feature secure entry systems, background-checked staff, and strict safety protocols.'
  },
  {
    icon: Award,
    title: 'Standardized Quality',
    description: 'Every location follows our proven curriculum and operational standards for consistent excellence.'
  },
  {
    icon: Users,
    title: 'Experienced Educators',
    description: 'Trained teachers across all centers deliver the same high-quality early education experience.'
  },
  {
    icon: CheckCircle2,
    title: 'Proven System',
    description: 'Our scalable approach ensures every child receives the same nurturing care at any location.'
  }
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState('')
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    childAge: '',
    preferredLocation: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({
      parentName: '',
      email: '',
      phone: '',
      childAge: '',
      preferredLocation: '',
      message: ''
    })
    
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50/50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-amber-100">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-200/50">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Growing Minds</h1>
                <p className="text-xs text-amber-600 font-medium tracking-wide">ACADEMY</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('programs')} className="text-gray-600 hover:text-amber-600 font-medium transition-colors">
                Programs
              </button>
              <button onClick={() => scrollToSection('locations')} className="text-gray-600 hover:text-amber-600 font-medium transition-colors">
                Locations
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-600 hover:text-amber-600 font-medium transition-colors">
                Testimonials
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-amber-600 font-medium transition-colors">
                Contact
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button 
                variant="outline" 
                className="border-amber-300 text-amber-700 hover:bg-amber-50"
                onClick={() => scrollToSection('locations')}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Find a Location
              </Button>
              <Button 
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-200/50"
                onClick={() => scrollToSection('contact')}
              >
                Schedule a Tour
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-amber-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-amber-100 pt-4">
              <div className="flex flex-col gap-3">
                <button onClick={() => scrollToSection('programs')} className="text-left py-2 text-gray-600 hover:text-amber-600 font-medium">
                  Programs
                </button>
                <button onClick={() => scrollToSection('locations')} className="text-left py-2 text-gray-600 hover:text-amber-600 font-medium">
                  Locations
                </button>
                <button onClick={() => scrollToSection('testimonials')} className="text-left py-2 text-gray-600 hover:text-amber-600 font-medium">
                  Testimonials
                </button>
                <button onClick={() => scrollToSection('contact')} className="text-left py-2 text-gray-600 hover:text-amber-600 font-medium">
                  Contact
                </button>
                <Separator className="my-2" />
                <Button 
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white w-full"
                  onClick={() => scrollToSection('contact')}
                >
                  Schedule a Tour
                </Button>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-16 md:py-24">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />
            <div className="absolute top-1/2 -right-24 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 left-1/3 w-72 h-72 bg-yellow-200/30 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Hero Content */}
              <div className="max-w-xl">
                {/* Trust Badge */}
                <Badge className="mb-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 px-4 py-2 text-sm font-medium shadow-lg shadow-emerald-200/50">
                  <Building2 className="w-4 h-4 mr-2" />
                  A Growing Network of Trusted Childcare Centers
                </Badge>

                {/* Headline */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Trusted Childcare Across{' '}
                  <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                    Every Location
                  </span>
                </h1>

                {/* Subheadline */}
                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                  Experience the same exceptional care, curriculum, and commitment at any of our locations. 
                  <span className="font-semibold text-gray-800"> Consistent branding, consistent quality, consistent trust.</span>
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-lg px-8 py-6 shadow-xl shadow-amber-200/50"
                    onClick={() => scrollToSection('locations')}
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    Find a Location
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-2 border-amber-400 text-amber-700 hover:bg-amber-50 text-lg px-8 py-6"
                    onClick={() => scrollToSection('contact')}
                  >
                    <CalendarDays className="w-5 h-5 mr-2" />
                    Schedule a Tour
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 md:gap-8">
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl font-bold text-amber-600">5+</p>
                    <p className="text-sm text-gray-600">Locations</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl font-bold text-orange-600">500+</p>
                    <p className="text-sm text-gray-600">Families Served</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl font-bold text-yellow-600">15+</p>
                    <p className="text-sm text-gray-600">Years Experience</p>
                  </div>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative hidden lg:block">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-amber-200/50">
                  <Image
                    src="/images/demos/growing-minds-academy/hero.png"
                    alt="Growing Minds Academy daycare center"
                    width={672}
                    height={384}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent" />
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Licensed & Accredited</p>
                    <p className="text-sm text-gray-500">All locations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Multi-Location Finder */}
        <section id="locations" className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Badge className="mb-4 bg-amber-100 text-amber-800 border-0">
                <MapPin className="w-4 h-4 mr-1" />
                Find a Center Near You
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Choose Your Nearest Location
              </h2>
              <p className="text-gray-600 text-lg">
                Every location offers the same high-quality programs and caring staff. 
                Find the center that&apos;s most convenient for your family.
              </p>
            </div>

            {/* Location Search UI */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-grow">
                    <Label htmlFor="location-search" className="text-gray-700 font-medium mb-2 block">
                      Enter your ZIP code or city
                    </Label>
                    <Input 
                      id="location-search"
                      placeholder="e.g., 90210 or Downtown"
                      className="bg-white border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white w-full sm:w-auto px-8">
                      <MapPin className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Locations Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {LOCATIONS.map((location) => (
                <Card key={location.id} className="group hover:shadow-xl transition-all duration-300 border-amber-100 hover:border-amber-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-200/50">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                    </div>
                    <CardTitle className="text-lg mt-4">{location.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span>{location.address}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span>{location.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span>{location.hours}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4 border-amber-300 text-amber-700 hover:bg-amber-50 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500 transition-all"
                      onClick={() => scrollToSection('contact')}
                    >
                      Schedule Tour
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Location Pages Info */}
            <div className="mt-12 text-center">
              <p className="text-gray-500 text-sm">
                Each location has its own detailed page with staff bios, photo galleries, and specific programs offered.
              </p>
            </div>
          </div>
        </section>

        {/* Brand Consistency Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-emerald-100 text-emerald-800 border-0">
                    <Award className="w-4 h-4 mr-1" />
                    Brand Consistency
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Same Quality Care at Every Location
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    When you choose Growing Minds Academy, you&apos;re choosing a network that maintains consistent standards, 
                    curriculum, and care across all our centers. Your child receives the same exceptional experience, 
                    no matter which location you visit.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Standardized Programs</h4>
                        <p className="text-gray-600">Every location follows our proven curriculum framework</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Trained Staff</h4>
                        <p className="text-gray-600">All educators receive the same comprehensive training</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Consistent Environment</h4>
                        <p className="text-gray-600">Thoughtfully designed spaces that feel familiar at every center</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visual Representation */}
                <div className="relative">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
                        <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                          <BookOpen className="w-6 h-6 text-amber-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Unified Curriculum</h4>
                        <p className="text-sm text-gray-600">Evidence-based learning at all centers</p>
                      </div>
                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                          <Shield className="w-6 h-6 text-emerald-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Safety Standards</h4>
                        <p className="text-sm text-gray-600">Uniform protocols across locations</p>
                      </div>
                    </div>
                    <div className="space-y-4 mt-8">
                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
                        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                          <Users className="w-6 h-6 text-orange-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Staff Training</h4>
                        <p className="text-sm text-gray-600">Centralized development programs</p>
                      </div>
                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
                        <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-4">
                          <Heart className="w-6 h-6 text-teal-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Care Philosophy</h4>
                        <p className="text-sm text-gray-600">Shared values and approach</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Overview */}
        <section id="programs" className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Badge className="mb-4 bg-orange-100 text-orange-800 border-0">
                <GraduationCap className="w-4 h-4 mr-1" />
                Our Programs
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Age-Appropriate Programs for Every Stage
              </h2>
              <p className="text-gray-600 text-lg">
                Our scalable program structure ensures consistent, high-quality early education 
                across all Growing Minds Academy locations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {PROGRAMS.map((program, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-amber-100 hover:border-amber-300 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <Badge className="bg-white/90 text-amber-700 border-0">
                        <program.icon className="w-3 h-3 mr-1" />
                        Ages: {program.ages}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{program.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{program.description}</p>
                    <ul className="space-y-2">
                      {program.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-200/50"
                onClick={() => scrollToSection('contact')}
              >
                Learn More About Our Programs
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Why Parents Trust Us */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Badge className="mb-4 bg-emerald-100 text-emerald-800 border-0">
                <Shield className="w-4 h-4 mr-1" />
                Why Parents Trust Us
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Built on Trust, Designed for Growth
              </h2>
              <p className="text-gray-600 text-lg">
                Our proven system delivers reliable, high-quality childcare across all locations. 
                Parents trust us because we&apos;ve built trust into every aspect of our organization.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {TRUST_FACTORS.map((factor, index) => (
                <Card key={index} className="text-center bg-white/80 backdrop-blur border-emerald-100 hover:shadow-lg transition-all">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-200/50">
                      <factor.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{factor.title}</h3>
                    <p className="text-gray-600 text-sm">{factor.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Badge className="mb-4 bg-amber-100 text-amber-800 border-0">
                <MessageCircle className="w-4 h-4 mr-1" />
                Parent Testimonials
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Our Families Say
              </h2>
              <p className="text-gray-600 text-lg">
                Hear from parents across our locations about their consistent, positive experiences 
                with Growing Minds Academy.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {TESTIMONIALS.map((testimonial, index) => (
                <Card key={index} className="relative overflow-hidden border-amber-100 hover:shadow-lg transition-all">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-100 to-transparent rounded-bl-full" />
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 italic">&quot;{testimonial.text}&quot;</p>
                    <Separator className="mb-4" />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">Child: {testimonial.childAge}</p>
                      </div>
                      <Badge variant="outline" className="border-amber-200 text-amber-700">
                        <MapPin className="w-3 h-3 mr-1" />
                        {testimonial.location}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-500 italic">
                &quot;Every location delivers the same experience&quot; - A common theme in our parent feedback
              </p>
            </div>
          </div>
        </section>

        {/* Lead Capture Form */}
        <section id="contact" className="py-16 md:py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Form Info */}
                <div>
                  <Badge className="mb-4 bg-orange-100 text-orange-800 border-0">
                    <CalendarDays className="w-4 h-4 mr-1" />
                    Check Availability
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Ready to Join Our Family?
                  </h2>
                  <p className="text-gray-600 text-lg mb-8">
                    Fill out the form to check availability at your preferred location. 
                    Our team will contact you within 24 hours to schedule a tour and discuss enrollment options.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Call Us</p>
                        <p className="font-semibold text-gray-900">(555) 123-GROW</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email Us</p>
                        <p className="font-semibold text-gray-900">hello@growingminds.academy</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Office Hours</p>
                        <p className="font-semibold text-gray-900">Mon-Fri: 6:30 AM - 6:30 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <Card className="border-amber-100 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
                    <CardTitle>Check Availability</CardTitle>
                    <CardDescription className="text-amber-100">
                      We&apos;ll reach out within 24 hours
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {submitSuccess ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-4">
                          <CheckCircle2 className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                        <p className="text-gray-600">
                          We&apos;ve received your inquiry and will contact you within 24 hours to discuss enrollment options.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="parentName">Parent/Guardian Name</Label>
                            <Input 
                              id="parentName"
                              value={formData.parentName}
                              onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                              placeholder="Your name"
                              required
                              className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                            />
                          </div>
                          <div>
                            <Label htmlFor="childAge">Child&apos;s Age</Label>
                            <Input 
                              id="childAge"
                              value={formData.childAge}
                              onChange={(e) => setFormData({...formData, childAge: e.target.value})}
                              placeholder="e.g., 3 years"
                              required
                              className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                            />
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              placeholder="your@email.com"
                              required
                              className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input 
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              placeholder="(555) 123-4567"
                              required
                              className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="preferredLocation">Preferred Location</Label>
                          <Select 
                            value={formData.preferredLocation} 
                            onValueChange={(value) => setFormData({...formData, preferredLocation: value})}
                          >
                            <SelectTrigger className="border-amber-200 focus:border-amber-400 focus:ring-amber-400">
                              <SelectValue placeholder="Select a location" />
                            </SelectTrigger>
                            <SelectContent>
                              {LOCATIONS.map((location) => (
                                <SelectItem key={location.id} value={location.id}>
                                  {location.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="message">Questions or Comments</Label>
                          <Textarea 
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            placeholder="Tell us about your childcare needs..."
                            rows={3}
                            className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                          />
                        </div>
                        <Button 
                          type="submit"
                          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-200/50"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="animate-pulse">Submitting...</span>
                            </>
                          ) : (
                            <>
                              Check Availability
                              <ChevronRight className="w-5 h-5 ml-2" />
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Growing Minds</h3>
                  <p className="text-xs text-amber-400 font-medium tracking-wide">ACADEMY</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                A growing network of trusted childcare centers delivering consistent, high-quality care across all locations.
              </p>
              <div className="flex gap-3">
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                  <Shield className="w-3 h-3 mr-1" />
                  Licensed
                </Badge>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                  <Award className="w-3 h-3 mr-1" />
                  Accredited
                </Badge>
              </div>
            </div>

            {/* Locations */}
            <div>
              <h4 className="font-semibold mb-4">Our Locations</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {LOCATIONS.map((location) => (
                  <li key={location.id}>
                    <button className="hover:text-amber-400 transition-colors flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {location.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h4 className="font-semibold mb-4">Programs</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {PROGRAMS.map((program, index) => (
                  <li key={index}>
                    <button className="hover:text-amber-400 transition-colors">
                      {program.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-500" />
                  <span>(555) 123-GROW</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-500" />
                  <span>hello@growingminds.academy</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>Mon-Fri: 6:30 AM - 6:30 PM</span>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="bg-gray-800 mb-8" />

          {/* Bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>© 2024 Growing Minds Academy. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <button className="hover:text-amber-400 transition-colors">Privacy Policy</button>
              <button className="hover:text-amber-400 transition-colors">Terms of Service</button>
              <button className="hover:text-amber-400 transition-colors">Accessibility</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
