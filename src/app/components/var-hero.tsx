import { ArrowRight, ArrowUpRight, Check, Star, Terminal, ChevronDown, Sparkles, Zap, Leaf } from "lucide-react";

const serif = "'Cormorant Garamond', 'Georgia', serif";
const mono = "'JetBrains Mono', monospace";
const sans = "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif";

/* ── 1. Minimal ─────────────────────────────────────────────── */
export function HeroMinimal() {
  return (
    <section style={{ background: "#FAFAF9", minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", textAlign: "center" }}>
      <p style={{ fontFamily: sans, fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#A3A39D", marginBottom: "48px", fontWeight: 500 }}>
        Mono Studio · Est. 2019
      </p>
      <h1 style={{ fontFamily: sans, fontSize: "clamp(52px, 8vw, 96px)", fontWeight: 200, letterSpacing: "-0.04em", lineHeight: 1, color: "#0D0D0C", marginBottom: "32px", maxWidth: "800px" }}>
        Work that speaks<br />before you do.
      </h1>
      <div style={{ width: "40px", height: "1px", background: "#0D0D0C", margin: "0 auto 32px" }} />
      <p style={{ fontFamily: sans, fontSize: "16px", color: "#737370", fontWeight: 400, lineHeight: 1.7, maxWidth: "420px", marginBottom: "48px" }}>
        Brand identity, web design, and digital products for businesses that refuse to be ignored.
      </p>
      <a href="#" onClick={e => e.preventDefault()} style={{ fontFamily: sans, fontSize: "13px", fontWeight: 500, color: "#0D0D0C", letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid #0D0D0C", paddingBottom: "2px" }}>
        Begin a project
      </a>
    </section>
  );
}

/* ── 2. Editorial ───────────────────────────────────────────── */
export function HeroEditorial() {
  return (
    <section style={{ background: "#0D0D0C", fontFamily: sans }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}>
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "16px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Est. 2014 · New Delhi</span>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>The Chronicle</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "0", minHeight: "70vh" }}>
          <div style={{ borderRight: "1px solid rgba(255,255,255,0.1)", padding: "64px 48px 64px 0", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <h1 style={{ fontSize: "clamp(56px, 8vw, 108px)", fontWeight: 800, color: "#F3F3F1", letterSpacing: "-0.04em", lineHeight: 0.9, textTransform: "uppercase", marginBottom: "0" }}>
              Stories<br />that shape<br />how the<br /><span style={{ color: "#6150F6" }}>world</span><br />thinks.
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: "24px", paddingTop: "48px" }}>
              <a href="#" onClick={e => e.preventDefault()} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#F3F3F1", color: "#0D0D0C", padding: "14px 28px", fontSize: "13px", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", textDecoration: "none" }}>
                Start Reading <ArrowRight size={14} />
              </a>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>12M+ monthly readers</span>
            </div>
          </div>
          <div style={{ padding: "64px 0 64px 48px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "20px" }}>About The Chronicle</p>
              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: "24px" }}>
                A leading Indian publication covering politics, business, culture, technology, and science. Independent journalism with depth, nuance, and integrity.
              </p>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", lineHeight: 1.65 }}>
                Long-form investigations, data-driven analysis, and cultural commentary that moves the conversation forward.
              </p>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "24px" }}>
              <div style={{ display: "flex", gap: "32px" }}>
                {[["12M","Readers"], ["4,200","Articles"], ["11yr","Publishing"]].map(([v,l]) => (
                  <div key={l}>
                    <div style={{ fontSize: "24px", fontWeight: 700, color: "#F3F3F1", letterSpacing: "-0.02em" }}>{v}</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 3. Premium SaaS — ClimateBridge ──────────────────────────── */
export function HeroPremiumSaas() {
  return (
    <section style={{ background: "#F8F8F7", fontFamily: sans, padding: "80px 24px 0", textAlign: "center" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "9999px", padding: "6px 14px", marginBottom: "28px" }}>
          <Leaf size={12} color="#10B981" />
          <span style={{ fontSize: "12px", color: "#10B981", fontWeight: 600 }}>Now tracking 2M+ tonnes of CO2 across 800 companies</span>
        </div>
        <h1 style={{ fontSize: "clamp(36px, 5.5vw, 62px)", fontWeight: 800, color: "#0D0D0C", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "20px" }}>
          Your carbon footprint,
          <span style={{ color: "#10B981" }}> measured.</span>
        </h1>
        <p style={{ fontSize: "17px", color: "#737370", lineHeight: 1.65, marginBottom: "36px", maxWidth: "520px", margin: "0 auto 36px" }}>
          Track emissions across Scope 1, 2, and 3. Automated data collection, audit-ready reports, and actionable reduction roadmaps.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "20px" }}>
          <a href="#" onClick={e => e.preventDefault()} style={{ background: "#10B981", color: "#fff", padding: "12px 24px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            Start free trial <ArrowRight size={14} />
          </a>
          <a href="#" onClick={e => e.preventDefault()} style={{ background: "#fff", color: "#0D0D0C", border: "1px solid rgba(0,0,0,0.1)", padding: "12px 24px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Book a demo
          </a>
        </div>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginBottom: "64px" }}>
          {["No credit card required","SOC 2 compliant","Cancel anytime"].map(item => (
            <span key={item} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#737370" }}>
              <Check size={12} color="#16A34A" /> {item}
            </span>
          ))}
        </div>
        {/* Dashboard preview */}
        <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "16px 16px 0 0", padding: "16px", boxShadow: "0 -4px 40px rgba(16,185,129,0.08)", textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF5F57" }} />
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FFBD2E" }} />
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28C840" }} />
            <span style={{ fontSize: "11px", color: "#A3A39D", marginLeft: "8px", fontFamily: mono }}>climatebridge.io/dashboard</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "12px", height: "220px" }}>
            <div style={{ background: "#F8F8F7", borderRadius: "8px", padding: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "#10B981", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Leaf size={12} color="#fff" />
                </div>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#0D0D0C" }}>ClimateBridge</span>
              </div>
              {["Overview","Emissions","Reductions","Reports","Settings"].map((item, i) => (
                <div key={i} style={{ padding: "6px 8px", borderRadius: "6px", marginBottom: "2px", background: i === 0 ? "#10B981" : "transparent", fontSize: "11px", color: i === 0 ? "#fff" : "#737370", fontWeight: i === 0 ? 600 : 400 }}>{item}</div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                {[
                  { label: "Total CO2 (t)", value: "14,280", change: "-12%", color: "#10B981" },
                  { label: "Scope 3", value: "9,140", change: "-8%", color: "#10B981" },
                  { label: "Reduction Target", value: "72%", change: "on track", color: "#F59E0B" },
                ].map(s => (
                  <div key={s.label} style={{ background: "#F8F8F7", borderRadius: "8px", padding: "10px 12px" }}>
                    <div style={{ fontSize: "10px", color: "#A3A39D", marginBottom: "4px" }}>{s.label}</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                      <span style={{ fontSize: "18px", fontWeight: 700, color: "#0D0D0C" }}>{s.value}</span>
                      <span style={{ fontSize: "10px", fontWeight: 600, color: s.color }}>{s.change}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ flex: 1, background: "#F8F8F7", borderRadius: "8px", padding: "12px", position: "relative", overflow: "hidden" }}>
                <div style={{ fontSize: "10px", color: "#A3A39D", marginBottom: "8px" }}>Emissions Trend — Last 12 Months</div>
                <svg viewBox="0 0 400 80" style={{ width: "100%", height: "60px" }}>
                  <defs>
                    <linearGradient id="chartGreen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,20 Q50,25 100,30 T200,45 T300,55 T400,65 V80 H0 Z" fill="url(#chartGreen)" />
                  <path d="M0,20 Q50,25 100,30 T200,45 T300,55 T400,65" fill="none" stroke="#10B981" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 4. Restaurant — Saffron Kitchen ────────────────────────── */
export function HeroCreativeStudio() {
  return (
    <section style={{ fontFamily: sans, background: "#1A0F0A", minHeight: "90vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "radial-gradient(ellipse at 50% 30%, rgba(204,120,50,0.12) 0%, transparent 60%)" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: "680px" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(204,120,50,0.7)", marginBottom: "24px", fontWeight: 500 }}>
          Est. 2018 · Bangalore
        </p>
        <h1 style={{ fontSize: "clamp(52px, 8vw, 96px)", fontWeight: 300, color: "#F5E6D3", letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: "24px", fontFamily: serif, fontStyle: "italic" }}>
          Saffron<br />Kitchen
        </h1>
        <div style={{ height: "1px", width: "48px", background: "rgba(204,120,50,0.5)", margin: "0 auto 24px" }} />
        <p style={{ fontSize: "17px", color: "rgba(245,230,211,0.55)", lineHeight: 1.75, marginBottom: "40px", maxWidth: "440px", margin: "0 auto 40px" }}>
          Modern Indian cuisine rooted in tradition. Seasonal tasting menus, craft cocktails, and an experience designed for all senses.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "48px" }}>
          <a href="#" onClick={e => e.preventDefault()} style={{ background: "rgba(204,120,50,0.15)", color: "#CC7832", border: "1px solid rgba(204,120,50,0.3)", padding: "14px 28px", borderRadius: "9999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Reserve a Table
          </a>
          <a href="#" onClick={e => e.preventDefault()} style={{ background: "transparent", color: "rgba(245,230,211,0.6)", border: "1px solid rgba(245,230,211,0.15)", padding: "14px 28px", borderRadius: "9999px", fontSize: "14px", fontWeight: 500, textDecoration: "none" }}>
            View Menu
          </a>
        </div>
        <div style={{ display: "flex", gap: "40px", justifyContent: "center" }}>
          {[
            { val: "4.8★", label: "Google Reviews" },
            { val: "#3", label: "Bangalore Top 50" },
            { val: "200+", label: "Seats nightly" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "20px", fontWeight: 700, color: "#CC7832" }}>{s.val}</div>
              <div style={{ fontSize: "11px", color: "rgba(245,230,211,0.4)", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 5. Enterprise ──────────────────────────────────────────── */
export function HeroEnterprise() {
  return (
    <section style={{ background: "#fff", fontFamily: sans, padding: "80px 0" }}>
      <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
          <div style={{ width: "6px", height: "6px", background: "#16A34A", borderRadius: "50%" }} />
          <span style={{ fontSize: "12px", color: "#525250", fontWeight: 500 }}>SOC 2 Type II · ISO 27001 · GDPR Compliant</span>
        </div>
        <div style={{ maxWidth: "680px", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "clamp(32px, 4.5vw, 54px)", fontWeight: 700, color: "#0D0D0C", letterSpacing: "-0.025em", lineHeight: 1.15, marginBottom: "20px" }}>
            Enterprise-grade design infrastructure for modern organizations.
          </h1>
          <p style={{ fontSize: "16px", color: "#525250", lineHeight: 1.7 }}>
            Meridian Systems delivers enterprise-grade design infrastructure, brand operations, and digital products built for security, scalability, and compliance across global teams.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px", marginBottom: "56px" }}>
          <a href="#" onClick={e => e.preventDefault()} style={{ background: "#0D0D0C", color: "#fff", padding: "12px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Request a Demo
          </a>
          <a href="#" onClick={e => e.preventDefault()} style={{ background: "#F3F3F1", color: "#0D0D0C", border: "1px solid rgba(0,0,0,0.1)", padding: "12px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Download Capabilities Deck
          </a>
        </div>
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)", paddingTop: "32px" }}>
          <p style={{ fontSize: "11px", color: "#A3A39D", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "20px" }}>
            Trusted by enterprise teams at
          </p>
          <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", alignItems: "center" }}>
            {["Atlas Corp","Vertex Holdings","Horizon Health","Quantum Industries","Stratos Group","Pinnacle Finance"].map(n => (
              <span key={n} style={{ fontSize: "15px", fontWeight: 700, color: "#CBCBC6", letterSpacing: "-0.01em" }}>{n}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 6. Luxury ──────────────────────────────────────────────── */
export function HeroLuxury() {
  return (
    <section style={{ background: "#13120F", minHeight: "90vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 60%)" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <p style={{ fontFamily: sans, fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(201,168,76,0.7)", marginBottom: "40px", fontWeight: 400 }}>
          Atelier · Since 2019
        </p>
        <h1 style={{ fontFamily: serif, fontSize: "clamp(52px, 7vw, 100px)", fontWeight: 300, color: "#F0EAD6", letterSpacing: "0.02em", lineHeight: 1.05, marginBottom: "32px" }}>
          Maison<br /><em style={{ fontStyle: "italic", fontWeight: 300 }}>Aurélien</em>
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "20px", justifyContent: "center", marginBottom: "32px" }}>
          <div style={{ height: "1px", width: "60px", background: "rgba(201,168,76,0.5)" }} />
          <span style={{ fontFamily: serif, fontSize: "13px", color: "rgba(240,234,214,0.5)", letterSpacing: "0.12em", textTransform: "uppercase", fontStyle: "italic" }}>Premium Creative Services</span>
          <div style={{ height: "1px", width: "60px", background: "rgba(201,168,76,0.5)" }} />
        </div>
        <p style={{ fontFamily: serif, fontSize: "17px", color: "rgba(240,234,214,0.55)", lineHeight: 1.8, fontStyle: "italic", maxWidth: "440px", margin: "0 auto 48px" }}>
          Bespoke brand identities and digital experiences crafted for discerning clients who understand the value of excellence.
        </p>
        <a href="#" onClick={e => e.preventDefault()} style={{ fontFamily: sans, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,168,76,0.9)", fontWeight: 500, borderBottom: "1px solid rgba(201,168,76,0.4)", paddingBottom: "3px", textDecoration: "none" }}>
          Request a Consultation
        </a>
      </div>
    </section>
  );
}

/* ── 7. Startup ─────────────────────────────────────────────── */
export function HeroStartup() {
  return (
    <section style={{ background: "linear-gradient(135deg, #4F35D8 0%, #7C3AED 40%, #BE185D 100%)", minHeight: "80vh", display: "flex", alignItems: "center", fontFamily: sans, padding: "80px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "9999px", padding: "6px 16px", marginBottom: "28px" }}>
          <Zap size={12} color="#fff" />
          <span style={{ fontSize: "12px", color: "#fff", fontWeight: 600 }}>Just launched — 500 spots remaining</span>
        </div>
        <h1 style={{ fontSize: "clamp(38px, 6vw, 72px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.035em", lineHeight: 1.08, marginBottom: "20px" }}>
          Go from idea to
          <br />launched in <span style={{ textDecoration: "underline", textDecorationStyle: "wavy", textDecorationColor: "rgba(255,255,255,0.4)" }}>4 weeks.</span>
        </h1>
        <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, marginBottom: "36px" }}>
          Brand, product, and launch — all done for you. We've helped 80+ founders look like market leaders from day one.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "28px" }}>
          <a href="#" onClick={e => e.preventDefault()} style={{ background: "#fff", color: "#4F35D8", padding: "14px 32px", borderRadius: "12px", fontSize: "15px", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            Start Building <ArrowRight size={16} />
          </a>
          <a href="#" onClick={e => e.preventDefault()} style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", padding: "14px 28px", borderRadius: "12px", fontSize: "15px", fontWeight: 600, textDecoration: "none" }}>
            View pricing
          </a>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
          <div style={{ display: "flex" }}>
            {["SC","MW","PN","KT"].map((i,idx) => (
              <div key={i} style={{ width: "28px", height: "28px", borderRadius: "50%", background: `hsl(${idx*60+200},60%,60%)`, border: "2px solid rgba(255,255,255,0.4)", marginLeft: idx > 0 ? "-8px" : "0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", color: "#fff", fontWeight: 700 }}>{i}</div>
            ))}
          </div>
          <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>
            <strong style={{ color: "#fff" }}>2,400+</strong> teams already onboarded
          </span>
        </div>
      </div>
    </section>
  );
}

/* ── 8. Music Label — Resonance Records ────────────────────── */
export function HeroModernTech() {
  return (
    <section style={{ background: "#0C0A1A", minHeight: "90vh", display: "flex", alignItems: "center", fontFamily: sans, padding: "80px 40px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: "-100px", left: "-100px", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)" }} />
      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center", position: "relative", zIndex: 1 }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.25)", borderRadius: "9999px", padding: "6px 14px", marginBottom: "28px" }}>
            <span style={{ fontSize: "12px", color: "#A855F7", fontWeight: 600 }}>🎧 Now signing — 2026 roster</span>
          </div>
          <h1 style={{ fontSize: "clamp(44px, 6vw, 72px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "20px" }}>
            Sound that<br />
            <span style={{ background: "linear-gradient(135deg, #A855F7, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>moves people.</span>
          </h1>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "36px", maxWidth: "420px" }}>
            Independent record label, artist management, and music publishing. We develop talent and distribute sound worldwide.
          </p>
          <div style={{ display: "flex", gap: "12px", marginBottom: "48px" }}>
            <a href="#" onClick={e => e.preventDefault()} style={{ background: "linear-gradient(135deg, #A855F7, #7C3AED)", color: "#fff", padding: "14px 28px", borderRadius: "9999px", fontSize: "14px", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              Listen Now <ArrowRight size={14} />
            </a>
            <a href="#" onClick={e => e.preventDefault()} style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)", padding: "14px 28px", borderRadius: "9999px", fontSize: "14px", fontWeight: 500, textDecoration: "none" }}>
              Submit a Demo
            </a>
          </div>
          <div style={{ display: "flex", gap: "32px" }}>
            {[
              { val: "120+", label: "Artists" },
              { val: "2B+", label: "Streams" },
              { val: "35", label: "Countries" },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: "22px", fontWeight: 800, color: "#fff" }}>{s.val}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "relative" }}>
          {/* Now Playing card */}
          <div style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "24px", maxWidth: "360px", marginLeft: "auto" }}>
            <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
              <div style={{ width: "80px", height: "80px", borderRadius: "12px", overflow: "hidden", flexShrink: 0 }}>
                <img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=200&fit=crop" alt="Album art" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>Now Playing</div>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>Midnight Frequencies</div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>Anaya Rao · debut EP</div>
              </div>
            </div>
            {/* Progress bar */}
            <div style={{ height: "3px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", marginBottom: "16px" }}>
              <div style={{ height: "100%", width: "65%", background: "linear-gradient(90deg, #A855F7, #EC4899)", borderRadius: "2px" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: mono, fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>2:14 / 3:28</span>
              <div style={{ display: "flex", gap: "20px" }}>
                <span style={{ color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>⏮</span>
                <span style={{ color: "#fff", cursor: "pointer", fontSize: "18px" }}>▶</span>
                <span style={{ color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>⏭</span>
              </div>
            </div>
          </div>
          {/* Release cards */}
          <div style={{ display: "flex", gap: "12px", marginTop: "16px", marginRight: "0" }}>
            {[
              { title: "Velvet Dusk", artist: "Kai Summers", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop" },
              { title: "Glass Echoes", artist: "The Nighthaus", img: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop" },
            ].map(r => (
              <div key={r.title} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "12px", flex: 1 }}>
                <div style={{ width: "100%", height: "60px", borderRadius: "8px", overflow: "hidden", marginBottom: "8px" }}>
                  <img src={r.img} alt={r.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#fff" }}>{r.title}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>{r.artist}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 9. Fitness — Pulse Fitness ─────────────────────────────── */
export function HeroBrutalist() {
  return (
    <section style={{ background: "#0A0A0A", fontFamily: sans, minHeight: "90vh", display: "flex", alignItems: "center", padding: "80px 40px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-200px", right: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, transparent 70%)" }} />
      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center", position: "relative", zIndex: 1 }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "9999px", padding: "6px 14px", marginBottom: "28px" }}>
            <span style={{ fontSize: "12px", color: "#EF4444", fontWeight: 600 }}>🔥 New — Join 1,200+ members</span>
          </div>
          <h1 style={{ fontSize: "clamp(44px, 6vw, 72px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "20px", textTransform: "uppercase" }}>
            Train<br />
            <span style={{ color: "#EF4444" }}>Harder.</span><br />
            Recover<br />
            Smarter.
          </h1>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "36px", maxWidth: "400px" }}>
            Personal training, group classes, and recovery protocols — all under one roof. Science-backed coaching for people who take results seriously.
          </p>
          <div style={{ display: "flex", gap: "12px", marginBottom: "48px" }}>
            <a href="#" onClick={e => e.preventDefault()} style={{ background: "#EF4444", color: "#fff", padding: "14px 28px", borderRadius: "8px", fontSize: "14px", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              Start Free Trial <ArrowRight size={14} />
            </a>
            <a href="#" onClick={e => e.preventDefault()} style={{ background: "transparent", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.15)", padding: "14px 28px", borderRadius: "8px", fontSize: "14px", fontWeight: 500, textDecoration: "none" }}>
              View Classes
            </a>
          </div>
          <div style={{ display: "flex", gap: "32px" }}>
            {[
              { val: "50k", label: "Sessions/Month" },
              { val: "98%", label: "Retention" },
              { val: "4.9★", label: "App Rating" },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: "22px", fontWeight: 800, color: "#fff" }}>{s.val}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ width: "100%", height: "480px", borderRadius: "16px", overflow: "hidden", position: "relative" }}>
            <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop" alt="Gym interior" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: "20px", left: "20px", right: "20px", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", borderRadius: "12px", padding: "16px 20px", display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>Next: HIIT Circuit</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>6:30 PM · Coach Priya</div>
              </div>
              <div style={{ background: "#EF4444", borderRadius: "8px", padding: "8px 14px", display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#fff" }}>Join</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 10. High-End Portfolio ─────────────────────────────────── */
export function HeroHighEndPortfolio() {
  return (
    <section style={{ fontFamily: sans, position: "relative", overflow: "hidden" }}>
      {/* Full-bleed visual */}
      <div style={{ height: "65vh", background: "linear-gradient(160deg, #1A1A2E 0%, #16213E 40%, #0F3460 100%)", position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "48px 48px 40px" }}>
        <div style={{ position: "absolute", top: "24px", left: "48px", right: "48px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Atelier Noir</span>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.14em", textTransform: "uppercase" }}>2019 — Present</span>
        </div>
        <div>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "16px" }}>Selected Work · 2025</p>
          <h1 style={{ fontSize: "clamp(40px, 6.5vw, 80px)", fontWeight: 200, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.05, maxWidth: "700px" }}>
            Vesper & Co. —<br />Editorial & Campaign
          </h1>
        </div>
      </div>
      {/* Below fold */}
      <div style={{ background: "#FAFAF9", padding: "40px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <div style={{ display: "flex", gap: "48px" }}>
            {["01 / 06","Editorial","Campaign","2025"].map(m => (
            <span key={m} style={{ fontSize: "12px", color: "#A3A39D", letterSpacing: "0.06em" }}>{m}</span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "12px", color: "#525250" }}>Scroll to explore</span>
          <ChevronDown size={14} color="#525250" />
        </div>
      </div>
    </section>
  );
}
