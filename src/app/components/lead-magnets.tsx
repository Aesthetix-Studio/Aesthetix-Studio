import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Zap, Target, BarChart3, type LucideIcon } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:8787";

interface Magnet {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const MAGNETS: Magnet[] = [
  {
    id: "website-audit",
    icon: Zap,
    title: "Free Website Audit",
    description: "Get a comprehensive analysis of your website's performance, accessibility, and SEO health.",
  },
  {
    id: "ux-review",
    icon: Target,
    title: "Free UX Review",
    description: "Receive expert feedback on your user experience, conversion paths, and design effectiveness.",
  },
  {
    id: "seo-audit",
    icon: BarChart3,
    title: "Free SEO Audit",
    description: "Discover technical SEO issues, content gaps, and opportunities to rank higher on Google.",
  },
];

export function LeadMagnets() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeMagnet, setActiveMagnet] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", website: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function openForm(id: string) {
    setActiveMagnet(id);
    setForm({ name: "", email: "", website: "" });
    setSubmitted(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!activeMagnet) return;
    setLoading(true);
    try {
      await fetch(`${API}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.website,
          project_details: `[Lead Magnet: ${MAGNETS.find(m => m.id === activeMagnet)?.title}] Website: ${form.website}`,
        }),
      });
      setSubmitted(true);
    } catch {}
    setLoading(false);
  }

  const active = MAGNETS.find(m => m.id === activeMagnet);

  return (
    <section ref={ref} className="px-6 md:px-10 py-24 md:py-36" style={{ backgroundColor: "#080808" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.85 }}
          style={{
            fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 500,
            textTransform: "uppercase", color: "#C4A46B", display: "block", marginBottom: "28px",
          }}
        >
          Free Resources
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          style={{
            fontFamily: "'Instrument Serif', serif", fontSize: "42px", fontWeight: 400,
            color: "#F0EBE0", lineHeight: "1.1", marginBottom: "16px",
          }}
        >
          Start with a free audit.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.85, delay: 0.2 }}
          style={{
            fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 300,
            color: "rgba(240,235,224,0.42)", maxWidth: "500px", marginBottom: "56px",
          }}
        >
          No commitment. Get actionable insights you can use immediately — whether you work with us or not.
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {MAGNETS.map((magnet, i) => (
            <motion.div
              key={magnet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.1 }}
              onClick={() => openForm(magnet.id)}
              className="group cursor-pointer"
              style={{
                background: activeMagnet === magnet.id ? "#141414" : "#0d0d0d",
                border: `1px solid ${activeMagnet === magnet.id ? "rgba(196,164,107,0.3)" : "rgba(255,255,255,0.06)"}`,
                borderRadius: 0, padding: "32px 28px",
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(196,164,107,0.3)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                if (activeMagnet !== magnet.id) {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                }
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <magnet.icon size={28} strokeWidth={1.5} color="#C4A46B" style={{ display: "block", marginBottom: "20px" }} />
              <h3 style={{
                fontFamily: "'Inter', sans-serif", fontSize: "17px", fontWeight: 600,
                color: "#F0EBE0", margin: "0 0 10px",
              }}>{magnet.title}</h3>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 300,
                color: "rgba(240,235,224,0.4)", lineHeight: "1.65", margin: "0 0 24px",
              }}>{magnet.description}</p>
              <span style={{
                fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 500,
                color: "#C4A46B", textTransform: "uppercase", letterSpacing: "1px",
              }}>
                Get your free audit →
              </span>
            </motion.div>
          ))}
        </div>

        {/* Form Modal */}
        {activeMagnet && active && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              marginTop: "48px", background: "#0d0d0d",
              border: "1px solid rgba(196,164,107,0.2)",
              borderRadius: 0, padding: "36px 32px",
              maxWidth: "480px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h3 style={{
                fontFamily: "'Inter', sans-serif", fontSize: "16px", fontWeight: 600,
                color: "#F0EBE0", margin: 0,
              }}>{active.title}</h3>
              <button
                onClick={() => setActiveMagnet(null)}
                style={{
                  background: "none", border: "none", color: "#666",
                  fontSize: "18px", cursor: "pointer", padding: "4px 8px",
                }}
              >×</button>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  fontFamily: "'Instrument Serif', serif", fontSize: "22px",
                  fontStyle: "italic", color: "#C4A46B", padding: "20px 0",
                }}
              >
                Thank you! We'll send your audit within 24 hours.
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input
                  required placeholder="Your name" value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                />
                <input
                  required type="email" placeholder="Email" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                />
                <input
                  required placeholder="Website URL" value={form.website}
                  onChange={e => setForm({ ...form, website: e.target.value })}
                  style={inputStyle}
                />
                <button
                  type="submit" disabled={loading}
                  style={{
                    backgroundColor: "#F0EBE0", color: "#080808", border: "none",
                    padding: "12px 24px", fontSize: "13px", fontWeight: 600,
                    fontFamily: "'Inter', sans-serif", borderRadius: "4px",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.6 : 1, marginTop: "4px",
                    textTransform: "uppercase", letterSpacing: "0.5px",
                  }}
                >
                  {loading ? "Sending..." : "Request Free Audit"}
                </button>
              </form>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
  padding: "12px 16px", fontFamily: "'Inter', sans-serif", fontSize: "14px",
  fontWeight: 400, color: "#F0EBE0", outline: "none", borderRadius: "4px",
};
