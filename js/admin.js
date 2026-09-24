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
//     stats:[{label,desc?,op:'count'|'pct'|'sum'|'avg',key?,value?,fmt?}], fields:[modal defs],
//     tabs?:[{label,value,values?}], tabKey?, searchPh?, addLabel?, rail?:{overview,
//     group:{key,colors?,labels?},top?,recent?,actions?} }
// ponytail: tabs/rail/search/export are progressive enhancement — every hook is
// guarded, so pages without them (older protos) render exactly as before.
function wireToolPage(cfg) {
  const tbody = $('#adm-tbody');
  const count = $('#adm-count');
  const addBtn = $('#tool-add');
  let rows = [];
  const state = { tab: 'all', tabVals: [], q: '', sort: 'new', page: 1 };
  // ponytail: files-only read-only join — latest client note per file via the
  // thread=file:<id> convention (no schema change, no write path here). Ceiling:
  // two GETs and newest-wins. Upgrade path: server-side join once deliverables get FKs.
  let fileNotes = {};
  const starRow = (v) => { const n = Math.max(0, Math.min(5, Math.round(Number(v) || 0))); return `<span class="stars">${'★'.repeat(n)}${'☆'.repeat(5 - n)}</span>`; };
  const fmt = (c, v) => (c.fmt === 'inr' ? fmtINR(v) : c.fmt === 'date' ? fmtDate(v) : c.fmt === 'badge' ? badge(v, cfg.badge) : c.fmt === 'stars' ? starRow(v) : esc(v ?? '—'));
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
  const tabMatch = (r) => {
    if (!cfg.tabKey || state.tab === 'all') return true;
    const vals = state.tabVals.length ? state.tabVals : [state.tab];
    return vals.map(String).includes(String(r[cfg.tabKey] ?? ''));
  };
  const searchMatch = (r) => {
    if (!state.q) return true;
    return cfg.cols.map((c) => String(r[c.key] ?? '')).join(' ').toLowerCase().includes(state.q);
  };
  const list = () => sortList(rows.filter(tabMatch).filter(searchMatch));
  // ponytail: fixed 8-per-page, no page-size control — ceiling is arbitrary
  // truncation on long tables. Upgrade path: a per-page select in tool-foot.
  const PER_PAGE = 8;
  const sortList = (arr) => {
    const a = [...arr];
    if (state.sort === 'az') {
      const k = (cfg.cols[0] || {}).key;
      a.sort((x, y) => String(x[k] ?? '').localeCompare(String(y[k] ?? '')));
    } else if (state.sort === 'old') a.sort((x, y) => String(x.created_at || '').localeCompare(String(y.created_at || '')));
    else a.sort((x, y) => String(y.created_at || '').localeCompare(String(x.created_at || '')));
    return a;
  };
  const RAIL_COLORS = ['#8B5CF6', '#60A5FA', '#22C55E', '#FBBF24', '#EC4899'];
  const renderRail = () => {
    const g = (cfg.rail || {}).group;
    if (!g) return;
    const groups = new Map();
    rows.forEach((r) => { const k = String(r[g.key] ?? '—'); groups.set(k, (groups.get(k) || 0) + 1); });
    const colors = g.colors && g.colors.length ? g.colors : RAIL_COLORS;
    const items = [...groups.entries()].map(([k, n], i) => ({ key: k, label: (g.labels || {})[k] ?? k, n, color: colors[i % colors.length] }));
    const total = items.reduce((a, x) => a + x.n, 0);
    const pie = $('#rail-pie'), legend = $('#rail-legend'), rTotal = $('#rail-total');
    if (rTotal) rTotal.textContent = rows.length;
    if (pie && total) {
      let acc = 0;
      pie.style.background = 'conic-gradient(' + items.map((x) => {
        const from = (acc / total) * 100; acc += x.n;
        return `${x.color} ${from.toFixed(1)}% ${((acc / total) * 100).toFixed(1)}%`;
      }).join(',') + ')';
    }
    if (legend) legend.innerHTML = items.map((x) => `<div class="rail-leg"><div class="rail-dot" style="background:${x.color}"></div> ${esc(x.label)} <b>${x.n}${total ? ` (${Math.round((x.n / total) * 1000) / 10}%)` : ''}</b></div>`).join('') || '<p class="adm-empty">No data yet.</p>';
    const top = $('#rail-top');
    if (top) {
      const max = Math.max(...items.map((x) => x.n), 1);
      top.innerHTML = [...items].sort((a, b) => b.n - a.n).slice(0, 4).map((x) => `<div class="rail-item"><div class="tx"><b>${esc(x.label)}</b><div class="rail-bar"><i style="width:${Math.round((x.n / max) * 100)}%;background:${x.color}"></i></div></div><span style="color:var(--text-3)">${x.n}</span></div>`).join('') || '<p class="adm-empty">No data yet.</p>';
    }
    const recent = $('#rail-recent');
    if (recent) {
      const pick = [...rows].sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || ''))).slice(0, 4);
      recent.innerHTML = pick.map((r) => {
        const primary = String(r[(cfg.cols[0] || {}).key] ?? '—');
        const who = String(r.name || r.title || r.client || r.source || primary || '?');
        return `<div class="rail-item">${avatar(who)}<div class="tx"><b>${esc(primary)}</b><span>${esc(fmtDate(r.created_at) !== '—' ? fmtDate(r.created_at) : (r.status || ''))}</span></div></div>`;
      }).join('') || '<p class="adm-empty">No records yet.</p>';
    }
  };
  const render = () => {
    const shown = list();
    const totalPages = Math.max(1, Math.ceil(shown.length / PER_PAGE));
    if (state.page > totalPages) state.page = totalPages;
    const start = (state.page - 1) * PER_PAGE;
    const paged = shown.slice(start, start + PER_PAGE);
    tbody.innerHTML = paged.length ? paged.map(row).join('') : `<tr><td colspan="${cfg.cols.length + 1}" class="adm-empty">No records yet.</td></tr>`;
    if (count) count.textContent = shown.length ? `Showing ${start + 1}–${Math.min(start + PER_PAGE, shown.length)} of ${shown.length} ${cfg.title}${shown.length === 1 ? '' : 's'}` : `No ${cfg.title}s yet`;
    const pages = $('#tool-pages');
    if (pages) {
      const nums = [];
      for (let i = 1; i <= totalPages; i++) {
        if (totalPages <= 7 || i === 1 || i === totalPages || Math.abs(i - state.page) <= 1) nums.push(i);
        else if (nums[nums.length - 1] !== '…') nums.push('…');
      }
      pages.innerHTML = totalPages > 1 ? `<button data-pg="${state.page - 1}"${state.page === 1 ? ' disabled' : ''}>‹</button>` + nums.map((n) => n === '…' ? '<button disabled>…</button>' : `<button data-pg="${n}"${n === state.page ? ' class="on"' : ''}>${n}</button>`).join('') + `<button data-pg="${state.page + 1}"${state.page === totalPages ? ' disabled' : ''}>›</button>` : '';
      pages.querySelectorAll('button[data-pg]').forEach((b) => b.addEventListener('click', () => {
        const p = Number(b.dataset.pg);
        if (p >= 1 && p <= totalPages) { state.page = p; render(); }
      }));
    }
    $$('.scard').forEach((card) => {
      const l = $('.eyebrow', card);
      const s = l && cfg.stats.find((x) => x.label === l.textContent.trim());
      if (s) $('h3', card).textContent = stat(s, rows);
    });
    renderRail();
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
  // tabs + search + export + rail quick actions (present on the mockup-family layout only)
  $$('.ftab').forEach((b) => b.addEventListener('click', () => {
    $$('.ftab').forEach((x) => x.classList.remove('active'));
    b.classList.add('active');
    state.tab = b.dataset.tab || 'all';
    state.tabVals = String(b.dataset.tabvals || '').split(',').filter(Boolean);
    state.page = 1;
    render();
  }));
  const search = $('#tool-search');
  if (search) search.addEventListener('input', () => { state.q = search.value.trim().toLowerCase(); state.page = 1; render(); });
  const filters = $('#tool-filters'), menu = $('#tool-menu');
  if (filters && menu) {
    filters.addEventListener('click', (e) => { e.stopPropagation(); menu.hidden = !menu.hidden; });
    document.addEventListener('click', (e) => { if (!menu.hidden && !e.target.closest('.tool-filterwrap')) menu.hidden = true; });
    $$('#tool-menu button').forEach((b) => b.addEventListener('click', () => {
      $$('#tool-menu button').forEach((x) => x.classList.remove('on'));
      b.classList.add('on');
      state.sort = b.dataset.sort || 'new';
      state.page = 1;
      menu.hidden = true;
      render();
    }));
  }
  const exp = $('#tool-export');
  if (exp) exp.addEventListener('click', () => {
    const head = cfg.cols.map((c) => `"${String(c.label).replace(/"/g, '""')}"`).join(',');
    const lines = list().map((r) => cfg.cols.map((c) => `"${String(r[c.key] ?? '').replace(/"/g, '""')}"`).join(','));
    const blob = new Blob([[head, ...lines].join('\r\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = cfg.entity + '-export.csv';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  });
  $$('[data-act="add"]').forEach((b) => b.addEventListener('click', () => { if (addBtn) addBtn.click(); }));
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

// ── Project timeline board (Gantt + list + month grid) ──
// Bespoke renderer for the timeline mockup: week-scale bars from start_date →
// due_date, a month grid of due dates, and a project rail. cfg is the same
// serialized shape as wireToolPage (entity/stats/badge/fields).
// ponytail: bars need real ranges — a milestone with no parseable date at all
// is list/calendar-only (no invented position); a missing start falls back to
// due−13d and vice versa. Ceiling: free-text dates that don't parse.
// Upgrade path: date inputs + server-side validation.
function wireTimeline(cfg) {
  let miles = [], projects = [], files = [];
  const st = { project: 'all', view: 'timeline' };
  const nowMs = Date.now(), nowD = new Date();
  const cal = { y: nowD.getFullYear(), m: nowD.getMonth() };
  const COLORS = { complete: '#22C55E', 'in progress': '#7C3AED', scheduled: '#52525B' };
  const color = (s) => COLORS[String(s || '').toLowerCase()] || '#8B5CF6';
  const parseD = (s) => { const t = Date.parse(String(s || '')); return Number.isNaN(t) ? null : t; };
  const day = 86400000;
  const fmtD = (t) => (t == null ? '—' : new Date(t).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
  const fmtS = (t) => (t == null ? '' : new Date(t).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  const projName = (id) => (projects.find((p) => Number(p.id) === Number(id)) || {}).title || (Number(id) ? 'Project ' + id : 'Unassigned');
  const filtered = () => (st.project === 'all' ? miles : miles.filter((m) => Number(m.project_id) === Number(st.project)));
  const range = (m) => {
    let s = parseD(m.start_date), e = parseD(m.due_date);
    if (s == null && e == null) return null;
    if (s == null) s = e - 13 * day;
    if (e == null) e = s + 13 * day;
    return s <= e ? [s, e] : [e, s];
  };
  const renderStats = () => {
    const rows = filtered();
    $$('.scard').forEach((card) => {
      const l = $('.eyebrow', card);
      const s = l && (cfg.stats || []).find((x) => x.label === l.textContent.trim());
      if (!s) return;
      $('h3', card).textContent = s.key !== undefined && s.value !== undefined ? rows.filter((r) => String(r[s.key]) === String(s.value)).length : rows.length;
    });
  };
  const openModal = (m) => modal({
    title: m ? m.title : 'New Milestone',
    fields: cfg.fields.map((f) => ({ ...f, value: m ? m[f.name] : f.value })),
    onSubmit: async (d) => { await api(m ? '/api/' + cfg.entity + '/' + m.id : '/api/' + cfg.entity, { method: m ? 'PUT' : 'POST', body: d }); load(); },
    onDelete: m ? async () => { await api('/api/' + cfg.entity + '/' + m.id, { method: 'DELETE' }); load(); } : undefined,
  });
  const renderGantt = () => {
    const g = $('#tl-gantt');
    if (!g) return;
    const rows = filtered().map((m) => [m, range(m)]).filter(([, r]) => r);
    if (!rows.length) { g.innerHTML = '<p class="adm-empty">Add start and due dates to see the timeline.</p>'; return; }
    let lo = Math.min(...rows.map(([, r]) => r[0])), hi = Math.max(...rows.map(([, r]) => r[1]));
    lo -= ((new Date(lo).getDay() + 6) % 7) * day;
    hi += (6 - ((new Date(hi).getDay() + 6) % 7)) * day;
    const weeks = [];
    for (let t = lo; t <= hi; t += 7 * day) weeks.push(t);
    const N = weeks.length, span = Math.max(hi - lo, 1);
    const pct = (t) => ((t - lo) / span) * 100;
    const today = nowMs >= lo && nowMs <= hi ? `<div class="tl-today" style="left:${pct(nowMs)}%"><span>Today</span></div>` : '';
    g.innerHTML = `<div class="tl-ghead"><div class="tl-glabel">PHASES &amp; TASKS</div><div class="tl-weeks" style="grid-template-columns:repeat(${N},1fr)">${weeks.map((w, i) => `<div class="tl-week"><b>WEEK ${i + 1}</b>${fmtS(w)} – ${fmtS(w + 6 * day)}</div>`).join('')}</div></div>`
      + rows.map(([m, r]) => {
        const c = color(m.status);
        const left = Math.max(pct(r[0]), 0), width = Math.max(pct(r[1]) - left, 1.5);
        return `<div class="tl-grow"><div class="tl-mname"><span class="tl-dot" style="background:${c}"></span><div><b>${esc(m.title)}</b><span>${esc(m.status || '')} · ${fmtS(r[0])} – ${fmtS(r[1])}</span></div></div>`
          + `<div class="tl-track" style="--n:${N}">${today}<div class="tl-bar" data-id="${m.id}" style="left:${left}%;width:${width}%;background:linear-gradient(90deg,${c}55,${c})" title="${esc(m.title)}">${fmtS(r[0])} – ${fmtS(r[1])}</div></div></div>`;
      }).join('');
  };
  const renderList = () => {
    const tb = $('#tl-tbody');
    if (!tb) return;
    const rows = filtered();
    tb.innerHTML = rows.length ? rows.map((m) => {
      const r = range(m);
      return `<tr><td><div style="font-weight:600;color:#fff;font-size:12px">${esc(m.title)}</div><div style="color:var(--text-4);font-size:10px">${esc(projName(m.project_id))}</div></td>`
        + `<td>${badge(m.status, cfg.badge)}</td><td style="color:var(--text-3);font-size:11px">${r ? fmtD(r[0]) : '—'}</td><td style="color:var(--text-3);font-size:11px">${r ? fmtD(r[1]) : fmtD(parseD(m.due_date))}</td>`
        + `<td><button class="row-view" data-id="${m.id}" style="background:var(--surface-2);border:1px solid var(--line);color:var(--text-3);padding:3px 10px;border-radius:4px;font-size:10px;cursor:pointer">View</button></td></tr>`;
    }).join('') : `<tr><td colspan="5" class="adm-empty">No milestones yet.</td></tr>`;
    const c = $('#tl-count');
    if (c) c.textContent = `Showing ${rows.length} milestone${rows.length === 1 ? '' : 's'}`;
  };
  const renderCal = () => {
    const grid = $('#tl-calgrid');
    if (!grid) return;
    $('#tl-cal-title').textContent = new Date(cal.y, cal.m, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const first = new Date(cal.y, cal.m, 1), dim = new Date(cal.y, cal.m + 1, 0).getDate();
    const lead = (first.getDay() + 6) % 7;
    const prevDim = new Date(cal.y, cal.m, 0).getDate();
    const dues = {};
    filtered().forEach((m) => {
      const t = parseD(m.due_date);
      if (t == null) return;
      const d = new Date(t);
      const k = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      (dues[k] = dues[k] || []).push(m);
    });
    let html = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => `<div class="tl-dow">${d}</div>`).join('');
    for (let i = lead - 1; i >= 0; i--) html += `<div class="tl-day dim"><b>${prevDim - i}</b></div>`;
    for (let d = 1; d <= dim; d++) {
      const evts = dues[`${cal.y}-${cal.m}-${d}`] || [];
      html += `<div class="tl-day"><b>${d}</b>${evts.slice(0, 3).map((m) => `<div class="tl-evt${String(m.status).toLowerCase() === 'complete' ? ' done' : ''}" title="${esc(m.title)}">${esc(m.title)}</div>`).join('')}${evts.length > 3 ? `<div style="font-size:9px;color:#7A7A88">+${evts.length - 3} more</div>` : ''}</div>`;
    }
    grid.innerHTML = html;
  };
  const renderRail = () => {
    const rows = filtered().map((m) => [m, range(m)]).filter(([, r]) => r);
    const name = st.project === 'all' ? 'All Projects' : projName(st.project);
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('tl-ov-name', name);
    set('tl-ov-start', rows.length ? fmtD(Math.min(...rows.map(([, r]) => r[0]))) : '—');
    set('tl-ov-target', rows.length ? fmtD(Math.max(...rows.map(([, r]) => r[1]))) : '—');
    const ovS = document.getElementById('tl-ov-status');
    if (ovS) {
      const all = filtered();
      const txt = !all.length ? '—' : all.every((m) => String(m.status).toLowerCase() === 'complete') ? 'Complete' : all.some((m) => parseD(m.due_date) != null && parseD(m.due_date) < nowMs - day && String(m.status).toLowerCase() !== 'complete') ? 'Delayed' : 'On Track';
      const col = txt === 'Delayed' ? '#F87171' : '#22C55E';
      ovS.innerHTML = txt === '—' ? '—' : `<span class="bx" style="background:${col}22;color:${col}">${txt}</span>`;
    }
    const keys = document.getElementById('tl-keys');
    if (keys) {
      const up = [...filtered()].sort((a, b) => (parseD(a.due_date) ?? Infinity) - (parseD(b.due_date) ?? Infinity)).slice(0, 4);
      keys.innerHTML = up.map((m) => `<div class="tl-key"><span class="tl-dot" style="background:${color(m.status)};margin-top:2px"></span><div class="tx"><b>${esc(m.title)}</b><span>${fmtD(parseD(m.due_date))}</span></div></div>`).join('') || '<p class="adm-empty">No milestones.</p>';
    }
    const box = document.getElementById('tl-files');
    if (box) {
      const title = st.project === 'all' ? '' : projName(st.project).toLowerCase();
      const match = files.filter((f) => !title || String(f.project || '').toLowerCase() === title || String(f.project || '').toLowerCase().includes(title) || title.includes(String(f.project || '').toLowerCase())).slice(0, 3);
      const icon = (t) => ({ pdf: '📕', document: '📄', design: '🔷', image: '🖼️', video: '🎬', file: '📁' }[String(t || '').toLowerCase()] || '📁');
      box.innerHTML = match.map((f) => `<div class="tl-file"><span class="tl-fic" style="background:rgba(139,92,246,.13)">${icon(f.type)}</span><div class="tx" style="flex:1;min-width:0"><b style="display:block;font-size:11.5px;color:#E4E4EA;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(f.name)}</b><span style="font-size:10px;color:#7A7A88">${esc(f.size || '')}</span></div></div>`).join('') || '<p class="adm-empty">No files linked.</p>';
    }
  };
  const render = () => { renderStats(); renderGantt(); renderList(); renderCal(); renderRail(); };
  const setView = (v) => {
    st.view = v;
    $$('[data-tview]').forEach((b) => b.classList.toggle('on', b.dataset.tview === v));
    const show = (id, on) => { const el = document.getElementById(id); if (el) el.hidden = !on; };
    show('tl-gantt', v === 'timeline');
    show('tl-list', v === 'list');
    show('tl-cal', v === 'cal');
  };
  const load = async () => {
    try {
      miles = (await api('/api/' + cfg.entity)).data || [];
      try { projects = (await api('/api/projects')).data || []; } catch { projects = []; }
      try { files = (await api('/api/files')).data || []; } catch { files = []; }
      const sel = $('#tl-project');
      if (sel && !sel.options.length) {
        const opts = [`<option value="all">All Projects</option>`].concat(projects.map((p) => `<option value="${p.id}">${esc(p.title || p.client || ('Project ' + p.id))}</option>`));
        if (miles.some((m) => !Number(m.project_id))) opts.push('<option value="0">Unassigned</option>');
        sel.innerHTML = opts.join('');
        sel.addEventListener('change', () => { st.project = sel.value; render(); });
      }
      // jump the calendar to the first upcoming due date when the current
      // month holds none, so the grid is never an empty surprise
      const upcoming = miles.map((m) => parseD(m.due_date)).filter((t) => t != null && t >= nowMs - day).sort((a, b) => a - b)[0];
      if (upcoming) {
        const d = new Date(upcoming);
        const has = miles.some((m) => { const t = parseD(m.due_date); return t != null && new Date(t).getFullYear() === cal.y && new Date(t).getMonth() === cal.m; });
        if (!has) { cal.y = d.getFullYear(); cal.m = d.getMonth(); }
      }
      render();
    } catch (e) { toast(e.message, false); }
  };
  $$('[data-tview]').forEach((b) => b.addEventListener('click', () => setView(b.dataset.tview)));
  const ka = $('#tl-keys-all');
  if (ka) ka.addEventListener('click', () => setView('list'));
  const add = $('#tl-add');
  if (add) add.addEventListener('click', () => openModal(null));
  const dl = $('#tl-download');
  if (dl) dl.addEventListener('click', () => {
    const head = '"Milestone","Status","Start","Due","Project"';
    const lines = filtered().map((m) => { const r = range(m); return [m.title, m.status, r ? fmtD(r[0]) : '', r ? fmtD(r[1]) : '', projName(m.project_id)].map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','); });
    const blob = new Blob([[head, ...lines].join('\r\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'project-timeline.csv';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  });
  const prev = $('#tl-prev'), next = $('#tl-next');
  if (prev) prev.addEventListener('click', () => { cal.m--; if (cal.m < 0) { cal.m = 11; cal.y--; } renderCal(); });
  if (next) next.addEventListener('click', () => { cal.m++; if (cal.m > 11) { cal.m = 0; cal.y++; } renderCal(); });
  document.addEventListener('click', (e) => {
    const t = e.target.closest('#tl-gantt [data-id], #tl-tbody [data-id]');
    if (!t) return;
    const m = miles.find((x) => x.id === Number(t.dataset.id));
    if (m) openModal(m);
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
// Result cards + a type-filter rail mirror the Search mockup's pattern; the
// page stays inside the admin chrome because the endpoint is workspace data.
function wireSearch() {
  const input = $('#search-input'), res = $('#search-results'), filters = $('#search-filters');
  const count = $('#search-count'), total = $('#search-total'), sort = $('#search-sort'), clear = $('#search-clear');
  const ROUTES = { projects: '/admin-projects', leads: '/admin-leads', articles: '/admin-articles', files: '/files-deliverables', meetings: '/meeting-notes', forms: '/forms', tasks: '/tasks', milestones: '/project-timeline', messages: '/messages', invoices: '/admin-invoices', proposals: '/proposal-generator', feedback: '/feedback', users: '/admin-users', subscriptions: '/subscriptions', media: '/admin-media' };
  const LABELS = { projects: 'Projects', leads: 'Leads', articles: 'Articles', files: 'Files', meetings: 'Meetings', forms: 'Forms', tasks: 'Tasks', milestones: 'Milestones', messages: 'Messages', invoices: 'Invoices', proposals: 'Proposals', feedback: 'Feedback', users: 'Users', subscriptions: 'Subscriptions', media: 'Media' };
  const ICONS = { projects: '◫', leads: '✉', articles: '📄', files: '📁', meetings: '📅', forms: '📋', tasks: '✓', milestones: '◷', messages: '💬', invoices: '🧾', proposals: '📑', feedback: '★', users: '👤', subscriptions: '🔁', media: '🖼️' };
  let all = [], off = new Set(), byAz = false, t;
  const render = () => {
    const shown = all.filter((r) => !off.has(r.type));
    const ordered = byAz ? [...shown].sort((a, b) => String(a.title || '').localeCompare(String(b.title || ''))) : shown;
    if (count) count.textContent = all.length ? `We found ${shown.length} result${shown.length === 1 ? '' : 's'} for your search.` : 'Type to search across the workspace.';
    if (total) total.textContent = all.length ? `${all.length}` : '';
    if (filters) {
      const groups = new Map();
      all.forEach((r) => groups.set(r.type, (groups.get(r.type) || 0) + 1));
      filters.innerHTML = all.length ? `<label class="search-frow"><span>✦</span> All Results <b>${all.length}</b></label>`
        + [...groups.entries()].map(([type, n]) => `<label class="search-frow"><input type="checkbox" data-stype="${esc(type)}"${off.has(type) ? '' : ' checked'}> ${esc(LABELS[type] || type)} <b>${n}</b></label>`).join('') : '';
      filters.querySelectorAll('[data-stype]').forEach((c) => c.addEventListener('change', () => {
        if (c.checked) off.delete(c.dataset.stype); else off.add(c.dataset.stype);
        render();
      }));
      const head = filters.querySelector('.search-frow');
      if (head) head.addEventListener('click', () => { off = new Set(); render(); });
    }
    if (!res) return;
    res.innerHTML = !all.length ? '' : ordered.length ? ordered.map((r) => {
      const c = avatarColor(r.type);
      return `<div class="search-card"><div class="search-ic" style="color:${c};background:${c}22">${ICONS[r.type] || '📄'}</div>`
        + `<div style="flex:1;min-width:0"><div class="eyebrow">${esc((LABELS[r.type] || r.type).toUpperCase())}</div><h3>${esc(r.title || ('Untitled ' + r.type))}</h3>`
        + (r.snippet ? `<p class="small">${esc(r.snippet)}</p>` : '') + (r.label ? `<p class="small">— ${esc(r.label)}</p>` : '')
        + `</div><a class="search-open" href="${ROUTES[r.type] || '#'}">Open →</a></div>`;
    }).join('') : '<p class="adm-empty">No results for the selected types.</p>';
  };
  if (sort) sort.addEventListener('change', () => { byAz = sort.value === 'az'; render(); });
  if (clear) clear.addEventListener('click', () => { input.value = ''; all = []; off = new Set(); render(); input.focus(); });
  input.addEventListener('input', () => {
    clearTimeout(t);
    t = setTimeout(async () => {
      const q = input.value.trim();
      if (!q) { all = []; off = new Set(); render(); return; }
      try {
        all = (await api('/api/search?q=' + encodeURIComponent(q))).data || [];
        off = new Set();
        render();
      } catch (e) { res.innerHTML = '<p class="adm-empty">' + esc(e.message) + '</p>'; }
    }, 250);
  });
  render();
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
