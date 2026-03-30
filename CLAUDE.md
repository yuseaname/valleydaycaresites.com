# Valley Daycare Sites

A daycare website design service with an integrated marketing site, lead management agent, payment processing, and customer onboarding pipeline. Daycare center owners can request a free sample homepage, then subscribe to a $50/month hosted website service.

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Runtime | Bun | 1.x | Fast JavaScript runtime and package manager |
| Framework | Next.js | 16.x | React framework with App Router |
| Language | TypeScript | 5.x | Type-safe JavaScript (strict mode, noImplicitAny disabled) |
| UI Components | shadcn/ui | - | Radix-based component library (new-york style) |
| Styling | Tailwind CSS | 4.x | Utility-first CSS with custom brand theme |
| Database | SQLite (Prisma) | 6.x | User data, leads, orders, onboarding tasks |
| Auth | NextAuth | 4.x | Authentication framework |
| Payments | Stripe | 21.x | Checkout sessions, subscriptions, webhooks |
| Email | Emailit API | - | Transactional emails (notifications, confirmations) |
| Animations | Framer Motion | 12.x | Page and component animations |
| State | Zustand | 5.x | Client state management |
| Forms | react-hook-form + Zod | 7.x / 4.x | Form handling and validation |

## Quick Start

```bash
# Prerequisites: Bun 1.x (recommended) or Node.js 18+

# Installation
bun install

# Development
bun dev                    # Starts on port 3000 with webpack

# Database
bun run db:push            # Push schema changes
bun run db:generate        # Generate Prisma client
bun run db:migrate         # Create and apply migrations
bun run db:reset           # Reset database

# Production
bun run build              # Build standalone output
bun run start              # Start production server

# Linting
bun run lint
```

## Project Structure

```
valleydaycaresites.com/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Main landing page (single-page app)
│   │   ├── layout.tsx            # Root layout, fonts, metadata, analytics
│   │   ├── globals.css           # Global styles, CSS variables, theme
│   │   ├── payment/page.tsx      # Payment/checkout page
│   │   ├── privacy/page.tsx      # Privacy policy
│   │   ├── refund/page.tsx       # Refund policy
│   │   ├── terms/page.tsx        # Terms of service
│   │   └── api/
│   │       ├── route.ts          # Health check API
│   │       ├── contact/route.ts  # Contact form → lead creation + emails
│   │       ├── outreach/route.ts # Cold outreach endpoint
│   │       ├── payment/route.ts  # Stripe checkout + free sample flow
│   │       ├── webhooks/
│   │       │   ├── stripe/route.ts   # Stripe webhook handler
│   │       │   └── unibee/route.ts   # Unibee webhook handler
│   │       └── agent/
│   │           ├── email/route.ts    # Email analysis endpoint
│   │           ├── leads/route.ts    # CRUD for leads
│   │           └── followups/route.ts# Follow-up management
│   ├── components/
│   │   ├── header.tsx            # Fixed navigation with mobile menu
│   │   ├── footer.tsx            # Footer with links and legal
│   │   ├── scroll-animate.tsx    # Scroll-triggered animations
│   │   └── ui/                   # 40+ shadcn/ui components
│   ├── hooks/
│   │   ├── use-toast.ts          # Toast notification system
│   │   └── use-mobile.ts         # Mobile detection hook
│   └── lib/
│       ├── utils.ts              # cn() utility for class merging
│       ├── db.ts                 # Prisma client singleton
│       ├── emailit.ts            # Emailit API client for emails
│       ├── notifications.ts      # Onboarding notification emails
│       ├── onboarding.ts         # Customer onboarding logic
│       └── agent/
│           ├── index.ts          # Agent barrel exports
│           ├── types.ts          # Lead types, constants, indicators
│           └── core.ts           # Lead analysis + response generation
├── prisma/
│   └── schema.prisma             # Database schema (10 models)
├── content/
│   └── blog/                     # Blog content (MDX)
├── public/
│   ├── images/                   # Static images
│   ├── logo.svg                  # Site logo
│   └── robots.txt                # SEO robots file
├── db/                           # SQLite database file location
├── .zscripts/                    # Build and deployment shell scripts
├── .claude/skills/               # 9 project-specific skills
├── components.json               # shadcn/ui configuration
├── tailwind.config.ts            # Tailwind theme and CSS variables
├── next.config.ts                # Standalone output, relaxed TS
├── Caddyfile                     # Caddy reverse proxy (port 81 → 3000)
└── .env                          # Environment variables
```

## Architecture Overview

### Marketing Site (Single-Page)

The public-facing site is a single-page application with smooth scroll navigation between sections:

```
Header (fixed, scroll-aware) → Hero → About → Services → Pricing → Process → Portfolio → FAQ → Blog → Contact → Footer
```

The root layout (`layout.tsx`) is a Server Component. Interactive sections use `"use client"`. Google Analytics and Rybbit analytics are loaded via `<Script>` with `strategy="afterInteractive"`.

### Growth Agent (Lead Management)

A keyword-based lead classification and response system in `src/lib/agent/`:

1. **Email Analysis** (`analyzeEmail`) — Classifies incoming emails by scanning for daycare keywords and intent indicators. Assigns temperature: HOT (ready to buy), WARM (interested), COLD (browsing).
2. **Response Generation** (`generateResponse`) — Produces templated email replies tailored to lead temperature.
3. **Follow-up Sequences** (`generateFollowUp`) — Day 1 / 3 / 7 follow-up cadence with pre-written messages.
4. **Lead CRUD** — REST API at `/api/agent/leads` for creating, querying, and updating leads.

The agent does NOT use LLM calls — it uses deterministic keyword matching with weighted scoring.

### Payment & Onboarding Pipeline

```
Contact Form → Lead Creation → Free Sample OR Stripe Checkout
                                       ↓
                              Stripe Webhook → Order Update
                                       ↓
                              Onboarding Tasks (SAMPLE_CREATION / WEBSITE_SETUP)
                                       ↓
                              Welcome Email + Admin Notification
```

- **Free Sample** (`FREE_SAMPLE` plan): No payment, creates order with `PENDING_SAMPLE` status
- **Monthly Hosting** (`MONTHLY_HOSTING` plan): $50/month via Stripe Checkout Session
- **Webhooks**: `/api/webhooks/stripe` handles `checkout.session.completed`, `invoice.paid`, `invoice.payment_failed`, `subscription.updated`, `subscription.deleted`

### Email System

Transactional emails are sent via the Emailit API (`src/lib/emailit.ts`):
- **Admin notifications** — New contact form submissions, new orders
- **User confirmations** — Sample request confirmations, welcome emails
- **Onboarding notifications** — Welcome email + admin alert for new orders

## Database Schema

10 models in Prisma/SQLite:

| Model | Purpose | Key Fields |
|-------|---------|------------|
| User | Customer accounts | email, name, phone, daycareName, address |
| Post | Blog posts (basic) | title, content, published |
| Lead | Potential customers | email, temperature (HOT/WARM/COLD), status, daycareType |
| Conversation | Email threads with leads | leadId, subject |
| Message | Individual emails | direction, content, classification, suggestedReply |
| FollowUp | Scheduled follow-ups | leadId, scheduledAt, sequenceDay, status |
| Order | Customer orders/subscriptions | plan, status, stripeId, amount |
| OnboardingTask | Setup tracking | type (SAMPLE_CREATION/WEBSITE_SETUP), status, priority |

## Development Guidelines

### File Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | kebab-case | `header.tsx`, `scroll-animate.tsx` |
| UI Components | kebab-case | `button.tsx`, `dropdown-menu.tsx` |
| Hooks | kebab-case with `use-` prefix | `use-toast.ts`, `use-mobile.ts` |
| Utilities | kebab-case | `utils.ts`, `db.ts`, `emailit.ts` |
| API Routes | kebab-case folders | `api/contact/route.ts`, `api/agent/leads/route.ts` |
| Pages | lowercase (Next.js) | `page.tsx`, `layout.tsx` |

### Code Naming

| Identifier | Convention | Example |
|------------|------------|---------|
| React Components | PascalCase | `Header`, `Footer`, `ScrollAnimate` |
| Functions | camelCase | `handleNavClick`, `analyzeEmail`, `generateResponse` |
| Variables | camelCase | `isScrolled`, `temperature`, `notificationResult` |
| Constants | SCREAMING_SNAKE_CASE | `TOAST_LIMIT`, `HOT_LEAD_INDICATORS`, `SERVICES` |
| Hooks | camelCase with `use` prefix | `useToast`, `useMobile` |
| Booleans | is/has prefix | `isDaycareOwner`, `shouldFollowUp`, `isScrolled` |
| Types/Interfaces | PascalCase | `LeadData`, `EmailAnalysis`, `ContactFormData` |

### Import Order

```typescript
// 1. React/Next.js
import { useState, useEffect } from "react";
import { NextRequest, NextResponse } from "next/server";
// 2. External packages
import Stripe from "stripe";
import { z } from "zod";
// 3. Internal modules (@/ alias)
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { analyzeEmail } from "@/lib/agent";
// 4. Types (with type keyword)
import type { LeadTemperature, LeadStatus } from "@/lib/agent/types";
import type { Metadata } from "next";
```

### Component Pattern

```typescript
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ComponentProps {
  className?: string;
}

export function Component({ className }: ComponentProps) {
  const [state, setState] = useState(false);
  return <div className={cn("base-classes", className)} />;
}
```

### API Route Pattern

```typescript
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Validate input
    // Process
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "..." }, { status: 500 });
  }
}
```

### Styling

- Tailwind utility classes via `cn()` for conditional merging
- Custom gradient classes: `gradient-sage`, `gradient-warm`, `gradient-gold`, `gradient-hero`
- Custom shadows: `shadow-premium`, `shadow-premium-lg`, `shadow-premium-glow`
- Text gradients: `text-gradient-sage`, `text-gradient-gold`
- Dark mode: class-based (`darkMode: "class"`)
- Fonts: Playfair Display (headings), Inter (body)

### Brand Colors (CSS Variables)

| Name | Light | Dark | Usage |
|------|-------|------|-------|
| background | #FFFEF9 (ivory) | #1F2421 | Page background |
| foreground | #2D2D2D (charcoal) | #F5F0E8 | Text color |
| primary | #7A9172 (sage) | #9CAF94 | Buttons, accents |
| secondary | #F5F0E8 (soft sand) | #2D332F | Secondary backgrounds |
| accent | #D4C5A9 (champagne) | #8BA888 | Highlights |

## Available Commands

| Command | Description |
|---------|-------------|
| `bun dev` | Start dev server on port 3000 (webpack) |
| `bun run build` | Build for production (standalone + copy static/public) |
| `bun run start` | Start production server with logging |
| `bun run lint` | Run ESLint |
| `bun run db:push` | Push Prisma schema to SQLite |
| `bun run db:generate` | Generate Prisma client |
| `bun run db:migrate` | Create and run migrations |
| `bun run db:reset` | Reset database |

## Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | Yes | SQLite database path | `file:./db/valleydaycaresites.db` |
| `NEXTAUTH_SECRET` | Yes | Auth encryption secret | Random string |
| `NEXTAUTH_URL` | Yes | App URL for auth callbacks | `http://localhost:3000` |
| `EMAILIT_API_KEY` | Yes | Emailit API key for emails | `secret_...` |
| `EMAILIT_FROM_EMAIL` | No | Sender email address | `contact@valleydaycaresites.com` |
| `EMAILIT_FROM_NAME` | No | Sender display name | `Valley Daycare Sites` |
| `EMAILIT_NOTIFY_EMAIL` | Yes | Admin notification email | `admin@example.com` |
| `STRIPE_SECRET_KEY` | No | Stripe secret key (optional for dev) | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | No | Stripe webhook signing secret | `whsec_...` |
| `STRIPE_PRICE_FREE_SAMPLE` | No | Stripe price ID for free sample | `price_...` |
| `STRIPE_PRICE_MONTHLY_HOSTING` | No | Stripe price ID for $50/mo plan | `price_...` |

## Deployment

- **Build**: `output: "standalone"` — produces self-contained server in `.next/standalone/`
- **Reverse Proxy**: Caddy serves on port 81, proxies to Next.js on port 3000
- **Start**: `NODE_ENV=production bun .next/standalone/server.js`
- **Build scripts**: Located in `.zscripts/` (`dev.sh`, `start.sh`, etc.)

## Configuration Notes

- TypeScript build errors ignored (`ignoreBuildErrors: true`) for development speed
- React strict mode disabled (`reactStrictMode: false`)
- ESLint heavily relaxed — most rules set to `"off"` (see `eslint.config.mjs`)
- Path alias: `@/*` maps to `./src/*`
- Prisma singleton pattern prevents multiple instances during hot reload

## Testing

No tests currently exist. When adding tests:
- Use Vitest or Jest with React Testing Library
- Co-locate tests (`*.test.ts`) or use `__tests__/` directories
- Prioritize API route tests (contact, payment, agent) and agent logic tests

## Analytics & Integrations

- **Google Analytics**: Measurement ID `G-B3MMTHE85C`
- **Rybbit Analytics**: Site ID `5001`
- **Consolto Widget**: Customer communication platform (`data-widgetid` in layout)
