import { useEffect, useState } from "react";
import { adminHeaders } from "./AdminLayout";
import { adminStyles as s } from "./admin-styles";

const API = import.meta.env.VITE_API_URL || "http://localhost:8787";

interface CaseStudy {
  id: string; client: string; slug: string; challenge: string;
  process: string; results: string; cover_image: string | null;
  category: string | null; year: string | null; published: number;
  created_at: string; updated_at: string;
}

const EMPTY: Omit<CaseStudy, "id" | "created_at" | "updated_at"> = {
  client: "", slug: "", challenge: "", process: "", results: "",
  cover_image: "", category: "", year: "", published: 0,
};

export function CaseStudiesAdmin() {
  const [items, setItems] = useState<CaseStudy[]>([]);
  const [editing, setEditing] = useState<(Omit<CaseStudy, "id" | "created_at" | "updated_at"> & { id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    const r = await fetch(`${API}/api/admin/case-studies`, { headers: adminHeaders() });
    setItems(await r.json());
  }

  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.id) {
        await fetch(`${API}/api/case-studies/${editing.slug}`, { method: "PUT", headers: adminHeaders(), body: JSON.stringify(editing) });
      } else {
        await fetch(`${API}/api/case-studies`, { method: "POST", headers: adminHeaders(), body: JSON.stringify(editing) });
      }
      await load();
      setEditing(null);
    } finally { setSaving(false); }
  }

  async function del(slug: string) {
    if (!confirm(`Delete "${slug}"?`)) return;
    await fetch(`${API}/api/case-studies/${slug}`, { method: "DELETE", headers: adminHeaders() });
    await load();
  }

  async function togglePublished(item: CaseStudy) {
    await fetch(`${API}/api/case-studies/${item.slug}`, {
      method: "PUT", headers: adminHeaders(),
      body: JSON.stringify({
        client: item.client, slug: item.slug, challenge: item.challenge,
        process: item.process, results: item.results, cover_image: item.cover_image,
        category: item.category, year: item.year, published: item.published ? 0 : 1,
      }),
    });
    await load();
  }

  if (editing !== null) {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <button onClick={() => setEditing(null)} style={s.ghost}>← Back</button>
          <h1 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>{editing.id ? "Edit" : "New"} Case Study</h1>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 640 }}>
          {(["client", "slug", "category", "year", "cover_image"] as const).map(field => (
            <label key={field} style={s.label}>
              {field.replace(/_/g, " ")}
              <input
                value={(editing as any)[field] ?? ""}
                onChange={e => setEditing({ ...editing, [field]: e.target.value })}
                style={s.input}
              />
            </label>
          ))}
          <label style={s.label}>
            challenge
            <textarea
              value={editing.challenge}
              onChange={e => setEditing({ ...editing, challenge: e.target.value })}
              style={{ ...s.input, minHeight: 120, fontSize: 13, resize: "vertical" }}
            />
          </label>
          <label style={s.label}>
            process
            <textarea
              value={editing.process}
              onChange={e => setEditing({ ...editing, process: e.target.value })}
              style={{ ...s.input, minHeight: 120, fontSize: 13, resize: "vertical" }}
            />
          </label>
          <label style={s.label}>
            results
            <textarea
              value={editing.results}
              onChange={e => setEditing({ ...editing, results: e.target.value })}
              style={{ ...s.input, minHeight: 120, fontSize: 13, resize: "vertical" }}
            />
          </label>
          <label style={{ ...s.label, flexDirection: "row", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox"
              checked={Boolean(editing.published)}
              onChange={e => setEditing({ ...editing, published: e.target.checked ? 1 : 0 })}
            />
            Published
          </label>
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button onClick={save} disabled={saving} style={s.primary}>{saving ? "Saving…" : "Save"}</button>
            <button onClick={() => setEditing(null)} style={s.ghost}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>Case Studies ({items.length})</h1>
        <button onClick={() => setEditing({ ...EMPTY })} style={s.primary}>+ New Case Study</button>
      </div>
      {items.length === 0 && <p style={{ color: "#666" }}>No case studies yet.</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map(item => (
          <div key={item.id} style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 0, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {item.client}
                <span style={{ fontSize: 11, marginLeft: 8, color: item.published ? "#22c55e" : "#f59e0b" }}>
                  {item.published ? "published" : "draft"}
                </span>
              </p>
              <p style={{ margin: "2px 0 0", color: "#666", fontSize: 13 }}>
                /{item.slug} · {item.category || "uncategorized"} · {item.year || "n/a"}
              </p>
            </div>
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <button onClick={() => togglePublished(item)} style={s.ghost}>
                {item.published ? "Unpublish" : "Publish"}
              </button>
              <button onClick={() => setEditing({ ...item })} style={s.ghost}>Edit</button>
              <button onClick={() => del(item.slug)} style={s.danger}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

