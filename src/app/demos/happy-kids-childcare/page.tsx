'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  ShieldCheck,
  Heart,
  Clock,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Award,
  Baby,
  BookOpen,
  Utensils,
  Moon,
  Gamepad2,
  CheckCircle,
  Sparkles,
  Users,
  Calendar,
  Send,
  Loader2
} from 'lucide-react'
import Image from 'next/image'
import { useToast } from '@/hooks/use-toast'

export default function Home() {
  const [formData, setFormData] = useState({
    parentName: '',
    childAge: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast({
          title: "Thank you for your inquiry!",
          description: "We'll get back to you within 24 hours.",
        })
        setFormData({ parentName: '', childAge: '', email: '', phone: '', message: '' })
      } else {
        throw new Error('Failed to submit')
      }
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
              <Baby className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Happy Kids Childcare</h1>
              <p className="text-xs text-gray-500">Home Daycare (Demo)</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-sm text-gray-600 hover:text-gray-900 transition">About</a>
            <a href="#routine" className="text-sm text-gray-600 hover:text-gray-900 transition">Daily Routine</a>
            <a href="#why-us" className="text-sm text-gray-600 hover:text-gray-900 transition">Why Choose Us</a>
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
              <a href="#contact">Check Availability</a>
            </Button>
          </div>
          <Button asChild className="md:hidden bg-emerald-600 hover:bg-emerald-700">
            <a href="#contact">Contact</a>
          </Button>
        </div>
      </header>

      {/* DEMO BANNER */}
      <div className="bg-amber-100 border-b border-amber-200 text-center py-2.5 px-4">
        <p className="text-sm font-semibold text-amber-800">
          Demo Website -- For Demonstration Only
        </p>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 px-4 py-1">
              <Sparkles className="w-4 h-4 mr-1" />
              Licensed Home Daycare
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              A Safe Home Daycare You Can Rely On (Demo)
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Professional childcare in a warm, nurturing environment where your child will learn, play, and grow. 
              Licensed, CPR certified, and dedicated to giving your little one the best care possible.
            </p>
            <p className="text-emerald-600 font-medium italic">
              "Helping families find safe, reliable childcare they can trust (Demo)"
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8">
                <a href="#contact">
                  <Calendar className="w-5 h-5 mr-2" />
                  Check Availability
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                <a href="#about">
                  Learn More
                </a>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-2xl transform rotate-3"></div>
            <Image
              src="/images/demos/happy-kids-childcare/hero-daycare.png"
              alt="Bright, clean daycare playroom with educational toys"
              width={672}
              height={384}
              className="relative rounded-2xl shadow-xl object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="bg-white py-12 border-y">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center gap-4 p-6 bg-emerald-50 rounded-xl">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
                <Award className="w-7 h-7 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Licensed Provider</h3>
                <p className="text-sm text-gray-600">State licensed home daycare</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 p-6 bg-red-50 rounded-xl">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                <Heart className="w-7 h-7 text-red-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">CPR Certified</h3>
                <p className="text-sm text-gray-600">First Aid & CPR trained</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 p-6 bg-amber-50 rounded-xl">
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center">
                <Clock className="w-7 h-7 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">10+ Years Experience</h3>
                <p className="text-sm text-gray-600">Dedicated childcare professional</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 md:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-200 to-emerald-200 rounded-2xl transform -rotate-3"></div>
              <Image
                src="/images/demos/happy-kids-childcare/care-provider.png"
                alt="Professional daycare provider"
                width={512}
                height={512}
                className="relative rounded-2xl shadow-xl object-cover"
              />
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <Badge variant="outline" className="border-emerald-600 text-emerald-600">
                Meet Your Care Provider
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Dedicated to Your Child&apos;s Wellbeing
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Hi, I&apos;m the proud owner and provider of Happy Kids Childcare. With over 10 years of experience 
                  working with children of all ages, I understand the trust you place in a childcare provider.
                </p>
                <p>
                  My passion for childcare started early, and I&apos;ve dedicated my career to creating a safe, 
                  nurturing environment where children can thrive. Every child is unique, and I take pride in 
                  providing personalized attention to help each one grow and develop.
                </p>
                <p>
                  Safety is my top priority. Beyond being licensed and CPR certified, I maintain a clean, 
                  organized space and follow strict health protocols. Parents consistently tell me they feel 
                  confident knowing their children are in caring, professional hands.
                </p>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm text-gray-700">Background Checked</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm text-gray-700">Fingerprinted</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm text-gray-700">Insured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="border-emerald-600 text-emerald-600 mb-4">
              Why Parents Choose Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              A Daycare That Feels Like Home
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Parents trust us because we provide more than just childcare—we provide peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Safe Environment</h3>
                <p className="text-gray-600 text-sm">
                  Child-proofed space with secure entry, safety gates, and constant supervision.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Clean & Organized</h3>
                <p className="text-gray-600 text-sm">
                  Daily sanitization, organized play areas, and healthy environment maintained.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Reliable Schedule</h3>
                <p className="text-gray-600 text-sm">
                  Consistent hours and structured routines you can count on every day.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Open Communication</h3>
                <p className="text-gray-600 text-sm">
                  Daily updates, photos, and always available to discuss your child&apos;s progress.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Daily Routine Section */}
      <section id="routine" className="py-16 md:py-24 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="border-emerald-600 text-emerald-600 mb-4">
              Daily Routine
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Structured Learning & Play
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A balanced daily schedule that promotes learning, creativity, and healthy development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Learning Time</h3>
                  <p className="text-gray-600 text-sm">Age-appropriate activities including letters, numbers, colors, and shapes through fun games and songs.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Gamepad2 className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Play Time</h3>
                  <p className="text-gray-600 text-sm">Supervised indoor and outdoor play with educational toys, arts and crafts, and social activities.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Utensils className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Meals & Snacks</h3>
                  <p className="text-gray-600 text-sm">Nutritious, balanced meals and snacks provided. We accommodate dietary restrictions and allergies.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Moon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Rest Time</h3>
                  <p className="text-gray-600 text-sm">Quiet nap time in a peaceful, comfortable environment with individual sleeping arrangements.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/demos/happy-kids-childcare/children-playing.png"
                alt="Children playing happily in daycare"
                width={672}
                height={384}
                className="rounded-2xl shadow-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="border-emerald-600 text-emerald-600 mb-4">
              Demo Website -- Layout Example
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Families Choose Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              This is an example layout for a home daycare website -- warm colors, simple navigation, tour request form. Built to highlight your unique value.
            </p>
            <p className="text-xs text-gray-400 mt-2 italic">
              Demo Website -- all content shown is for demonstration purposes only.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-8">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Licensed & Insured</h3>
                <p className="text-gray-600 text-sm">Fully licensed facility with comprehensive insurance, background-checked staff, and strict safety protocols for your peace of mind.</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="pt-8">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Small Class Sizes</h3>
                <p className="text-gray-600 text-sm">Low teacher-to-child ratios ensure every child gets individual attention, personalized care, and the support they need to thrive.</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="pt-8">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Age-Appropriate Curriculum</h3>
                <p className="text-gray-600 text-sm">Research-based learning activities tailored to each developmental stage, from infant sensory play to preschool readiness skills.</p>
              </CardContent>
            </Card>
          </div>

          <p className="text-xs text-gray-400 text-center mt-8">
            All examples shown are for demonstration purposes only.
            Your website will be built with your real content and details.
          </p>
        </div>
      </section>
      <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-emerald-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <Badge className="bg-white/20 text-white border-0">
                <Users className="w-4 h-4 mr-1" />
                Limited Spots Available
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Check Availability Today
              </h2>
              <p className="text-emerald-100 text-lg">
                Ready to find the perfect childcare solution for your family? Fill out the form and 
                we&apos;ll get back to you within 24 hours to discuss availability and schedule a tour.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-200" />
                  <span>No obligation inquiry</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-200" />
                  <span>Schedule a personal tour</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-200" />
                  <span>Meet the care provider</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-200" />
                  <span>Ask all your questions</span>
                </div>
              </div>
            </div>

            <Card className="shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Save Your Spot</CardTitle>
                <p className="text-center text-gray-500 text-sm">Quick response guaranteed</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                    <Input
                      id="parentName"
                      required
                      value={formData.parentName}
                      onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="childAge">Child&apos;s Age *</Label>
                    <Input
                      id="childAge"
                      required
                      value={formData.childAge}
                      onChange={(e) => setFormData({...formData, childAge: e.target.value})}
                      placeholder="e.g., 2 years old"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Questions or Comments</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us about your childcare needs..."
                      rows={3}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-lg py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Check Availability
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-center text-gray-500">
                    We respect your privacy. Your information will never be shared.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Local SEO Section */}
      <section className="py-12 bg-gray-50 border-y">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Home Daycare Near You (Demo)
          </h3>
          <p className="text-gray-600">
            Looking for a safe daycare in your area? Happy Kids Childcare is a childcare provider (Demo) 
            offering professional, licensed home daycare services. Families from surrounding communities 
            choose us for our nurturing environment, experienced care, and commitment to each child&apos;s 
            development. Contact us today to learn about availability for your family.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                  <Baby className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold">Happy Kids Childcare</h4>
                  <p className="text-xs text-gray-400">Home Daycare (Demo)</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Providing safe, nurturing childcare in a professional home environment. 
                Licensed, CPR certified, and dedicated to your child&apos;s growth.
              </p>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-gray-800 text-gray-300 border-0">
                  <Award className="w-3 h-3 mr-1" /> Licensed
                </Badge>
                <Badge variant="secondary" className="bg-gray-800 text-gray-300 border-0">
                  <Heart className="w-3 h-3 mr-1" /> CPR Certified
                </Badge>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Hours of Care</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-white">7:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-gray-500">Closed</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-gray-500">Closed</span>
                </div>
              </div>
              <Separator className="my-4 bg-gray-700" />
              <p className="text-sm text-gray-400">
                Flexible scheduling available. Contact us to discuss your needs.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-emerald-400" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <span>info@happykidschildcare.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <span>Your Area, USA</span>
                </div>
              </div>
              <Button asChild className="mt-4 bg-emerald-600 hover:bg-emerald-700 w-full">
                <a href="#contact">Check Availability</a>
              </Button>
            </div>
          </div>

          <Separator className="bg-gray-700 mb-6" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Happy Kids Childcare. All rights reserved.</p>
            <p>Helping families find safe, reliable childcare (Demo)</p>
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
