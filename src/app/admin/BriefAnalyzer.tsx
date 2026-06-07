import { useState } from "react";
import { adminHeaders } from "./AdminLayout";
import { marked } from "marked";

const API = import.meta.env.VITE_API_URL || "http://localhost:8787";

const MARKDOWN_CSS = `
  .brief-content h2 { font-size: 20px; font-weight: 600; color: #fff; margin: 28px 0 10px; }
  .brief-content h3 { font-size: 16px; font-weight: 600; color: #fff; margin: 20px 0 8px; }
  .brief-content p { margin: 0 0 14px; }
  .brief-content ul, .brief-content ol { margin: 0 0 14px; padding-left: 20px; }
  .brief-content li { margin: 0 0 6px; }
  .brief-content strong { color: #fff; }
`;

export function BriefAnalyzer() {
  const [form, setForm] = useState({
    clientName: "", websiteUrl: "", brandDescription: "",
    competitors: "", goals: "", budget: "", timeline: "",
  });
  const [analysis, setAnalysis] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function analyze(e: React.FormEvent) {
    e.preventDefault();
    setAnalyzing(true);
    setError("");
    setAnalysis("");
    try {
      const res = await fetch(`${API}/api/admin/analyze-brief`, {
        method: "POST",
        headers: adminHeaders(),
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to analyze brief");
      }
      const { analysis: a } = await res.json();
      setAnalysis(a);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
    setAnalyzing(false);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(analysis);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <h1 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 24px" }}>AI Design Brief Analyzer</h1>

      <form onSubmit={analyze} style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 560, marginBottom: 32 }}>
        <label style={s.label}>
          Brand Description *
          <textarea
            required value={form.brandDescription}
            placeholder="Describe the brand, its current state, and what they're looking to achieve..."
            onChange={e => setForm({ ...form, brandDescription: e.target.value })}
            style={{ ...s.input, minHeight: 120, fontSize: 13, resize: "vertical" }}
          />
        </label>
        <div style={{ display: "flex", gap: 12 }}>
          <label style={{ ...s.label, flex: 1 }}>
            Client Name
            <input value={form.clientName} placeholder="Acme Corp" onChange={e => setForm({ ...form, clientName: e.target.value })} style={s.input} />
          </label>
          <label style={{ ...s.label, flex: 1 }}>
            Website URL
            <input value={form.websiteUrl} placeholder="https://example.com" onChange={e => setForm({ ...form, websiteUrl: e.target.value })} style={s.input} />
          </label>
        </div>
        <label style={s.label}>
          Competitors
          <input value={form.competitors} placeholder="Competitor A, Competitor B" onChange={e => setForm({ ...form, competitors: e.target.value })} style={s.input} />
        </label>
        <label style={s.label}>
          Project Goals
          <textarea
            value={form.goals} placeholder="What does the client want to achieve?"
            onChange={e => setForm({ ...form, goals: e.target.value })}
            style={{ ...s.input, minHeight: 80, fontSize: 13, resize: "vertical" }}
          />
        </label>
        <div style={{ display: "flex", gap: 12 }}>
          <label style={{ ...s.label, flex: 1 }}>
            Budget
            <input value={form.budget} placeholder="$15,000 - $30,000" onChange={e => setForm({ ...form, budget: e.target.value })} style={s.input} />
          </label>
          <label style={{ ...s.label, flex: 1 }}>
            Timeline
            <input value={form.timeline} placeholder="8-12 weeks" onChange={e => setForm({ ...form, timeline: e.target.value })} style={s.input} />
          </label>
        </div>
        <button type="submit" disabled={analyzing} style={s.primary}>
          {analyzing ? "Analyzing..." : "Analyze Brief"}
        </button>
      </form>

      {error && <p style={{ color: "#f87171", fontSize: 13, marginBottom: 16 }}>{error}</p>}

      {analysis && (
        <div style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 6, padding: "24px 28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Brief Analysis</h2>
            <button onClick={copyToClipboard} style={s.ghost}>
              {copied ? "Copied!" : "Copy to clipboard"}
            </button>
          </div>
          <style>{MARKDOWN_CSS}</style>
          <div
            className="brief-content"
            style={{ color: "#ccc", fontSize: 14, lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{ __html: marked.parse(analysis) as string }}
          />
        </div>
      )}
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  primary: { background: "#fff", color: "#000", border: "none", padding: "10px 20px", borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: "pointer" },
  ghost: { background: "none", color: "#aaa", border: "1px solid #333", padding: "6px 14px", borderRadius: 4, fontSize: 12, cursor: "pointer" },
  label: { display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "#aaa" },
  input: { background: "#1a1a1a", border: "1px solid #333", color: "#fff", padding: "8px 12px", fontSize: 14, borderRadius: 4, outline: "none" },
};
