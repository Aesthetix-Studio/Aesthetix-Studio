# Aesthetix QA Lane — automated site audit

This directory is the **QA / infrastructure workstream** for the Aesthetix Studio
website. It runs in parallel with the visual workstream (design system, components,
page implementation) and **never edits site files** — pages, CSS, assets and
components belong to the other lane.

## Run

```bash
npm run qa          # audit the generated site → qa/reports/qa-report.{json,md}
npm run qa; echo $? # exit 1 when CRITICAL findings exist (CI-gateable)
npm run qa:test     # self-test: seeds defects into a throwaway fixture, asserts detection
QA_NO_HTTP=1 npm run qa   # static checks only, no server probe
```

Run `npm run generate` first if you want the freshest build audited; the tool
audits the generated tree (repo root + `work/`), which is what actually ships.

## What it checks

| Suite | Detects |
|---|---|
| **links** | broken internal links, in-page/destination fragment targets, `.html` vs clean-route inconsistencies, relative paths that break on nested URLs, `javascript:` URLs, malformed mailto/absolute URLs |
| **cta** | dead `#` placeholder links (socials, journal cards, newsletter…), duplicate destinations where cards expect unique ones (copy-paste signature), card name vs destination mismatch ("possible wrong destination — verify") |
| **seo** | missing/duplicate titles & descriptions, missing/mismatched canonical, canonical pointing at a URL that 301s, incomplete social cards, invalid JSON-LD, sitemap entries with no page / missing public pages, gated pages missing from robots.txt, unexpected `noindex` |
| **a11y** | images without/generic alt, links & buttons with no accessible name, form controls without labels, heading outline (h1 count, skipped levels), duplicate ids, positive tabindex |
| **assets** | referenced files that don't exist, unused assets (git-untracked ones are annotated *work-in-progress — do not delete*, so the visual agent's files are never flagged for deletion) |
| **forms** | forms with no action and no client wiring, intentionally-inert prototype forms, client `fetch()`/form-action endpoints that don't exist. The four inert auth forms (signup, forgot/reset-password, verify-email) are **prototype by design** — login is the only live auth (`POST /api/session` + `ADMIN_TOKEN`); the others stay LOW findings until an account system is scoped |
| **security** | admin-screen templates reachable under `/site/` (the session gate only matches clean routes) |
| **http probe** | spawns the real `scripts/serve.mjs` on an ephemeral port with a throwaway SQLite DB, then verifies every page route, every referenced asset, `.html`→clean 301s, `/favicon.ico`, and API liveness (POST `/api/contact` only with an invalid body — never writes a lead) |

## Severity model

- **CRITICAL** — broken for users or crawlers right now: dead links/endpoints/assets, sitemap advertising 404s, HTTP probe failures.
- **HIGH** — works but wrong: dead CTAs, duplicate card destinations, unlabeled controls, no accessible names, duplicate titles.
- **MEDIUM** — integrity/consistency debt: non-canonical `.html` links, sitemap/robots gaps, heading outlines, label association.
- **LOW** — hygiene: unused assets, generic alt text, inert prototype forms, stale robots rules.

## Outputs

- `qa/reports/qa-report.json` — machine-readable (meta, route inventory with per-page source attribution, HTTP probe log, findings).
- `qa/reports/qa-report.md` — human-readable, grouped by severity, each finding with page, URL, evidence, source file:line and a recommended fix.

Page→source attribution: pages under `site/proto/*.html` cite the proto file;
everything else cites `scripts/generate.js`. Shared partial findings cite
`site/_nav.html` / `site/_footer.html` when the evidence comes from them — fixing
a partial fixes every page at once.

## Boundaries

Do **not** put fixes for page markup, CSS, assets, heroes or components through
this lane — route those to the visual workstream. The QA lane owns (Phases B–D of
the roadmap): routing corrections, metadata/robots/sitemap corrections,
accessibility attribute fixes, robots/`/site/` deploy hygiene — all coordinated
after the visual lane's current task lands to avoid merge collisions.

## Limitations (by design)

- Contrast, focus order and keyboard traps need a browser pass — a static audit
  cannot measure them honestly.
- The card-name heuristic for "possible wrong destination" is regex-based (no DOM);
  it is scoped to card links and tuned for false-positive rarity. Residual findings
  are phrased as *verify*, not *broken*.
- External-link checks are best-effort; offline runs report them as *unverified*,
  never as broken.

## Keep in sync

- The `GATED` page list in `qa/audit.mjs` mirrors the one in `scripts/serve.mjs`.
- If routes or behaviour change, re-run `npm run qa` and commit refreshed reports.
