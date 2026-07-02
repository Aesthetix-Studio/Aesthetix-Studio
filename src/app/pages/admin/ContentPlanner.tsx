import { useState, useEffect } from "react";
import { fetchBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from "../../lib/api";
import { PenLine, Calendar, Clock, Loader2, Plus, Pencil, Trash2, X, Check } from "lucide-react";

type ContentItem = {
  id: string; slug: string; title: string; type: string; status: string; dueDate: string; category: string; excerpt: string;
};

export default function AdminContentPlanner() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "article" | "case-study">("all");
  const [showNew, setShowNew] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editExcerpt, setEditExcerpt] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newExcerpt, setNewExcerpt] = useState("");
  const [newCategory, setNewCategory] = useState("General");
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadPosts = () => {
    fetchBlogPosts()
      .then((res) => {
        setItems(res.posts.map((p) => ({
          id: p.id, slug: p.slug, title: p.title,
          type: p.category?.toLowerCase().includes("case") ? "case-study" : "article",
          status: "Published", dueDate: p.created_at?.split("T")[0] ?? "", category: p.category, excerpt: p.excerpt,
        })));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadPosts(); }, []);

  const filtered = items.filter((i) => filter === "all" || i.type === filter);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newExcerpt.trim()) return;
    setCreating(true);
    try {
      const slug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      await createBlogPost({ slug, title: newTitle, excerpt: newExcerpt, content: "", category: newCategory, author: "Aesthetix Studio" });
      setShowNew(false); setNewTitle(""); setNewExcerpt(""); setNewCategory("General");
      loadPosts();
    } catch {} finally { setCreating(false); }
  };

  const handleUpdate = async (slug: string) => {
    if (!editTitle.trim()) return;
    setSaving(true);
    try {
      await updateBlogPost(slug, { title: editTitle, excerpt: editExcerpt });
      setEditingSlug(null);
      loadPosts();
    } catch {} finally { setSaving(false); }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this post?")) return;
    try {
      await deleteBlogPost(slug);
      loadPosts();
    } catch {}
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Content Planner</h1>
          <p className="text-muted-foreground mt-1 text-sm">Plan and schedule content across all channels.</p>
        </div>
        <button onClick={() => setShowNew(!showNew)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand text-white hover:bg-brand/90 transition-all text-sm font-semibold">
          <Plus className="w-3.5 h-3.5" /> New Post
        </button>
      </div>

      {showNew && (
        <form onSubmit={handleCreate} className="rounded-2xl p-4 border border-border bg-card space-y-3">
          <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Title" className="w-full px-3 py-2 rounded-xl border border-border bg-secondary text-foreground text-sm outline-none focus:border-brand" />
          <textarea value={newExcerpt} onChange={(e) => setNewExcerpt(e.target.value)} placeholder="Excerpt" rows={2} className="w-full px-3 py-2 rounded-xl border border-border bg-secondary text-foreground text-sm outline-none focus:border-brand resize-none" />
          <div className="flex gap-3">
            <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="px-3 py-2 rounded-xl border border-border bg-secondary text-foreground text-sm outline-none">
              <option>General</option><option>Design</option><option>Technology</option><option>Business</option>
            </select>
            <button type="submit" disabled={creating || !newTitle.trim()} className="px-4 py-2 rounded-xl bg-brand text-white text-sm font-semibold disabled:opacity-50">
              {creating ? <Loader2 className="w-3.5 h-3.5 animate-spin inline" /> : "Create"}
            </button>
          </div>
        </form>
      )}

      <div className="flex gap-1 p-1 rounded-xl bg-secondary w-fit">
        {(["all", "article", "case-study"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg transition-all text-[13px] font-medium ${filter === f ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
            {f === "all" ? "All" : f === "case-study" ? "Case Studies" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <p className="text-muted-foreground text-sm py-8 text-center">No content items found.</p>
        ) : (
          filtered.map((item) => (
            <div key={item.id} className="rounded-2xl p-4 border border-border bg-card hover:bg-secondary transition-colors flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                {item.type === "case-study" ? <PenLine className="w-5 h-5 text-brand" /> : <Calendar className="w-5 h-5 text-brand" />}
              </div>
              <div className="flex-1 min-w-0">
                {editingSlug === item.slug ? (
                  <div className="space-y-2">
                    <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full px-2 py-1 rounded border border-border bg-secondary text-foreground text-sm outline-none" />
                    <textarea value={editExcerpt} onChange={(e) => setEditExcerpt(e.target.value)} rows={2} className="w-full px-2 py-1 rounded border border-border bg-secondary text-foreground text-sm outline-none resize-none" />
                    <div className="flex gap-2">
                      <button onClick={() => handleUpdate(item.slug)} disabled={saving} className="flex items-center gap-1 px-2 py-1 rounded bg-green-500 text-white text-xs"><Check className="w-3 h-3" />{saving ? "Saving..." : "Save"}</button>
                      <button onClick={() => setEditingSlug(null)} className="flex items-center gap-1 px-2 py-1 rounded bg-secondary text-foreground text-xs"><X className="w-3 h-3" />Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-foreground font-semibold text-sm truncate">{item.title}</h3>
                    <p className="text-muted-foreground text-xs mt-0.5 truncate">{item.excerpt}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-brand/10 text-brand">{item.category}</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500">{item.status}</span>
                    </div>
                  </>
                )}
              </div>
              {editingSlug !== item.slug && (
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => { setEditingSlug(item.slug); setEditTitle(item.title); setEditExcerpt(item.excerpt); }} className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(item.slug)} className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center gap-1 text-muted-foreground ml-2">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">{item.dueDate || "—"}</span>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
