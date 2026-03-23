# Valley Daycare Sites

A premium marketing website for a daycare website design service. Built as a single-page application with smooth scroll navigation, showcasing services, pricing, portfolio, and contact information for daycare center owners looking to improve their online presence.

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Runtime | Bun | 1.x | Fast JavaScript runtime and package manager |
| Framework | Next.js | 16.x | React framework with App Router |
| Language | TypeScript | 5.x | Type-safe JavaScript (strict mode enabled, noImplicitAny disabled) |
| UI Components | shadcn/ui | - | Radix-based component library (new-york style) |
| Styling | Tailwind CSS | 4.x | Utility-first CSS with custom brand theme |
| Database | SQLite (Prisma) | 6.x | Lightweight database for user data |
| Auth | NextAuth | 4.x | Authentication framework |
| Animations | Framer Motion | 12.x | Page and component animations |
| Icons | Lucide React | 0.x | Icon library |
| State | Zustand | 5.x | Client state management |

## Quick Start

```bash
# Prerequisites
# - Bun 1.x (recommended) or Node.js 18+
# - SQLite3

# Installation
bun install

# Development
bun dev

# Build for production
bun run build

# Start production server
bun run start

# Database operations
bun run db:push      # Push schema changes to database
bun run db:generate  # Generate Prisma client
bun run db:migrate   # Create and apply migrations
bun run db:reset     # Reset database

# Linting
bun run lint
```

## Project Structure

```
site/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main landing page (single-page app)
│   │   ├── layout.tsx        # Root layout with fonts and metadata
│   │   ├── globals.css       # Global styles, theme, animations
│   │   └── api/
│   │       └── route.ts      # API endpoint example
│   ├── components/
│   │   ├── header.tsx        # Navigation header with mobile menu
│   │   ├── footer.tsx        # Site footer with links
│   │   ├── scroll-animate.tsx # Scroll-triggered animations
│   │   └── ui/               # shadcn/ui components (40+ components)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       └── ...
│   ├── hooks/
│   │   ├── use-toast.ts      # Toast notification system
│   │   └── use-mobile.ts     # Mobile detection hook
│   └── lib/
│       ├── utils.ts          # cn() utility for class merging
│       └── db.ts             # Prisma client singleton
├── prisma/
│   └── schema.prisma         # Database schema (User, Post models)
├── public/
│   ├── images/               # Static images
│   ├── logo.svg              # Site logo
│   └── robots.txt            # SEO robots file
├── db/                       # SQLite database file location
├── .zscripts/                # Build and deployment scripts
├── components.json           # shadcn/ui configuration
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
├── next.config.ts            # Next.js configuration (standalone output)
├── Caddyfile                 # Caddy reverse proxy config
└── .env                      # Environment variables
```

## Architecture Overview

This is a **single-page marketing website** built with Next.js App Router. The entire site is rendered as one page with smooth scroll navigation between sections.

### Key Architecture Decisions

1. **Single Page Application**: All content sections (Hero, About, Services, Pricing, Process, Portfolio, FAQ, Blog, Contact) are on the main page with anchor-based navigation.

2. **Server/Client Split**: The root layout is a Server Component, while interactive sections use `"use client"` directive for state and event handling.

3. **Prisma Singleton Pattern**: Database client uses a global singleton to prevent multiple instances during development hot reloads.

4. **Standalone Output**: Next.js configured for standalone deployment (`output: "standalone"`) for containerized production builds.

5. **Path Alias**: `@/*` maps to `./src/*` for clean imports.

### Section Flow

```
┌─────────────────────────────────────────────────────────────┐
│  Header (fixed, scroll-aware background)                    │
├─────────────────────────────────────────────────────────────┤
│  Hero (#home)        → Main value prop + CTA                │
│  About (#about)      → Company story                        │
│  Services (#services)→ Offerings grid                       │
│  Pricing (#pricing)  → Pricing tiers                        │
│  Process (#process)  → Step-by-step workflow                │
│  Portfolio (#portfolio)→ Work samples                       │
│  FAQ (#faq)          → Accordion Q&A                        │
│  Blog (#blog)        → Article previews                     │
│  Contact (#contact)  → Contact form + info                  │
├─────────────────────────────────────────────────────────────┤
│  Footer            → Links, social, legal                   │
└─────────────────────────────────────────────────────────────┘
```

## Development Guidelines

### File Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | kebab-case | `header.tsx`, `scroll-animate.tsx` |
| UI Components | kebab-case | `button.tsx`, `dropdown-menu.tsx` |
| Hooks | kebab-case with `use-` prefix | `use-toast.ts`, `use-mobile.ts` |
| Utilities | kebab-case | `utils.ts`, `db.ts` |
| Pages | lowercase (Next.js convention) | `page.tsx`, `layout.tsx` |

### Code Naming

| Identifier | Convention | Example |
|------------|------------|---------|
| React Components | PascalCase | `Header`, `Footer`, `ScrollAnimate` |
| Functions | camelCase | `handleNavClick`, `getInitialTransform` |
| Variables | camelCase | `isScrolled`, `navigation` |
| Constants | SCREAMING_SNAKE_CASE | `TOAST_LIMIT`, `TOAST_REMOVE_DELAY` |
| Hooks | camelCase with `use` prefix | `useToast`, `useMobile` |
| Boolean variables | is/has prefix | `isOpen`, `isScrolled`, `isVisible` |

### Import Order

```typescript
// 1. React/Next.js
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// 2. External packages
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

// 3. Internal components
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

// 4. Utilities and types
import { cn } from "@/lib/utils";
```

### Component Structure

```typescript
"use client";  // Required for client components

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ComponentProps {
  className?: string;
  // ... props
}

export function Component({ className, ...props }: ComponentProps) {
  const [state, setState] = useState(initialState);

  // Event handlers
  const handleClick = () => { /* ... */ };

  return (
    <div className={cn("base-classes", className)}>
      {/* JSX */}
    </div>
  );
}
```

### Styling

- Use Tailwind utility classes primarily
- Use `cn()` utility to merge conditional classes
- Custom gradient classes available: `gradient-sage`, `gradient-warm`, `gradient-gold`, `gradient-hero`
- Custom shadow classes: `shadow-premium`, `shadow-premium-lg`, `shadow-premium-glow`
- Text gradients: `text-gradient-sage`, `text-gradient-gold`

### Brand Colors (CSS Variables)

| Name | Light Mode | Dark Mode | Usage |
|------|------------|-----------|-------|
| background | #FFFEF9 (ivory) | #1F2421 | Page background |
| foreground | #2D2D2D (charcoal) | #F5F0E8 | Text color |
| primary | #7A9172 (sage) | #9CAF94 | Buttons, accents |
| secondary | #F5F0E8 (soft sand) | #2D332F | Secondary backgrounds |
| muted | #F5F0E8 | #2D332F | Muted backgrounds |
| accent | #D4C5A9 (champagne) | #8BA888 | Highlights |
| border | #E8DFD4 (warm beige) | #3A423D | Borders |

## Available Commands

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server on port 3000 |
| `bun run build` | Build for production (standalone) |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |
| `bun run db:push` | Push Prisma schema to database |
| `bun run db:generate` | Generate Prisma client |
| `bun run db:migrate` | Create and run migrations |
| `bun run db:reset` | Reset database with seed |

## Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | Yes | SQLite database path | `file:./db/valleydaycaresites.db` |
| `NEXTAUTH_SECRET` | Yes | Auth encryption secret | Random string |
| `NEXTAUTH_URL` | Yes | App URL for auth | `http://localhost:3000` |

## Deployment

- **Output**: Standalone build (`output: "standalone"`)
- **Reverse Proxy**: Caddy (port 81 → port 3000)
- **Production Start**: `NODE_ENV=production bun .next/standalone/server.js`

### Build Scripts

Located in `.zscripts/`:
- `dev.sh` - Development server startup
- `build.sh` - Production build
- `start.sh` - Production server startup

## Testing

Currently no test files are present. When adding tests:
- Use Vitest or Jest with React Testing Library
- Place test files co-located with source or in `__tests__/` directories
- Follow `*.test.ts` or `*.spec.ts` naming

## Key Dependencies Notes

- **shadcn/ui**: Configured with "new-york" style, CSS variables, and Lucide icons
- **Prisma**: SQLite database with User and Post models (expandable)
- **Framer Motion**: Available for complex animations
- **Zustand**: Available for client state management
- **TanStack Query/Table**: Available for data fetching and tables
- **react-hook-form + Zod**: Available for form handling and validation

## Notes

- TypeScript build errors are currently ignored (`typescript.ignoreBuildErrors: true`)
- React strict mode is disabled (`reactStrictMode: false`)
- ESLint is configured with many rules relaxed for development speed
- The site uses Playfair Display for headings (font-display) and Inter for body text (font-sans)


## Skill Usage Guide

When working on tasks involving these technologies, invoke the corresponding skill:

| Skill | Invoke When |
|-------|-------------|
| tailwind | Writes Tailwind utility classes and custom brand theme styling |
| nextjs | Builds Next.js App Router pages, layouts, and server components |
| typescript | Enforces TypeScript type patterns and type safety |
| frontend-design | Applies Tailwind CSS brand colors, gradients, and responsive layouts |
| zustand | Manages client state with Zustand stores and actions |
| framer-motion | Creates scroll-triggered and page animations with Framer Motion |
| bun | Configures Bun runtime and package management |
| prisma | Configures Prisma schema and writes type-safe SQLite queries |
| react | Manages React hooks, components, and client state patterns |
