import { ArrowUpRight, ArrowRight, Plus } from "lucide-react";
import { minimalProjects, editorialProjects, premiumSaasProjects, creativeStudioProjects, enterpriseProjects, luxuryProjects, startupProjects, modernTechProjects, brutalistProjects, highEndProjects } from "./var-portfolio-data";

const serif = "'Cormorant Garamond', Georgia, serif";
const mono = "'JetBrains Mono', monospace";
const sans = "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif";

const imgStyle: React.CSSProperties = { width: "100%", height: "100%", objectFit: "cover", display: "block" };

/* ── 1. Minimal ─────────────────────────────────────────────── */
export function PortfolioMinimal() {
  return (
    <section style={{ background: "#FAFAF9", padding: "96px 48px", fontFamily: sans }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A3A39D", marginBottom: "12px" }}>Selected Work</p>
        <h2 style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 600, color: "#0D0D0C", letterSpacing: "-0.02em", marginBottom: "48px" }}>Case Studies</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {minimalProjects.map((p) => (
            <div key={p.id} style={{ cursor: "pointer" }}>
              <div style={{ height: "240px", borderRadius: "8px", overflow: "hidden", marginBottom: "16px", position: "relative" }}>
                <img src={p.image} alt={p.title} loading="lazy" style={imgStyle} />
                <div style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(255,255,255,0.9)", borderRadius: "6px", padding: "4px 10px", backdropFilter: "blur(4px)" }}>
                  <span style={{ fontSize: "11px", color: "#0D0D0C", fontWeight: 600 }}>{p.result}</span>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#0D0D0C", letterSpacing: "-0.01em", marginBottom: "4px" }}>{p.title}</h3>
                  <p style={{ fontSize: "13px", color: "#A3A39D" }}>{p.cat} · {p.year}</p>
                </div>
                <ArrowUpRight size={16} color="#A3A39D" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 2. Editorial ───────────────────────────────────────────── */
export function PortfolioEditorial() {
  return (
    <section style={{ background: "#0D0D0C", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, color: "#F3F3F1", letterSpacing: "-0.035em", lineHeight: 0.95 }}>
            SELECTED<br /><span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)", color: "transparent" }}>WORK</span>
          </h2>
          <a href="#" onClick={e => e.preventDefault()} style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>
            All projects ↗
          </a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2px" }}>
          <div style={{ borderRadius: "0", height: "400px", position: "relative", overflow: "hidden", cursor: "pointer" }}>
            <img src={editorialProjects[0].image} alt={editorialProjects[0].title} loading="lazy" style={imgStyle} />
            <div style={{ position: "absolute", bottom: "32px", left: "32px", background: "linear-gradient(transparent, rgba(0,0,0,0.7))", padding: "32px", width: "100%" }}>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>{editorialProjects[0].cat}</p>
              <h3 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>{editorialProjects[0].title}</h3>
            </div>
            <div style={{ position: "absolute", top: "24px", right: "24px", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", borderRadius: "6px", padding: "4px 10px" }}>
              <span style={{ fontSize: "11px", color: "#fff", fontWeight: 600 }}>{editorialProjects[0].result}</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {editorialProjects.slice(1,3).map(p => (
              <div key={p.id} style={{ flex: 1, position: "relative", overflow: "hidden", cursor: "pointer", minHeight: "196px" }}>
                <img src={p.image} alt={p.title} loading="lazy" style={imgStyle} />
                <div style={{ position: "absolute", bottom: "16px", left: "16px", background: "linear-gradient(transparent, rgba(0,0,0,0.6))", padding: "16px", width: "100%" }}>
                  <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", marginBottom: "4px" }}>{p.cat}</p>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff" }}>{p.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2px", marginTop: "2px" }}>
          {editorialProjects.slice(3).map(p => (
            <div key={p.id} style={{ height: "200px", position: "relative", overflow: "hidden", cursor: "pointer" }}>
              <img src={p.image} alt={p.title} loading="lazy" style={imgStyle} />
              <div style={{ position: "absolute", bottom: "16px", left: "16px", background: "linear-gradient(transparent, rgba(0,0,0,0.6))", padding: "16px", width: "100%" }}>
                <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", marginBottom: "4px" }}>{p.cat}</p>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff" }}>{p.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 3. Premium SaaS ────────────────────────────────────────── */
export function PortfolioPremiumSaas() {
  return (
    <section style={{ background: "#F8F8F7", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 600, color: "#10B981", background: "#ECFDF5", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "9999px", padding: "4px 12px", marginBottom: "16px" }}>Case Studies</span>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 800, color: "#0D0D0C", letterSpacing: "-0.025em" }}>Measurable outcomes for real teams</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
          {premiumSaasProjects.map(p => (
            <div key={p.id} style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.07)", overflow: "hidden", cursor: "pointer", transition: "all 0.2s" }}>
              <div style={{ height: "140px", position: "relative", overflow: "hidden" }}>
                <img src={p.image} alt={p.title} loading="lazy" style={imgStyle} />
                <div style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)", borderRadius: "6px", padding: "3px 8px" }}>
                  <span style={{ fontSize: "11px", color: "#fff", fontWeight: 600 }}>{p.result}</span>
                </div>
              </div>
              <div style={{ padding: "16px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "10px" }}>
                  {p.tags.map(t => <span key={t} style={{ fontSize: "10px", color: "#10B981", background: "#ECFDF5", padding: "2px 8px", borderRadius: "9999px", fontWeight: 500 }}>{t}</span>)}
                </div>
                <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#0D0D0C", marginBottom: "4px" }}>{p.title}</h3>
                <p style={{ fontSize: "12px", color: "#A3A39D" }}>{p.cat} · {p.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 4. Creative Studio ─────────────────────────────────────── */
export function PortfolioCreativeStudio() {
  return (
    <section style={{ background: "#1A0F0A", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "40px" }}>
          <p style={{ fontSize: "11px", color: "rgba(204,120,50,0.7)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "12px" }}>From Our Kitchen</p>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 300, color: "#F5E6D3", letterSpacing: "-0.02em", lineHeight: 1, fontStyle: "italic" }}>
            Signature dishes
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "320px 200px 200px", gap: "16px" }}>
          {creativeStudioProjects.map((p, i) => (
            <div key={p.id} style={{ borderRadius: "16px", overflow: "hidden", cursor: "pointer", position: "relative", gridColumn: i === 0 ? "1 / 2" : undefined, gridRow: i === 0 ? "1 / 3" : undefined }}>
              <img src={p.image} alt={p.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent 0%, rgba(10,6,3,0.7) 30%, rgba(10,6,3,0.95) 100%)", padding: "24px 20px 20px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "8px" }}>
                  {p.tags.map(t => <span key={t} style={{ fontSize: "10px", color: "rgba(204,120,50,0.9)", background: "rgba(204,120,50,0.2)", padding: "3px 8px", borderRadius: "9999px" }}>{t}</span>)}
                </div>
                <h3 style={{ fontFamily: serif, fontSize: i === 0 ? "22px" : "16px", fontWeight: 400, color: "#F5E6D3", fontStyle: "italic" }}>{p.title}</h3>
                <p style={{ fontSize: "12px", color: "rgba(204,120,50,0.6)", marginTop: "2px" }}>{p.cat}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 5. Enterprise ──────────────────────────────────────────── */
export function PortfolioEnterprise() {
  return (
    <section style={{ background: "#fff", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px" }}>
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A3A39D", marginBottom: "8px" }}>Client Portfolio</p>
            <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#0D0D0C", letterSpacing: "-0.02em" }}>Project Case Studies</h2>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {["All","Cloud","Compliance","Platform","Design System"].map(f => (
              <button key={f} style={{ padding: "6px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: 500, background: f === "All" ? "#0D0D0C" : "#F3F3F1", color: f === "All" ? "#fff" : "#525250", border: "none", cursor: "pointer" }}>{f}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
          {enterpriseProjects.map(p => (
            <div key={p.id} style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: "10px", overflow: "hidden" }}>
              <div style={{ height: "120px", overflow: "hidden" }}>
                <img src={p.image} alt={p.title} loading="lazy" style={imgStyle} />
              </div>
              <div style={{ padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <div>
                    <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#0D0D0C" }}>{p.title}</h3>
                    <p style={{ fontSize: "12px", color: "#A3A39D", marginTop: "2px" }}>{p.cat}</p>
                  </div>
                  <span style={{ fontSize: "11px", color: "#16A34A", background: "#F0FDF4", padding: "3px 8px", borderRadius: "4px", fontWeight: 600, whiteSpace: "nowrap" }}>{p.result}</span>
                </div>
                <a href="#" onClick={e => e.preventDefault()} style={{ fontSize: "12px", color: "#6150F6", fontWeight: 500, textDecoration: "none" }}>View case study →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 6. Luxury ──────────────────────────────────────────────── */
export function PortfolioLuxury() {
  return (
    <section style={{ background: "#13120F", padding: "96px 48px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "80px" }}>
          <div style={{ height: "1px", flex: 1, background: "rgba(201,168,76,0.2)" }} />
          <span style={{ fontFamily: serif, fontSize: "13px", color: "rgba(201,168,76,0.6)", fontStyle: "italic", letterSpacing: "0.08em" }}>Selected Commissions</span>
          <div style={{ height: "1px", flex: 1, background: "rgba(201,168,76,0.2)" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }}>
          {luxuryProjects.map((p, i) => (
            <div key={p.id} style={{ cursor: "pointer" }}>
              <div style={{ height: i % 2 === 0 ? "280px" : "220px", borderRadius: "4px", marginBottom: "20px", position: "relative", overflow: "hidden" }}>
                <img src={p.image} alt={p.title} loading="lazy" style={imgStyle} />
                <div style={{ position: "absolute", top: "16px", right: "16px", width: "28px", height: "28px", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ArrowUpRight size={14} color="#fff" />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <h3 style={{ fontFamily: serif, fontSize: "20px", fontWeight: 400, color: "#F0EAD6", letterSpacing: "0.01em", fontStyle: "italic", marginBottom: "4px" }}>{p.title}</h3>
                  <p style={{ fontSize: "11px", color: "rgba(201,168,76,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.cat} · {p.year}</p>
                </div>
                <span style={{ fontFamily: serif, fontSize: "13px", color: "rgba(201,168,76,0.6)", fontStyle: "italic" }}>{p.result}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 7. Startup ─────────────────────────────────────────────── */
export function PortfolioStartup() {
  return (
    <section style={{ background: "#fff", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#0D0D0C", letterSpacing: "-0.025em", marginBottom: "12px" }}>
            The proof is in the results
          </h2>
          <p style={{ fontSize: "15px", color: "#737370" }}>Real projects. Real outcomes. See what's possible.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
          {startupProjects.map((p) => (
            <div key={p.id} style={{ borderRadius: "16px", overflow: "hidden", border: "2px solid transparent", cursor: "pointer", background: "linear-gradient(#fff, #fff) padding-box, linear-gradient(135deg, #6150F6, #EC4899) border-box", transition: "transform 0.2s" }}>
              <div style={{ height: "160px", position: "relative", overflow: "hidden" }}>
                <img src={p.image} alt={p.title} loading="lazy" style={imgStyle} />
                <div style={{ position: "absolute", top: "12px", left: "12px", background: "#fff", borderRadius: "8px", padding: "4px 10px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#0D0D0C" }}>{p.result}</span>
                </div>
              </div>
              <div style={{ padding: "16px" }}>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0D0D0C", marginBottom: "4px" }}>{p.title}</h3>
                <p style={{ fontSize: "12px", color: "#A3A39D" }}>{p.cat}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 8. Modern Tech ─────────────────────────────────────────── */
export function PortfolioModernTech() {
  return (
    <section style={{ background: "#08080A", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, color: "#F3F3F1", letterSpacing: "-0.025em" }}>
            <span style={{ color: "#8C78FF" }}>Releases</span><br />catalog.
          </h2>
          <span style={{ fontFamily: mono, fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>06 entries</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
          {modernTechProjects.map(p => (
            <div key={p.id} style={{ background: "#08080A", padding: "0", cursor: "pointer", position: "relative", overflow: "hidden" }}>
              <div style={{ height: "160px", overflow: "hidden" }}>
                <img src={p.image} alt={p.title} loading="lazy" style={{ ...imgStyle, opacity: 0.75 }} />
              </div>
              <div style={{ padding: "20px" }}>
                <code style={{ fontFamily: mono, fontSize: "10px", color: "rgba(255,255,255,0.25)", display: "block", marginBottom: "8px" }}>{p.year} · {p.cat.toLowerCase().replace(/\s/g, "-")}</code>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#F3F3F1", letterSpacing: "-0.01em", marginBottom: "8px" }}>{p.title}</h3>
                <div style={{ display: "flex", gap: "6px" }}>
                  {p.tags.map(t => <span key={t} style={{ fontFamily: mono, fontSize: "10px", color: "#8C78FF", background: "rgba(97,80,246,0.1)", border: "1px solid rgba(97,80,246,0.15)", padding: "2px 6px", borderRadius: "4px" }}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 9. Brutalist ───────────────────────────────────────────── */
export function PortfolioBrutalist() {
  return (
    <section style={{ background: "#fff", fontFamily: "'Arial Black', Impact, sans-serif", border: "3px solid #000" }}>
      <div style={{ borderBottom: "3px solid #000", padding: "16px 24px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontFamily: mono, fontSize: "12px", fontWeight: 400 }}>PORTFOLIO / {brutalistProjects.length} PROJECTS</span>
        <span style={{ fontFamily: mono, fontSize: "12px", fontWeight: 400 }}>SORT: LATEST</span>
      </div>
      {brutalistProjects.map((p, i) => (
        <div key={p.id} style={{ display: "grid", gridTemplateColumns: "48px 1fr 1fr 120px 60px", borderBottom: "3px solid #000", alignItems: "stretch" }}>
          <div style={{ borderRight: "3px solid #000", background: i % 2 === 0 ? "#FF2D2D" : "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "11px", fontWeight: 900, color: "#fff", fontFamily: mono }}>{String(i+1).padStart(2,"0")}</span>
          </div>
          <div style={{ borderRight: "3px solid #000", padding: "0", overflow: "hidden" }}>
            <img src={p.image} alt={p.title} loading="lazy" style={imgStyle} />
          </div>
          <div style={{ borderRight: "3px solid #000", padding: "16px 20px", display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "16px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em" }}>{p.title}</span>
          </div>
          <div style={{ borderRight: "3px solid #000", padding: "16px 20px", display: "flex", alignItems: "center" }}>
            <span style={{ fontFamily: mono, fontSize: "12px", fontWeight: 700, color: "#FF2D2D" }}>{p.result}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ArrowUpRight size={18} />
          </div>
        </div>
      ))}
    </section>
  );
}

/* ── 10. High-End Portfolio ─────────────────────────────────── */
export function PortfolioHighEndPortfolio() {
  return (
    <section style={{ background: "#FAFAF9", fontFamily: sans }}>
      <div style={{ padding: "80px 48px 48px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <h2 style={{ fontFamily: serif, fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: "#0D0D0C", letterSpacing: "-0.01em", fontStyle: "italic" }}>
          Selected<br />Commissions
        </h2>
        <span style={{ fontSize: "12px", color: "#A3A39D", letterSpacing: "0.06em" }}>2024 — 2025</span>
      </div>
      {highEndProjects.map((p, i) => (
        <div key={p.id} style={{ borderTop: "1px solid rgba(0,0,0,0.07)", display: "grid", gridTemplateColumns: "80px 1fr 320px", gap: "0", cursor: "pointer", transition: "background 0.2s" }}>
          <div style={{ padding: "32px 0 32px 48px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start" }}>
            <span style={{ fontFamily: serif, fontSize: "13px", color: "#A3A39D", fontStyle: "italic" }}>{String(i+1).padStart(2,"0")}</span>
          </div>
          <div style={{ padding: "32px 40px", display: "flex", alignItems: "center" }}>
            <div>
              <h3 style={{ fontSize: "clamp(18px, 2.5vw, 26px)", fontWeight: 500, color: "#0D0D0C", letterSpacing: "-0.015em", marginBottom: "4px" }}>{p.title}</h3>
              <p style={{ fontSize: "13px", color: "#A3A39D" }}>{p.cat}</p>
            </div>
          </div>
          <div style={{ padding: "24px 48px 24px 0", display: "flex", alignItems: "center", gap: "16px", justifyContent: "flex-end" }}>
            <div style={{ width: "80px", height: "56px", borderRadius: "8px", overflow: "hidden" }}>
              <img src={p.image} alt={p.title} loading="lazy" style={imgStyle} />
            </div>
            <div>
              <span style={{ fontSize: "12px", color: "#A3A39D" }}>{p.year}</span><br />
              <span style={{ fontSize: "11px", color: "#16A34A", fontWeight: 600 }}>{p.result}</span>
            </div>
          </div>
        </div>
      ))}
      <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)", padding: "24px 48px", textAlign: "right" }}>
        <a href="#" onClick={e => e.preventDefault()} style={{ fontSize: "13px", color: "#0D0D0C", fontWeight: 500, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", borderBottom: "1px solid rgba(0,0,0,0.2)", paddingBottom: "2px" }}>
          View complete archive <ArrowRight size={12} />
        </a>
      </div>
    </section>
  );
}
