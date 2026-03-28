# HANDOFF PROMPT FOR OPENCLAW JITORI

## PROJECT: ValleyDaycareSites.com

---

## MISSION

Get the first paying customer ($50 setup + $50/month subscription) for ValleyDaycareSites.com - a daycare website design service.

---

## CURRENT STATE

**What's Done:**
- Website is LIVE at valleydaycaresites.com
- Landing page complete with all sections (Hero, Services, Pricing, FAQ, Contact)
- Contact form is WORKING (submits to /api/contact, sends emails, saves to database)
- All CTA buttons now link to #contact section
- Outreach assets created (cold emails, flyers, phone scripts)
- 10 cold emails ready to send
- Response/closing scripts ready
- Demo site concept documented

**What's In Progress:**
- Sending cold emails (need to execute)
- Building first demo site for prospects to see

**What's Missing:**
- Payment integration (plan to use Venmo/Zelle manually at first)
- Real testimonials (currently placeholders)
- Real portfolio (will be first customer)

---

## THE OFFER

For daycare owners:
1. FREE 48-hour sample homepage
2. If they like it: $50/month to keep it live
3. If they don't: No charge, no pressure

No upfront cost. No contracts.

---

## KEY FILES IN REPO

| File | Purpose |
|------|---------|
| `/src/app/page.tsx` | Main landing page (all sections) |
| `/src/app/api/contact/route.ts` | Contact form API (working) |
| `/src/lib/emailit.ts` | Email sending via Emailit |
| `/prisma/schema.prisma` | Database schema (Lead, Message models) |
| `/SEND-THESE-NOW.md` | 10 cold emails ready to copy/paste |
| `/outreach-assets.md` | Full outreach kit (emails, flyers, scripts) |
| `/closing-scripts.md` | Scripts to close interested leads |
| `/demo-site-concept.md` | Demo homepage structure |

---

## YOUR TASKS

### Priority 1: Execute Outreach
- The cold emails are written in `/SEND-THESE-NOW.md`
- 10 target daycares with emails ready
- Goal: Get replies, start conversations

### Priority 2: Build Demo Site
- Create a demo daycare homepage at `/demo` route
- Use concept from `/demo-site-concept.md`
- This is a SALES TOOL to show prospects what they'll get
- Keep it simple: Hero, Programs, About, Contact

### Priority 3: Close First Sale
- When a daycare owner replies interested, build their sample
- Use closing scripts from `/closing-scripts.md`
- Collect payment via Venmo/Zelle
- Launch their site

### Priority 4: Improve Conversion
- Audit the landing page for conversion
- Fix any remaining issues
- Add trust signals where possible

---

## BUSINESS CONTEXT

**Target Customer**: Daycare/preschool owners in Central Valley California (Fresno, Clovis, Sanger, Madera, Visalia area)

**Customer Pain Points**:
- No website or outdated website
- Parents can't find them online
- Losing enrollments to competitors with better web presence
- Don't have time/money for expensive web design

**Our Solution**:
- Free sample (removes risk)
- Fast 48-hour turnaround
- Simple $50/month pricing
- We do all the work

---

## TECHNICAL CONTEXT

**Stack**:
- Next.js 16 with App Router
- TypeScript (strict mode off)
- Tailwind CSS 4
- shadcn/ui components
- SQLite via Prisma
- Emailit for emails
- Framer Motion for animations

**Commands**:
- `bun dev` - Start dev server
- `bun run build` - Build for production
- `bun run db:push` - Push schema changes

**Deployment**:
- Standalone build
- Caddy reverse proxy

---

## SUCCESS METRICS

1. First reply from a daycare owner
2. First sample homepage built and sent
3. First payment received ($50)
4. First site launched live
5. First recurring payment ($50/month)

---

## CONSTRAINTS

- Keep it SIMPLE - no overengineering
- Speed > perfection
- Every action should lead toward a sale
- Don't build features that don't directly increase revenue THIS WEEK

---

## WHAT I NEED FROM YOU

1. Take initiative on outreach execution
2. Build the demo site so we have something to show prospects
3. Improve any conversion points on the landing page
4. When leads come in, help close them
5. Get us to first paying customer as fast as possible

You have full access to the codebase. Make changes as needed. The goal is simple: revenue.

---

## CONTACT INFO

- Business email: contact@valleydaycaresites.com
- Admin notification email: yuseaname@gmail.com

---

## FINAL NOTE

This is a revenue operation, not a development project. Every decision should be filtered through:

"Does this help get a paying customer faster?"

If yes, do it.
If no, skip it.

Go get that first sale.
