# Aesthetix Studio

A full-stack creative studio platform built with React, Cloudflare Workers, and D1. Features real client projects, Razorpay payment integration, comprehensive showcase pages, and a fully wired admin/portal dashboard.

**Live:** [aesthetixstudio.com](https://www.aesthetixstudio.com)

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router, helmet-async, React Hook Form, GSAP, Recharts
- **Backend:** Cloudflare Workers, Cloudflare D1 (SQLite)
- **Deployment:** Vercel (frontend) + Cloudflare Workers (API)
- **Payments:** Razorpay (live production keys)
- **Auth:** Supabase (JWT-based)
- **Analytics:** Google Analytics (GA4), Microsoft Clarity
- **Error Tracking:** Sentry
- **Database:** Cloudflare D1 with 4 migrations, 11 tables

## Getting Started

```bash
npm install
cp .env.example .env    # fill in your keys
npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Backend API URL (default: `http://localhost:8787`) |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/public key |
| `VITE_GA4_ID` | Google Analytics 4 measurement ID |
| `VITE_CLARITY_ID` | Microsoft Clarity project ID |
| `VITE_SENTRY_DSN` | Sentry DSN (optional) |
| `SUPABASE_URL` | Supabase project URL (server-side) |
| `SUPABASE_SECRET_KEY` | Supabase service role key (server-side) |
| `SUPABASE_JWKS_URL` | Supabase JWKS endpoint |
| `RAZORPAY_KEY_ID` | Razorpay live key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay live key secret |

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
    layouts/           # Page layouts (Admin, Auth, Portal, Public, Root)
    lib/               # Utilities, API clients, session, error tracking
    pages/             # Route pages
      admin/           # Admin dashboard (14 pages)
      auth/            # Authentication (login, signup, forgot/reset password, verify email)
      portfolio/       # Portfolio showcase (10 real client projects)
      portal/          # Client portal (6 pages)
  styles/              # Global styles and theme
  main.tsx             # App entry point (Sentry + HelmetProvider)
worker/
  index.mjs            # Cloudflare Worker, 30+ API endpoints
d1/migrations/         # Database migrations (4 files)
public/
  screenshots/         # 20 project screenshots
  sitemap.xml          # 25 URLs
  robots.txt           # Crawl rules
  llms.txt             # AI crawler content
  og-image.svg         # Branded OG image
  favicon.svg          # Site favicon
vercel.json            # SPA rewrites + security headers
```

## Database Schema (11 tables)

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
| `notification_log` | Email/notification delivery log |

## API Endpoints (30+)

| Category | Endpoints |
|----------|-----------|
| Auth | `POST /api/auth/signup`, `POST /api/auth/login`, `GET /api/auth/me` |
| Leads | `GET /api/leads`, `GET /api/leads/:id`, `POST /api/leads/contact`, `POST /api/leads/discovery-call`, `POST /api/leads/inquiry` |
| Projects | `GET /api/projects`, `GET /api/projects/:id` |
| Tasks | `GET /api/tasks` |
| Clients | `GET /api/clients`, `GET /api/clients/:id` |
| Team | `GET /api/team` |
| Messages | `GET /api/messages`, `POST /api/messages` |
| Blog | `GET /api/blog`, `GET /api/blog/:slug`, `POST /api/blog`, `PUT /api/blog/:slug`, `DELETE /api/blog/:slug` |
| Invoices | `GET /api/invoices`, `POST /api/invoices/:id/pay` |
| Settings | `GET /api/settings`, `PUT /api/settings` |
| Newsletter | `POST /api/newsletter/subscribe` |
| Uploads | `POST /api/uploads/presign` |
| Notifications | `GET /api/notifications` |

## Features

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

### Admin Dashboard (14 pages)
- Dashboard with real-time stats (revenue chart, active projects, hot leads, upcoming tasks)
- Leads management (Hot/Warm/Cold filtering, lead details, activity timeline)
- Clients list with details page
- Projects list with kanban board view
- Tasks with filtering (To Do, In Progress, Done, priority)
- Calendar with task events and dynamic month navigation
- Team members with task counts
- Analytics with real charts from API data (revenue, leads, tasks)
- Content planner with inline create/edit/delete (wired to blog API)
- Settings (General, Team, Billing, Integrations, Notifications)

### Client Portal (6 pages)
- Dashboard (active project, messages, invoices)
- Projects list with detail view (milestones, progress)
- Messages (real-time chat UI with send)
- Invoices (Razorpay pay-now integration)
- Files (uploads API)
- Settings

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
- SPA routing via React Router (all internal links use `<Link>`)
- Mobile-first responsive design
- Security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy) via vercel.json
- Sentry error tracking (optional, via VITE_SENTRY_DSN)
- Lazy loading on all images
- Production build passes with 0 errors

## Showcase Preview

1. **Mono Studio** (minimal) — Brand identity and web design
2. **The Chronicle** (editorial) — Publishing platform
3. **ClimateBridge** (premium-saas) — Sustainability SaaS
4. **Saffron Kitchen** (creative-studio) — Restaurant branding
5. **Meridian Systems** (enterprise) — Enterprise SaaS dashboard
6. **Maison Aurélien** (luxury) — Luxury goods branding
7. **Launchpad** (startup) — Startup studio platform
8. **Resonance Records** (modern-tech) — Music label
9. **Pulse Fitness** (brutalist) — Fitness landing page
10. **Atelier Studio** (high-end-portfolio) — Creative portfolio

## License

Private — Aesthetix Studio
