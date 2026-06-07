import { useState } from "react";
import { adminHeaders } from "./AdminLayout";
import { adminStyles as s } from "./admin-styles";
import { useCopyToClipboard } from "./use-copy-clipboard";
import { marked } from "marked";
import { MARKDOWN_CSS } from "../components/markdown-styles";

const API = import.meta.env.VITE_API_URL || "http://localhost:8787";

export function ProposalGenerator() {
  const [form, setForm] = useState({
    clientName: "", projectType: "", requirements: "",
    budget: "", timeline: "",
  });
  const [proposal, setProposal] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const { copied, copy: copyToClipboard } = useCopyToClipboard();

  async function generate(e: React.FormEvent) {
    e.preventDefault();
    setGenerating(true);
    setError("");
    setProposal("");
    try {
      const res = await fetch(`${API}/api/admin/generate-proposal`, {
        method: "POST",
        headers: adminHeaders(),
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate proposal");
      }
      const { proposal: p } = await res.json();
      setProposal(p);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
    setGenerating(false);
  }

  return (
    <div>
      <h1 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 24px" }}>AI Proposal Generator</h1>

      <form onSubmit={generate} style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 560, marginBottom: 32 }}>
        {([
          { key: "clientName", label: "Client Name", placeholder: "Acme Corp" },
          { key: "projectType", label: "Project Type", placeholder: "Website Redesign, Mobile App, Brand Identity..." },
        ] as const).map(({ key, label, placeholder }) => (
          <label key={key} style={s.label}>
            {label}
            <input
              required value={form[key]} placeholder={placeholder}
              onChange={e => setForm({ ...form, [key]: e.target.value })}
              style={s.input}
            />
          </label>
        ))}
        <label style={s.label}>
          Project Requirements
          <textarea
            required value={form.requirements} placeholder="Describe the project scope, goals, and key features..."
            onChange={e => setForm({ ...form, requirements: e.target.value })}
            style={{ ...s.input, minHeight: 140, fontSize: 13, resize: "vertical" }}
          />
        </label>
        <div style={{ display: "flex", gap: 12 }}>
          <label style={{ ...s.label, flex: 1 }}>
            Budget
            <input value={form.budget} placeholder="$10,000 - $25,000" onChange={e => setForm({ ...form, budget: e.target.value })} style={s.input} />
          </label>
          <label style={{ ...s.label, flex: 1 }}>
            Timeline
            <input value={form.timeline} placeholder="8-12 weeks" onChange={e => setForm({ ...form, timeline: e.target.value })} style={s.input} />
          </label>
        </div>
        <button type="submit" disabled={generating} style={s.primary}>
          {generating ? "Generating..." : "Generate Proposal"}
        </button>
      </form>

      {error && <p style={{ color: "#f87171", fontSize: 13, marginBottom: 16 }}>{error}</p>}

      {proposal && (
        <div style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 6, padding: "24px 28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Generated Proposal</h2>
            <button onClick={() => copyToClipboard(proposal)} style={s.ghost}>
              {copied ? "Copied!" : "Copy to clipboard"}
            </button>
          </div>
          <style>{MARKDOWN_CSS}</style>
          <div
            className="markdown-content"
            style={{ color: "#ccc", fontSize: 14, lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{ __html: marked.parse(proposal) as string }}
          />
        </div>
      )}
    </div>
  );
}

