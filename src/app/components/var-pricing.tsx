import { Check, ArrowRight } from "lucide-react";
import { minimalPlans, editorialPlans, premiumSaasPlans, creativeStudioPlans, enterprisePlans, luxuryPlans, startupPlans, modernTechPlans, brutalistPlans, highEndPlans } from "./var-pricing-data";

const serif = "'Cormorant Garamond', Georgia, serif";
const mono = "'JetBrains Mono', monospace";
const sans = "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif";

/* ── 1. Minimal ─────────────────────────────────────────────── */
export function PricingMinimal() {
  return (
    <section style={{ background: "#FAFAF9", padding: "96px 48px", fontFamily: sans }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A3A39D", marginBottom: "48px" }}>Pricing</p>
        {minimalPlans.map((p, i) => (
          <div key={p.name} style={{ display: "flex", alignItems: "baseline", gap: "40px", padding: "28px 0", borderBottom: i < minimalPlans.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
            <div style={{ flex: "0 0 160px" }}>
              <div style={{ fontSize: "15px", fontWeight: 500, color: "#0D0D0C" }}>{p.name}</div>
              <div style={{ fontSize: "12px", color: "#A3A39D", marginTop: "2px" }}>{p.desc}</div>
            </div>
            <div style={{ flex: 1, display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {p.features.slice(0,3).map(f => (
                <span key={f} style={{ fontSize: "12px", color: "#737370", background: "#F3F3F1", padding: "3px 10px", borderRadius: "9999px" }}>{f}</span>
              ))}
              {p.features.length > 3 && <span style={{ fontSize: "12px", color: "#A3A39D" }}>+{p.features.length - 3} more</span>}
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: "22px", fontWeight: 700, color: "#0D0D0C", letterSpacing: "-0.02em" }}>{p.price}</div>
              <div style={{ fontSize: "11px", color: "#A3A39D" }}>{p.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 2. Editorial ───────────────────────────────────────────── */
export function PricingEditorial() {
  return (
    <section style={{ background: "#0D0D0C", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: "64px", paddingBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 800, color: "#F3F3F1", letterSpacing: "-0.03em", lineHeight: 1, textTransform: "uppercase" }}>
            INVEST IN<br /><span style={{ color: "#6150F6" }}>YOUR STORY.</span>
          </h2>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em" }}>Three tiers</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2px" }}>
          {editorialPlans.map((p, i) => (
            <div key={p.name} style={{ background: p.pop ? "#6150F6" : "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", padding: "36px 28px" }}>
              {p.pop && <span style={{ display: "inline-block", background: "#fff", color: "#6150F6", fontSize: "10px", fontWeight: 700, padding: "3px 10px", letterSpacing: "0.08em", marginBottom: "16px" }}>RECOMMENDED</span>}
              <h3 style={{ fontSize: "22px", fontWeight: 700, color: p.pop ? "#fff" : "#F3F3F1", marginBottom: "4px" }}>{p.name}</h3>
              <div style={{ fontSize: "32px", fontWeight: 800, color: p.pop ? "#fff" : "#F3F3F1", letterSpacing: "-0.03em", marginBottom: "12px" }}>{p.price}</div>
              <p style={{ fontSize: "13px", color: p.pop ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.4)", lineHeight: 1.55, marginBottom: "24px" }}>{p.desc}</p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "28px" }}>
                {p.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: p.pop ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.45)" }}>
                    <Check size={12} color={p.pop ? "#fff" : "rgba(255,255,255,0.35)"} /> {f}
                  </li>
                ))}
              </ul>
              <a href="#" onClick={e => e.preventDefault()} style={{ display: "block", textAlign: "center", background: p.pop ? "#fff" : "transparent", color: p.pop ? "#6150F6" : "#F3F3F1", border: p.pop ? "none" : "1px solid rgba(255,255,255,0.2)", padding: "12px", fontSize: "13px", fontWeight: 700, textDecoration: "none", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 3. Premium SaaS ────────────────────────────────────────── */
export function PricingPremiumSaas() {
  return (
    <section style={{ background: "#F8F8F7", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 800, color: "#0D0D0C", letterSpacing: "-0.025em", marginBottom: "12px" }}>Simple, transparent pricing</h2>
          <p style={{ fontSize: "16px", color: "#737370" }}>No hidden fees. No surprise invoices. Ever.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px", alignItems: "start" }}>
          {premiumSaasPlans.map(p => (
            <div key={p.name} style={{ position: "relative", background: "#fff", border: p.pop ? "2px solid #10B981" : "1px solid rgba(0,0,0,0.07)", borderRadius: "20px", padding: "28px", transition: "all 0.2s" }}>
              {p.pop && (
                <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "#10B981", color: "#fff", fontSize: "11px", fontWeight: 700, padding: "4px 14px", borderRadius: "9999px", whiteSpace: "nowrap" }}>Most Popular</div>
              )}
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0D0D0C", marginBottom: "6px" }}>{p.name}</h3>
              <p style={{ fontSize: "13px", color: "#737370", marginBottom: "20px", lineHeight: 1.5 }}>{p.desc}</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "24px" }}>
                <span style={{ fontSize: "36px", fontWeight: 800, color: "#0D0D0C", letterSpacing: "-0.03em" }}>{p.price}</span>
                <span style={{ fontSize: "13px", color: "#A3A39D" }}>{p.sub}</span>
              </div>
              <ul style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
                {p.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#525250" }}>
                    <div style={{ width: "16px", height: "16px", background: "#F0FDF4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Check size={10} color="#16A34A" strokeWidth={3} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" onClick={e => e.preventDefault()} style={{ display: "block", textAlign: "center", background: p.pop ? "#10B981" : "#0D0D0C", color: "#fff", padding: "11px", borderRadius: "10px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 4. Creative Studio ─────────────────────────────────────── */
export function PricingCreativeStudio() {
  return (
    <section style={{ background: "#1A0F0A", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "48px" }}>
          <p style={{ fontSize: "11px", color: "rgba(204,120,50,0.7)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "12px" }}>Pricing</p>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300, color: "#F5E6D3", letterSpacing: "-0.02em", lineHeight: 1.1, fontStyle: "italic" }}>
            Choose your<br />level of ambition.
          </h2>
          <p style={{ fontSize: "16px", color: "rgba(245,230,211,0.5)", marginTop: "12px" }}>Each package is a complete culinary engagement — not a line-item list.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {creativeStudioPlans.map((p, i) => (
            <div key={p.name} style={{ display: "grid", gridTemplateColumns: "200px 1fr 200px", gap: "0", background: "rgba(204,120,50,0.04)", border: "1px solid rgba(204,120,50,0.1)", overflow: "hidden" }}>
              <div style={{ background: "rgba(204,120,50,0.1)", padding: "32px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <h3 style={{ fontFamily: serif, fontSize: "20px", fontWeight: 400, color: "#F5E6D3", textTransform: "uppercase", letterSpacing: "0.04em", fontStyle: "italic" }}>{p.name}</h3>
                <div>
                  <div style={{ fontSize: "28px", fontWeight: 800, color: "#CC7832", letterSpacing: "-0.02em" }}>{p.price}</div>
                  <div style={{ fontSize: "12px", color: "rgba(204,120,50,0.6)" }}>{p.sub || "custom"}</div>
                </div>
              </div>
              <div style={{ padding: "24px 32px" }}>
                <p style={{ fontSize: "14px", color: "rgba(245,230,211,0.5)", marginBottom: "12px" }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {p.features.map(f => <span key={f} style={{ fontSize: "12px", color: "rgba(245,230,211,0.6)", background: "rgba(204,120,50,0.08)", padding: "4px 10px", borderRadius: "9999px" }}>{f}</span>)}
                </div>
              </div>
              <div style={{ padding: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <a href="#" onClick={e => e.preventDefault()} style={{ background: "rgba(204,120,50,0.15)", color: "#CC7832", border: "1px solid rgba(204,120,50,0.3)", padding: "12px 20px", borderRadius: "9999px", fontSize: "13px", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  {p.cta} <ArrowRight size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 5. Enterprise ──────────────────────────────────────────── */
export function PricingEnterprise() {
  return (
    <section style={{ background: "#fff", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A3A39D", marginBottom: "8px" }}>Investment</p>
            <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#0D0D0C", letterSpacing: "-0.02em" }}>Service Tiers & Pricing</h2>
          </div>
          <span style={{ fontSize: "12px", color: "#737370", background: "#F3F3F1", padding: "6px 12px", borderRadius: "6px" }}>All prices USD · Ex. tax</span>
        </div>
        <div style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: "10px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F3F3F1" }}>
                {["Package","Price","Timeline","Best For","Includes"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: 600, color: "#737370", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {enterprisePlans.map((p, i) => (
                <tr key={p.name} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                  <td style={{ padding: "16px", fontWeight: 700, color: "#0D0D0C", fontSize: "14px" }}>
                    {p.pop && <span style={{ fontSize: "10px", color: "#6150F6", background: "#F2F0FF", padding: "2px 6px", borderRadius: "4px", marginRight: "8px" }}>Popular</span>}
                    {p.name}
                  </td>
                  <td style={{ padding: "16px", fontSize: "15px", fontWeight: 700, color: "#0D0D0C" }}>{p.price}</td>
                  <td style={{ padding: "16px", fontSize: "13px", color: "#737370" }}>{["Monthly","Monthly","Custom"][i]}</td>
                  <td style={{ padding: "16px", fontSize: "13px", color: "#737370" }}>{p.desc}</td>
                  <td style={{ padding: "16px" }}>
                    <a href="#" onClick={e => e.preventDefault()} style={{ fontSize: "12px", color: "#6150F6", fontWeight: 500, textDecoration: "none" }}>Details →</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ── 6. Luxury ──────────────────────────────────────────────── */
export function PricingLuxury() {
  return (
    <section style={{ background: "#13120F", padding: "96px 48px", fontFamily: sans }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "72px" }}>
          <div style={{ height: "1px", width: "40px", background: "rgba(201,168,76,0.4)", margin: "0 auto 24px" }} />
          <h2 style={{ fontFamily: serif, fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 300, color: "#F0EAD6", letterSpacing: "0.04em", fontStyle: "italic" }}>Commissions & Rates</h2>
          <div style={{ height: "1px", width: "40px", background: "rgba(201,168,76,0.4)", margin: "24px auto 0" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(201,168,76,0.15)" }}>
          {luxuryPlans.map(p => (
            <div key={p.name} style={{ background: "#13120F", padding: "36px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ maxWidth: "500px" }}>
                <h3 style={{ fontFamily: serif, fontSize: "22px", fontWeight: 400, color: "#F0EAD6", fontStyle: "italic", marginBottom: "8px" }}>{p.name} Commission</h3>
                <p style={{ fontSize: "14px", color: "rgba(240,234,214,0.45)", lineHeight: 1.65 }}>{p.desc}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: serif, fontSize: "28px", fontWeight: 300, color: "#F0EAD6", letterSpacing: "0.02em" }}>{p.price}</div>
                <a href="#" onClick={e => e.preventDefault()} style={{ fontFamily: sans, fontSize: "11px", color: "rgba(201,168,76,0.7)", letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none" }}>
                  Enquire →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 7. Startup ─────────────────────────────────────────────── */
export function PricingStartup() {
  return (
    <section style={{ background: "#fff", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, color: "#0D0D0C", letterSpacing: "-0.025em", marginBottom: "12px" }}>
            Pricing that makes sense
          </h2>
          <p style={{ fontSize: "15px", color: "#737370" }}>Everything upfront. No surprises. Cancel anytime for retainers.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
          {startupPlans.map((p, i) => {
            const grad = ["linear-gradient(135deg,#6150F6,#8B5CF6)","linear-gradient(135deg,#0D0D0C,#3B3B39)","linear-gradient(135deg,#F59E0B,#EF4444)"][i];
            return (
              <div key={p.name} style={{ background: "#F8F8F7", borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ background: grad, padding: "24px", textAlign: "center" }}>
                  <div style={{ fontSize: "32px", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>{p.price}</div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.65)" }}>{p.sub || "custom quote"}</div>
                </div>
                <div style={{ padding: "24px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0D0D0C", marginBottom: "8px" }}>{p.name}</h3>
                  <p style={{ fontSize: "13px", color: "#737370", marginBottom: "16px" }}>{p.desc}</p>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
                    {p.features.map(f => (
                      <li key={f} style={{ fontSize: "12px", color: "#525250", display: "flex", gap: "8px", alignItems: "center" }}>
                        <Check size={11} color="#16A34A" strokeWidth={3} /> {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#" onClick={e => e.preventDefault()} style={{ display: "block", textAlign: "center", background: "#0D0D0C", color: "#fff", padding: "11px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, textDecoration: "none" }}>
                    {p.cta} →
                  </a>
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
export function PricingModernTech() {
  return (
    <section style={{ background: "#08080A", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "48px" }}>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>Artist Pricing</p>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 800, color: "#F3F3F1", letterSpacing: "-0.025em" }}>Pick your deal.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
          {modernTechPlans.map(p => (
            <div key={p.name} style={{ background: p.pop ? "rgba(97,80,246,0.08)" : "#08080A", padding: "32px 28px", border: p.pop ? "1px solid rgba(97,80,246,0.25)" : "none" }}>
              {p.pop && <div style={{ fontSize: "10px", color: "#8C78FF", fontWeight: 600, letterSpacing: "0.06em", marginBottom: "16px" }}>→ RECOMMENDED</div>}
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#F3F3F1", marginBottom: "4px" }}>{p.name}</h3>
              <div style={{ fontSize: "32px", fontWeight: 800, color: p.pop ? "#8C78FF" : "#F3F3F1", letterSpacing: "-0.03em", marginBottom: "12px" }}>{p.price}</div>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.55, marginBottom: "20px" }}>{p.desc}</p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                {p.features.map(f => (
                  <li key={f} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{ fontSize: "10px", color: "#34D399" }}>✓</span>
                    <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#" onClick={e => e.preventDefault()} style={{ display: "block", textAlign: "center", background: p.pop ? "#6150F6" : "rgba(255,255,255,0.06)", color: p.pop ? "#fff" : "rgba(255,255,255,0.6)", border: p.pop ? "none" : "1px solid rgba(255,255,255,0.1)", padding: "11px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 9. Brutalist ───────────────────────────────────────────── */
export function PricingBrutalist() {
  return (
    <section style={{ background: "#fff", fontFamily: "'Arial Black', Impact, sans-serif", border: "3px solid #000" }}>
      <div style={{ borderBottom: "3px solid #000", padding: "16px 24px", background: "#FF2D2D" }}>
        <span style={{ fontFamily: mono, fontSize: "12px", fontWeight: 900, color: "#fff" }}>PRICING / HOW MUCH DOES IT COST</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0" }}>
        {brutalistPlans.map((p, i) => (
          <div key={p.name} style={{ borderRight: i < brutalistPlans.length - 1 ? "3px solid #000" : "none" }}>
            <div style={{ borderBottom: "3px solid #000", padding: "24px", background: p.pop ? "#000" : "#fff" }}>
              <div style={{ fontSize: "11px", fontFamily: mono, color: p.pop ? "#fff" : "#000", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{p.name}</div>
              <div style={{ fontSize: "40px", fontWeight: 900, color: p.pop ? "#fff" : "#000", lineHeight: 1, letterSpacing: "-0.03em" }}>{p.price}</div>
              {p.sub && <div style={{ fontSize: "11px", color: p.pop ? "rgba(255,255,255,0.5)" : "#A3A39D", fontFamily: mono, marginTop: "4px" }}>{p.sub}</div>}
            </div>
            <div style={{ padding: "20px" }}>
              <p style={{ fontFamily: "'Arial', sans-serif", fontSize: "13px", lineHeight: 1.5, marginBottom: "16px" }}>{p.desc}</p>
              {p.features.map(f => (
                <div key={f} style={{ fontFamily: mono, fontSize: "11px", padding: "4px 0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>→ {f}</div>
              ))}
              <a href="#" onClick={e => e.preventDefault()} style={{ display: "block", marginTop: "16px", background: p.pop ? "#FF2D2D" : "#000", color: "#fff", padding: "12px", textAlign: "center", fontSize: "12px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.06em", textDecoration: "none" }}>
                {p.cta.toUpperCase()} →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 10. High-End Portfolio ─────────────────────────────────── */
export function PricingHighEndPortfolio() {
  return (
    <section style={{ background: "#FAFAF9", padding: "96px 48px", fontFamily: sans }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "80px", alignItems: "start" }}>
          <div>
            <p style={{ fontFamily: serif, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A3A39D", fontStyle: "italic", marginBottom: "20px" }}>Investment</p>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 300, color: "#0D0D0C", lineHeight: 1.3, fontStyle: "italic", marginBottom: "24px" }}>
              Quality doesn't cost — it pays.
            </h2>
            <div style={{ height: "1px", width: "48px", background: "rgba(0,0,0,0.15)" }} />
          </div>
          <div>
            {highEndPlans.map((p, i) => (
              <div key={p.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "28px 0", borderBottom: i < highEndPlans.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none" }}>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#0D0D0C", letterSpacing: "-0.01em", marginBottom: "6px" }}>{p.name}</h3>
                  <p style={{ fontSize: "13px", color: "#A3A39D" }}>{p.desc}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: serif, fontSize: "24px", fontWeight: 400, color: "#0D0D0C", letterSpacing: "-0.01em" }}>{p.price}</div>
                  <a href="#" onClick={e => e.preventDefault()} style={{ fontSize: "11px", color: "#0D0D0C", letterSpacing: "0.06em", textDecoration: "none", borderBottom: "1px solid rgba(0,0,0,0.2)", paddingBottom: "1px" }}>Enquire</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
