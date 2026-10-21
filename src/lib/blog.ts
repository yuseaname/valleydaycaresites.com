// Thin delegation shim — canonical blog data lives in src/lib/blog-data.ts
export type { BlogPost } from "@/lib/blog-data";
export { getBlogPost, getBlogPosts } from "@/lib/blog-data";
