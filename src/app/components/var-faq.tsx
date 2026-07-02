import { useState } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const serif = "'Cormorant Garamond', Georgia, serif";
const mono = "'JetBrains Mono', monospace";
const sans = "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif";

function Accordion({ items, theme = "light" }: { items: { q: string; a: string }[]; theme?: "light" | "dark" }) {
  const [open, setOpen] = useState<number | null>(0);
  const isDark = theme === "dark";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)"}` }}>
          <button
            style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", background: "none", border: "none", cursor: "pointer", gap: "24px", textAlign: "left" }}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span style={{ fontSize: "15px", fontWeight: 500, color: isDark ? "#F3F3F1" : "#0D0D0C", flex: 1, lineHeight: 1.4 }}>{item.q}</span>
            <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ flexShrink: 0 }}>
              <ChevronDown size={16} color={isDark ? "rgba(255,255,255,0.4)" : "#A3A39D"} />
            </motion.div>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.2 }} style={{ overflow: "hidden" }}>
                <p style={{ fontSize: "14px", color: isDark ? "rgba(255,255,255,0.5)" : "#737370", lineHeight: 1.75, paddingBottom: "20px" }}>{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/* ── 1. Minimal — Mono Studio ───────────────────────────────── */
export function FAQMinimal() {
  const items = [
    { q:"How long does a typical branding project take?", a:"A focused brand identity project takes 4–6 weeks. Website design runs 6–10 weeks. We always share a milestone schedule at kickoff." },
    { q:"Do you work with businesses without an existing brand?", a:"Yes — and it's ideal. We can build everything from the right foundation, rather than retrofitting a brand onto an existing presence." },
    { q:"What's included in a brand identity project?", a:"Logo system, color palette, typography, brand guidelines, collateral templates, and a brand deck. Source files are always included." },
    { q:"Do you offer monthly retainer arrangements?", a:"Yes. Many clients move to a monthly retainer after their initial project for ongoing design, new materials, and iteration." },
    { q:"How do revisions work?", a:"Each package includes a defined number of revision rounds at structured checkpoints. Feedback stays focused and efficient." },
  ];
  return (
    <section style={{ background: "#FAFAF9", padding: "96px 48px", fontFamily: sans }}>
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A3A39D", marginBottom: "48px" }}>FAQ</p>
        <Accordion items={items} theme="light" />
      </div>
    </section>
  );
}

/* ── 2. Editorial — The Chronicle ───────────────────────────── */
export function FAQEditorial() {
  const items = [
    { q:"How do I subscribe to The Chronicle?", a:"Visit our subscribe page and choose a plan. Digital access starts at ₹299/month. Annual plans save 20%. Student and educator discounts are available." },
    { q:"Can I republish Chronicle articles?", a:"Republication requires a syndication license. Contact our rights team for pricing. Brief excerpts with attribution are permitted under fair use." },
    { q:"How do I submit a pitch or op-ed?", a:"Email our editors with a 200-word summary of your piece. We respond within 5 business days. Exclusive pitches are prioritized." },
    { q:"Do you offer corporate subscriptions?", a:"Yes. Teams of 10+ get discounted rates, shared reading lists, and a dedicated account manager. Contact us for a custom quote." },
    { q:"What formats are available?", a:"Web, iOS app, Android app, and a weekly print edition. All formats sync your reading history and saved articles." },
  ];
  return (
    <section style={{ background: "#0D0D0C", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}>
        <div>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, color: "#F3F3F1", letterSpacing: "-0.035em", lineHeight: 1, textTransform: "uppercase", marginBottom: "24px" }}>
            QUESTIONS<br /><span style={{ color: "#6150F6" }}>ANSWERED.</span>
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginBottom: "24px" }}>
            Everything you wanted to know about The Chronicle.
          </p>
          <a href="#" onClick={e => e.preventDefault()} style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: "2px", textDecoration: "none" }}>
            Still have questions? Get in touch
          </a>
        </div>
        <div>
          <Accordion items={items} theme="dark" />
        </div>
      </div>
    </section>
  );
}

/* ── 3. Premium SaaS — Prism ────────────────────────────────── */
export function FAQPremiumSaas() {
  const [open, setOpen] = useState<number | null>(null);
  const items = [
    { q:"What emission scopes does ClimateBridge track?", a:"We track Scope 1 (direct), Scope 2 (energy), and all 15 Scope 3 categories including supply chain, business travel, employee commuting, and product end-of-life." },
    { q:"How does supplier data collection work?", a:"Suppliers receive automated survey invitations via email. They enter data directly into ClimateBridge, or you can bulk-upload via CSV. We also offer API integrations for large suppliers." },
    { q:"Which compliance frameworks do you support?", a:"CSRD, CDP, TCFD, SEC Climate Disclosure, GHG Protocol, and Science-Based Targets (SBTi). Reports are generated in audit-ready formats accepted by major verification bodies." },
    { q:"Can I integrate with our existing ERP?", a:"Yes. We offer pre-built connectors for SAP, Oracle, Workday, and NetSuite. Custom integrations are available on Enterprise plans via our REST API." },
    { q:"How accurate is the AI reduction roadmap?", a:"Our AI models are trained on 10,000+ real reduction projects across industries. Typical accuracy is within 15% of actual outcomes. The roadmap includes ROI projections and priority rankings." },
  ];
  return (
    <section style={{ background: "#F8F8F7", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 600, color: "#10B981", background: "#ECFDF5", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "9999px", padding: "4px 12px", marginBottom: "16px" }}>FAQ</span>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 800, color: "#0D0D0C", letterSpacing: "-0.025em" }}>Answers before you even ask.</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {items.map((item, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: "12px", overflow: "hidden" }}>
              <button style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px", background: "none", border: "none", cursor: "pointer", gap: "16px" }} onClick={() => setOpen(open === i ? null : i)}>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#0D0D0C", flex: 1, textAlign: "left" }}>{item.q}</span>
                <div style={{ width: "24px", height: "24px", background: open === i ? "#10B981" : "#F3F3F1", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                  {open === i ? <Minus size={12} color="#fff" /> : <Plus size={12} color="#525250" />}
                </div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.2 }} style={{ overflow: "hidden" }}>
                    <p style={{ padding: "0 20px 18px", fontSize: "14px", color: "#737370", lineHeight: 1.7, borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: "14px" }}>{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 4. Creative Studio — Saffron Kitchen ────────────────────── */
export function FAQCreativeStudio() {
  const [open, setOpen] = useState<number | null>(0);
  const items = [
    { q:"Do I need a reservation?", a:"Walk-ins are welcome for the bar and dining room. For the tasting menu and private dining, we recommend booking 3–5 days in advance." },
    { q:"Do you cater for dietary restrictions?", a:"Absolutely. We accommodate vegetarian, vegan, gluten-free, and allergen-specific requirements. Please inform us when booking." },
    { q:"What's the tasting menu?", a:"A 7-course journey through seasonal ingredients. The menu changes monthly. Wine pairing is available as an add-on." },
    { q:"Can I book the private dining room?", a:"Yes. The private room seats up to 20 guests and includes a dedicated server and customizable menu. Corporate events and celebrations welcome." },
    { q:"Do you offer gift vouchers?", a:"Yes. Gift vouchers are available for dining experiences, tasting menus, and cocktail workshops. Valid for 6 months." },
  ];
  return (
    <section style={{ background: "#140C07", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ marginBottom: "48px" }}>
          <p style={{ fontSize: "11px", color: "rgba(204,120,50,0.7)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "12px" }}>FAQ</p>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300, color: "#F5E6D3", letterSpacing: "-0.02em", fontStyle: "italic" }}>
            Got questions?<br />We've got answers.
          </h2>
          <p style={{ fontSize: "16px", color: "rgba(245,230,211,0.45)", marginTop: "12px" }}>Everything you need to know before your visit.</p>
        </div>
        <div>
          {items.map((item, i) => (
            <div key={i} style={{ borderBottom: "1px solid rgba(204,120,50,0.1)" }}>
              <button style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0", background: "none", border: "none", cursor: "pointer", gap: "24px", textAlign: "left" }} onClick={() => setOpen(open === i ? null : i)}>
                <span style={{ fontFamily: serif, fontSize: "18px", fontWeight: 400, color: "#F5E6D3", flex: 1, fontStyle: "italic" }}>{item.q}</span>
                <span style={{ fontSize: "18px", color: "rgba(204,120,50,0.5)", flexShrink: 0 }}>{open === i ? "−" : "+"}</span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.2 }} style={{ overflow: "hidden" }}>
                    <p style={{ fontFamily: serif, fontSize: "15px", color: "rgba(245,230,211,0.45)", lineHeight: 1.75, paddingBottom: "22px", fontStyle: "italic" }}>{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 5. Enterprise — Meridian Systems ────────────────────────── */
export function FAQEnterprise() {
  const items = [
    { q:"How long does enterprise onboarding take?", a:"Typical onboarding runs 2–4 weeks depending on complexity. Dedicated solutions engineers are assigned to every enterprise account." },
    { q:"What compliance certifications do you hold?", a:"SOC 2 Type II, ISO 27001, GDPR, and HIPAA (for healthcare clients). Annual third-party audits are published on our trust page." },
    { q:"Can we self-host or deploy on-premise?", a:"Yes. Meridian supports self-hosted, private cloud, and hybrid deployments. On-premise is available for regulated industries." },
    { q:"What does the support SLA look like?", a:"Enterprise clients receive 24/7 support with a 2-hour response time for critical issues. Dedicated account managers for strategic accounts." },
    { q:"How do you handle data residency?", a:"We support data residency in 12 regions. You choose where your data lives, and it never leaves that region unless you migrate it." },
  ];
  return (
    <section style={{ background: "#fff", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "280px 1fr", gap: "80px" }}>
        <div>
          <p style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A3A39D", marginBottom: "16px" }}>Documentation</p>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#0D0D0C", letterSpacing: "-0.02em", marginBottom: "16px" }}>Frequently Asked Questions</h2>
          <p style={{ fontSize: "14px", color: "#737370", lineHeight: 1.65, marginBottom: "24px" }}>
            Can't find what you need? Contact your account manager or reach our support team.
          </p>
          <a href="#" onClick={e => e.preventDefault()} style={{ display: "inline-block", background: "#F3F3F1", color: "#0D0D0C", padding: "8px 16px", borderRadius: "6px", fontSize: "12px", fontWeight: 600, textDecoration: "none" }}>
            Contact Support →
          </a>
        </div>
        <div>
          <Accordion items={items} theme="light" />
        </div>
      </div>
    </section>
  );
}

/* ── 6. Luxury — Maison Aurélien ────────────────────────────── */
export function FAQLuxury() {
  const [open, setOpen] = useState<number | null>(null);
  const items = [
    { q:"How do I commission a bespoke piece?", a:"Begin with a private consultation at our atelier. We discuss your vision, present material options, and provide a detailed proposal within 2 weeks." },
    { q:"What is the typical timeline for bespoke work?", a:"Most bespoke commissions take 8–12 weeks from approval to delivery. Urgent requests may be accommodated with a premium." },
    { q:"Do you ship internationally?", a:"Yes. All pieces are insured and shipped in custom cases. White-glove delivery is available in select cities." },
    { q:"Can I visit the atelier?", a:"Private viewings are by appointment. Contact us to schedule a visit to our workshop in Paris." },
    { q:"What materials do you work with?", a:"We source the finest materials — Italian marble, Swiss movements, French silks, and ethically sourced precious stones. Every material is traceable." },
  ];
  return (
    <section style={{ background: "#13120F", padding: "96px 48px", fontFamily: sans }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{ height: "1px", width: "40px", background: "rgba(201,168,76,0.4)", margin: "0 auto 24px" }} />
          <h2 style={{ fontFamily: serif, fontSize: "32px", fontWeight: 300, color: "#F0EAD6", fontStyle: "italic", letterSpacing: "0.04em" }}>Questions & Answers</h2>
          <div style={{ height: "1px", width: "40px", background: "rgba(201,168,76,0.4)", margin: "24px auto 0" }} />
        </div>
        {items.map((item, i) => (
          <div key={i} style={{ borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
            <button style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0", background: "none", border: "none", cursor: "pointer", gap: "24px" }} onClick={() => setOpen(open === i ? null : i)}>
              <span style={{ fontFamily: serif, fontSize: "17px", fontWeight: 400, color: "#F0EAD6", flex: 1, textAlign: "left", fontStyle: "italic" }}>{item.q}</span>
              <span style={{ fontSize: "18px", color: "rgba(201,168,76,0.6)", flexShrink: 0 }}>{open === i ? "−" : "+"}</span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
                  <p style={{ fontFamily: serif, fontSize: "15px", color: "rgba(240,234,214,0.5)", lineHeight: 1.8, paddingBottom: "24px", fontStyle: "italic" }}>{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 7. Startup — Launchpad ─────────────────────────────────── */
export function FAQStartup() {
  const [open, setOpen] = useState<number | null>(null);
  const items = [
    { q:"What stage of startup do you work with?", a:"We work with pre-seed to Series A startups. If you have a prototype or early traction, we're the right fit." },
    { q:"How much does Launchpad cost?", a:"Our 4-week sprint starts at ₹5L. This includes strategy, MVP design, prototype, and investor pitch materials. Equity-only arrangements are available for exceptional teams." },
    { q:"Do you take equity?", a:"We optionally take 2–5% equity in lieu of 50% cash payment. This aligns our incentives with your long-term success." },
    { q:"What happens after the 4-week sprint?", a:"You'll have a working prototype, pitch deck, and growth roadmap. Many clients continue with our monthly advisory for product-market fit optimization." },
    { q:"How many startups do you accept per batch?", a:"We run rolling admissions — no batch system. We take on 3–5 startups per month to ensure dedicated attention." },
  ];
  return (
    <section style={{ background: "linear-gradient(135deg, #F2F0FF 0%, #fff 100%)", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, color: "#0D0D0C", letterSpacing: "-0.025em", marginBottom: "8px" }}>
            Still got questions?
          </h2>
          <p style={{ fontSize: "15px", color: "#737370" }}>We're an open book. Here are the ones we get asked most.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {items.map((item, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(97,80,246,0.1)", overflow: "hidden" }}>
              <button style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px", background: "none", border: "none", cursor: "pointer", gap: "16px", textAlign: "left" }} onClick={() => setOpen(open === i ? null : i)}>
                <span style={{ fontSize: "15px", fontWeight: 600, color: "#0D0D0C", flex: 1 }}>{item.q}</span>
                <div style={{ width: "28px", height: "28px", background: open === i ? "#6150F6" : "#F2F0FF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                  {open === i ? <Minus size={12} color="#fff" /> : <Plus size={12} color="#6150F6" />}
                </div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.2 }} style={{ overflow: "hidden" }}>
                    <p style={{ padding: "0 20px 18px", fontSize: "14px", color: "#737370", lineHeight: 1.7 }}>{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 8. Modern Tech — Resonance Records ──────────────────────── */
export function FAQModernTech() {
  const [open, setOpen] = useState<number | null>(null);
  const items = [
    { q:"How do I get signed to Resonance?", a:"We accept demos via our submissions portal. Our A&R team reviews every submission within 2 weeks. We sign 12–15 artists per year." },
    { q:"What does the deal structure look like?", a:"We offer flexible deals — traditional advances, profit splits, or distribution-only. We tailor the structure to the artist's needs." },
    { q:"Do you handle distribution?", a:"Yes. We distribute to all major platforms — Spotify, Apple Music, YouTube Music, Tidal, and 150+ regional platforms worldwide." },
    { q:"What studio time is included?", a:"Every signed artist gets 40 hours of studio time per year. Additional hours are available at preferential rates." },
    { q:"Do you work with independent artists?", a:"Yes. Our distribution-only tier lets independent artists access our infrastructure without giving up ownership." },
  ];
  return (
    <section style={{ background: "#08080A", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ marginBottom: "48px" }}>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>FAQ</p>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 800, color: "#F3F3F1", letterSpacing: "-0.025em" }}>FAQ</h2>
        </div>
        {items.map((item, i) => (
          <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <button style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", background: "none", border: "none", cursor: "pointer", gap: "24px", textAlign: "left" }} onClick={() => setOpen(open === i ? null : i)}>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", flex: 1 }}>
                <code style={{ fontFamily: mono, fontSize: "10px", color: "#6150F6", paddingTop: "3px", flexShrink: 0 }}>{String(i+1).padStart(2,"0")}</code>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#F3F3F1" }}>{item.q}</span>
              </div>
              <motion.div animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.2 }} style={{ flexShrink: 0 }}>
                <Plus size={14} color="rgba(255,255,255,0.3)" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.2 }} style={{ overflow: "hidden" }}>
                  <p style={{ fontFamily: mono, fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, paddingBottom: "20px", paddingLeft: "28px" }}>{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 9. Brutalist — Pulse Fitness ────────────────────────────── */
export function FAQBrutalist() {
  const [open, setOpen] = useState<number | null>(null);
  const items = [
    { q:"How is Pulse different from other gyms?", a:"We focus on science-backed coaching, not just equipment access. Every member gets a personalized program, progress tracking, and access to recovery protocols — not just a keycard." },
    { q:"Do I need experience to join?", a:"Not at all. We assess your fitness level on day one and build a program that meets you where you are. Our group classes are designed for all levels." },
    { q:"What's included in the Monthly plan?", a:"Unlimited group classes, full recovery suite access (cryo, sauna, massage), one nutrition consult per month, app-based workout tracking, and two guest passes." },
    { q:"Can I freeze my membership?", a:"Yes — you can freeze for up to 3 months per year at no charge. Just give us 7 days notice." },
    { q:"Do you offer personal training?", a:"Yes. Our Personal plan includes 3 PT sessions per week, custom programming, daily check-ins, nutrition coaching, and priority class booking." },
  ];
  return (
    <section style={{ background: "#0A0A0A", fontFamily: sans, padding: "80px 40px" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
          <div>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>FAQ</p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: "#fff" }}>Questions & Answers</h2>
          </div>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>{items.length} questions</span>
        </div>
        {items.map((item, i) => (
          <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <button style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }} onClick={() => setOpen(open === i ? null : i)}>
              <span style={{ fontSize: "15px", fontWeight: 600, color: "#fff" }}>{item.q}</span>
              <span style={{ fontSize: "20px", color: "rgba(255,255,255,0.3)", flexShrink: 0, marginLeft: "16px" }}>{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <div style={{ paddingBottom: "20px" }}>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 10. High-End Portfolio — Atelier Noir ───────────────────── */
export function FAQHighEndPortfolio() {
  const items = [
    { q:"How far in advance should I book?", a:"Most commissions are booked 4–8 weeks in advance. Editorial and campaign work can sometimes be accommodated with 2 weeks notice, depending on the scope." },
    { q:"Do you travel for shoots?", a:"Yes. Noir has shot in Paris, Milan, Tokyo, and New York. Travel is included for commissions within India; international shoots are quoted separately." },
    { q:"What's included in a shoot day?", a:"A full shoot day includes creative direction, lighting setup, shooting, and on-set image review. Post-production and retouching are delivered separately within 5–7 business days." },
    { q:"How many final images will I receive?", a:"A full-day editorial typically yields 30–50 retouched images. Campaign shoots are scoped per brief — we prioritize quality over quantity." },
    { q:"Do you work with brands outside fashion?", a:"While fashion and luxury are the primary focus, Noir occasionally takes on fine art, architecture, and still life commissions that align with the studio's aesthetic." },
  ];
  return (
    <section style={{ background: "#FAFAF9", padding: "96px 48px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "320px 1fr", gap: "80px" }}>
        <div style={{ position: "sticky", top: "80px", alignSelf: "start" }}>
          <p style={{ fontFamily: serif, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A3A39D", fontStyle: "italic", marginBottom: "20px" }}>Working together</p>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 300, color: "#0D0D0C", lineHeight: 1.3, fontStyle: "italic", marginBottom: "24px" }}>
            Answers to questions we hear often.
          </h2>
          <div style={{ height: "1px", width: "48px", background: "rgba(0,0,0,0.15)", marginBottom: "24px" }} />
          <a href="#" onClick={e => e.preventDefault()} style={{ fontSize: "13px", color: "#0D0D0C", textDecoration: "none", borderBottom: "1px solid rgba(0,0,0,0.2)", paddingBottom: "2px" }}>
            Ask something else →
          </a>
        </div>
        <div>
          <Accordion items={items} theme="light" />
        </div>
      </div>
    </section>
  );
}
