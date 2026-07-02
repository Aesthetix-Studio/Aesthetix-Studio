import { ArrowRight, ArrowUpRight, Calendar, Check, Sparkles, Zap, Phone, Leaf } from "lucide-react";

const serif = "'Cormorant Garamond', Georgia, serif";
const mono = "'JetBrains Mono', monospace";
const sans = "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif";

/* ── 1. Minimal ─────────────────────────────────────────────── */
export function CTAMinimal() {
  return (
    <section style={{ background: "#FAFAF9", padding: "120px 48px", textAlign: "center", fontFamily: sans, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      <p style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A3A39D", marginBottom: "32px" }}>Get in touch</p>
      <p style={{ fontSize: "clamp(22px, 3.5vw, 40px)", fontWeight: 300, color: "#0D0D0C", letterSpacing: "-0.02em", lineHeight: 1.35, maxWidth: "560px", margin: "0 auto 48px" }}>
        Ready to build something worth talking about?
      </p>
      <a href="#" onClick={e => e.preventDefault()} style={{ fontSize: "13px", fontWeight: 500, color: "#0D0D0C", letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid #0D0D0C", paddingBottom: "3px", textDecoration: "none" }}>
        Begin a project
      </a>
    </section>
  );
}

/* ── 2. Editorial ───────────────────────────────────────────── */
export function CTAEditorial() {
  return (
    <section style={{ background: "#0D0D0C", fontFamily: sans }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
          <div style={{ borderRight: "1px solid rgba(255,255,255,0.1)", paddingRight: "60px" }}>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: "24px" }}>Subscribe now</span>
            <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, color: "#F3F3F1", letterSpacing: "-0.035em", lineHeight: 0.95, textTransform: "uppercase", marginBottom: "32px" }}>
              YOUR DAILY<br />READ<br /><span style={{ color: "#6150F6" }}>AWAITS.</span>
            </h2>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
              Join 12 million readers who start their morning with The Chronicle. Independent journalism that matters.
            </p>
          </div>
          <div style={{ paddingLeft: "60px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: "32px" }}>
              {[["12M","Readers"],["4,200","Articles"],["11yr","Publishing"]].map(([v,l]) => (
                <div key={l}>
                  <div style={{ fontSize: "28px", fontWeight: 800, color: "#F3F3F1", letterSpacing: "-0.02em" }}>{v}</div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <a href="#" onClick={e => e.preventDefault()} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#F3F3F1", color: "#0D0D0C", padding: "14px 28px", fontSize: "14px", fontWeight: 700, textDecoration: "none" }}>
                Subscribe Now <ArrowRight size={14} />
              </a>
              <a href="#" onClick={e => e.preventDefault()} style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)", padding: "14px 28px", fontSize: "14px", fontWeight: 500, textDecoration: "none" }}>
                Start Free Trial
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 3. Premium SaaS ────────────────────────────────────────── */
export function CTAPremiumSaas() {
  return (
    <section style={{ background: "linear-gradient(160deg, #ECFDF5 0%, #D1FAE5 40%, #fff 100%)", padding: "80px 40px", textAlign: "center", fontFamily: sans }}>
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "9999px", padding: "5px 14px", fontSize: "12px", color: "#10B981", fontWeight: 600, marginBottom: "24px" }}>
          <Leaf size={12} /> Start tracking in under a week
        </span>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#0D0D0C", letterSpacing: "-0.025em", lineHeight: 1.15, marginBottom: "16px" }}>
          Ready to measure your impact?
        </h2>
        <p style={{ fontSize: "16px", color: "#737370", lineHeight: 1.65, marginBottom: "32px" }}>
          Join 800+ companies that chose ClimateBridge for their sustainability journey.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "20px" }}>
          <a href="#" onClick={e => e.preventDefault()} style={{ background: "#10B981", color: "#fff", padding: "13px 28px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", boxShadow: "0 8px 24px rgba(16,185,129,0.28)" }}>
            Start Free Trial
          </a>
          <a href="#" onClick={e => e.preventDefault()} style={{ background: "#fff", color: "#0D0D0C", border: "1px solid rgba(0,0,0,0.1)", padding: "13px 24px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Book a Demo
          </a>
        </div>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          {["No credit card required","SOC 2 compliant","Cancel anytime"].map(t => (
            <span key={t} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "#737370" }}>
              <Check size={11} color="#16A34A" /> {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 4. Creative Studio ─────────────────────────────────────── */
export function CTACreativeStudio() {
  return (
    <section style={{ background: "#1A0F0A", padding: "80px 40px", fontFamily: sans, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "360px", height: "360px", background: "radial-gradient(circle, rgba(204,120,50,0.08) 0%, transparent 70%)", borderRadius: "50%" }} />
      <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "280px", height: "280px", background: "radial-gradient(circle, rgba(204,120,50,0.06) 0%, transparent 70%)", borderRadius: "50%" }} />
      <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <h2 style={{ fontFamily: serif, fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300, color: "#F5E6D3", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "20px", fontStyle: "italic" }}>
          Your table is waiting.
        </h2>
        <p style={{ fontSize: "17px", color: "rgba(245,230,211,0.5)", lineHeight: 1.65, marginBottom: "40px" }}>
          Whether it's a weeknight dinner or a celebration, we'll make it unforgettable. Reserve your spot today.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <a href="#" onClick={e => e.preventDefault()} style={{ background: "rgba(204,120,50,0.15)", color: "#CC7832", border: "1px solid rgba(204,120,50,0.3)", padding: "14px 32px", borderRadius: "9999px", fontSize: "14px", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            Reserve a Table <ArrowRight size={14} />
          </a>
          <a href="#" onClick={e => e.preventDefault()} style={{ color: "rgba(245,230,211,0.5)", fontSize: "14px", fontWeight: 400, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", borderBottom: "1px solid rgba(204,120,50,0.2)", paddingBottom: "3px" }}>
            View our menu <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── 5. Enterprise ──────────────────────────────────────────── */
export function CTAEnterprise() {
  return (
    <section style={{ background: "#F8F8F7", padding: "80px 40px", fontFamily: sans, borderTop: "1px solid rgba(0,0,0,0.07)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "16px", padding: "48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A3A39D", marginBottom: "16px" }}>Enterprise Engagement</p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "#0D0D0C", letterSpacing: "-0.02em", lineHeight: 1.25, marginBottom: "16px" }}>
              Ready for enterprise-grade design services?
            </h2>
            <p style={{ fontSize: "15px", color: "#737370", lineHeight: 1.65 }}>
              Our enterprise team works with organizations requiring dedicated support, SLAs, and multi-stakeholder workflows.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <a href="#" onClick={e => e.preventDefault()} style={{ display: "flex", alignItems: "center", gap: "12px", background: "#0D0D0C", color: "#fff", padding: "16px 20px", borderRadius: "10px", textDecoration: "none" }}>
              <Calendar size={18} />
              <div>
                <div style={{ fontSize: "14px", fontWeight: 700 }}>Schedule a Demo</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", marginTop: "1px" }}>45-min enterprise walkthrough</div>
              </div>
              <ArrowRight size={16} style={{ marginLeft: "auto", opacity: 0.5 }} />
            </a>
            <a href="#" onClick={e => e.preventDefault()} style={{ display: "flex", alignItems: "center", gap: "12px", background: "#F3F3F1", color: "#0D0D0C", padding: "16px 20px", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.08)", textDecoration: "none" }}>
              <Phone size={18} color="#525250" />
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600 }}>Contact Sales</div>
                <div style={{ fontSize: "12px", color: "#A3A39D", marginTop: "1px" }}>Discuss custom pricing & SLAs</div>
              </div>
              <ArrowRight size={16} style={{ marginLeft: "auto", opacity: 0.3 }} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 6. Luxury ──────────────────────────────────────────────── */
export function CTALuxury() {
  return (
    <section style={{ background: "#13120F", padding: "120px 48px", textAlign: "center", fontFamily: sans }}>
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>
        <div style={{ height: "1px", width: "40px", background: "rgba(201,168,76,0.4)", margin: "0 auto 40px" }} />
        <h2 style={{ fontFamily: serif, fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300, color: "#F0EAD6", letterSpacing: "0.04em", lineHeight: 1.3, fontStyle: "italic", marginBottom: "24px" }}>
          Reserve your consultation.
        </h2>
        <p style={{ fontFamily: serif, fontSize: "16px", color: "rgba(240,234,214,0.5)", lineHeight: 1.75, fontStyle: "italic", marginBottom: "48px" }}>
          We accept a limited number of new commissions each season. Begin with a private consultation.
        </p>
        <a href="#" onClick={e => e.preventDefault()} style={{ fontFamily: sans, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,168,76,0.9)", fontWeight: 500, borderBottom: "1px solid rgba(201,168,76,0.3)", paddingBottom: "4px", textDecoration: "none" }}>
          Request a Private Consultation
        </a>
        <div style={{ height: "1px", width: "40px", background: "rgba(201,168,76,0.4)", margin: "40px auto 0" }} />
      </div>
    </section>
  );
}

/* ── 7. Startup ─────────────────────────────────────────────── */
export function CTAStartup() {
  return (
    <section style={{ background: "linear-gradient(135deg,#4F35D8 0%,#7C3AED 50%,#BE185D 100%)", padding: "80px 40px", textAlign: "center", fontFamily: sans }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "9999px", padding: "5px 14px", fontSize: "12px", color: "#fff", fontWeight: 600, marginBottom: "24px" }}>
          <Zap size={12} /> Limited spots — Q3 2026
        </span>
        <h2 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "16px" }}>
          Your best investment
          <br />starts with a call.
        </h2>
        <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: "36px" }}>
          30 minutes. No pitch. Just a real conversation about your goals. We'll tell you honestly if we can help.
        </p>
        <a href="#" onClick={e => e.preventDefault()} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff", color: "#4F35D8", padding: "15px 36px", borderRadius: "12px", fontSize: "15px", fontWeight: 700, textDecoration: "none" }}>
          Book Free Discovery Call <ArrowRight size={16} />
        </a>
        <p style={{ marginTop: "16px", fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
          Usually responds within 4 hours · No obligation
        </p>
      </div>
    </section>
  );
}

/* ── 8. Modern Tech — Resonance Records ──────────────────────── */
export function CTAModernTech() {
  return (
    <section style={{ background: "#08080A", padding: "80px 40px", fontFamily: sans, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "300px", background: "radial-gradient(ellipse, rgba(97,80,246,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <p style={{ fontSize: "12px", color: "#6150F6", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "24px" }}>
          Now Playing
        </p>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "#F3F3F1", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "16px" }}>
          Ready to <span style={{ color: "#8C78FF" }}>release</span> your sound?
        </h2>
        <p style={{ fontSize: "16px", color: "rgba(243,243,241,0.5)", lineHeight: 1.65, marginBottom: "36px" }}>
          We sign artists who push boundaries. If your music has a vision, we want to hear it.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <a href="#" onClick={e => e.preventDefault()} style={{ background: "#6150F6", color: "#fff", padding: "12px 28px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", boxShadow: "0 0 24px rgba(97,80,246,0.35)" }}>
            Submit a Demo <ArrowRight size={14} />
          </a>
          <a href="#" onClick={e => e.preventDefault()} style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)", padding: "12px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: 500, textDecoration: "none" }}>
            View roster ↗
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── 9. Fitness — Pulse Fitness ─────────────────────────────── */
export function CTABrutalist() {
  return (
    <section style={{ background: "#0A0A0A", fontFamily: sans, padding: "80px 40px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(239,68,68,0.1) 0%, transparent 70%)" }} />
      <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>Ready to start?</p>
        <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "20px" }}>
          Your first class is <span style={{ color: "#EF4444" }}>free.</span>
        </h2>
        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "36px", maxWidth: "480px", margin: "0 auto 36px" }}>
          Walk in, try a class, and see if Pulse is right for you. No commitment, no pressure.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <a href="#" onClick={e => e.preventDefault()} style={{ background: "#EF4444", color: "#fff", padding: "14px 32px", borderRadius: "8px", fontSize: "14px", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            Book Free Class <ArrowRight size={14} />
          </a>
          <a href="#" onClick={e => e.preventDefault()} style={{ background: "transparent", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.15)", padding: "14px 28px", borderRadius: "8px", fontSize: "14px", fontWeight: 500, textDecoration: "none" }}>
            View Schedule
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── 10. High-End Portfolio ─────────────────────────────────── */
export function CTAHighEndPortfolio() {
  return (
    <section style={{ background: "#0D0D0C", padding: "96px 48px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "96px", alignItems: "end" }}>
          <div>
            <p style={{ fontFamily: serif, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontStyle: "italic", marginBottom: "24px" }}>
              Bookings
            </p>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 300, color: "#F0EAD6", letterSpacing: "-0.01em", lineHeight: 1.15, fontStyle: "italic" }}>
              Let's create something<br />worth framing.
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
              Noir accepts a limited number of commissions each quarter. Enquire to check availability for editorial, campaign, or private commissions.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <a href="#" onClick={e => e.preventDefault()} style={{ background: "#F0EAD6", color: "#0D0D0C", padding: "13px 28px", fontSize: "13px", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                Request a Booking <ArrowRight size={13} />
              </a>
              <a href="#" onClick={e => e.preventDefault()} style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", fontWeight: 400, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: "2px" }}>
                View the archive
              </a>
            </div>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)" }}>
              Q3 2026 · 2 slots remaining
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
