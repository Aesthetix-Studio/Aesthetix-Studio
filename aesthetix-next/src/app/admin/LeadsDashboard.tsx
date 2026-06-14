"use client";
import { useEffect, useState } from "react";
import { adminHeaders } from "./AdminLayout";

const API = import.meta.env.VITE_API_URL || "http://localhost:8787";

const STATUS_COLORS: Record<string, string> = {
  new: "#3b82f6", contacted: "#f59e0b", closed: "#22c55e",
};

interface Lead {
  id: string; name: string; email: string; company: string | null;
  budget: string | null; project_details: string | null; status: string; created_at: string;
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

  const stats = [
    { label: "Total Leads", value: totalLeads, color: "#fff" },
    { label: "Qualified", value: qualifiedLeads, color: "#f59e0b" },
    { label: "Won", value: wonLeads, color: "#22c55e" },
    { label: "Conversion", value: `${conversionRate}%`, color: "#3b82f6" },
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 0, padding: "16px 20px" }}>
            <p style={{ margin: 0, fontSize: 12, color: "#666", textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</p>
            <p style={{ margin: "8px 0 0", fontSize: 28, fontWeight: 600, color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>Leads ({leads.length})</h1>
        <div style={{ display: "flex", gap: 8 }}>
          {["all", "new", "contacted", "closed"].map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{
              background: filter === s ? "#fff" : "#1a1a1a", color: filter === s ? "#000" : "#aaa",
              border: "1px solid #333", borderRadius: 4, padding: "4px 12px", fontSize: 13, cursor: "pointer"
            }}>{s}</button>
          ))}
        </div>
      </div>
      {visible.length === 0 && <p style={{ color: "#666" }}>No leads yet.</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {visible.map(lead => (
          <div key={lead.id} style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 0, padding: "16px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
              <div>
                <p style={{ margin: 0, fontWeight: 600 }}>{lead.name} <span style={{ color: "#666", fontWeight: 400 }}>— {lead.email}</span></p>
                {lead.company && <p style={{ margin: "4px 0 0", color: "#aaa", fontSize: 13 }}>{lead.company}{lead.budget ? ` · ${lead.budget}` : ""}</p>}
                {lead.project_details && <p style={{ margin: "8px 0 0", color: "#888", fontSize: 13 }}>{lead.project_details}</p>}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <span style={{ fontSize: 11, color: "#555" }}>{new Date(lead.created_at).toLocaleDateString()}</span>
                <select value={lead.status ?? "new"} onChange={e => updateStatus(lead.id, e.target.value)}
                  style={{ background: "#0d0d0d", color: STATUS_COLORS[lead.status] ?? "#fff", border: "1px solid #333", borderRadius: 4, padding: "4px 8px", fontSize: 13, cursor: "pointer" }}>
                  <option value="new">new</option>
                  <option value="contacted">contacted</option>
                  <option value="closed">closed</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
