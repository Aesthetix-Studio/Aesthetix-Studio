// Shared helpers for the Aesthetix admin screens — zero deps, plain JS.
// Loaded by admin-*.html before each page's own wiring script.
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
// this file loads in <head> on the hand-crafted pages, so anything that queries the
// DOM has to wait for the body to be parsed
const onReady = (fn) => (document.readyState === 'loading' ? addEventListener('DOMContentLoaded', fn, { once: true }) : fn());
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const initials = (name) => String(name || '?').trim().split(/\s+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
const fmtDate = (iso) => iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
const fmtINR = (n) => '₹' + Math.round(Number(n) || 0).toLocaleString('en-IN');
const AVATAR_COLORS = ['#6C5CE7', '#3b82f6', '#22c55e', '#f59e0b', '#ec4899', '#10b981', '#8b5cf6', '#C9A84C'];
const avatarColor = (name) => AVATAR_COLORS[[...String(name)].reduce((a, c) => a + c.charCodeAt(0), 0) % AVATAR_COLORS.length];
const avatar = (name) => `<div style="width:30px;height:30px;border-radius:50%;background:${avatarColor(name)}22;color:${avatarColor(name)};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0">${initials(name)}</div>`;

// auth: the server gates both the pages and /api/*. Signing in at /login exchanges
// ADMIN_TOKEN for an httpOnly session cookie (see api.mjs) that the browser then sends
// on every request; a localStorage token, if one is set, still goes out as a Bearer
// header for parity with curl/scripts.
const TOKEN_KEY = 'adm_token';
const getToken = () => localStorage.getItem(TOKEN_KEY) || '';
const admClearToken = () => localStorage.removeItem(TOKEN_KEY); // used by sign-out

async function api(path, { method = 'GET', body } = {}) {
  const headers = body ? { 'content-type': 'application/json' } : {};
  const tok = getToken();
  if (tok) headers.authorization = `Bearer ${tok}`;
  const res = await fetch(path, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const json = await res.json().catch(() => ({}));
  // 401 → no session, or it expired. serve.mjs bounces the pages the same way, so go
  // back to the login screen instead of prompting for a token here.
  if (res.status === 401 && path !== '/api/contact') {
    location.replace('/login?next=' + encodeURIComponent(location.pathname + location.search));
    throw new Error('Admin access required — please sign in');
  }
  if (!res.ok) throw new Error(json.error || `Request failed (${res.status})`);
  return json;
}

// serve.mjs gates these pages on the session cookie, so by the time this runs the
// visitor is already signed in — just fill the sidebar identity.
wireAdminChrome();

// status → [css class, label]; pages override with their own map via pageBadge.
const badge = (status, map = {}) => {
  const [cls, label] = map[status] || map.default || [undefined, status];
  return `<span class="bx ${cls || ''}">${esc(label ?? status)}</span>`;
};

function toast(msg, ok = true) {
  const el = document.createElement('div');
  el.className = 'adm-toast' + (ok ? ' ok' : ' err');
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

// generic modal: fields = [{name,label,type,value,options,required}]
function modal({ title, fields, onSubmit, onDelete }) {
  const overlay = document.createElement('div');
  overlay.className = 'adm-overlay';
  overlay.innerHTML = `
    <div class="adm-modal">
      <h3>${esc(title)}</h3>
      <form>
        ${fields.map((f) => {
          const id = 'f_' + f.name;
          let control;
          if (f.type === 'select') {
            control = `<select name="${esc(f.name)}" id="${id}">${(f.options || []).map((o) => `<option value="${esc(o)}"${String(o) === String(f.value ?? '') ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select>`;
          } else if (f.type === 'textarea') {
            control = `<textarea name="${esc(f.name)}" id="${id}" rows="3">${esc(f.value ?? '')}</textarea>`;
          } else {
            control = `<input name="${esc(f.name)}" id="${id}" type="${f.type || 'text'}" value="${esc(f.value ?? '')}"${f.required ? ' required' : ''}>`;
          }
          return `<div class="adm-field"><label for="${id}">${esc(f.label)}</label>${control}</div>`;
        }).join('')}
        <div class="adm-actions">
          ${onDelete ? `<button type="button" class="adm-btn danger" data-act="del">Delete</button>` : ''}
          <button type="button" class="adm-btn ghost" data-act="cancel">Cancel</button>
          <button type="submit" class="adm-btn">Save</button>
        </div>
      </form>
    </div>`;
  document.body.appendChild(overlay);
  const close = () => overlay.remove();
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  $('[data-act="cancel"]', overlay).addEventListener('click', close);
  if (onDelete) $('[data-act="del"]', overlay).addEventListener('click', async () => {
    try { await onDelete(); close(); toast('Deleted'); } catch (err) { toast(err.message, false); }
  });
  $('form', overlay).addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    try { await onSubmit(data); close(); toast('Saved'); } catch (err) { toast(err.message, false); }
  });
  return overlay;
}

// memoized so a page's own load() and the sidebar fill share one request
let dashPromise;
const dashboardData = () => (dashPromise ??= api('/api/dashboard'));

// every admin screen loads this file, so the sidebar identity and the sign-out are
// wired here rather than repeated per page. The markup ships data-adm placeholders
// holding no data, filled from /api/dashboard once the session is live.
function wireAdminChrome() {
  onReady(() => {
    dashboardData().then((d) => {
      const u = d.user || {};
      const put = (k, v) => $$(`[data-adm="${k}"]`).forEach((el) => { el.textContent = v || '—'; });
      put('initials', u.initials);
      put('name', u.name);
      put('role', u.role);
      if ($('[data-adm="welcome"]')) put('welcome', u.first ? `Welcome back, ${u.first}! 👋` : 'Welcome back! 👋');
    }).catch((e) => toast(e.message, false));
    $$('[data-adm="signout"]').forEach((el) => el.addEventListener('click', async () => {
      // clear the server-side session too, or serve.mjs would let the next visitor back in
      try { await fetch('/api/session', { method: 'DELETE' }); } catch {}
      admClearToken();
      location.replace('/login');
    }));
  });
}

// set a stat card's value by its label (each page names its cards in HTML)
const fillStat = (label, value) => {
  $$('.dash-stat-card').forEach((card) => {
    const l = $('.dash-stat-label', card);
    if (l && l.textContent.trim() === label) $('.dash-stat-value', card).textContent = value;
  });
};

// ── light tool screens (proposals, feedback, meetings, files, forms, milestones) ──
// One generic live table + stat cards for the generated tool pages. cfg is serialized by
// generate.js, so stats are declarative ops, never functions:
//   { entity, title, tableTitle, cols:[{key,label,fmt?}], badge:{status:[cls,label]},
//     stats:[{label,desc?,op:'count'|'pct'|'sum'|'avg',key?,value?,fmt?}], fields:[modal defs] }
function wireToolPage(cfg) {
  const tbody = $('#adm-tbody');
  const count = $('#adm-count');
  const addBtn = $('#tool-add');
  let rows = [];
  // ponytail: files-only read-only join — latest client note per file via the
  // thread=file:<id> convention (no schema change, no write path here). Ceiling:
  // two GETs and newest-wins. Upgrade path: server-side join once deliverables get FKs.
  let fileNotes = {};
  const fmt = (c, v) => (c.fmt === 'inr' ? fmtINR(v) : c.fmt === 'date' ? fmtDate(v) : c.fmt === 'badge' ? badge(v, cfg.badge) : esc(v ?? '—'));
  const row = (r) => `<tr>${cfg.cols.map((c) => {
    let v = fmt(c, r[c.key]);
    if (cfg.entity === 'files' && c.key === 'status' && r.status === 'changes_requested' && fileNotes[r.id])
      v += `<div class="small">“${esc(fileNotes[r.id])}”</div>`;
    return `<td>${v}</td>`;
  }).join('')}<td><button class="row-view" data-id="${r.id}">View</button></td></tr>`;
  const stat = (s, all) => {
    const pool = s.key !== undefined && s.value !== undefined ? all.filter((r) => String(r[s.key]) === String(s.value)) : all;
    if (s.op === 'count') return pool.length;
    if (s.op === 'pct') { const v = pool.length; return all.length ? Math.round((v / all.length) * 1000) / 10 + '%' : '0%'; }
    if (s.op === 'sum') return fmtINR(pool.reduce((a, r) => a + (Number(r[s.key]) || 0), 0));
    if (s.op === 'avg') { const v = pool.reduce((a, r) => a + (Number(r[s.key]) || 0), 0); return pool.length ? (v / pool.length).toFixed(1) : '—'; }
    return '—';
  };
  const render = () => {
    tbody.innerHTML = rows.length ? rows.map(row).join('') : `<tr><td colspan="${cfg.cols.length + 1}" class="adm-empty">No records yet.</td></tr>`;
    if (count) count.textContent = rows.length + ' record' + (rows.length === 1 ? '' : 's');
    $$('.scard').forEach((card) => {
      const l = $('.eyebrow', card);
      const s = l && cfg.stats.find((x) => x.label === l.textContent.trim());
      if (s) $('h3', card).textContent = stat(s, rows);
    });
  };
  const load = async () => {
    try {
      rows = (await api('/api/' + cfg.entity)).data;
      if (cfg.entity === 'files') {
        try {
          const ms = (await api('/api/messages')).data || [];
          fileNotes = {};
          for (const m of ms) {
            const mt = String(m.thread || '').match(/^file:(\d+)$/);
            if (mt && !(mt[1] in fileNotes)) fileNotes[mt[1]] = m.content; // list is newest-first
          }
        } catch { fileNotes = {}; }
      }
      render();
    } catch (e) { toast(e.message, false); }
  };
  if (addBtn) addBtn.addEventListener('click', () => modal({
    title: 'Add ' + cfg.title,
    fields: cfg.fields,
    onSubmit: async (d) => { await api('/api/' + cfg.entity, { method: 'POST', body: d }); load(); },
  }));
  tbody.addEventListener('click', (e) => {
    const b = e.target.closest('.row-view');
    if (!b) return;
    const r = rows.find((x) => x.id === Number(b.dataset.id));
    if (!r) return;
    modal({
      title: r.title || r.name,
      fields: cfg.fields.map((f) => ({ ...f, value: r[f.name] })),
      onSubmit: async (d) => { await api(`/api/${cfg.entity}/${r.id}`, { method: 'PUT', body: d }); load(); },
      onDelete: async () => { await api(`/api/${cfg.entity}/${r.id}`, { method: 'DELETE' }); load(); },
    });
  });
  load();
}

// ── AI chat assistant (messages entity) ──
function wireChat() {
  const box = $('#chat-box'), input = $('#chat-input'), send = $('#chat-send');
  let msgs = [];
  const render = () => {
    box.innerHTML = msgs.map((m) => `<div class="chat-msg ${m.role === 'user' ? 'user' : 'ai'}"><b>${esc(m.role)}</b><div>${esc(m.content)}</div><span class="chat-meta">${esc(m.thread || 'general')} · ${fmtDate(m.created_at)}</span></div>`).join('') || '<p class="adm-empty">No messages yet.</p>';
    box.scrollTop = box.scrollHeight;
  };
  const load = async () => { try { msgs = (await api('/api/messages')).data; render(); } catch (e) { toast(e.message, false); } };
  send.addEventListener('click', async () => {
    const v = input.value.trim();
    if (!v) return;
    input.value = '';
    send.disabled = true; // the reply is generated server-side and can take a few seconds
    try { await api('/api/messages', { method: 'POST', body: { role: 'user', content: v } }); await load(); } catch (e) { toast(e.message, false); } finally { send.disabled = false; }
  });
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') send.click(); });
  load();
}

// ── Search (cross-entity /api/search) ──
function wireSearch() {
  const input = $('#search-input'), res = $('#search-results');
  let t;
  input.addEventListener('input', () => {
    clearTimeout(t);
    t = setTimeout(async () => {
      const q = input.value.trim();
      if (!q) { res.innerHTML = ''; return; }
      try {
        const d = (await api('/api/search?q=' + encodeURIComponent(q))).data;
        res.innerHTML = d.length ? d.map((r) => `<div class="search-hit"><b>${esc(r.title)}</b><span>${esc(r.type)}</span></div>`).join('') : '<p class="adm-empty">No results.</p>';
      } catch (e) { res.innerHTML = '<p class="adm-empty">' + esc(e.message) + '</p>'; }
    }, 250);
  });
}

// ── Shared dashboard components: charts + sidebar nav ──────────────────────
// One definition here; every admin board reuses it instead of copying markup.
// Smooth SVG area curve. Returns { line, area, X, Y } for W×H viewBox coords.
const dashSmooth = (pts, w, h) => {
  const max = Math.max(...pts, 1), min = Math.min(...pts, 0);
  const X = (i) => (i / (pts.length - 1)) * w;
  const Y = (v) => h - 8 - ((v - min) / (max - min || 1)) * (h - 22);
  let d = `M${X(0)},${Y(pts[0])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const x0 = X(i), y0 = Y(pts[i]), x1 = X(i + 1), y1 = Y(pts[i + 1]);
    const mx = (x0 + x1) / 2;
    d += ` C${mx},${y0} ${mx},${y1} ${x1},${y1}`;
  }
  return { line: d, area: `${d} L${w},${h} L0,${h} Z`, X, Y };
};
// Donut background from [{color, [key]}] shares that sum to 100.
const dashConic = (items, key) => {
  let acc = 0;
  return 'conic-gradient(' + items.map((s) => {
    const a = acc; acc += s[key];
    return `${s.color} ${a.toFixed(1)}% ${acc.toFixed(1)}%`;
  }).join(',') + ')';
};
// Inline sparkline SVG. 2400 → '2.4K', 0 → '–'.
const dashSpark = (pts, color, w = 64, h = 22) => {
  const max = Math.max(...pts, 1), min = Math.min(...pts, 0);
  const X = (i) => (i / (pts.length - 1)) * w;
  const Y = (v) => h - 2 - ((v - min) / (max - min || 1)) * (h - 5);
  return `<svg viewBox="0 0 ${w} ${h}" style="width:${w}px;height:${h}px;overflow:visible"><polyline points="${pts.map((p, i) => `${X(i)},${Y(p)}`).join(' ')}" fill="none" stroke="${color}" stroke-width="1.6" stroke-linecap="round"/></svg>`;
};
const dashCompact = (v) => {
  v = Number(v) || 0;
  if (!v) return '–';
  return v >= 1000 ? (Math.round(v / 100) / 10) + 'K' : String(v);
};
// '2025-05-23T10:00:00' → '2h ago' style relative time on the client clock.
const dashAgo = (iso) => {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return '—';
  const m = Math.max(0, Math.round((Date.now() - t) / 60000));
  if (m < 1) return 'just now';
  if (m < 60) return m + ' min ago';
  const h = Math.round(m / 60);
  if (h < 24) return h + (h === 1 ? ' hr ago' : ' hrs ago');
  const d = Math.round(h / 24);
  if (d < 7) return d === 1 ? '1 day ago' : d + ' days ago';
  if (d < 30) return Math.round(d / 7) + 'w ago';
  return Math.round(d / 30) + 'mo ago';
};
// Donut + legend renderer for board rails.
// items: [{ label, display, share, color }] — percentages computed live.
const dashDonut = (pieEl, legendEl, items) => {
  const total = items.reduce((s, x) => s + (Number(x.share) || 0), 0) || 1;
  let acc = 0;
  pieEl.style.background = 'conic-gradient(' + items.map((x) => {
    const a = acc; acc += (Number(x.share) || 0) / total * 100;
    return `${x.color} ${a.toFixed(1)}% ${acc.toFixed(1)}%`;
  }).join(',') + ')';
  legendEl.innerHTML = items.map((x) => {
    const p = (Number(x.share) || 0) / total * 100;
    return `<div class="dash-legrow"><div class="dash-legend-dot" style="background:${x.color}"></div> ${esc(x.label)} <b>${esc(x.display)} <span class="dim">(${x.share ? p.toFixed(1) + '%' : '0%'})</span></b></div>`;
  }).join('');
};

// Sidebar navigation — ONE sidebar for every dashboard board
// (Main, Content Management, CRM, AI Tools, System). A board renders it with:
// <nav class="dash-nav" data-dash-nav="suite" data-active="/admin-projects.html"></nav>
// The `flow` variant is the only exception: the AI-assistant family is a separate
// workspace (Main, AI Tools, Knowledge, Communication, Billing).
// ponytail: icons are inline SVG strings (no sprite file, zero extra requests) and
// '#' links are pages without a mockup yet — give them a route and they light up.
// CRM Leads points at /admin-leads.html until the leads board itself is rebuilt.
const DASH_ICONS = {
  home: '<path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  bars: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  cal: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M8 2v4M16 2v4M2 10h20"/>',
  doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
  doclines: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
  form: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/>',
  list: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="14" y2="14"/>',
  img: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  chatface: '<circle cx="12" cy="12" r="9"/><path d="M8.5 12.5c.8 1 2 1.5 3.5 1.5s2.7-.5 3.5-1.5"/>',
  spark: '<path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  wand: '<path d="M15 4V2M15 10V8M11.5 6.5h-2M20.5 6.5h-2M17.8 3.7l1.4-1.4M17.8 9.3l1.4 1.4M12.2 3.7 10.8 2.3M12.2 9.3l-1.4 1.4"/><path d="m3 21 9-9"/>',
  search: '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  nodes: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M8 7.5l3 8M16 7.5l-3 8M8.5 6h7"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.2 4.2l2.8 2.8M17 17l2.8 2.8M1 12h4M19 12h4M4.2 19.8L7 17M17 7l2.8-2.8"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  clip: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  pulse: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  tag: '<path d="M20.59 13.41 11 3H4v7l9.59 9.59a2 2 0 0 0 2.82 0l4.18-4.18a2 2 0 0 0 0-2.82z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>',
  refresh: '<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>',
  eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
};
const dic = (inner) => `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
const DASH_NAV = {
  suite: [
    { label: 'Main', items: [
      { label: 'Dashboard', href: '/dashboard.html', icon: 'home' },
      { label: 'Analytics', href: '/admin-analytics.html', icon: 'bars' },
      { label: 'Tasks', href: '/tasks.html', icon: 'check' },
      { label: 'Messages', href: '/messages.html', icon: 'chat', badge: '3' },
      { label: 'Invoices', href: '/admin-invoices.html', icon: 'doclines' },
      { label: 'Subscriptions', href: '/subscriptions.html', icon: 'card' },
      { label: 'Project Timeline', href: '/project-timeline.html', icon: 'cal' },
      { label: 'Calendar', href: '/calendar.html', icon: 'cal' },
    ]},
    { label: 'Content Management', items: [
      { label: 'Projects', href: '/admin-projects.html', icon: 'cal' },
      { label: 'Articles', href: '/admin-articles.html', icon: 'doc' },
      { label: 'Pages', href: '/admin-pages.html', icon: 'doclines' },
      { label: 'Categories', href: '/admin-categories.html', icon: 'list' },
      { label: 'Tags', href: '/admin-tags.html', icon: 'tag' },
      { label: 'Media Library', href: '/admin-media.html', icon: 'img' },
      { label: 'Forms', href: '/forms.html', icon: 'form' },
      { label: 'Comments', href: '/admin-comments.html', icon: 'chat' },
      { label: 'Testimonials', href: '/admin-testimonials.html', icon: 'chat' },
      { label: 'Files & Deliverables', href: '/files-deliverables.html', icon: 'folder' },
      { label: 'Feedback', href: '/feedback.html', icon: 'chat' },
    ]},
    { label: 'CRM', items: [
      { label: 'Leads', href: '/admin-leads.html', icon: 'wand' },
      { label: 'Lead Sources', href: '/admin-lead-sources.html', icon: 'nodes' },
      { label: 'Meeting Notes', href: '/meeting-notes.html', icon: 'pen' },
    ]},
    { label: 'AI Tools', badge: 'New', items: [
      { label: 'Proposal Generator', href: '/proposal-generator.html', icon: 'spark' },
      { label: 'AI Chat Assistant', href: '/ai-chat-assistant.html', icon: 'chatface' },
      { label: 'AI Writer', href: '/admin-ai-writer.html', icon: 'pen' },
      { label: 'Brand Audit Tool', href: '/brand-audit-tool.html', icon: 'search' },
      { label: 'Design Brief Analyzer', href: '/design-brief-analyzer.html', icon: 'clip' },
    ]},
    { label: 'System', items: [
      { label: 'Users', href: '/admin-users.html', icon: 'users' },
      { label: 'Roles & Permissions', href: '/admin-roles.html', icon: 'shield' },
      { label: 'Settings', href: '/admin-settings.html', icon: 'gear' },
      { label: 'Activity Logs', href: '/admin-activity.html', icon: 'clip' },
      { label: 'Integrations', href: '/admin-integrations.html', icon: 'link' },
      { label: 'System Health', href: '/admin-system-health.html', icon: 'pulse' },
    ]},
  ],
  knowledge: [
    { label: 'Main', items: [
      { label: 'Dashboard', href: '/dashboard.html', icon: 'home' },
      { label: 'Projects', href: '/admin-projects.html', icon: 'cal' },
      { label: 'Tasks', href: '/tasks.html', icon: 'check' },
      { label: 'Messages', href: '/messages.html', icon: 'chat', badge: '3' },
      { label: 'Files & Deliverables', href: '/files-deliverables.html', icon: 'folder' },
      { label: 'Feedback', href: '/feedback.html', icon: 'chat' },
      { label: 'Invoices', href: '/admin-invoices.html', icon: 'doclines' },
    ]},
    { label: 'Knowledge', items: [
      { label: 'Knowledge Base', href: '/knowledge-base.html', icon: 'book' },
      { label: 'Glossary', href: '/knowledge-base.html', icon: 'doc' },
      { label: 'Design System', href: '/design-system.html', icon: 'grid' },
    ]},
    { label: 'Communication', items: [
      { label: 'Meetings', href: '/meeting-notes.html', icon: 'users' },
      { label: 'Feedback', href: '/feedback.html', icon: 'chat' },
      { label: 'Calendar', href: '/calendar.html', icon: 'cal' },
    ]},
    { label: 'Billing', items: [
      { label: 'Payments', href: '/admin-invoices.html', icon: 'card' },
      { label: 'Subscriptions', href: '/subscriptions.html', icon: 'refresh' },
    ]},
    { label: 'Resources', items: [
      { label: 'Documents', href: '/files-deliverables.html', icon: 'folder' },
      { label: 'Support', href: '/knowledge-base.html', icon: 'help' },
    ]},
  ],
  flow: [
    { label: 'Main', items: [
      { label: 'Dashboard', href: '/dashboard.html', icon: 'home' },
      { label: 'Projects', href: '/admin-projects.html', icon: 'cal' },
      { label: 'Tasks', href: '/tasks.html', icon: 'check' },
      { label: 'Messages', href: '/messages.html', icon: 'chat', badge: '3' },
      { label: 'Files & Deliverables', href: '/files-deliverables.html', icon: 'folder' },
      { label: 'Invoices', href: '/admin-invoices.html', icon: 'doclines' },
    ]},
    { label: 'AI Tools', items: [
      { label: 'Proposal Generator', href: '/proposal-generator.html', icon: 'spark' },
      { label: 'AI Writer', href: '/admin-ai-writer.html', icon: 'pen' },
      { label: 'Design Brief Analyzer', href: '/design-brief-analyzer.html', icon: 'clip' },
      { label: 'Brand Audit Tool', href: '/brand-audit-tool.html', icon: 'search' },
      { label: 'SEO Analyzer', href: '/seo-analyzer.html', icon: 'search' },
      { label: 'Performance Analyzer', href: '/performance-analyzer.html', icon: 'pulse' },
      { label: 'Accessibility Scanner', href: '/accessibility-scanner.html', icon: 'eye' },
      { label: 'AI Chat Assistant', href: '/ai-chat-assistant.html', icon: 'chatface' },
    ]},
    { label: 'Knowledge', items: [
      { label: 'Knowledge Base', href: '/knowledge-base.html', icon: 'book' },
      { label: 'Design System', href: '/design-system.html', icon: 'grid' },
    ]},
    { label: 'Communication', items: [
      { label: 'Meetings', href: '/meeting-notes.html', icon: 'users' },
      { label: 'Meeting Notes', href: '/meeting-notes.html', icon: 'pen' },
      { label: 'Feedback', href: '/feedback.html', icon: 'chat' },
    ]},
    { label: 'Billing', items: [
      { label: 'Payments', href: '/admin-invoices.html', icon: 'card' },
      { label: 'Subscriptions', href: '/subscriptions.html', icon: 'refresh' },
    ]},
  ],
};
function renderDashNav(nav, variant, active) {
  const sections = DASH_NAV[variant] || DASH_NAV.suite;
  nav.innerHTML = sections.map((s) => `<div class="dash-nav-section"><div class="dash-nav-label">${esc(s.label)}${s.badge ? ' <span class="dash-new-badge">New</span>' : ''}</div>` +
    s.items.map((it) => `<a class="dash-nav-item${it.href === active ? ' active' : ''}" href="${it.href}"><span class="dash-nav-icon">${dic(DASH_ICONS[it.icon] || '')}</span> ${esc(it.label)}${it.badge ? `<span class="dash-nav-badge">${esc(it.badge)}</span>` : ''}</a>`).join('') + '</div>').join('');
}
// Pre-component boards (old static sidebars, generated tool screens) are upgraded
// in place to the same unified nav — variant resolved from the clean URL, active
// only when the URL matches a real item. Their static markup stays as the no-JS
// fallback, so this is progressive enhancement, not a dependency.
const LEGACY_NAV = {
  '/admin-users': ['suite', '/admin-users.html'],
  '/admin-leads': ['suite', '/admin-leads.html'],
  '/leads': ['suite', '/admin-leads.html'],
  '/admin-settings': ['suite', '/admin-settings.html'],
  '/admin-invoices': ['suite', '/admin-invoices.html'],
  '/forms': ['suite', '/forms.html'],
  '/feedback': ['suite', null],
  '/meeting-notes': ['suite', null],
  '/files-deliverables': ['suite', null],
  '/project-timeline': ['suite', null],
  '/proposal-generator': ['suite', '/proposal-generator.html'],
  '/tasks': ['suite', '/tasks.html'],
  '/messages': ['suite', '/messages.html'],
  '/subscriptions': ['suite', '/subscriptions.html'],
  '/ai-chat-assistant': ['flow', '/ai-chat-assistant.html'],
  '/brand-audit-tool': ['suite', '/brand-audit-tool.html'],
  '/search': ['suite', null],
};
function wireDashNav() {
  onReady(() => {
    $$('[data-dash-nav]').forEach((nav) => {
      renderDashNav(nav, nav.dataset.dashNav, nav.dataset.active || location.pathname);
    });
    $$('.dash-nav:not([data-dash-nav])').forEach((nav) => {
      const [variant, active] = LEGACY_NAV[location.pathname] || ['suite', null];
      renderDashNav(nav, variant, active);
    });
  });
}
wireDashNav();
// Pre-suite boards (admin-users, admin-settings) hand-rolled their sidebar as
// .st-nav. Re-render it from the same suite so they can never drift again —
// the active page is read off their own static markup before it is replaced.
function wireLegacyStNav() {
  onReady(() => {
    $$('.st-nav').forEach((nav) => {
      const cur = nav.querySelector('.st-nav-item.active');
      const active = cur ? cur.getAttribute('href') : null;
      nav.innerHTML = DASH_NAV.suite.map((s) => `<div class="st-nav-label">${esc(s.label)}</div>` +
        s.items.map((it) => `<a class="st-nav-item${it.href === active ? ' active' : ''}" href="${it.href}"><span class="st-nav-icon">${dic(DASH_ICONS[it.icon] || '')}</span>${esc(it.label)}</a>`).join('')).join('');
    });
  });
}
wireLegacyStNav();
