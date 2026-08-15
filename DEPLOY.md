# Deploying Aesthetix Studio

Static site + JSON API served by a **zero-dependency Node server** (`node:sqlite`,
so **Node ≥ 22.5** is required). No build framework, no package installs at deploy time
other than what npm does for the lockfile.

## What the server does

| Piece | Where | Notes |
|---|---|---|
| Pages (59 HTML) | `node scripts/generate.js` (`npm run build`) | Generated from templates; 14 hand-crafted pages copied from `site/proto/` |
| HTTP server | `node scripts/serve.mjs` (`npm start`) | Serves pages + clean URLs (`/work` → `work.html`), binds `0.0.0.0`, port from `$PORT` (default 4173) |
| JSON API | `scripts/api.mjs`, mounted at `/api/*` | CRUD on 8 entities + `POST /api/contact` |
| Database | SQLite at `data/app.sqlite` | Auto-created + seeded on first run; gitignored |

## Option A — Render (recommended)

Create a **Web Service** pointing at the repo:

- **Build command:** `npm run build`
- **Start command:** `npm start`
- **Environment:** `NODE_VERSION=22.5.0` (or newer). Render sets `PORT` automatically.
- **Disk:** attach a persistent disk mounted at `/data` and set `DB_PATH` if you want the
  SQLite file to survive restarts — otherwise it's stored on the instance and **wiped on
  redeploy** (contact submissions lost).

## Option B — Railway

- **Build command:** `npm run build`
- **Start command:** `npm start`
- **Environment:** `NODE_VERSION=22.5.0` (or newer). Railway injects `PORT` automatically.

## Option C — VPS / bare Node

```bash
npm run build
PORT=4173 node scripts/serve.mjs
```

Put it behind a reverse proxy (Caddy / nginx) for TLS and to forward `POST /api/*` and
`/api/*` to the same port.

## Environment variables

| Var | Default | Purpose |
|---|---|---|
| `PORT` | `4173` | HTTP port (Render/Railway set this) |
| `DB_PATH` | `data/app.sqlite` | Where the SQLite database lives — point at a persistent volume for durability |

## Notes

- **Do not deploy to Vercel static hosting** — `vercel.json` in the repo is the old
  static config; the contact form and `/api/*` need a real Node runtime and persistent
  disk, so use a Node host.
- `data/app.sqlite` is gitignored — the DB is created and seeded fresh on first boot.
- Local dev: `npm run dev` (regenerate + serve), `npm run check` (33-assertion self-check
  that must stay green before shipping).
