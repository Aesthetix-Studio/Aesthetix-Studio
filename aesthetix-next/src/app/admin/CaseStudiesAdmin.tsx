"use client";
import { useEffect, useState } from "react";
import { adminHeaders } from "./AdminLayout";
import { adminStyles as s } from "./admin-styles";
import { ConfirmDialog } from "./ConfirmDialog";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";

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
  const [deleteTarget, setDeleteTarget] = useState<{ slug: string; client: string } | null>(null);

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

  async function confirmDelete() {
    if (!deleteTarget) return;
    await fetch(`${API}/api/case-studies/${deleteTarget.slug}`, { method: "DELETE", headers: adminHeaders() });
    setDeleteTarget(null);
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

  /* ─── Edit / Create Form ──────────────────────── */

  if (editing !== null) {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
          <button onClick={() => setEditing(null)} style={s.ghost}>← Back</button>
          <h1 style={{
            fontFamily: "'Instrument Serif', serif", fontSize: "24px", fontStyle: "italic",
            color: "#F0EBE0", letterSpacing: "-0.02em", margin: 0,
          }}>{editing.id ? "Edit" : "New"} Case Study</h1>
        </div>

        <div style={{
          background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
          padding: "32px", maxWidth: 680, position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(196,164,107,0.5), transparent)" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
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
              Challenge
              <textarea
                value={editing.challenge}
                onChange={e => setEditing({ ...editing, challenge: e.target.value })}
                style={{ ...s.input, minHeight: 120, fontSize: 13, resize: "vertical" }}
              />
            </label>
            <label style={s.label}>
              Process
              <textarea
                value={editing.process}
                onChange={e => setEditing({ ...editing, process: e.target.value })}
                style={{ ...s.input, minHeight: 120, fontSize: 13, resize: "vertical" }}
              />
            </label>
            <label style={s.label}>
              Results
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
      </div>
    );
  }

  /* ─── List View ───────────────────────────────── */

  return (
    <div>
      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete case study?"
        message={`This will permanently delete the case study for "${deleteTarget?.client}" and cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <h1 style={{
            fontFamily: "'Instrument Serif', serif", fontSize: "24px", fontStyle: "italic",
            color: "#F0EBE0", letterSpacing: "-0.02em", margin: 0, marginBottom: "4px",
          }}>Case Studies</h1>
          <p style={{ fontSize: "12px", color: "rgba(240,235,224,0.35)", fontFamily: "'Inter', sans-serif" }}>
            {items.length} total · {items.filter(i => i.published).length} published · {items.filter(i => !i.published).length} drafts
          </p>
        </div>
        <button onClick={() => setEditing({ ...EMPTY })} style={s.primary}>+ New Case Study</button>
      </div>

      {items.length === 0 && (
        <p style={{ color: "rgba(240,235,224,0.25)", fontFamily: "'Inter', sans-serif", fontSize: "13px" }}>No case studies yet.</p>
      )}

      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "2fr 1fr 1fr 100px 120px",
          padding: "12px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", gap: "16px",
        }}>
          {["Client", "Category", "Year", "Status", ""].map(col => (
            <div key={col} style={{ fontSize: "9px", fontWeight: 500, color: "rgba(240,235,224,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}>{col}</div>
          ))}
        </div>

        {items.map((item, i) => (
          <div key={item.id} style={{
            display: "grid", gridTemplateColumns: "2fr 1fr 1fr 100px 120px",
            padding: "16px 24px", borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
            alignItems: "center", gap: "16px", transition: "background 0.2s ease",
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          >
            <div>
              <div style={{ fontSize: "13px", fontFamily: "'Instrument Serif', serif", fontStyle: "italic", color: "rgba(240,235,224,0.85)", marginBottom: "2px" }}>{item.client}</div>
              <div style={{ fontSize: "11px", color: "rgba(240,235,224,0.3)", fontFamily: "'Inter', sans-serif" }}>/{item.slug}</div>
            </div>
            <div style={{ fontSize: "11px", color: "rgba(240,235,224,0.4)", fontFamily: "'Inter', sans-serif" }}>{item.category || "—"}</div>
            <div style={{ fontSize: "11px", color: "rgba(240,235,224,0.4)", fontFamily: "'Inter', sans-serif" }}>{item.year || "—"}</div>
            <div>
              <span style={{
                display: "inline-flex", alignItems: "center", padding: "3px 10px",
                background: item.published ? "rgba(74,222,128,0.08)" : "rgba(255,255,255,0.04)",
                color: item.published ? "#4ade80" : "rgba(240,235,224,0.35)",
                fontSize: "10px", fontWeight: 500, letterSpacing: "0.06em",
                textTransform: "uppercase", fontFamily: "'Inter', sans-serif",
              }}>{item.published ? "Published" : "Draft"}</span>
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button onClick={() => togglePublished(item)} style={s.ghost}>
                {item.published ? "Unpublish" : "Publish"}
              </button>
              <button onClick={() => setEditing({ ...item })} style={s.ghost}>Edit</button>
              <button onClick={() => setDeleteTarget({ slug: item.slug, client: item.client })} style={s.danger}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
