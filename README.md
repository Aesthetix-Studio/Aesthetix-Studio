# Aesthetix Studio

A full-stack creative studio platform built with React, Cloudflare Workers, and D1.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend:** Cloudflare Workers, Hono
- **Database:** Cloudflare D1 (SQLite), Prisma
- **Deployment:** Cloudflare (Workers + Pages)

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
    components/   # UI components (shadcn/ui + custom)
    layouts/      # Page layouts (Admin, Auth, Portal, Public)
    lib/          # Utilities and API clients
    pages/        # Route pages (Home, About, Services, Admin, Portal, etc.)
  styles/         # Global styles and theme
  main.tsx        # App entry point
server/           # Hono API server
worker/           # Cloudflare Worker entry
d1/               # Database migrations and seed data
prisma/           # Prisma schema
```

## License

Private — Aesthetix Studio
