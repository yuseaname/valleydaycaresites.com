"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <Badge variant="outline" className="mb-6">
            404
          </Badge>

          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            Page not found
          </h1>

          <p className="text-muted-foreground mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have moved or no longer exists.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/">Back to Home</Link>
            </Button>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact us
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}