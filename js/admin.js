// Shared helpers for the Aesthetix admin screens — zero deps, plain JS.
// Loaded by admin-*.html before each page's own wiring script.
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const initials = (name) => String(name || '?').trim().split(/\s+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
const fmtDate = (iso) => iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
const fmtINR = (n) => '₹' + Math.round(Number(n) || 0).toLocaleString('en-IN');
const AVATAR_COLORS = ['#6C5CE7', '#3b82f6', '#22c55e', '#f59e0b', '#ec4899', '#10b981', '#8b5cf6', '#C9A84C'];
const avatarColor = (name) => AVATAR_COLORS[[...String(name)].reduce((a, c) => a + c.charCodeAt(0), 0) % AVATAR_COLORS.length];
const avatar = (name) => `<div style="width:30px;height:30px;border-radius:50%;background:${avatarColor(name)}22;color:${avatarColor(name)};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0">${initials(name)}</div>`;

// auth: admin API returns 401 unless `Authorization: Bearer $ADMIN_TOKEN` matches.
// The token is asked once, kept in localStorage, and sent on every request.
const TOKEN_KEY = 'adm_token';
const getToken = () => localStorage.getItem(TOKEN_KEY) || '';
const admClearToken = () => localStorage.removeItem(TOKEN_KEY); // expose for a "sign out" link

async function api(path, { method = 'GET', body } = {}) {
  const headers = body ? { 'content-type': 'application/json' } : {};
  const tok = getToken();
  if (tok) headers.authorization = `Bearer ${tok}`;
  const res = await fetch(path, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const json = await res.json().catch(() => ({}));
  // 401 → ask for the token once, then retry with it
  if (res.status === 401 && path !== '/api/contact') {
    const t = await promptToken();
    if (!t) throw new Error('Admin access required — enter the ADMIN_TOKEN');
    return api(path, { method, body });
  }
  if (!res.ok) throw new Error(json.error || `Request failed (${res.status})`);
  return json;
}

// small password-style modal that resolves with the entered token (or null on cancel)
function promptToken() {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'adm-overlay';
    overlay.innerHTML = `
      <div class="adm-modal">
        <h3>Admin access required</h3>
        <p style="margin:0 0 16px;color:#94a3b8;font-size:13px">This admin API is protected. Enter the ADMIN_TOKEN to continue.</p>
        <form>
          <div class="adm-field"><label for="f_token">ADMIN_TOKEN</label><input name="token" id="f_token" type="password" autocomplete="off" required></div>
          <div class="adm-actions">
            <button type="button" class="adm-btn ghost" data-act="cancel">Cancel</button>
            <button type="submit" class="adm-btn">Unlock</button>
          </div>
        </form>
      </div>`;
    document.body.appendChild(overlay);
    const close = (val) => { overlay.remove(); resolve(val); };
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(null); });
    $('[data-act="cancel"]', overlay).addEventListener('click', () => close(null));
    $('form', overlay).addEventListener('submit', (e) => {
      e.preventDefault();
      const t = $('input[name="token"]', overlay).value.trim();
      if (t) { setToken(t); close(t); }
    });
    $('input', overlay).focus();
  });
}

const setToken = (t) => { if (t) localStorage.setItem(TOKEN_KEY, t); else localStorage.removeItem(TOKEN_KEY); };

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
  const fmt = (c, v) => (c.fmt === 'inr' ? fmtINR(v) : c.fmt === 'date' ? fmtDate(v) : c.fmt === 'badge' ? badge(v, cfg.badge) : esc(v ?? '—'));
  const row = (r) => `<tr>${cfg.cols.map((c) => `<td>${fmt(c, r[c.key])}</td>`).join('')}<td><button class="row-view" data-id="${r.id}">View</button></td></tr>`;
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
  const load = async () => { try { rows = (await api('/api/' + cfg.entity)).data; render(); } catch (e) { toast(e.message, false); } };
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
    try { await api('/api/messages', { method: 'POST', body: { role: 'user', content: v } }); await load(); } catch (e) { toast(e.message, false); }
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
