import { Twitter, Linkedin, Instagram, Github, ArrowRight, ArrowUpRight, Leaf } from "lucide-react";

const serif = "'Cormorant Garamond', Georgia, serif";
const mono = "'JetBrains Mono', monospace";
const sans = "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif";

const socials = [{ icon: Twitter, label:"Twitter" }, { icon: Linkedin, label:"LinkedIn" }, { icon: Instagram, label:"Instagram" }];

type FooterNav = [string, string[]][];

const editorialNav: FooterNav = [["News",["Politics","Business","Culture","Technology","Science"]],["Subscribe",["Digital","Print","Corporate","Student"]],["About",["Our Team","Ethics Policy","Corrections","Careers"]],["Connect",["Newsletter","Twitter","LinkedIn","Contact"]]];
const saasNav: FooterNav = [["Product",["Components","Themes","Figma Plugin","Changelog","Pricing"]],["Resources",["Documentation","Tutorials","Blog","Community","Support"]],["Company",["About","Careers","Press","Contact","Legal"]]];
const enterpriseNav: FooterNav = [["Product",["Cloud Platform","Compliance Hub","Analytics Suite","Integrations","Pricing"]],["Resources",["Documentation","API Reference","Status Page","Changelog","Security"]],["Company",["About","Careers","Partners","Press","Legal"]],["Contact",["hello@meridian.systems","Schedule a call","Partner program"]]];
const luxuryNav: FooterNav = [["Collections",["Bespoke","Ready-to-Wear","Accessories","Fragrances","Interior"]],["Maison",["Heritage","Atelier","Craftsmanship","Appointments","Press"]],["Client Care",["Shipping","Returns","Care Guide","Contact","Size Guide"]]];
const startupNav: FooterNav = [["Program",["4-Week Sprint","Pricing","Success Stories","Apply Now"]],["Resources",["Blog","Playbook","Investor Network","Community"]],["Company",["About","Team","Careers","Contact","Legal"]]];
const musicNav: FooterNav = [["Artists",["Riya Desai","Vikram Solar","The Collective","Aarav Mehta","Zara Khan"]],["Label",["About","Roster","Studio","Publishing","Distribution"]],["Connect",["Submit Demo","Press","Events","Contact","Careers"]]];

/* ── 1. Minimal ─────────────────────────────────────────────── */
export function FooterMinimal() {
  return (
    <footer style={{ background: "#FAFAF9", borderTop: "1px solid rgba(0,0,0,0.06)", padding: "48px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
        <span style={{ fontSize: "14px", fontWeight: 700, color: "#0D0D0C", letterSpacing: "-0.01em" }}>Mono Studio</span>
        <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
          {["Work","Services","Studio","Journal","Contact"].map(l => (
            <a key={l} href="#" onClick={e => e.preventDefault()} style={{ fontSize: "13px", color: "#737370", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
        <span style={{ fontSize: "12px", color: "#A3A39D" }}>© 2026 Mono Studio</span>
      </div>
    </footer>
  );
}

/* ── 2. Editorial ───────────────────────────────────────────── */
export function FooterEditorial() {
  return (
    <footer style={{ background: "#0D0D0C", fontFamily: sans }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "60px", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "clamp(52px, 8vw, 100px)", fontWeight: 800, color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.15)", letterSpacing: "-0.04em", lineHeight: 0.95, textTransform: "uppercase", marginBottom: "40px" }}>
            THE<br />CHRONICLE
          </h2>
          <div style={{ display: "flex", gap: "16px" }}>
            <a href="#" onClick={e => e.preventDefault()} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#F3F3F1", color: "#0D0D0C", padding: "12px 24px", fontSize: "13px", fontWeight: 700, textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Subscribe Now <ArrowRight size={13} />
            </a>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "32px", marginBottom: "48px" }}>
          {editorialNav.map(([group, links]) => (
            <div key={group}>
              <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}>{group}</p>
              {links.map(l => <a key={l} href="#" onClick={e => e.preventDefault()} style={{ display: "block", fontSize: "14px", color: "rgba(255,255,255,0.45)", textDecoration: "none", marginBottom: "8px" }}>{l}</a>)}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>
          <span>© 2026 The Chronicle. All rights reserved.</span>
          <span>WCAG AA · Accessible by design</span>
        </div>
      </div>
    </footer>
  );
}

/* ── 3. Premium SaaS ────────────────────────────────────────── */
export function FooterPremiumSaas() {
  return (
    <footer style={{ background: "#F8F8F7", borderTop: "1px solid rgba(0,0,0,0.07)", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 40px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "60px", marginBottom: "48px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <div style={{ width: "28px", height: "28px", background: "#10B981", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Leaf size={14} color="#fff" />
              </div>
              <span style={{ fontSize: "14px", fontWeight: 700, color: "#0D0D0C" }}>ClimateBridge</span>
            </div>
            <p style={{ fontSize: "13px", color: "#737370", lineHeight: 1.65, marginBottom: "20px" }}>Carbon tracking, reduction roadmaps, and compliance reporting for enterprises serious about sustainability.</p>
            <div style={{ display: "flex", gap: "8px" }}>
              {socials.map(({ icon: Icon, label }) => (
                <a key={label} href="#" onClick={e => e.preventDefault()} aria-label={label} style={{ width: "32px", height: "32px", background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
                  <Icon size={14} color="#525250" />
                </a>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }}>
            {saasNav.map(([group, links]) => (
              <div key={group}>
                <p style={{ fontSize: "11px", fontWeight: 600, color: "#A3A39D", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "12px" }}>{group}</p>
                {links.map(l => <a key={l} href="#" onClick={e => e.preventDefault()} style={{ display: "block", fontSize: "13px", color: "#525250", textDecoration: "none", marginBottom: "8px" }}>{l}</a>)}
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "12px", color: "#A3A39D" }}>© 2026 ClimateBridge. All rights reserved.</span>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "6px", height: "6px", background: "#22C55E", borderRadius: "50%" }} />
            <span style={{ fontSize: "12px", color: "#A3A39D" }}>SOC 2 compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── 4. Creative Studio ─────────────────────────────────────── */
export function FooterCreativeStudio() {
  return (
    <footer style={{ background: "#140C07", fontFamily: sans, borderTop: "1px solid rgba(204,120,50,0.1)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 40px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "64px" }}>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 300, color: "#F5E6D3", letterSpacing: "-0.02em", lineHeight: 1, fontStyle: "italic" }}>
            Let's dine<br /><span style={{ color: "#CC7832" }}>together.</span>
          </h2>
          <a href="#" onClick={e => e.preventDefault()} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(204,120,50,0.15)", color: "#CC7832", border: "1px solid rgba(204,120,50,0.3)", padding: "14px 28px", borderRadius: "9999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Reserve a table <ArrowRight size={14} />
          </a>
        </div>
        <div style={{ borderTop: "1px solid rgba(204,120,50,0.1)", paddingTop: "40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
          <div>
            <p style={{ fontSize: "12px", color: "rgba(245,230,211,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>Location</p>
            <p style={{ fontSize: "14px", color: "rgba(245,230,211,0.5)" }}>Fort, Mumbai, India</p>
            <p style={{ fontSize: "14px", color: "rgba(245,230,211,0.5)" }}>Open Tues–Sun, 6 PM–12 AM</p>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "24px", flexWrap: "wrap", alignItems: "flex-end" }}>
            {["Privacy","Terms","Accessibility"].map(l => (
              <a key={l} href="#" onClick={e => e.preventDefault()} style={{ fontSize: "12px", color: "rgba(245,230,211,0.3)", textDecoration: "none" }}>{l}</a>
            ))}
            <span style={{ fontSize: "12px", color: "rgba(245,230,211,0.2)" }}>© 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── 5. Enterprise ──────────────────────────────────────────── */
export function FooterEnterprise() {
  return (
    <footer style={{ background: "#fff", borderTop: "1px solid rgba(0,0,0,0.07)", fontFamily: sans }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 40px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "60px", marginBottom: "40px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <div style={{ width: "24px", height: "24px", background: "#0D0D0C", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#fff" }}>M</span>
              </div>
              <span style={{ fontSize: "14px", fontWeight: 700, color: "#0D0D0C" }}>Meridian Systems</span>
            </div>
            <p style={{ fontSize: "13px", color: "#737370", lineHeight: 1.65, marginBottom: "16px" }}>Enterprise-grade design infrastructure for modern organizations.</p>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {["SOC 2","ISO 27001","WCAG AA"].map(b => <span key={b} style={{ fontSize: "10px", color: "#525250", border: "1px solid rgba(0,0,0,0.1)", padding: "3px 8px", borderRadius: "4px", fontWeight: 500 }}>{b}</span>)}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px" }}>
            {enterpriseNav.map(([group, links]) => (
              <div key={group}>
                <p style={{ fontSize: "11px", fontWeight: 600, color: "#A3A39D", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "12px" }}>{group}</p>
                {links.map((l: string) => <a key={l} href="#" onClick={e => e.preventDefault()} style={{ display: "block", fontSize: "13px", color: "#525250", textDecoration: "none", marginBottom: "7px" }}>{l}</a>)}
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "20px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <span style={{ fontSize: "12px", color: "#A3A39D" }}>© 2026 Meridian Systems, Inc. All rights reserved.</span>
          <span style={{ fontSize: "12px", color: "#A3A39D" }}>Registered in the United States · Privacy Policy · Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}

/* ── 6. Luxury ──────────────────────────────────────────────── */
export function FooterLuxury() {
  return (
    <footer style={{ background: "#0C0B09", fontFamily: sans, borderTop: "1px solid rgba(201,168,76,0.15)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 48px 48px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "64px" }}>
          <div>
            <p style={{ fontFamily: serif, fontSize: "28px", fontWeight: 300, color: "#F0EAD6", letterSpacing: "0.04em", fontStyle: "italic", marginBottom: "8px" }}>Maison Aurélien</p>
            <p style={{ fontFamily: serif, fontSize: "12px", color: "rgba(201,168,76,0.5)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Atelier · Est. 2019</p>
          </div>
          <a href="#" onClick={e => e.preventDefault()} style={{ fontFamily: sans, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,168,76,0.7)", textDecoration: "none", borderBottom: "1px solid rgba(201,168,76,0.3)", paddingBottom: "3px" }}>
            Request Consultation
          </a>
        </div>
        <div style={{ borderTop: "1px solid rgba(201,168,76,0.1)", paddingTop: "40px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "40px", marginBottom: "48px" }}>
          {luxuryNav.map(([group, links]) => (
            <div key={group}>
              <p style={{ fontFamily: serif, fontSize: "11px", color: "rgba(201,168,76,0.5)", letterSpacing: "0.12em", textTransform: "uppercase", fontStyle: "italic", marginBottom: "16px" }}>{group}</p>
              {links.map(l => <a key={l} href="#" onClick={e => e.preventDefault()} style={{ display: "block", fontFamily: serif, fontSize: "15px", color: "rgba(240,234,214,0.45)", textDecoration: "none", marginBottom: "10px", fontStyle: "italic" }}>{l}</a>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(201,168,76,0.1)", paddingTop: "24px", display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontFamily: serif, fontSize: "12px", color: "rgba(240,234,214,0.25)", fontStyle: "italic" }}>© 2026 Maison Aurélien. All rights reserved.</span>
          <span style={{ fontFamily: serif, fontSize: "12px", color: "rgba(201,168,76,0.3)", fontStyle: "italic" }}>Crafted with precision</span>
        </div>
      </div>
    </footer>
  );
}

/* ── 7. Startup ─────────────────────────────────────────────── */
export function FooterStartup() {
  return (
    <footer style={{ background: "linear-gradient(180deg, #F2F0FF 0%, #fff 100%)", borderTop: "1px solid rgba(97,80,246,0.1)", fontFamily: sans, padding: "56px 40px 32px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "32px", flexWrap: "wrap", marginBottom: "48px" }}>
          <div style={{ maxWidth: "280px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <div style={{ width: "28px", height: "28px", background: "linear-gradient(135deg,#6150F6,#EC4899)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>L</span>
              </div>
              <span style={{ fontSize: "14px", fontWeight: 800, color: "#0D0D0C" }}>Launchpad ✦</span>
            </div>
            <p style={{ fontSize: "13px", color: "#737370", lineHeight: 1.65, marginBottom: "20px" }}>Your brand's best first impression. Go from idea to launch in 4 weeks.</p>
            <a href="#" onClick={e => e.preventDefault()} style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#6150F6", color: "#fff", padding: "8px 16px", borderRadius: "8px", fontSize: "12px", fontWeight: 700, textDecoration: "none" }}>
              Start free ✦ <ArrowRight size={12} />
            </a>
          </div>
          <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
            {startupNav.map(([group, links]) => (
              <div key={group}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#0D0D0C", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "12px" }}>{group}</p>
                {links.map(l => <a key={l} href="#" onClick={e => e.preventDefault()} style={{ display: "block", fontSize: "13px", color: "#737370", textDecoration: "none", marginBottom: "8px" }}>{l}</a>)}
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(97,80,246,0.08)", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <span style={{ fontSize: "12px", color: "#A3A39D" }}>© 2026 Launchpad</span>
          <div style={{ display: "flex", gap: "8px" }}>
            {socials.map(({ icon: Icon, label }) => (
              <a key={label} href="#" onClick={e => e.preventDefault()} aria-label={label} style={{ width: "28px", height: "28px", background: "#F2F0FF", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={13} color="#6150F6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── 8. Modern Tech — Resonance Records ──────────────────────── */
export function FooterModernTech() {
  return (
    <footer style={{ background: "#08080A", borderTop: "1px solid rgba(255,255,255,0.05)", fontFamily: sans }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 40px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "60px", marginBottom: "48px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div style={{ width: "28px", height: "28px", background: "#6150F6", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>R</span>
              </div>
              <span style={{ fontSize: "14px", fontWeight: 700, color: "#F3F3F1" }}>Resonance Records</span>
            </div>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", lineHeight: 1.8 }}>
              <span style={{ color: "#8C78FF" }}>Est.</span> 2020 · Independent Label<br />
              <span style={{ color: "#34D399" }}>●</span> Now accepting demos
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "32px" }}>
            {musicNav.map(([group, links]) => (
              <div key={group}>
                <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>{group}</p>
                {links.map(l => <a key={l} href="#" onClick={e => e.preventDefault()} style={{ display: "block", fontSize: "13px", color: "rgba(255,255,255,0.45)", textDecoration: "none", marginBottom: "8px" }}>{l}</a>)}
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "20px", display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>© 2026 Resonance Records</span>
          <div style={{ display: "flex", gap: "16px" }}>
            {socials.map(({ icon: Icon, label }) => (
              <a key={label} href="#" onClick={e => e.preventDefault()} aria-label={label} style={{ color: "rgba(255,255,255,0.25)" }}>
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── 9. Fitness — Pulse Fitness ─────────────────────────────── */
export function FooterBrutalist() {
  return (
    <footer style={{ background: "#0A0A0A", fontFamily: sans, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "64px 40px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: "48px", marginBottom: "48px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{ width: "32px", height: "32px", background: "#EF4444", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "14px", fontWeight: 900, color: "#fff" }}>P</span>
              </div>
              <span style={{ fontSize: "18px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>Pulse Fitness</span>
            </div>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: "280px" }}>
              Science-backed coaching, recovery protocols, and a community that pushes you to be your best.
            </p>
          </div>
          <div>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>Classes</p>
            {["HIIT Circuit","Strength Training","Yoga Flow","Boxing","Recovery Lab"].map(l => (
              <a key={l} href="#" onClick={e => e.preventDefault()} style={{ display: "block", fontSize: "13px", color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: "8px" }}>{l}</a>
            ))}
          </div>
          <div>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>Company</p>
            {["About","Coaches","Schedule","Pricing","Blog"].map(l => (
              <a key={l} href="#" onClick={e => e.preventDefault()} style={{ display: "block", fontSize: "13px", color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: "8px" }}>{l}</a>
            ))}
          </div>
          <div>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>Location</p>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
              42 Koramangala 5th Block<br />
              Bangalore 560095<br />
              <span style={{ color: "#EF4444" }}>Open 5AM — 11PM</span>
            </p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>© 2026 Pulse Fitness. All rights reserved.</span>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Instagram","YouTube","Twitter"].map(s => (
              <a key={s} href="#" onClick={e => e.preventDefault()} style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── 10. High-End Portfolio ─────────────────────────────────── */
export function FooterHighEndPortfolio() {
  return (
    <footer style={{ background: "#FAFAF9", borderTop: "1px solid rgba(0,0,0,0.07)", fontFamily: sans }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 48px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: "80px", marginBottom: "80px" }}>
          <div>
            <p style={{ fontFamily: serif, fontSize: "24px", fontWeight: 300, color: "#0D0D0C", letterSpacing: "0.02em", fontStyle: "italic", marginBottom: "16px" }}>Atelier Noir</p>
            <p style={{ fontSize: "14px", color: "#A3A39D", lineHeight: 1.7, maxWidth: "280px" }}>Fashion and editorial photography for luxury brands, magazines, and private commissions.</p>
          </div>
          <div>
            <p style={{ fontSize: "11px", color: "#A3A39D", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>Services</p>
            {["Editorial Shoots","Campaign Photography","Lookbook Direction","Fine Art Commissions","Print Editions"].map(l => (
              <a key={l} href="#" onClick={e => e.preventDefault()} style={{ display: "block", fontSize: "14px", color: "#525250", textDecoration: "none", marginBottom: "10px" }}>{l}</a>
            ))}
          </div>
          <div>
            <p style={{ fontSize: "11px", color: "#A3A39D", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>Studio</p>
            {["About","Archive","Journal","Enquiries","Press Kit"].map(l => (
              <a key={l} href="#" onClick={e => e.preventDefault()} style={{ display: "block", fontSize: "14px", color: "#525250", textDecoration: "none", marginBottom: "10px" }}>{l}</a>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)", paddingTop: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: serif, fontSize: "13px", color: "#A3A39D", fontStyle: "italic" }}>© 2026 Atelier Noir</span>
          <div style={{ display: "flex", gap: "24px" }}>
            {socials.map(({ icon: Icon, label }) => (
              <a key={label} href="#" onClick={e => e.preventDefault()} aria-label={label} style={{ color: "#CBCBC6" }}>
                <Icon size={16} />
              </a>
            ))}
          </div>
          <span style={{ fontFamily: serif, fontSize: "13px", color: "#A3A39D", fontStyle: "italic" }}>Paris · Mumbai</span>
        </div>
      </div>
    </footer>
  );
}
