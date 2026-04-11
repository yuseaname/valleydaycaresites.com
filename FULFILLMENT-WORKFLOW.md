# Sample Fulfillment Workflow

## 48-Hour Sample Delivery Process

### Step 1: Receive Lead (0-4 hours)
- Lead arrives via contact form → saved to SQLite DB + email notification to Edgar
- Check EMAILIT_NOTIFY_EMAIL in .env confirms notification goes to Edgar's real email
- Reply to lead within 4 hours: "Thanks! To build your custom sample, I need a few things..."

**Info to request from lead:**
- [ ] Daycare name (confirmed)
- [ ] Address/city
- [ ] Phone number
- [ ] Hours of operation
- [ ] Programs offered (infants, toddlers, preschool, etc.)
- [ ] Ages accepted
- [ ] Any logo or photos (optional — stock images if none)
- [ ] Preferred color theme (or let us pick)
- [ ] Anything special about their program (philosophy, unique features)

### Step 2: Build Sample (4-24 hours)
1. Pick the best matching template from available demos:
   - **bright-start-academy** — Large center, sage/teal tones
   - **growing-minds-academy** — Multi-location, amber tones
   - **happy-kids-childcare** — Home daycare, emerald/green tones
   - **tiny-steps-learning** — Early education, teal tones
   - **sunshine-learning-center** — Preschool, amber/warm tones
   - **little-hearts-daycare** — Family daycare, clean/neutral tones

2. Create new page: `src/app/demos/[daycare-slug]/page.tsx`
   - Copy closest matching template
   - Replace all placeholder content with real info
   - Update: name, address, phone, hours, programs, colors
   - Keep "Demo" badge visible (it's a preview, not live yet)

3. Build and deploy preview:
   ```bash
   npm run build
   # Preview URL: valleydaycaresites.com/demos/[slug]
   ```

### Step 3: Send Preview (24-48 hours)
- Email lead with: "Your sample is ready! [Preview Link]"
- Include 2-3 things to notice
- Ask: "Want to keep it? Or want any changes?"
- No pressure language, no follow-up spam

### Step 4: Convert or Close
**If they want it:**
- Set up custom domain ($50/mo covers hosting)
- Remove "Demo" badge
- Point their domain via DNS
- Collect payment (PayPal/Venmo/Stripe — TBD)

**If they don't want it:**
- No action needed
- Mark lead as "DECLINED" in DB
- Optional: ask what they didn't like (feedback loop)

---

## Template Customization Checklist

For each sample, ensure:
- [ ] Daycare name in hero, title, and meta
- [ ] Correct programs and age ranges
- [ ] Real phone number (tap-to-call on mobile)
- [ ] Real address (or "Serving [City]" if home daycare)
- [ ] Correct hours of operation
- [ ] Working contact form (goes to lead's email, not ours)
- [ ] "Demo" badge visible (remove only when they pay)
- [ ] Meta description updated
- [ ] Page title updated
- [ ] Mobile responsive check

---

## Deployment Notes

- Site runs on Caddy → localhost:3000 (reverse proxy)
- Database: SQLite at `prisma/db/valleydaycaresites.db`
- Deploy to production: git push to main (auto-deploy via hostinger/CI)
- Preview subdomain: valleydaycaresites.com/demos/[slug]

---

## Payment (Pre-Launch Decision)

**Option A: Manual (Recommended for first 5-10 clients)**
- PayPal.me or Venmo link
- Send invoice email after they approve sample
- $50/month via recurring payment
- Simpler, faster to set up

**Option B: Stripe (Automated)**
- Already built: `/payment` page + `/api/payment`
- Needs: Stripe account + 2 products + env vars
- Better for scaling past 10 clients

**Recommendation:** Start with Option A. Switch to Stripe after 5 paying clients.
