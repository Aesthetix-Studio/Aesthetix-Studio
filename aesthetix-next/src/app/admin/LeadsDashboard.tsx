"use client";
import { useEffect, useState } from "react";
import { adminHeaders } from "./AdminLayout";
import { adminStyles as s } from "./admin-styles";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";

interface Lead {
  id: string; name: string; email: string; company: string | null;
  budget: string | null; project_details: string | null; status: string; created_at: string;
}

const STATUS_STYLE: Record<string, { bg: string; text: string }> = {
  new: { bg: "rgba(196,164,107,0.1)", text: "#C4A46B" },
  contacted: { bg: "rgba(74,222,128,0.08)", text: "#4ade80" },
  closed: { bg: "rgba(255,255,255,0.05)", text: "rgba(240,235,224,0.5)" },
};

function StatusBadge({ status }: { status: string }) {
  const colors = STATUS_STYLE[status] || { bg: "rgba(255,255,255,0.05)", text: "rgba(240,235,224,0.4)" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", padding: "3px 10px",
      background: colors.bg, color: colors.text, fontSize: "10px", fontWeight: 500,
      letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif",
    }}>{status}</span>
  );
}

export function LeadsDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch(`${API}/api/leads`, { headers: adminHeaders() })
      .then(r => r.json()).then(setLeads);
  }, []);

  async function updateStatus(id: string, status: string) {
    await fetch(`${API}/api/leads/${id}/status`, {
      method: "PUT", headers: adminHeaders(), body: JSON.stringify({ status }),
    });
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  }

  const visible = filter === "all" ? leads : leads.filter(l => l.status === filter);
  const totalLeads = leads.length;
  const qualifiedLeads = leads.filter(l => l.status === "contacted").length;
  const wonLeads = leads.filter(l => l.status === "closed").length;
  const conversionRate = totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0;
  const newLeads = leads.filter(l => l.status === "new").length;

  return (
    <div>
      {/* Section title */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{
          fontFamily: "'Instrument Serif', serif", fontSize: "24px", fontStyle: "italic",
          color: "#F0EBE0", letterSpacing: "-0.02em", margin: 0, marginBottom: "4px",
        }}>Inquiries</h1>
        <p style={{ fontSize: "12px", color: "rgba(240,235,224,0.35)", fontFamily: "'Inter', sans-serif" }}>
          {totalLeads} total · {newLeads} new · {qualifiedLeads} qualified · {wonLeads} won
        </p>
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "rgba(255,255,255,0.06)", marginBottom: 32 }}>
        {[
          { label: "Total Leads", value: String(totalLeads), sub: "all time", accent: true },
          { label: "New", value: String(newLeads), sub: "awaiting response" },
          { label: "Won", value: String(wonLeads), sub: "successfully closed" },
          { label: "Conversion", value: `${conversionRate}%`, sub: "close rate" },
        ].map((stat, i) => (
          <div key={stat.label} style={{
            background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
            padding: "24px", position: "relative", overflow: "hidden",
          }}>
            {stat.accent && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, rgba(196,164,107,0.8), rgba(196,164,107,0.1))" }} />}
            <div style={{ fontSize: "10px", fontWeight: 500, color: "rgba(240,235,224,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif", marginBottom: "16px" }}>{stat.label}</div>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: "36px", color: "#F0EBE0", fontStyle: "italic", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "10px" }}>{stat.value}</div>
            <div style={{ fontSize: "11px", color: "rgba(240,235,224,0.35)", fontFamily: "'Inter', sans-serif" }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", gap: "8px" }}>
          {["all", "new", "contacted", "closed"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "6px 14px",
              background: filter === f ? "rgba(196,164,107,0.15)" : "rgba(255,255,255,0.04)",
              border: filter === f ? "1px solid rgba(196,164,107,0.3)" : "1px solid rgba(255,255,255,0.07)",
              cursor: "pointer", fontSize: "10px",
              color: filter === f ? "#C4A46B" : "rgba(240,235,224,0.4)",
              fontFamily: "'Inter', sans-serif", letterSpacing: "0.04em",
              textTransform: "uppercase", transition: "all 0.2s ease",
            }}>{f}</button>
          ))}
        </div>
      </div>

      {visible.length === 0 && (
        <p style={{ color: "rgba(240,235,224,0.25)", fontFamily: "'Inter', sans-serif", fontSize: "13px" }}>No leads yet.</p>
      )}

      {/* Lead list */}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
        {/* Header */}
        <div style={{
          display: "grid", gridTemplateColumns: "2fr 1fr 1fr 120px 100px",
          padding: "12px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", gap: "16px",
        }}>
          {["Contact", "Company", "Budget", "Date", "Status"].map(col => (
            <div key={col} style={{ fontSize: "9px", fontWeight: 500, color: "rgba(240,235,224,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}>{col}</div>
          ))}
        </div>

        {/* Rows */}
        {visible.map((lead, i) => (
          <div key={lead.id} style={{
            display: "grid", gridTemplateColumns: "2fr 1fr 1fr 120px 100px",
            padding: "16px 24px", borderBottom: i < visible.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
            alignItems: "center", gap: "16px", transition: "background 0.2s ease",
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          >
            <div>
              <div style={{ fontSize: "13px", fontFamily: "'Instrument Serif', serif", fontStyle: "italic", color: "rgba(240,235,224,0.85)", marginBottom: "2px" }}>{lead.name}</div>
              <div style={{ fontSize: "11px", color: "rgba(240,235,224,0.3)", fontFamily: "'Inter', sans-serif" }}>{lead.email}</div>
            </div>
            <div style={{ fontSize: "11px", color: "rgba(240,235,224,0.4)", fontFamily: "'Inter', sans-serif" }}>{lead.company || "—"}</div>
            <div style={{ fontSize: "11px", color: "rgba(240,235,224,0.4)", fontFamily: "'Inter', sans-serif" }}>{lead.budget || "—"}</div>
            <div style={{ fontSize: "11px", color: "rgba(240,235,224,0.35)", fontFamily: "'Inter', sans-serif" }}>{new Date(lead.created_at).toLocaleDateString()}</div>
            <div>
              <select value={lead.status ?? "new"} onChange={e => updateStatus(lead.id, e.target.value)} style={s.select}>
                <option value="new">new</option>
                <option value="contacted">contacted</option>
                <option value="closed">closed</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
