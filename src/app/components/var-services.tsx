import { ArrowRight, ArrowUpRight, Check, Globe } from "lucide-react";
import { minimalServices, editorialServices, premiumSaasServices, creativeStudioServices, enterpriseServices, luxuryServices, startupServices, modernTechServices, brutalistServices, highEndServices } from "./var-services-data";

const serif = "'Cormorant Garamond', Georgia, serif";
const mono = "'JetBrains Mono', monospace";
const sans = "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif";

/* ── 1. Minimal ─────────────────────────────────────────────── */
export function ServicesMinimal() {
  return (
    <section style={{ background: "#FAFAF9", padding: "96px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A3A39D", marginBottom: "64px", fontWeight: 500 }}>Services</p>
        {minimalServices.map((s, i) => (
          <div key={s.num} style={{ display: "flex", alignItems: "baseline", gap: "40px", padding: "32px 0", borderBottom: i < minimalServices.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
            <span style={{ fontSize: "11px", color: "#CBCBC6", fontWeight: 400, width: "24px", flexShrink: 0 }}>{s.num}</span>
            <h3 style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 400, color: "#0D0D0C", letterSpacing: "-0.02em", flex: "0 0 280px" }}>{s.title}</h3>
            <p style={{ fontSize: "15px", color: "#737370", lineHeight: 1.65, flex: 1 }}>{s.desc}</p>
            <a href="#" onClick={e => e.preventDefault()} style={{ fontSize: "12px", color: "#0D0D0C", letterSpacing: "0.04em", display: "flex", alignItems: "center", gap: "6px", flexShrink: 0, textDecoration: "none" }}>
              Learn more <ArrowRight size={12} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 2. Editorial ───────────────────────────────────────────── */
export function ServicesEditorial() {
  return (
    <section style={{ background: "#0D0D0C", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "60px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "20px" }}>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, color: "#F3F3F1", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Four disciplines.<br /><span style={{ color: "#6150F6" }}>One newsroom.</span>
          </h2>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Services / 2026</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
          {editorialServices.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.num} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.03)" : "rgba(97,80,246,0.06)", padding: "40px", border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>{s.num}</span>
                  <ArrowUpRight size={16} color="rgba(255,255,255,0.2)" />
                </div>
                <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#F3F3F1", letterSpacing: "-0.015em", marginBottom: "12px" }}>{s.title}</h3>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>{s.desc}</p>
                <div style={{ marginTop: "24px", display: "inline-flex", background: "rgba(97,80,246,0.15)", border: "1px solid rgba(97,80,246,0.2)", borderRadius: "6px", padding: "4px 10px" }}>
                  <span style={{ fontSize: "11px", color: "#8C78FF", fontWeight: 600 }}>{s.result}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── 3. Premium SaaS ────────────────────────────────────────── */
export function ServicesPremiumSaas() {
  const features = ["Automated data collection","Scope 1, 2 & 3 tracking","Audit-ready reports","API integrations","SOC 2 compliant","Dedicated support"];
  return (
    <section style={{ background: "#F8F8F7", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <span style={{ display: "inline-block", background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "9999px", padding: "5px 14px", fontSize: "12px", color: "#525250", fontWeight: 500, marginBottom: "16px" }}>Everything included</span>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 800, color: "#0D0D0C", letterSpacing: "-0.025em", marginBottom: "12px" }}>One platform. Every emission source.</h2>
          <p style={{ fontSize: "16px", color: "#737370", maxWidth: "480px", margin: "0 auto" }}>Track, report, and reduce your carbon footprint across your entire value chain.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
          {premiumSaasServices.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.num} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: "16px", padding: "24px", transition: "all 0.2s" }}>
                <div style={{ width: "36px", height: "36px", background: "#ECFDF5", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                  <Icon size={18} color="#10B981" />
                </div>
                <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#0D0D0C", marginBottom: "8px" }}>{s.title}</h3>
                <p style={{ fontSize: "13px", color: "#737370", lineHeight: 1.55, marginBottom: "16px" }}>{s.desc}</p>
                <div style={{ fontSize: "11px", color: "#16A34A", fontWeight: 600, background: "#F0FDF4", padding: "4px 10px", borderRadius: "9999px", display: "inline-block" }}>{s.result}</div>
              </div>
            );
          })}
        </div>
        <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: "12px", padding: "20px 24px", display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
          {features.map(f => (
            <span key={f} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#525250" }}>
              <Check size={13} color="#16A34A" /> {f}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 4. Creative Studio ─────────────────────────────────────── */
const creativeColors = ["#CC7832","#A85D28","#8B4513","#D4956A"];

export function ServicesCreativeStudio() {
  return (
    <section style={{ background: "#1A0F0A", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "48px" }}>
          <p style={{ fontSize: "11px", color: "rgba(204,120,50,0.7)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "12px" }}>Our Craft</p>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300, color: "#F5E6D3", letterSpacing: "-0.02em", lineHeight: 1.1, fontStyle: "italic" }}>
            What we're<br />exceptional at.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px" }}>
          {creativeStudioServices.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.num} style={{ borderRadius: "16px", overflow: "hidden", cursor: "pointer", border: "1px solid rgba(204,120,50,0.15)" }}>
                <div style={{ background: "rgba(204,120,50,0.08)", padding: "32px 24px 24px", height: "160px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <Icon size={28} color="#CC7832" />
                  <span style={{ fontSize: "11px", color: "rgba(204,120,50,0.6)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.short}</span>
                </div>
                <div style={{ background: "rgba(204,120,50,0.04)", padding: "24px" }}>
                  <h3 style={{ fontFamily: serif, fontSize: "18px", fontWeight: 400, color: "#F5E6D3", marginBottom: "8px", fontStyle: "italic" }}>{s.title}</h3>
                  <p style={{ fontSize: "13px", color: "rgba(245,230,211,0.5)", lineHeight: 1.55 }}>{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
/* ── 5. Enterprise ──────────────────────────────────────────── */
export function ServicesEnterprise() {
  const cols = ["Service","Capability","SLA","Compliance","Pricing"];
  return (
    <section style={{ background: "#fff", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A3A39D", marginBottom: "8px" }}>Enterprise Services</p>
            <h2 style={{ fontSize: "32px", fontWeight: 700, color: "#0D0D0C", letterSpacing: "-0.02em" }}>Capabilities Overview</h2>
          </div>
          <a href="#" onClick={e => e.preventDefault()} style={{ background: "#0D0D0C", color: "#fff", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
            Download Deck
          </a>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F3F3F1" }}>
              {cols.map(c => (
                <th key={c} style={{ padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: 600, color: "#737370", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {enterpriseServices.map((s, i) => {
              const Icon = s.icon;
              return (
                <tr key={s.num} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: i % 2 === 0 ? "#fff" : "#FAFAF9" }}>
                  <td style={{ padding: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <Icon size={16} color="#525250" />
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "#0D0D0C" }}>{s.title}</span>
                  </td>
                  <td style={{ padding: "16px", fontSize: "13px", color: "#525250" }}>{s.desc}</td>
                  <td style={{ padding: "16px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 600, color: "#16A34A", background: "#F0FDF4", padding: "3px 8px", borderRadius: "4px" }}>{s.result}</span>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <span style={{ fontSize: "11px", color: "#2563EB", fontWeight: 500 }}>SOC 2 · GDPR</span>
                  </td>
                  <td style={{ padding: "16px", fontSize: "13px", color: "#525250", fontWeight: 500 }}>Custom quote</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ── 6. Luxury ──────────────────────────────────────────────── */
export function ServicesLuxury() {
  return (
    <section style={{ background: "#13120F", padding: "96px 48px", fontFamily: sans }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <div style={{ height: "1px", width: "40px", background: "rgba(201,168,76,0.5)", margin: "0 auto 24px" }} />
          <h2 style={{ fontFamily: serif, fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 300, color: "#F0EAD6", letterSpacing: "0.04em", fontStyle: "italic" }}>
            Our Maison of Services
          </h2>
          <div style={{ height: "1px", width: "40px", background: "rgba(201,168,76,0.5)", margin: "24px auto 0" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(201,168,76,0.15)" }}>
          {luxuryServices.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.num} style={{ background: "#13120F", padding: "48px 40px", position: "relative" }}>
                <div style={{ position: "absolute", top: "24px", right: "24px", fontFamily: serif, fontSize: "11px", color: "rgba(201,168,76,0.4)", letterSpacing: "0.1em" }}>{s.num}</div>
                <div style={{ width: "32px", height: "1px", background: "rgba(201,168,76,0.5)", marginBottom: "24px" }} />
                <h3 style={{ fontFamily: serif, fontSize: "24px", fontWeight: 400, color: "#F0EAD6", letterSpacing: "0.02em", marginBottom: "12px", fontStyle: "italic" }}>{s.title}</h3>
                <p style={{ fontSize: "14px", color: "rgba(240,234,214,0.45)", lineHeight: 1.7 }}>{s.desc}</p>
                <div style={{ marginTop: "28px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ height: "1px", width: "20px", background: "rgba(201,168,76,0.4)" }} />
                  <span style={{ fontFamily: serif, fontSize: "12px", color: "rgba(201,168,76,0.6)", fontStyle: "italic" }}>Learn more</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── 7. Startup ─────────────────────────────────────────────── */
export function ServicesStartup() {
  return (
    <section style={{ background: "#fff", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#0D0D0C", letterSpacing: "-0.025em", marginBottom: "12px" }}>
            What we'll build for you
          </h2>
          <p style={{ fontSize: "16px", color: "#737370" }}>Fast. Affordable. Results that speak for themselves.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "20px" }}>
          {startupServices.map((s, i) => {
            const Icon = s.icon;
            const accent = ["#6150F6","#F59E0B","#10B981","#EF4444"][i];
            return (
              <div key={s.num} style={{ background: "#F8F8F7", borderRadius: "16px", padding: "28px", position: "relative", overflow: "hidden", border: "1px solid rgba(0,0,0,0.05)" }}>
                <div style={{ position: "absolute", top: 0, right: 0, width: "80px", height: "80px", background: `${accent}10`, borderRadius: "0 16px 0 80px" }} />
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div style={{ width: "44px", height: "44px", background: `${accent}15`, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={20} color={accent} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0D0D0C", marginBottom: "6px" }}>{s.title}</h3>
                    <p style={{ fontSize: "13px", color: "#737370", lineHeight: 1.55, marginBottom: "16px" }}>{s.desc}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: accent }}>{s.result}</span>
                      <span style={{ fontSize: "12px", color: "#A3A39D" }}>avg. outcome</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── 8. Modern Tech ─────────────────────────────────────────── */
export function ServicesModernTech() {
  return (
    <section style={{ background: "#08080A", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "56px" }}>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>What we do</p>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, color: "#F3F3F1", letterSpacing: "-0.025em" }}>
            What we <span style={{ color: "#8C78FF" }}>offer</span> artists.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
          {modernTechServices.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.num} style={{ background: "#08080A", padding: "36px", position: "relative", cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                  <div style={{ width: "40px", height: "40px", background: "rgba(97,80,246,0.12)", border: "1px solid rgba(97,80,246,0.2)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={18} color="#8C78FF" />
                  </div>
                  <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)" }}>{String(i+1).padStart(2,"0")}</span>
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#F3F3F1", letterSpacing: "-0.01em", marginBottom: "10px" }}>{s.title}</h3>
                <p style={{ fontSize: "13px", color: "rgba(243,243,241,0.45)", lineHeight: 1.6, marginBottom: "20px" }}>{s.desc}</p>
                <div style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.15)", borderRadius: "6px", padding: "6px 12px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "6px", height: "6px", background: "#34D399", borderRadius: "50%" }} />
                  <span style={{ fontSize: "11px", color: "#34D399" }}>{s.result}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── 9. Brutalist ───────────────────────────────────────────── */
export function ServicesBrutalist() {
  return (
    <section style={{ background: "#fff", fontFamily: "'Arial Black', Impact, sans-serif", border: "3px solid #000" }}>
      <div style={{ borderBottom: "3px solid #000", padding: "16px 24px" }}>
        <span style={{ fontFamily: mono, fontSize: "12px", fontWeight: 400 }}>SERVICES / WHAT WE DO</span>
      </div>
      {brutalistServices.map((s, i) => (
        <div key={s.num} style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr 160px", borderBottom: "3px solid #000", minHeight: "80px" }}>
          <div style={{ borderRight: "3px solid #000", display: "flex", alignItems: "center", justifyContent: "center", background: i % 2 === 0 ? "#FF2D2D" : "#000", padding: "16px" }}>
            <span style={{ fontSize: "20px", fontWeight: 900, color: "#fff" }}>{s.num}</span>
          </div>
          <div style={{ borderRight: "3px solid #000", padding: "24px", display: "flex", alignItems: "center" }}>
            <h3 style={{ fontSize: "20px", fontWeight: 900, color: "#000", textTransform: "uppercase", letterSpacing: "-0.01em" }}>{s.short}</h3>
          </div>
          <div style={{ borderRight: "3px solid #000", padding: "24px", display: "flex", alignItems: "center" }}>
            <p style={{ fontFamily: "'Arial', sans-serif", fontSize: "13px", fontWeight: 400, color: "#000", lineHeight: 1.4 }}>{s.desc}</p>
          </div>
          <div style={{ padding: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: mono, fontSize: "12px", fontWeight: 600, textAlign: "center" }}>{s.result}</span>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ── 10. High-End Portfolio ─────────────────────────────────── */
export function ServicesHighEndPortfolio() {
  return (
    <section style={{ background: "#FAFAF9", padding: "96px 48px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "80px", alignItems: "start" }}>
          <div style={{ position: "sticky", top: "80px" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A3A39D", marginBottom: "16px" }}>
              What we do
            </p>
            <h2 style={{ fontFamily: serif, fontSize: "40px", fontWeight: 400, color: "#0D0D0C", letterSpacing: "-0.01em", lineHeight: 1.2, fontStyle: "italic" }}>
              A precise set of disciplines, executed without compromise.
            </h2>
          </div>
          <div>
            {highEndServices.map((s, i) => (
              <div key={s.num} style={{ display: "flex", gap: "32px", paddingBottom: "48px", marginBottom: "48px", borderBottom: i < highEndServices.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none" }}>
                <span style={{ fontFamily: serif, fontSize: "13px", color: "#A3A39D", paddingTop: "4px", minWidth: "24px" }}>{s.num}</span>
                <div>
                  <h3 style={{ fontSize: "22px", fontWeight: 600, color: "#0D0D0C", letterSpacing: "-0.015em", marginBottom: "10px" }}>{s.title}</h3>
                  <p style={{ fontSize: "15px", color: "#737370", lineHeight: 1.7, marginBottom: "16px" }}>{s.desc}</p>
                  <a href="#" onClick={e => e.preventDefault()} style={{ fontSize: "12px", color: "#0D0D0C", letterSpacing: "0.04em", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", borderBottom: "1px solid rgba(0,0,0,0.2)", paddingBottom: "2px" }}>
                    View portfolio <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
