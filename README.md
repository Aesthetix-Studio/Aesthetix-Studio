# Aesthetix Studio

A full-stack creative studio platform built with React, Cloudflare Workers, and D1. Features real client projects, Razorpay payment integration, comprehensive showcase pages, and a fully wired admin/portal dashboard.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router, helmet-async, React Hook Form, GSAP, Recharts
- **Backend:** Cloudflare Workers, Cloudflare D1 (SQLite)
- **Deployment:** Cloudflare Workers + Pages
- **Payments:** Razorpay Integration (Live Production Keys)
- **Auth:** Supabase (JWT-based)
- **Analytics:** Google Analytics (GA4), Microsoft Clarity
- **Database:** Cloudflare D1 with 3 migrations, 9 tables

## Implementation Status

### Portfolio & Showcase
- 10 showcase websites (Minimal, Editorial, Premium SaaS, Creative Studio, Enterprise, Luxury, Startup, Modern Tech, Brutalist, High-end Portfolio)
- 20 screenshot files (10 hero shots + 10 full project shots)
- 4 case studies (PhysioCore, Aurelia, Review Harvest, LuxeTech)
- 6 blog posts with full article content
- Portfolio routes: `/showcase/*` and `/portfolio/:slug`

### Payment Integration
- Razorpay complete payment flow (order creation, verification, invoice integration)
- Live production keys configured
- Invoice portal with pay-now functionality

### Backend & Database
- Cloudflare D1 with 3 migrations (initial + Razorpay fields + team/projects/tasks/messages/blog/settings)
- 30+ API endpoints (leads, invoices, uploads, team, clients, projects, tasks, messages, settings, blog, newsletter)
- Supabase JWT authentication

### Admin Dashboard
- Dashboard with real-time stats (revenue chart, active projects, hot leads, upcoming tasks)
- Leads management (Hot/Warm/Cold filtering, lead details, activity timeline)
- Clients list with details page
- Projects list with kanban board view
- Tasks with filtering (To Do, In Progress, Done, priority)
- Team members with task counts
- Content planner wired to blog API
- Settings (General, Team, Billing, Integrations, Notifications) — all functional

### Client Portal
- Dashboard (active project, messages, invoices)
- Projects list with detail view (milestones, progress)
- Messages (real-time chat UI with send)
- Invoices (Razorpay pay-now integration)
- Files (uploads API)

### Legal & SEO
- Privacy Policy (11 sections, Indian law, Razorpay/Cloudflare mentions)
- Terms of Service (14 sections)
- Cookie Policy (4 cookie categories + third-party table)
- Accessibility Statement (WCAG 2.1 AA)
- SEO schemas (Organization, LocalBusiness, ProfessionalService, Website, FAQ)
- Sitemap, robots.txt, llms.txt, OG image
- Analytics (GA4 + Microsoft Clarity)

### Developer Experience
- Scroll-to-top on navigation
- Mobile-first responsive design
- Security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy)
- Lazy loading on all images
- Production build passes with 0 errors

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
    lib/               # Utilities and API clients
    pages/             # Route pages
      admin/           # Admin dashboard pages
      auth/            # Authentication pages
      portfolio/       # Portfolio showcase pages (10 real client projects)
      portal/          # Client portal pages
  styles/              # Global styles and theme
  main.tsx             # App entry point
worker/                # Cloudflare Worker entry
  index.mjs            # 750+ lines, 30+ API endpoints
d1/migrations/         # Database migrations (3 files)
prisma/                # Prisma schema
public/
  screenshots/         # 20 project screenshots
  sitemap.xml          # 25 URLs
  robots.txt           # Crawl rules
  llms.txt             # AI crawler content
  og-image.svg         # Branded OG image
  favicon.svg          # Site favicon
```

## Database Schema

| Table | Description |
|-------|-------------|
| `lead_submissions` | Contact, discovery call, and project inquiry submissions |
| `invoices` | Invoice records with Razorpay payment fields |
| `uploads` | File upload metadata |
| `team_members` | Team member profiles |
| `clients` | Client records |
| `projects` | Project records with status and progress |
| `tasks` | Task records with assignment and priority |
| `messages` | In-app messages between team and clients |
| `blog_posts` | Blog article content |
| `studio_settings` | Key-value studio configuration |

## Showcase Preview

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

## License

Private — Aesthetix Studio
