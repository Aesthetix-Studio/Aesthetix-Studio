import { ArrowRight } from "lucide-react";
import { minimalSteps, editorialSteps, premiumSaasSteps, creativeStudioSteps, enterpriseSteps, luxurySteps, startupSteps, modernTechSteps, brutalistSteps, highEndSteps } from "./var-process-data";

const serif = "'Cormorant Garamond', Georgia, serif";
const mono = "'JetBrains Mono', monospace";
const sans = "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif";

/* ── 1. Minimal ─────────────────────────────────────────────── */
export function ProcessMinimal() {
  return (
    <section style={{ background: "#FAFAF9", padding: "96px 48px", fontFamily: sans }}>
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A3A39D", marginBottom: "48px" }}>Process</p>
        {minimalSteps.map((s, i) => (
          <div key={s.n} style={{ display: "flex", gap: "32px", paddingBottom: "32px", marginBottom: "32px", borderBottom: i < minimalSteps.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
            <span style={{ fontSize: "11px", color: "#CBCBC6", paddingTop: "3px", minWidth: "24px" }}>{s.n}</span>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: "16px", fontWeight: 500, color: "#0D0D0C", letterSpacing: "-0.01em", marginBottom: "6px" }}>{s.title}</h3>
              <p style={{ fontSize: "14px", color: "#737370", lineHeight: 1.65 }}>{s.desc}</p>
            </div>
            <span style={{ fontSize: "11px", color: "#A3A39D", paddingTop: "3px", whiteSpace: "nowrap" }}>{s.time}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 2. Editorial ───────────────────────────────────────────── */
export function ProcessEditorial() {
  return (
    <section style={{ background: "#0D0D0C", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "64px" }}>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, color: "#F3F3F1", letterSpacing: "-0.035em", lineHeight: 1, textTransform: "uppercase" }}>
            HOW<br /><span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.25)", color: "transparent" }}>WE WORK</span>
          </h2>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em", textTransform: "uppercase" }}>5 phases</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "1px", background: "rgba(255,255,255,0.08)" }}>
          {editorialSteps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.n} style={{ background: "#0D0D0C", padding: "32px 24px" }}>
                <div style={{ fontSize: "10px", color: "#6150F6", fontFamily: mono, marginBottom: "20px", letterSpacing: "0.1em" }}>{s.n}</div>
                <Icon size={20} color="rgba(255,255,255,0.4)" style={{ marginBottom: "16px", display: "block" }} />
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#F3F3F1", marginBottom: "8px" }}>{s.title}</h3>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{s.desc}</p>
                <div style={{ marginTop: "16px", fontSize: "10px", color: "rgba(97,80,246,0.7)", fontFamily: mono }}>{s.time}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── 3. Premium SaaS ────────────────────────────────────────── */
export function ProcessPremiumSaas() {
  return (
    <section style={{ background: "#F8F8F7", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 600, color: "#10B981", background: "#ECFDF5", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "9999px", padding: "4px 12px", marginBottom: "16px" }}>How it works</span>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 800, color: "#0D0D0C", letterSpacing: "-0.025em" }}>From data to decisions in 5 steps.</h2>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: "20px", left: "40px", right: "40px", height: "2px", background: "rgba(16,185,129,0.15)", zIndex: 0 }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "16px", position: "relative", zIndex: 1 }}>
            {premiumSaasSteps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.n} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <div style={{ width: "40px", height: "40px", background: "#fff", border: "2px solid rgba(16,185,129,0.25)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                    <Icon size={18} color="#10B981" />
                  </div>
                  <div style={{ fontSize: "10px", color: "#A3A39D", fontWeight: 600, marginBottom: "4px", letterSpacing: "0.06em" }}>{s.n}</div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#0D0D0C", marginBottom: "6px" }}>{s.title}</div>
                  <div style={{ fontSize: "12px", color: "#737370", lineHeight: 1.55, marginBottom: "8px" }}>{s.desc}</div>
                  <span style={{ fontSize: "10px", color: "#10B981", background: "#ECFDF5", padding: "2px 8px", borderRadius: "9999px" }}>{s.time}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 4. Creative Studio ─────────────────────────────────────── */
const stepColors = ["#6150F6","#F59E0B","#10B981","#EF4444","#06B6D4"];
export function ProcessCreativeStudio() {
  const badges = [
    { title: "FSSAI Certified", desc: "Fully licensed and inspected" },
    { title: "100% Organic", desc: "Locally sourced, seasonal produce" },
    { title: "Zero Waste Kitchen", desc: "Composting and minimal packaging" },
    { title: "Award-Winning", desc: "Best New Restaurant 2024" },
    { title: "Farm Partnerships", desc: "Direct trade with 12 local farms" },
  ];
  return (
    <section style={{ background: "#140C07", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ fontSize: "11px", color: "rgba(204,120,50,0.7)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "12px" }}>Our Values</p>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 300, color: "#F5E6D3", letterSpacing: "-0.02em", fontStyle: "italic" }}>
            What we stand for.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "16px" }}>
          {badges.map((b) => (
            <div key={b.title} style={{ background: "rgba(204,120,50,0.06)", border: "1px solid rgba(204,120,50,0.12)", borderRadius: "16px", padding: "28px 20px", textAlign: "center" }}>
              <div style={{ width: "40px", height: "2px", background: "rgba(204,120,50,0.4)", margin: "0 auto 16px" }} />
              <h3 style={{ fontFamily: serif, fontSize: "15px", fontWeight: 400, color: "#F5E6D3", marginBottom: "6px", fontStyle: "italic" }}>{b.title}</h3>
              <p style={{ fontSize: "12px", color: "rgba(245,230,211,0.4)", lineHeight: 1.5 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 5. Enterprise ──────────────────────────────────────────── */
export function ProcessEnterprise() {
  return (
    <section style={{ background: "#fff", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px" }}>
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A3A39D", marginBottom: "8px" }}>Engagement Model</p>
            <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#0D0D0C", letterSpacing: "-0.02em" }}>Project Delivery Framework</h2>
          </div>
          <span style={{ fontSize: "12px", color: "#737370", background: "#F3F3F1", padding: "6px 12px", borderRadius: "6px" }}>ISO 9001 aligned</span>
        </div>
        <div style={{ background: "#F8F8F7", borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.07)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F3F3F1" }}>
                {["Phase","Name","Duration","Key Deliverables","Status"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: 600, color: "#737370", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {enterpriseSteps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <tr key={s.n} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                    <td style={{ padding: "14px 16px", fontSize: "13px", fontFamily: mono, color: "#6150F6", fontWeight: 600 }}>{s.n}</td>
                    <td style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <Icon size={14} color="#525250" />
                      <span style={{ fontSize: "14px", fontWeight: 600, color: "#0D0D0C" }}>{s.title}</span>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "12px", color: "#737370" }}>{s.time}</td>
                    <td style={{ padding: "14px 16px", fontSize: "13px", color: "#525250" }}>{s.desc}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 600, color: "#16A34A", background: "#F0FDF4", padding: "3px 8px", borderRadius: "4px" }}>Completed</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ── 6. Luxury ──────────────────────────────────────────────── */
export function ProcessLuxury() {
  return (
    <section style={{ background: "#13120F", padding: "96px 48px", fontFamily: sans }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "72px" }}>
          <div style={{ height: "1px", width: "40px", background: "rgba(201,168,76,0.4)", margin: "0 auto 24px" }} />
          <h2 style={{ fontFamily: serif, fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 300, color: "#F0EAD6", letterSpacing: "0.04em", fontStyle: "italic" }}>The Atelier Method</h2>
          <div style={{ height: "1px", width: "40px", background: "rgba(201,168,76,0.4)", margin: "24px auto 0" }} />
        </div>
        {luxurySteps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.n} style={{ display: "flex", gap: "40px", paddingBottom: "40px", marginBottom: "40px", borderBottom: i < luxurySteps.length - 1 ? "1px solid rgba(201,168,76,0.1)" : "none" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0", minWidth: "32px" }}>
                <div style={{ width: "32px", height: "32px", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={14} color="rgba(201,168,76,0.7)" />
                </div>
                {i < luxurySteps.length - 1 && <div style={{ width: "1px", flex: 1, background: "rgba(201,168,76,0.1)", marginTop: "8px" }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                  <h3 style={{ fontFamily: serif, fontSize: "20px", fontWeight: 400, color: "#F0EAD6", fontStyle: "italic" }}>{s.title}</h3>
                  <span style={{ fontFamily: serif, fontSize: "11px", color: "rgba(201,168,76,0.5)", letterSpacing: "0.08em" }}>{s.time}</span>
                </div>
                <p style={{ fontSize: "14px", color: "rgba(240,234,214,0.45)", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── 7. Startup ─────────────────────────────────────────────── */
export function ProcessStartup() {
  return (
    <section style={{ background: "#fff", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, color: "#0D0D0C", letterSpacing: "-0.025em", marginBottom: "12px" }}>
            Launch-ready in 4 weeks
          </h2>
          <p style={{ fontSize: "15px", color: "#737370" }}>Our battle-tested process gets you from idea to live, fast.</p>
        </div>
        <div style={{ display: "flex", gap: "0", position: "relative" }}>
          {startupSteps.map((s, i) => {
            const Icon = s.icon;
            const color = stepColors[i];
            return (
              <div key={s.n} style={{ flex: 1, position: "relative", padding: "0 8px" }}>
                <div style={{ background: `${color}12`, border: `2px solid ${color}25`, borderRadius: "16px", padding: "20px 16px", textAlign: "center", height: "100%" }}>
                  <div style={{ width: "40px", height: "40px", background: color, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                    <Icon size={18} color="#fff" />
                  </div>
                  <div style={{ fontSize: "10px", fontWeight: 700, color, letterSpacing: "0.08em", marginBottom: "4px" }}>{s.n}</div>
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#0D0D0C", marginBottom: "6px" }}>{s.title}</h3>
                  <p style={{ fontSize: "11px", color: "#737370", lineHeight: 1.5, marginBottom: "8px" }}>{s.desc}</p>
                  <span style={{ fontSize: "10px", color, fontWeight: 600 }}>{s.time}</span>
                </div>
                {i < startupSteps.length - 1 && (
                  <div style={{ position: "absolute", right: "-4px", top: "50%", transform: "translateY(-50%)", zIndex: 2 }}>
                    <ArrowRight size={14} color="#D1D0CF" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── 8. Modern Tech ─────────────────────────────────────────── */
export function ProcessModernTech() {
  return (
    <section style={{ background: "#08080A", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ marginBottom: "32px" }}>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>Our Process</p>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#F3F3F1", letterSpacing: "-0.025em" }}>From demo to distribution.</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {modernTechSteps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.n} style={{ display: "flex", gap: "0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ width: "64px", paddingTop: "28px", paddingLeft: "0", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: "32px", height: "32px", background: "rgba(97,80,246,0.12)", border: "1px solid rgba(97,80,246,0.25)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={14} color="#8C78FF" />
                  </div>
                  {i < modernTechSteps.length - 1 && <div style={{ width: "1px", flex: 1, background: "rgba(255,255,255,0.05)", margin: "8px 0" }} />}
                </div>
                <div style={{ flex: 1, padding: "24px 24px 24px 16px" }}>
                  <div style={{ display: "flex", gap: "16px", alignItems: "baseline", marginBottom: "8px" }}>
                    <span style={{ fontSize: "11px", color: "#8C78FF", fontWeight: 600 }}>{s.n}</span>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#F3F3F1" }}>{s.title}</h3>
                    <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)", marginLeft: "auto" }}>{s.time}</span>
                  </div>
                  <p style={{ fontSize: "13px", color: "rgba(243,243,241,0.45)", lineHeight: 1.6 }}>{s.desc}</p>
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
export function ProcessBrutalist() {
  return (
    <section style={{ background: "#fff", fontFamily: "'Arial Black', Impact, sans-serif", border: "3px solid #000" }}>
      <div style={{ borderBottom: "3px solid #000", padding: "16px 24px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontFamily: mono, fontSize: "12px", fontWeight: 400 }}>PROCESS / HOW WE WORK</span>
        <span style={{ fontFamily: mono, fontSize: "12px", fontWeight: 400 }}>5 PHASES / ~2 WEEKS</span>
      </div>
      {brutalistSteps.map((s, i) => (
        <div key={s.n} style={{ display: "grid", gridTemplateColumns: "60px 40px 180px 1fr 120px", borderBottom: "3px solid #000", alignItems: "stretch" }}>
          <div style={{ background: i % 2 === 0 ? "#FF2D2D" : "#000", borderRight: "3px solid #000", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "16px", fontWeight: 900, color: "#fff", fontFamily: mono }}>{s.n}</span>
          </div>
          <div style={{ borderRight: "3px solid #000", background: i % 2 === 0 ? "#000" : "#FF2D2D", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "20px", color: "#fff" }}>→</span>
          </div>
          <div style={{ borderRight: "3px solid #000", padding: "20px 16px", display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "18px", fontWeight: 900, textTransform: "uppercase" }}>{s.title}</span>
          </div>
          <div style={{ borderRight: "3px solid #000", padding: "20px 20px", display: "flex", alignItems: "center" }}>
            <p style={{ fontFamily: "'Arial', sans-serif", fontSize: "13px", fontWeight: 400, lineHeight: 1.45 }}>{s.desc}</p>
          </div>
          <div style={{ padding: "20px 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: mono, fontSize: "11px", fontWeight: 700, textAlign: "center" }}>{s.time}</span>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ── 10. High-End Portfolio ─────────────────────────────────── */
export function ProcessHighEndPortfolio() {
  return (
    <section style={{ background: "#FAFAF9", padding: "96px 48px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: "80px", alignItems: "start" }}>
          <div style={{ position: "sticky", top: "80px" }}>
            <p style={{ fontFamily: serif, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A3A39D", fontStyle: "italic", marginBottom: "20px" }}>Methodology</p>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 300, color: "#0D0D0C", lineHeight: 1.3, letterSpacing: "-0.005em", fontStyle: "italic", marginBottom: "24px" }}>
              A five-phase method refined across 80 engagements.
            </h2>
            <div style={{ height: "1px", width: "48px", background: "rgba(0,0,0,0.15)" }} />
          </div>
          <div>
            {highEndSteps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.n} style={{ display: "flex", gap: "28px", paddingBottom: "40px", marginBottom: "40px", borderBottom: i < highEndSteps.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: "36px", height: "36px", background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={16} color="#525250" />
                    </div>
                    {i < highEndSteps.length - 1 && <div style={{ width: "1px", flex: 1, background: "rgba(0,0,0,0.07)", marginTop: "8px" }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#0D0D0C", letterSpacing: "-0.01em" }}>{s.title}</h3>
                      <span style={{ fontSize: "12px", color: "#A3A39D" }}>{s.time}</span>
                    </div>
                    <p style={{ fontSize: "14px", color: "#737370", lineHeight: 1.7 }}>{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
