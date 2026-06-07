import React from "react";

export const adminStyles: Record<string, React.CSSProperties> = {
  primary: { background: "#fff", color: "#000", border: "none", padding: "8px 18px", borderRadius: 4, fontSize: 13, cursor: "pointer" },
  accent: { background: "none", color: "#C4A46B", border: "1px solid rgba(196,164,107,0.4)", padding: "8px 18px", borderRadius: 4, fontSize: 13, cursor: "pointer" },
  select: { background: "#1a1a1a", border: "1px solid #333", color: "#fff", padding: "8px 12px", fontSize: 14, borderRadius: 4, outline: "none", cursor: "pointer" },
  ghost: { background: "none", color: "#aaa", border: "1px solid #333", padding: "8px 14px", borderRadius: 4, fontSize: 13, cursor: "pointer" },
  danger: { background: "none", color: "#f87171", border: "1px solid #333", padding: "8px 14px", borderRadius: 4, fontSize: 13, cursor: "pointer" },
  label: { display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "#aaa" },
  input: { background: "#1a1a1a", border: "1px solid #333", color: "#fff", padding: "8px 12px", fontSize: 14, borderRadius: 4, outline: "none" },
};
