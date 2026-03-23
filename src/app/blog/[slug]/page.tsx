import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { ArrowLeft, Calendar } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found | Valley Daycare Sites",
    };
  }

  return {
    title: `${post.title} | Valley Daycare Sites`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 lg:py-16 bg-muted/20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <Badge
              variant="outline"
              className="mb-4 px-3 py-1 text-sm border-primary/30 text-primary bg-primary/5"
            >
              {post.category}
            </Badge>

            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              {post.title}
            </h1>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <article className="prose prose-lg prose-slate dark:prose-invert max-w-none">
              {post.content.split("\n\n").map((paragraph, index) => {
                // Handle headers
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2
                      key={index}
                      className="font-display text-xl sm:text-2xl font-semibold text-foreground mt-8 mb-4"
                    >
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }

                // Handle bold text within paragraphs
                const formattedParagraph = paragraph.replace(
                  /\*\*(.*?)\*\*/g,
                  "<strong>$1</strong>"
                );

                // Handle bullet lists
                if (paragraph.includes("\n- ")) {
                  const items = paragraph.split("\n- ").filter(Boolean);
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                      {items.map((item, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                      ))}
                    </ul>
                  );
                }

                return (
                  <p
                    key={index}
                    className="text-muted-foreground leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{ __html: formattedParagraph }}
                  />
                );
              })}
            </article>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-muted/20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground mb-4">
              Ready for Your Free Sample?
            </h2>
            <p className="text-muted-foreground mb-8">
              See what a professional website can do for your daycare. Get a custom homepage sample within 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="gradient-sage text-primary-foreground hover:opacity-90 shadow-premium-glow"
              >
                <Link href="/#contact">Get Your Free Sample</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/blog" className="gap-2">
                  Read More Articles
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
