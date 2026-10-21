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
    image: "/images/blog/what-parents-notice-first-daycare-website-hero.png",
    imageAlt: "Split-screen comparison of outdated vs modern daycare website on mobile",
    excerpt: "The key elements that shape a parent's first impression — and how to optimize each one.",
    date: "2026-03-28",
  },
  {
    slug: "how-to-make-daycare-website-trustworthy",
    title: "How to Make Your Daycare Website Look More Trustworthy",
    description: "Build instant credibility with proven trust-building strategies for your daycare website that convert visitors into enrollments.",
    category: "Trust Building",
    image: "/images/blog/how-to-make-daycare-website-trustworthy-hero.png",
    imageAlt: "Concerned mother reviewing daycare website on laptop",
    excerpt: "Build instant credibility with these proven trust-building strategies for your website.",
    date: "2026-03-28",
  },
  {
    slug: "outdated-website-hurts-enrollment",
    title: "Why an Outdated Website Can Hurt Daycare Enrollment",
    description: "Understanding the hidden costs of an old website and what you can do about it to protect your enrollment numbers.",
    category: "Enrollment",
    image: "/images/blog/outdated-website-hurts-enrollment-hero.png",
    imageAlt: "Rundown daycare entrance with faded signage",
    excerpt: "Understanding the hidden costs of an old website and what you can do about it.",
    date: "2026-03-28",
  },
  {
    slug: "best-photos-childcare-website",
    title: "Best Photos to Use on Your Childcare Website",
    description: "A guide to selecting and using images that showcase your daycare professionally and authentically.",
    category: "Content",
    image: "/images/blog/best-photos-childcare-website-hero.png",
    imageAlt: "Same daycare hallway: outdated vs beautifully renovated",
    excerpt: "A guide to selecting and using images that showcase your daycare professionally.",
    date: "2026-03-28",
  },
  {
    slug: "daycare-website-must-haves-2026",
    title: "Daycare Website Must-Haves for 2026: The Complete Checklist",
    description: "Everything your daycare website needs in 2026 to convert visitors into enrollments. Mobile-first design, parent portals, and 20 essential elements.",
    category: "Trends",
    image: "/images/blog/daycare-website-must-haves-2026-hero.png",
    imageAlt: "Daycare website evolution timeline from 2015 to 2026",
    excerpt: "Stay ahead with these essential features every modern daycare website needs.",
    date: "2026-03-28",
  },
  {
    slug: "mobile-matters-why-parents-browse-phones",
    title: "Mobile Matters: Why Parents Browse on Phones",
    description: "How to ensure your website works perfectly for mobile-first parents who search for daycare on their phones.",
    category: "Mobile",
    image: "/images/blog/mobile-matters-why-parents-browse-phones-hero.png",
    imageAlt: "Parent browsing daycare websites on smartphone",
    excerpt: "How to ensure your website works perfectly for mobile-first parents.",
    date: "2026-03-28",
  },
  {
    slug: "daycare-website-cost-2026",
    title: "Daycare Website Cost in 2026: What You Should Actually Pay",
    description: "Complete breakdown of daycare website costs in 2026 — from free builders to professional design. Learn what features you actually need and what's a waste of money.",
    category: "Website Cost",
    image: "/images/blog/daycare-website-cost-2026-hero.png",
    imageAlt: "Daycare Website Cost in 2026: What You Should Actually Pay",
    excerpt: "Complete breakdown of daycare website costs in 2026, from free builders to pro design.",
    date: "2026-04-15",
  },
  {
    slug: "free-vs-professional-daycare-website",
    title: "Free vs Professional Daycare Website Design: Which Actually Gets You More Enrollment?",
    description: "Honest comparison of free website builders vs professional daycare web design. See real examples of what works and what costs you students.",
    category: "Website Design",
    image: "/images/blog/free-vs-professional-daycare-website-hero.png",
    imageAlt: "Free vs Professional Daycare Website Design: Which Actually Gets You More Enrollment?",
    excerpt: "Honest comparison of free website builders vs professional daycare web design.",
    date: "2026-04-15",
  },
  {
    slug: "hidden-costs-cheap-daycare-websites",
    title: "7 Hidden Costs of Cheap Daycare Websites That Come Back to Bite You",
    description: "Discover the hidden costs of budget daycare websites — from lost enrollment to emergency redesigns. Learn what expensive mistakes to avoid.",
    category: "Website Cost",
    image: "/images/blog/hidden-costs-cheap-daycare-websites-hero.png",
    imageAlt: "7 Hidden Costs of Cheap Daycare Websites That Come Back to Bite You",
    excerpt: "The hidden costs of budget daycare websites, from lost enrollment to emergency fixes.",
    date: "2026-04-15",
  },
  {
    slug: "local-seo-guide-daycares-2026",
    title: "Local SEO for Daycares in 2026: The Complete Guide to Getting Found on Google",
    description: "Step-by-step local SEO guide for daycare centers. Learn how to rank on Google Maps, optimize your website, and attract more local families.",
    category: "Local SEO",
    image: "/images/blog/local-seo-guide-daycares-2026-hero.png",
    imageAlt: "Local SEO for Daycares in 2026: The Complete Guide to Getting Found on Google",
    excerpt: "Step-by-step local SEO guide for daycare centers to rank on Google Maps.",
    date: "2026-04-15",
  },
  {
    slug: "google-business-profile-daycare-setup",
    title: "How to Set Up Google Business Profile for Your Daycare (Step-by-Step)",
    description: "Complete walkthrough for setting up and optimizing your daycare's Google Business Profile. Get found on Google Maps and attract more local families.",
    category: "Local SEO",
    image: "/images/blog/google-business-profile-daycare-setup-hero.png",
    imageAlt: "How to Set Up Google Business Profile for Your Daycare (Step-by-Step)",
    excerpt: "Complete walkthrough for setting up your daycare's Google Business Profile.",
    date: "2026-04-15",
  },
  {
    slug: "how-to-get-5-star-daycare-reviews",
    title: "How to Get More 5-Star Reviews for Your Daycare (Without Being Pushy)",
    description: "Proven strategies to get more positive reviews for your daycare center. Learn ethical, effective ways to build your online reputation.",
    category: "Reputation Management",
    image: "/images/blog/how-to-get-5-star-daycare-reviews-hero.png",
    imageAlt: "How to Get More 5-Star Reviews for Your Daycare (Without Being Pushy)",
    excerpt: "Proven strategies to get more positive reviews for your daycare center.",
    date: "2026-04-15",
  },
];

// Helper to get a single post by slug
export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

// Helper to get all posts sorted by date descending
export function getBlogPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
