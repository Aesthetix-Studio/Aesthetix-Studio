import { useEffect, useState } from "react";
import { adminHeaders } from "./AdminLayout";

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
  const [showAI, setShowAI] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [aiTone, setAiTone] = useState("professional yet approachable");
  const [aiLength, setAiLength] = useState("medium");
  const [generating, setGenerating] = useState(false);
  const [aiError, setAiError] = useState("");

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

  async function del(slug: string) {
    if (!confirm(`Delete "${slug}"?`)) return;
    await fetch(`${API}/api/posts/${slug}`, { method: "DELETE", headers: adminHeaders() });
    await load();
  }

  async function togglePublished(post: Post) {
    await fetch(`${API}/api/posts/${post.slug}`, {
      method: "PUT", headers: adminHeaders(),
      body: JSON.stringify({
        title: post.title, slug: post.slug, excerpt: post.excerpt,
        content: post.content, cover_image: post.cover_image,
        seo_title: post.seo_title, seo_description: post.seo_description,
        published: post.published ? 0 : 1,
      }),
    });
    await load();
  }

  if (editing !== null) {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <button onClick={() => setEditing(null)} style={s.ghost}>← Back</button>
          <h1 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>{editing.id ? "Edit" : "New"} Post</h1>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 640 }}>
          {(["title", "slug", "excerpt", "cover_image", "seo_title", "seo_description"] as const).map(field => (
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
            content
            <textarea
              value={editing.content}
              onChange={e => setEditing({ ...editing, content: e.target.value })}
              style={{ ...s.input, minHeight: 280, fontFamily: "monospace", fontSize: 13, resize: "vertical" }}
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
        <h1 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>Blog Posts ({posts.length})</h1>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setShowAI(!showAI)} style={s.accent}>✨ Generate with AI</button>
          <button onClick={() => setEditing({ ...EMPTY })} style={s.primary}>+ New Post</button>
        </div>
      </div>
      {showAI && (
        <div style={{ background: "#111", border: "1px solid rgba(196,164,107,0.25)", borderRadius: 6, padding: 20, marginBottom: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 14px", color: "#C4A46B" }}>AI Content Assistant</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input required placeholder="Blog topic (e.g. 'Why UI/UX matters for SaaS startups')" value={aiTopic}
              onChange={e => setAiTopic(e.target.value)} style={s.input} />
            <div style={{ display: "flex", gap: 12 }}>
              <label style={{ ...s.label, flex: 1 }}>
                Tone
                <select value={aiTone} onChange={e => setAiTone(e.target.value)}
                  style={s.select}>
                  <option>professional yet approachable</option>
                  <option>technical and authoritative</option>
                  <option>casual and conversational</option>
                  <option>bold and provocative</option>
                </select>
              </label>
              <label style={{ ...s.label, flex: 1 }}>
                Length
                <select value={aiLength} onChange={e => setAiLength(e.target.value)}
                  style={s.select}>
                  <option value="short">Short (~400 words)</option>
                  <option value="medium">Medium (~800 words)</option>
                  <option value="long">Long (~1200 words)</option>
                </select>
              </label>
            </div>
            {aiError && <p style={{ color: "#f87171", fontSize: 12, margin: 0 }}>{aiError}</p>}
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={async () => {
                if (!aiTopic.trim()) return;
                setGenerating(true); setAiError("");
                try {
                  const r = await fetch(`${API}/api/admin/generate-draft`, {
                    method: "POST", headers: adminHeaders(),
                    body: JSON.stringify({ topic: aiTopic, tone: aiTone, length: aiLength }),
                  });
                  if (!r.ok) throw new Error((await r.json()).error || "Failed");
                  const { draft } = await r.json();
                  const lines = draft.split("\n");
                  const title = lines.find((l: string) => l.startsWith("# "))?.replace(/^# /, "") || aiTopic;
                  const excerptSep = draft.indexOf("---");
                  const excerpt = excerptSep > 0 ? draft.slice(0, excerptSep).trim() : "";
                  const content = excerptSep > 0 ? draft.slice(excerptSep + 3).trim() : draft;
                  setEditing({ ...EMPTY, title, excerpt, content, published: 0 });
                  setShowAI(false);
                } catch (e: any) { setAiError(e.message); }
                setGenerating(false);
              }} disabled={generating || !aiTopic.trim()} style={s.primary}>
                {generating ? "Generating…" : "Generate Draft"}
              </button>
              <button onClick={() => setShowAI(false)} style={s.ghost}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {posts.length === 0 && <p style={{ color: "#666" }}>No posts yet.</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {posts.map(p => (
          <div key={p.id} style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 6, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {p.title}
                <span style={{
                  fontSize: 11, marginLeft: 8,
                  color: p.published ? "#22c55e" : "#f59e0b",
                }}>{p.published ? "published" : "draft"}</span>
              </p>
              <p style={{ margin: "2px 0 0", color: "#666", fontSize: 13 }}>
                /{p.slug} · {new Date(p.created_at).toLocaleDateString()}
              </p>
            </div>
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <button onClick={() => togglePublished(p)} style={s.ghost}>
                {p.published ? "Unpublish" : "Publish"}
              </button>
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
  accent: { background: "none", color: "#C4A46B", border: "1px solid rgba(196,164,107,0.4)", padding: "8px 18px", borderRadius: 4, fontSize: 13, cursor: "pointer" },
  select: { background: "#1a1a1a", border: "1px solid #333", color: "#fff", padding: "8px 12px", fontSize: 14, borderRadius: 4, outline: "none", cursor: "pointer" },
  ghost: { background: "none", color: "#aaa", border: "1px solid #333", padding: "8px 14px", borderRadius: 4, fontSize: 13, cursor: "pointer" },
  danger: { background: "none", color: "#f87171", border: "1px solid #333", padding: "8px 14px", borderRadius: 4, fontSize: 13, cursor: "pointer" },
  label: { display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "#aaa" },
  input: { background: "#1a1a1a", border: "1px solid #333", color: "#fff", padding: "8px 12px", fontSize: 14, borderRadius: 4, outline: "none" },
};
