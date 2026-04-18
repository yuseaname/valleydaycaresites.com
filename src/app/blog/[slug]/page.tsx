import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Clock, User } from "lucide-react";
import { blogPosts, getBlogPost } from "@/lib/blog-data";
import fs from "fs";
import path from "path";

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  
  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      images: [post.image],
    },
  };
}

// Read markdown content
function getMarkdownContent(slug: string): string {
  try {
    const filePath = path.join(process.cwd(), "content/blog", `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, "utf8");
    // Remove frontmatter
    const content = fileContent.replace(/^---[\s\S]*?---/, "").trim();
    return content;
  } catch {
    return "";
  }
}

// Simple markdown to HTML conversion
function markdownToHtml(markdown: string): string {
  let html = markdown;
  
  // Headers
  html = html.replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold text-foreground mt-8 mb-4">$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">$1</h2>');
  html = html.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-foreground mt-6 mb-6">$1</h1>');
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>');
  
  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Images (must come before links)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<figure class="my-8"><img src="$2" alt="$1" class="w-full rounded-xl shadow-md" loading="lazy" /><figcaption class="text-center text-sm text-muted-foreground mt-2">$1</figcaption></figure>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>');
  
  // Lists
  html = html.replace(/^- (.*$)/gm, '<li class="text-muted-foreground ml-4">$1</li>');
  html = html.replace(/^(\d+)\. (.*$)/gm, '<li class="text-muted-foreground ml-4">$2</li>');
  
  // Paragraphs
  html = html.replace(/\n\n/g, '</p><p class="text-muted-foreground leading-relaxed mb-4">');
  
  // Blockquotes
  html = html.replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">$1</blockquote>');
  
  // Code blocks
  html = html.replace(/```([\s\S]*?)```/g, '<pre class="bg-muted p-4 rounded-lg overflow-x-auto my-4"><code>$1</code></pre>');
  
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm">$1</code>');
  
  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="my-8 border-border" />');

  // Wrap consecutive <li> in <ul>
  html = html.replace(/((?:<li[^>]*>.*?<\/li>\s*)+)/gs, '<ul class="space-y-2 my-4">$1</ul>');

  // Details/Summary (expandable sections)
  html = html.replace(/<details>/g, '<details class="my-6 border border-border rounded-lg p-4 bg-muted/20">');
  html = html.replace(/<summary>(.*?)<\/summary>/g, '<summary class="cursor-pointer font-semibold text-foreground hover:text-primary transition-colors">$1</summary>');

  // Pass through raw HTML tags (details, summary, figure, img, etc.)
  // These are already valid HTML, just let them through
  
  return html;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  
  if (!post) {
    notFound();
  }

  const markdownContent = getMarkdownContent(slug);
  const htmlContent = markdownToHtml(markdownContent);
  
  // Get related posts (excluding current)
  const relatedPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 3);

  return (
    <main className="min-h-screen">
      <Header />
      
      <article className="pt-24 pb-16">
        {/* Hero */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/#blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
          
          <Badge variant="outline" className="mb-4 px-3 py-1 text-sm border-primary/30 text-primary bg-primary/5">
            {post.category}
          </Badge>
          
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-6">
            {post.title}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-6">
            {post.description}
          </p>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Valley Daycare Sites</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
          </div>
        </div>
        
        {/* Featured Image */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="aspect-[21/9] relative rounded-2xl overflow-hidden bg-muted">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        
        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
          
          <Separator className="my-12" />
          
          {/* CTA */}
          <div className="bg-muted/30 rounded-2xl p-8 text-center">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
              Ready to Transform Your Daycare Website?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Get a free sample homepage designed specifically for your daycare. No upfront cost, no pressure.
            </p>
            <Button size="lg" asChild className="gradient-forest text-primary-foreground hover:opacity-90">
              <Link href="/#contact">
                Get Your Free Sample
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </article>
      
      {/* Related Posts */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-8 text-center">
            Related Articles
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                <Card className="border-border bg-card overflow-hidden card-hover group h-full">
                  <div className="aspect-[16/9] bg-muted/30 relative overflow-hidden">
                    <Image 
                      src={relatedPost.image}
                      alt={relatedPost.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="outline" className="text-xs mb-2">{relatedPost.category}</Badge>
                    <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{relatedPost.excerpt}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}