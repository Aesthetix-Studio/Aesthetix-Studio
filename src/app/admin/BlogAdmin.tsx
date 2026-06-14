"use client";
import { useEffect, useState } from "react";
import { adminHeaders } from "./AdminLayout";
import { adminStyles as s } from "./admin-styles";
import { ConfirmDialog } from "./ConfirmDialog";

const API = import.meta.env.VITE_API_URL || "http://localhost:8787";

interface Post {
  id: string; title: string; slug: string; excerpt: string | null;
  content: string; cover_image: string | null;
  seo_title: string | null; seo_description: string | null;
  published: number; created_at: string; updated_at: string;
}

const EMPTY: Omit<Post, "id" | "created_at" | "updated_at"> = {
  title: "", slug: "", excerpt: "", content: "", cover_image: "",
  seo_title: "", seo_description: "", published: 0,
};

export function BlogAdmin() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<(Omit<Post, "id" | "created_at" | "updated_at"> & { id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  async function load() {
    const r = await fetch(`${API}/api/admin/posts`, { headers: adminHeaders() });
    setPosts(await r.json());
  }

  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.id) {
        await fetch(`${API}/api/posts/${editing.slug}`, { method: "PUT", headers: adminHeaders(), body: JSON.stringify(editing) });
      } else {
        await fetch(`${API}/api/posts`, { method: "POST", headers: adminHeaders(), body: JSON.stringify(editing) });
      }
      await load();
      setEditing(null);
    } finally { setSaving(false); }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    await fetch(`${API}/api/posts/${deleteTarget}`, { method: "DELETE", headers: adminHeaders() });
    setDeleteTarget(null);
    await load();
  }

  async function togglePublished(post: Post) {
    await fetch(`${API}/api/posts/${post.slug}`, {
      method: "PUT", headers: adminHeaders(),
      body: JSON.stringify({ title: post.title, slug: post.slug, excerpt: post.excerpt, content: post.content, cover_image: post.cover_image, seo_title: post.seo_title, seo_description: post.seo_description, published: post.published ? 0 : 1 }),
    });
    await load();
  }

  if (editing !== null) {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
          <button onClick={() => setEditing(null)} style={s.ghost}>← Back</button>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "24px", fontStyle: "italic", color: "#F0EBE0", letterSpacing: "-0.02em", margin: 0 }}>{editing.id ? "Edit" : "New"} Post</h1>
        </div>
        <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", padding: "32px", maxWidth: 680, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(196,164,107,0.5), transparent)" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {(["title", "slug", "excerpt", "cover_image", "seo_title", "seo_description"] as const).map(field => (
              <label key={field} style={s.label}>{field.replace(/_/g, " ")}<input value={(editing as any)[field] ?? ""} onChange={e => setEditing({ ...editing, [field]: e.target.value })} style={s.input} /></label>
            ))}
            <label style={s.label}>content<textarea value={editing.content} onChange={e => setEditing({ ...editing, content: e.target.value })} style={{ ...s.input, minHeight: 280, fontFamily: "monospace", fontSize: 13, resize: "vertical" }} /></label>
            <label style={{ ...s.label, flexDirection: "row", alignItems: "center", gap: 8 }}><input type="checkbox" checked={Boolean(editing.published)} onChange={e => setEditing({ ...editing, published: e.target.checked ? 1 : 0 })} />Published</label>
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
      <ConfirmDialog open={deleteTarget !== null} title="Delete post?" message={`This will permanently delete "${deleteTarget}" and cannot be undone.`} onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "24px", fontStyle: "italic", color: "#F0EBE0", letterSpacing: "-0.02em", margin: 0, marginBottom: "4px" }}>Journal</h1>
          <p style={{ fontSize: "12px", color: "rgba(240,235,224,0.35)", fontFamily: "'Inter', sans-serif" }}>{posts.length} total · {posts.filter(p => p.published).length} published · {posts.filter(p => !p.published).length} drafts</p>
        </div>
        <button onClick={() => setEditing({ ...EMPTY })} style={s.primary}>+ New Post</button>
      </div>
      {posts.length === 0 && <p style={{ color: "rgba(240,235,224,0.25)", fontFamily: "'Inter', sans-serif", fontSize: "13px" }}>No posts yet.</p>}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr 100px 120px", padding: "12px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", gap: "16px" }}>
          {["Title", "Slug", "Status", ""].map(col => (<div key={col} style={{ fontSize: "9px", fontWeight: 500, color: "rgba(240,235,224,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}>{col}</div>))}
        </div>
        {posts.map((p, i) => (
          <div key={p.id} style={{ display: "grid", gridTemplateColumns: "3fr 1fr 100px 120px", padding: "16px 24px", borderBottom: i < posts.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", alignItems: "center", gap: "16px", transition: "background 0.2s ease" }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
            <div><div style={{ fontSize: "13px", fontFamily: "'Instrument Serif', serif", fontStyle: "italic", color: "rgba(240,235,224,0.85)", marginBottom: "2px" }}>{p.title}</div><div style={{ fontSize: "11px", color: "rgba(240,235,224,0.3)", fontFamily: "'Inter', sans-serif" }}>{new Date(p.created_at).toLocaleDateString()}</div></div>
            <div style={{ fontSize: "11px", color: "rgba(240,235,224,0.3)", fontFamily: "'Inter', sans-serif" }}>/{p.slug}</div>
            <div><span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", background: p.published ? "rgba(74,222,128,0.08)" : "rgba(255,255,255,0.04)", color: p.published ? "#4ade80" : "rgba(240,235,224,0.35)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}>{p.published ? "Published" : "Draft"}</span></div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button onClick={() => togglePublished(p)} style={s.ghost}>{p.published ? "Unpublish" : "Publish"}</button>
              <button onClick={() => setEditing({ ...p })} style={s.ghost}>Edit</button>
              <button onClick={() => setDeleteTarget(p.slug)} style={s.danger}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
