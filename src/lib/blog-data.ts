// Blog post type definition
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  imageAlt: string;
  excerpt: string;
  date: string;
}

// Blog posts data - matches content/blog/*.md files
export const blogPosts: BlogPost[] = [
  {
    slug: "what-parents-notice-first-daycare-website",
    title: "What Parents Notice First on a Daycare Website (And Why It Matters)",
    description: "Discover the key elements parents evaluate in the first 3 seconds on your daycare website. Learn what makes them stay or leave.",
    category: "Website Design",
    image: "/images/blog/parents-first-impression-daycare-website-hero.webp",
    imageAlt: "Parent's hands holding smartphone viewing a daycare website on screen with warm natural lighting",
    excerpt: "Discover the key elements that shape a parent's first impression and learn how to optimize them.",
    date: "2026-03-28",
  },
  {
    slug: "how-to-make-daycare-website-trustworthy",
    title: "How to Make Your Daycare Website Look More Trustworthy",
    description: "Build instant credibility with proven trust-building strategies for your daycare website that convert visitors into enrollments.",
    category: "Trust Building",
    image: "/images/blog/trustworthy-daycare-website-design-hero.webp",
    imageAlt: "Professional daycare website design showcasing trust elements like testimonials and certifications",
    excerpt: "Build instant credibility with these proven trust-building strategies for your website.",
    date: "2026-03-28",
  },
  {
    slug: "outdated-website-hurts-enrollment",
    title: "Why an Outdated Website Can Hurt Daycare Enrollment",
    description: "Understanding the hidden costs of an old website and what you can do about it to protect your enrollment numbers.",
    category: "Enrollment",
    image: "/images/blog/outdated-vs-modern-daycare-website-hero.webp",
    imageAlt: "Side by side comparison of outdated and modern daycare website designs",
    excerpt: "Understanding the hidden costs of an old website and what you can do about it.",
    date: "2026-03-28",
  },
  {
    slug: "best-photos-childcare-website",
    title: "Best Photos to Use on Your Childcare Website",
    description: "A guide to selecting and using images that showcase your daycare professionally and authentically.",
    category: "Content",
    image: "/images/blog/professional-daycare-photography-tips-hero.webp",
    imageAlt: "Professional photographer capturing authentic moments at a daycare center",
    excerpt: "A guide to selecting and using images that showcase your daycare professionally.",
    date: "2026-03-28",
  },
  {
    slug: "daycare-website-must-haves-2026",
    title: "Daycare Website Must-Haves for 2026: The Complete Checklist",
    description: "Everything your daycare website needs in 2026 to convert visitors into enrollments. Mobile-first design, parent portals, and 20 essential elements.",
    category: "Trends",
    image: "/images/blog/daycare-website-essential-features-2026-hero.webp",
    imageAlt: "Futuristic daycare technology interface showing modern website features checklist",
    excerpt: "Stay ahead with these essential features every modern daycare website needs.",
    date: "2026-03-28",
  },
  {
    slug: "mobile-matters-why-parents-browse-phones",
    title: "Mobile Matters: Why Parents Browse on Phones",
    description: "How to ensure your website works perfectly for mobile-first parents who search for daycare on their phones.",
    category: "Mobile",
    image: "/images/blog/parents-browsing-daycare-websites-mobile-hero.webp",
    imageAlt: "Parent browsing daycare websites on smartphone while multitasking",
    excerpt: "How to ensure your website works perfectly for mobile-first parents.",
    date: "2026-03-28",
  },
];

// Helper to get a single post by slug
export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}