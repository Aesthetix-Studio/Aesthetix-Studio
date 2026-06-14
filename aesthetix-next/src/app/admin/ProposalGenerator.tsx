"use client";
import { useState } from "react";
import { adminHeaders } from "./AdminLayout";
import { adminStyles as s } from "./admin-styles";
import { useCopyToClipboard } from "./use-copy-clipboard";
import { useStreamResponse } from "./use-stream-response";
import { marked } from "marked";
import { MARKDOWN_CSS } from "../components/markdown-styles";

const API = import.meta.env.VITE_API_URL || "http://localhost:8787";

export function ProposalGenerator() {
  const [form, setForm] = useState({
    clientName: "", projectType: "", requirements: "",
    budget: "", timeline: "",
  });
  const { text: proposal, streaming, error, startStream, cancel } = useStreamResponse();
  const { copied, copy: copyToClipboard } = useCopyToClipboard();

  async function generate(e: React.FormEvent) {
    e.preventDefault();
    try {
      await startStream(`${API}/api/admin/generate-proposal`, form, adminHeaders());
    } catch { /* error handled by hook */ }
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
        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit" disabled={streaming} style={{ ...s.primary, flex: 1 }}>
            {streaming ? "Generating..." : "Generate Proposal"}
          </button>
          {streaming && (
            <button type="button" onClick={cancel} style={s.danger}>
              Stop
            </button>
          )}
        </div>
      </form>

      {error && <p style={{ color: "#f87171", fontSize: 13, marginBottom: 16 }}>{error}</p>}
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
      {streaming && !proposal && <p style={{ color: "#C4A46B", fontSize: 13, marginBottom: 16 }}>Starting generation...</p>}

      {(proposal || streaming) && (
        <div style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 0, padding: "24px 28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Generated Proposal</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {streaming && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C4A46B", animation: "pulse 1s infinite" }} />}
              <button onClick={() => copyToClipboard(proposal)} style={s.ghost}>
                {copied ? "Copied!" : "Copy to clipboard"}
              </button>
            </div>
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

