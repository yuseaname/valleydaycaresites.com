import Link from "next/link";
import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getBlogPosts } from "@/lib/blog";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Resources for Daycare Owners | Valley Daycare Sites",
  description: "Tips, insights, and strategies to help your daycare succeed online. Expert guidance on website design, trust building, and enrollment.",
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge
                variant="outline"
                className="mb-4 px-3 py-1 text-sm border-primary/30 text-primary bg-primary/5"
              >
                Blog
              </Badge>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
                Resources for Daycare Owners
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tips, insights, and strategies to help your daycare succeed online.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="border-border bg-card overflow-hidden card-hover group cursor-pointer h-full">
                    {/* Blog Image */}
                    <div className="aspect-[16/9] bg-muted/30 relative">
                      <Image
                        src={post.image}
                        alt={post.imageAlt || post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="outline" className="text-xs mb-2">
                        {post.category}
                      </Badge>
                      <h2 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-muted/20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground mb-4">
              Ready to Transform Your Daycare&apos;s Online Presence?
            </h2>
            <p className="text-muted-foreground mb-8">
              Get a free sample homepage designed specifically for your daycare within 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="gradient-forest text-primary-foreground hover:opacity-90 shadow-premium-glow"
              >
                <Link href="/#contact">Get Your Free Sample</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
