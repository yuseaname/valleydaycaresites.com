import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Demo Daycare Websites | Valley Daycare Sites',
  description:
    'Browse six example daycare websites built by Valley Daycare Sites. See live demos of styles for large centers, family daycares, preschools, and more.',
}

const demos = [
  {
    name: 'Bright Start Academy',
    type: 'Large Center Demo',
    image: '/images/demos/bright-start-academy.png',
    imageAlt:
      'Bright Start Academy daycare website demo with programs section and warm sage color theme',
    link: '/demos/bright-start-academy',
  },
  {
    name: 'Little Hearts Daycare',
    type: 'Family Daycare Demo',
    image: '/images/demos/little-hearts-daycare.png',
    imageAlt:
      'Little Hearts Daycare family daycare website demo with daily schedule section',
    link: '/demos/little-hearts-daycare',
  },
  {
    name: 'Sunshine Learning Center',
    type: 'Preschool Demo',
    image: '/images/demos/sunshine-learning-center.png',
    imageAlt:
      'Sunshine Learning Center preschool website demo with amber orange theme and tour booking',
    link: '/demos/sunshine-learning-center',
  },
  {
    name: 'Growing Minds Academy',
    type: 'Multi-location Demo',
    image: '/images/demos/growing-minds-academy.png',
    imageAlt:
      'Growing Minds Academy multi-location childcare center website demo with location finder',
    link: '/demos/growing-minds-academy',
  },
  {
    name: 'Happy Kids Childcare',
    type: 'Home Daycare Demo',
    image: '/images/demos/happy-kids-childcare.png',
    imageAlt:
      'Happy Kids Childcare home daycare website demo with purple theme and contact form',
    link: '/demos/happy-kids-childcare',
  },
  {
    name: 'Tiny Steps Learning',
    type: 'Early Education Demo',
    image: '/images/demos/tiny-steps-learning.png',
    imageAlt: 'Tiny Steps Learning early education website demo with teal theme',
    link: '/demos/tiny-steps-learning',
  },
]

export default function DemosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-16 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge
              variant="outline"
              className="px-3 py-1 text-sm border-primary/30 text-primary bg-primary/5"
            >
              Demos
            </Badge>
            <h1 className="mt-6 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground">
              See Our Demo Websites
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore six example daycare websites we have built, each tailored
              to a different kind of childcare business. Click any demo to see
              the full site in action.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {demos.map((d) => (
                <Link key={d.link} href={d.link} className="group block">
                  <Card className="overflow-hidden pt-0 gap-0">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={d.image}
                        alt={d.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-5 sm:p-6">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        {d.type}
                      </p>
                      <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                        {d.name}
                      </h3>
                      <span className="mt-4 inline-flex items-center gap-1 text-primary font-medium">
                        View Demo
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
