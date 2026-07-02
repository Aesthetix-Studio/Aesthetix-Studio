# Aesthetix Studio

A full-stack creative studio platform built with React, Cloudflare Workers, and D1. Features real client projects, Razorpay payment integration, and comprehensive showcase pages.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router, helmet-async (for SEO), React Hook Form
- **Backend:** Cloudflare Workers (Hono), Cloudflare D1 (SQLite)
- **Deployment:** Cloudflare Workers + Pages
- **Payments:** Razorpay Integration (Live Production Keys)
- **Database:** Invoices with Razorpay payment fields, Lead submissions

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run cf:dev` | Start Cloudflare Workers locally |
| `npm run cf:deploy` | Deploy to Cloudflare |

## Project Structure

```
src/
  app/
    components/        # UI components (shadcn/ui + custom)
    layouts/           # Page layouts (Admin, Auth, Portal, Public)
    lib/               # Utilities and API clients (razorpay.ts)
    pages/             # Route pages (Home, About, Services, Admin, Portal, etc.)
      portfolio/       # Portfolio showcase pages (10 real client projects)
      pages/           # Additional pages (Pricing, Contact, etc.)
  styles/              # Global styles and theme
  main.tsx             # App entry point
server/                # Hono API server (legacy)
worker/                # Cloudflare Worker entry
worker/(api)           # API routes (/api/*) integrated into worker
  ├─ /api/orders        # Create Razorpay orders
  ├─ /api/payments/verify # Verify Razorpay payments
  └─ /api/invoices/:id/order # Create order for existing invoice
d1/                    # Database migrations (migration system included)
prisma/                # Prisma schema

Portfolio Features:
  - showcase/ * 10 # Live client showcase websites
  - projects/ * 8  # Hero + full page screenshots (Real Projects)
  - screenshots/ * 10 # Hero shots for showcase sites
```

## Features

### Real Client Work
- **4 Real Projects Added:** PhysioCore, Aurelia, Review Harvest, LuxeTech
- **8 Hero Screenshots:** Real project hero viewport shots
- **20 Showcase Sites:** Mono Studio, Maison Aurélien, and more
- **Hero Shots for Showcase:** Hero viewport shots for all 10 showcase sites

### Razorpay Integration
- **Live API Keys:** Configured for production
- **Full Payment Flow:** Create orders, verify payments, update invoices
- **Invoice Portal:** Manage and pay invoices with Razorpay

### Developer Experience
- **D1 Database:** Cloudflare D1 with migrations
- **Scroll-to-Top:** Automatic scroll reset on route navigation
- **SEO Optimized:** Meta tags, Open Graph, structured data using helmet-async
- **Responsive:** Mobile-first design with Tailwind CSS

## Showcase Preview

The portfolio features 10 showcase websites:

1. **Mono Studio** (minimal) - Brand identity and web design
2. **The Chronicle** (editorial) - Publishing platform
3. **ClimateBridge** (premium-saas) - Sustainability SaaS
4. **Saffron Kitchen** (creative-studio) - Restaurant branding
5. **Meridian Systems** (enterprise) - Enterprise SaaS dashboard
6. **Maison Aurélien** (luxury) - Luxury goods branding
7. **Launchpad** (startup) - Startup studio platform
8. **Resonance Records** (modern-tech) - Music label
9. **Pulse Fitness** (brutalist) - Fitness landing page
10. **Atelier Studio** (high-end-portfolio) - Creative portfolio

See [Portfolio](/portfolio) for complete showcase or visit individual projects in the Portfolio page.

## License

Private — Aesthetix Studio
