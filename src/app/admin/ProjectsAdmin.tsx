import { useEffect, useState } from "react";
import { adminHeaders } from "./AdminLayout";

const API = import.meta.env.VITE_API_URL || "http://localhost:8787";

interface Project {
  id: string; title: string; slug: string; category: string | null;
  summary: string | null; result: string | null; year: number | null;
  image: string | null; details: string[]; is_featured: number;
}

const EMPTY: Omit<Project, "id"> = {
  title: "", slug: "", category: "", summary: "", result: "",
  year: new Date().getFullYear(), image: "", details: [], is_featured: 0,
};

export function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<(Omit<Project, "id"> & { id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    const r = await fetch(`${API}/api/projects`);
    setProjects(await r.json());
  }

  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.id) {
        await fetch(`${API}/api/projects/${editing.slug}`, { method: "PUT", headers: adminHeaders(), body: JSON.stringify(editing) });
      } else {
        await fetch(`${API}/api/projects`, { method: "POST", headers: adminHeaders(), body: JSON.stringify(editing) });
      }
      await load();
      setEditing(null);
    } finally { setSaving(false); }
  }

  async function del(slug: string) {
    if (!confirm(`Delete ${slug}?`)) return;
    await fetch(`${API}/api/projects/${slug}`, { method: "DELETE", headers: adminHeaders() });
    await load();
  }

  if (editing !== null) {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <button onClick={() => setEditing(null)} style={s.ghost}>← Back</button>
          <h1 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>{editing.id ? "Edit" : "New"} Project</h1>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 560 }}>
          {(["title", "slug", "category", "summary", "result", "image"] as const).map(field => (
            <label key={field} style={s.label}>
              {field}
              <input value={(editing as any)[field] ?? ""} onChange={e => setEditing({ ...editing, [field]: e.target.value })} style={s.input} />
            </label>
          ))}
          <label style={s.label}>
            year
            <input type="number" value={editing.year ?? ""} onChange={e => setEditing({ ...editing, year: Number(e.target.value) })} style={s.input} />
          </label>
          <label style={s.label}>
            details (comma-separated)
            <input value={Array.isArray(editing.details) ? editing.details.join(", ") : ""}
              onChange={e => setEditing({ ...editing, details: e.target.value.split(",").map(x => x.trim()).filter(Boolean) })} style={s.input} />
          </label>
          <label style={{ ...s.label, flexDirection: "row", alignItems: "center", gap: 8 }}>
            <input type="checkbox" checked={Boolean(editing.is_featured)} onChange={e => setEditing({ ...editing, is_featured: e.target.checked ? 1 : 0 })} />
            Featured
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
        <h1 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>Projects ({projects.length})</h1>
        <button onClick={() => setEditing({ ...EMPTY })} style={s.primary}>+ Add Project</button>
      </div>
      {projects.length === 0 && <p style={{ color: "#666" }}>No projects yet.</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {projects.map(p => (
          <div key={p.id} style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 6, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ margin: 0, fontWeight: 600 }}>{p.title} {p.is_featured ? <span style={{ fontSize: 11, color: "#f59e0b" }}>★ featured</span> : null}</p>
              <p style={{ margin: "2px 0 0", color: "#666", fontSize: 13 }}>{p.slug} · {p.category} · {p.year}</p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setEditing({ ...p })} style={s.ghost}>Edit</button>
              <button onClick={() => del(p.slug)} style={s.danger}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  primary: { background: "#fff", color: "#000", border: "none", padding: "8px 18px", borderRadius: 4, fontSize: 13, cursor: "pointer" },
  ghost: { background: "none", color: "#aaa", border: "1px solid #333", padding: "8px 14px", borderRadius: 4, fontSize: 13, cursor: "pointer" },
  danger: { background: "none", color: "#f87171", border: "1px solid #333", padding: "8px 14px", borderRadius: 4, fontSize: 13, cursor: "pointer" },
  label: { display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "#aaa" },
  input: { background: "#1a1a1a", border: "1px solid #333", color: "#fff", padding: "8px 12px", fontSize: 14, borderRadius: 4, outline: "none" },
};
