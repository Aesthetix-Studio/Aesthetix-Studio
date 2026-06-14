"use client";
import { useEffect, useState } from "react";
import { adminHeaders } from "./AdminLayout";
import { adminStyles as s } from "./admin-styles";
import { ConfirmDialog } from "./ConfirmDialog";

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
  const [deleteTarget, setDeleteTarget] = useState<{ slug: string; title: string } | null>(null);

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

  async function confirmDelete() {
    if (!deleteTarget) return;
    await fetch(`${API}/api/projects/${deleteTarget.slug}`, { method: "DELETE", headers: adminHeaders() });
    setDeleteTarget(null);
    await load();
  }

  if (editing !== null) {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
          <button onClick={() => setEditing(null)} style={s.ghost}>← Back</button>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "24px", fontStyle: "italic", color: "#F0EBE0", letterSpacing: "-0.02em", margin: 0 }}>{editing.id ? "Edit" : "New"} Project</h1>
        </div>
        <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", padding: "32px", maxWidth: 640, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(196,164,107,0.5), transparent)" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {(["title", "slug", "category", "summary", "result", "image"] as const).map(field => (
              <label key={field} style={s.label}>{field}<input value={(editing as any)[field] ?? ""} onChange={e => setEditing({ ...editing, [field]: e.target.value })} style={s.input} /></label>
            ))}
            <label style={s.label}>year<input type="number" value={editing.year ?? ""} onChange={e => setEditing({ ...editing, year: Number(e.target.value) })} style={s.input} /></label>
            <label style={s.label}>details (comma-separated)<input value={Array.isArray(editing.details) ? editing.details.join(", ") : ""} onChange={e => setEditing({ ...editing, details: e.target.value.split(",").map(x => x.trim()).filter(Boolean) })} style={s.input} /></label>
            <label style={{ ...s.label, flexDirection: "row", alignItems: "center", gap: 8 }}><input type="checkbox" checked={Boolean(editing.is_featured)} onChange={e => setEditing({ ...editing, is_featured: e.target.checked ? 1 : 0 })} />Featured</label>
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <button onClick={save} disabled={saving} style={s.primary}>{saving ? "Saving…" : "Save"}</button>
              <button onClick={() => setEditing(null)} style={s.ghost}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ConfirmDialog open={deleteTarget !== null} title="Delete project?" message={`This will permanently delete "${deleteTarget?.title}" and cannot be undone.`} onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "24px", fontStyle: "italic", color: "#F0EBE0", letterSpacing: "-0.02em", margin: 0, marginBottom: "4px" }}>Projects</h1>
          <p style={{ fontSize: "12px", color: "rgba(240,235,224,0.35)", fontFamily: "'Inter', sans-serif" }}>{projects.length} total · {projects.filter(p => p.is_featured).length} featured</p>
        </div>
        <button onClick={() => setEditing({ ...EMPTY })} style={s.primary}>+ Add Project</button>
      </div>
      {projects.length === 0 && <p style={{ color: "rgba(240,235,224,0.25)", fontFamily: "'Inter', sans-serif", fontSize: "13px" }}>No projects yet.</p>}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 80px 120px", padding: "12px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", gap: "16px" }}>
          {["Project", "Category", "Slug", "Year", ""].map(col => (<div key={col} style={{ fontSize: "9px", fontWeight: 500, color: "rgba(240,235,224,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}>{col}</div>))}
        </div>
        {projects.map((p, i) => (
          <div key={p.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 80px 120px", padding: "16px 24px", borderBottom: i < projects.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", alignItems: "center", gap: "16px", transition: "background 0.2s ease" }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
            <div><div style={{ fontSize: "13px", fontFamily: "'Instrument Serif', serif", fontStyle: "italic", color: "rgba(240,235,224,0.85)", marginBottom: "2px" }}>{p.title}{p.is_featured ? <span style={{ fontSize: "9px", color: "#C4A46B", marginLeft: "6px", fontFamily: "'Inter', sans-serif", fontStyle: "normal" }}>★</span> : null}</div></div>
            <div style={{ fontSize: "11px", color: "rgba(240,235,224,0.4)", fontFamily: "'Inter', sans-serif" }}>{p.category || "—"}</div>
            <div style={{ fontSize: "11px", color: "rgba(240,235,224,0.3)", fontFamily: "'Inter', sans-serif" }}>/{p.slug}</div>
            <div style={{ fontSize: "11px", color: "rgba(240,235,224,0.35)", fontFamily: "'Inter', sans-serif" }}>{p.year || "—"}</div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button onClick={() => setEditing({ ...p })} style={s.ghost}>Edit</button>
              <button onClick={() => setDeleteTarget({ slug: p.slug, title: p.title })} style={s.danger}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
