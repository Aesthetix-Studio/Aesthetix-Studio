# Deploying Aesthetix Studio

Static site + JSON API served by a **zero-dependency Node server** (`node:sqlite`,
so **Node ≥ 22.5** is required). No build framework, no package installs at deploy time.

## What the server does

| Piece | Where | Notes |
|---|---|---|
| Pages (59 HTML) | `node scripts/generate.js` (`npm run build`) | Generated from templates; 14 hand-crafted pages copied from `site/proto/` |
| HTTP server | `node scripts/serve.mjs` (`npm start`) | Serves pages + clean URLs (`/work` → `work.html`), binds `0.0.0.0`, port from `$PORT` (default 4173) |
| JSON API | `scripts/api.mjs`, mounted at `/api/*` | CRUD on 8 entities + `POST /api/contact` |
| Database | SQLite at `$DB_PATH` (default `data/app.sqlite`) | Auto-created + seeded on first run; gitignored. `serve.mjs` creates the parent dir on boot |

**Auth:** set `ADMIN_TOKEN` and every `/api/*` route except `POST /api/contact` returns 401
without `Authorization: Bearer $ADMIN_TOKEN`. The admin screens prompt for the token once
and remember it. **Always set `ADMIN_TOKEN` on a public deploy.**

## Option A — Render (recommended, one click)

The repo ships a `render.yaml` blueprint. In the Render dashboard click
**New + → Blueprint** and pick this repo — it wires everything:

- Build `npm run build`, start `npm start`, `NODE_VERSION=22.5.0` (`.node-version` also pins it)
- A 1 GB persistent disk mounted at `/data` with `DB_PATH=/data/app.sqlite`, so the SQLite
  DB survives restarts and redeploys
- `ADMIN_TOKEN` is a required secret (`sync: false`) — set a long random value, e.g.
  `openssl rand -hex 24`

Or from the CLI: `render blueprint launch` (needs `render` CLI + auth).

Free tier note: Render free web services sleep after ~15 min idle and cold-start in
~30–60 s. Fine for a demo/staging; upgrade to a paid plan for always-on.

## Option B — Railway

- **Build command:** `npm run build`, **Start command:** `npm start`
- **Environment:** `NODE_VERSION=22.5.0` (`.node-version` is respected). Railway injects `PORT`.
- **Volume:** attach a volume at `/data` and set `DB_PATH=/data/app.sqlite` (as on Render).
- **Secrets:** set `ADMIN_TOKEN` (required).

## Option C — VPS / bare Node

```bash
npm run build
ADMIN_TOKEN=your-secret PORT=4173 node scripts/serve.mjs
```

Put it behind a reverse proxy (Caddy / nginx) for TLS and to forward `/api/*` to the
same port. Point `DB_PATH` at a persistent volume if the VM's disk isn't durable.

## Environment variables

| Var | Default | Purpose |
|---|---|---|
| `PORT` | `4173` | HTTP port (Render/Railway set this) |
| `DB_PATH` | `data/app.sqlite` | Where the SQLite database lives — point at a mounted volume so data survives redeploys |
| `ADMIN_TOKEN` | unset (API open) | Bearer token gate for `/api/*` except `POST /api/contact`. **Set on any public deploy** |

## Notes

- **Do not deploy to Vercel static hosting** — `vercel.json` in the repo is the old
  static config; `/api/*` needs a real Node runtime and a persistent disk, so use a Node host.
- `data/app.sqlite` is gitignored — the DB is created and seeded fresh on first boot.
- Local dev: `npm run dev` (regenerate + serve), `npm run check` (48-assertion self-check
  that must stay green before shipping).
