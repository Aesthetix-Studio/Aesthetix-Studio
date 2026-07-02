import { Star, Quote, ArrowRight } from "lucide-react";

const serif = "'Cormorant Garamond', Georgia, serif";
const mono = "'JetBrains Mono', monospace";
const sans = "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif";

/* ── 1. Minimal — Mono Studio ───────────────────────────────── */
export function TestimonialsMinimal() {
  const data = [
    { name:"Lena Park", role:"CEO", company:"Arch & Stone", initials:"LP", color:"#6150F6", full:"They didn't just build a website — they gave us a brand presence. The strategy session changed how we think about our entire business." },
    { name:"Ravi Gupta", role:"Founder", company:"Ferns & Petals", initials:"RG", color:"#F59E0B", full:"Three weeks after launch, we closed our biggest corporate order. The client specifically mentioned our website as the reason they reached out." },
    { name:"Anika Bose", role:"Head of Brand", company:"Habitat Furnishings", initials:"AB", color:"#EC4899", full:"Clean, minimal, and exactly what we needed. Our bounce rate dropped 40% and average session time tripled in the first month." },
  ];
  return (
    <section style={{ background: "#FAFAF9", padding: "96px 48px", fontFamily: sans }}>
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A3A39D", marginBottom: "56px" }}>Client Feedback</p>
        {data.map((t, i) => (
          <div key={t.name} style={{ paddingBottom: "48px", marginBottom: "48px", borderBottom: i < data.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
            <p style={{ fontSize: "clamp(16px, 2.5vw, 22px)", fontWeight: 400, color: "#0D0D0C", lineHeight: 1.55, letterSpacing: "-0.01em", marginBottom: "24px" }}>
              "{t.full}"
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "8px", height: "8px", background: t.color, borderRadius: "50%" }} />
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#0D0D0C" }}>{t.name}</span>
              <span style={{ fontSize: "13px", color: "#A3A39D" }}>{t.role} · {t.company}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 2. Editorial — The Chronicle ───────────────────────────── */
export function TestimonialsEditorial() {
  const data = [
    { name:"Priya Sharma", role:"Subscriber since 2018", company:"Reader", initials:"PS", color:"#6150F6", full:"The Chronicle is the only publication I read end-to-end every week. The investigations alone are worth the subscription. Nothing else in Indian journalism goes this deep." },
    { name:"Rahul Bose", role:"Business Leader", company:"Reader", initials:"RB", color:"#F59E0B", full:"I start every morning with The Chronicle's morning brief. The data journalism section has become essential reading for our board. It's replaced three other subscriptions." },
    { name:"Anjali Menon", role:"Film Director", company:"Reader", initials:"AM", color:"#EC4899", full:"The cultural essays and long-form profiles are unlike anything else being published. They treat art with the seriousness it deserves. The Art Issue is my favourite edition every year." },
  ];
  return (
    <section style={{ background: "#0D0D0C", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: "64px", paddingBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 800, color: "#F3F3F1", letterSpacing: "-0.03em", lineHeight: 1 }}>
            WHAT<br /><span style={{ color: "#6150F6" }}>READERS</span><br />SAY.
          </h2>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Vol. III · 2026</span>
        </div>
        {data.map((t, i) => (
          <div key={t.name} style={{ display: "grid", gridTemplateColumns: "80px 1fr 200px", gap: "32px", paddingBottom: "48px", marginBottom: "48px", borderBottom: i < data.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
            <div style={{ paddingTop: "6px" }}>
              <span style={{ fontFamily: serif, fontSize: "40px", color: t.color, lineHeight: 1 }}>"</span>
            </div>
            <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(255,255,255,0.75)", lineHeight: 1.65, fontStyle: "italic" }}>{t.full}</p>
            <div style={{ textAlign: "right" }}>
              <div style={{ width: "44px", height: "44px", background: t.color, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "auto", marginBottom: "12px", fontSize: "13px", fontWeight: 700, color: "#fff" }}>{t.initials}</div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#F3F3F1" }}>{t.name}</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>{t.role} · {t.company}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 3. Premium SaaS — Prism ────────────────────────────────── */
export function TestimonialsPremiumSaas() {
  const data = [
    { name:"Rohan Verma", role:"Head of Sustainability", company:"Tata Steel", initials:"RV", color:"#10B981", stars:5, short:"We reduced our carbon reporting time from weeks to hours.", full:"ClimateBridge automated our Scope 1, 2, and 3 tracking across 14 plants. What used to take our sustainability team weeks now happens in real-time. The reduction roadmaps alone justified the investment." },
    { name:"Sneha Kapoor", role:"ESG Director", company:"Unilever India", initials:"SK", color:"#059669", stars:5, short:"Our supply chain emissions data is finally accurate.", full:"We collect primary data from 12,000+ suppliers through ClimateBridge. The platform's supplier engagement tools are best-in-class. Our CDP score improved from B to A- in one year." },
    { name:"Amit Patel", role:"Chief Climate Officer", company:"Infosys", initials:"AP", color:"#047857", stars:5, short:"The compliance reports save us hundreds of audit hours.", full:"CSRD, TCFD, SEC Climate — ClimateBridge generates all our disclosure reports automatically. Our auditors love the audit trail. We've cut reporting costs by 60%." },
  ];
  return (
    <section style={{ background: "#F8F8F7", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "3px", marginBottom: "12px" }}>
            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />)}
          </div>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 800, color: "#0D0D0C", letterSpacing: "-0.025em", marginBottom: "8px" }}>
            4.9/5 from 800+ sustainability teams
          </h2>
          <p style={{ fontSize: "14px", color: "#737370" }}>Trusted by ESG teams at enterprises and high-growth companies alike</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
          {data.map(t => (
            <div key={t.name} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: "16px", padding: "24px" }}>
              <div style={{ display: "flex", gap: "3px", marginBottom: "16px" }}>
                {[...Array(t.stars)].map((_, i) => <Star key={i} size={12} fill="#F59E0B" color="#F59E0B" />)}
              </div>
              <p style={{ fontSize: "14px", color: "#525250", lineHeight: 1.65, marginBottom: "20px", fontStyle: "italic" }}>"{t.full}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "16px" }}>
                <div style={{ width: "36px", height: "36px", background: t.color, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "#fff", flexShrink: 0 }}>{t.initials}</div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#0D0D0C" }}>{t.name}</div>
                  <div style={{ fontSize: "11px", color: "#A3A39D" }}>{t.role} · {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 4. Creative Studio — Saffron Kitchen ────────────────────── */
export function TestimonialsCreativeStudio() {
  const data = [
    { name:"Priya Menon", role:"Food Critic", company:"Mumbai Mirror", initials:"PM", color:"#CC7832", full:"Saffron Kitchen doesn't just serve food — they tell stories through flavour. The tasting menu was the most memorable dining experience I've had this year." },
    { name:"Rajesh Kumar", role:"Host", company:"Private Event", initials:"RK", color:"#A85D28", full:"We hosted our anniversary dinner in the private dining room. Every detail — from the curated menu to the table setting — was flawless. Our guests are still talking about it." },
    { name:"Diana Fernandes", role:"Regular Guest", company:"Weekly Patron", initials:"DF", color:"#8B4513", full:"I come here every Friday for the cocktail programme. The bartenders remember my name and my preferences. It feels like a second home, but with better food." },
  ];
  return (
    <section style={{ background: "#1A0F0A", padding: "80px 0", fontFamily: sans, overflow: "hidden" }}>
      <div style={{ padding: "0 40px", marginBottom: "48px" }}>
        <p style={{ fontSize: "11px", color: "rgba(204,120,50,0.7)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "12px" }}>What Our Guests Say</p>
        <h2 style={{ fontFamily: serif, fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 300, color: "#F5E6D3", letterSpacing: "-0.02em", fontStyle: "italic" }}>
          Happy guests.<br />Exceptional flavours.
        </h2>
      </div>
      <div style={{ display: "flex", gap: "20px", paddingLeft: "40px", overflowX: "auto", paddingBottom: "8px" }}>
        {data.map((t, i) => (
          <div key={t.name} style={{ flexShrink: 0, width: "380px", background: i === 1 ? "rgba(204,120,50,0.12)" : "rgba(204,120,50,0.04)", borderRadius: "16px", padding: "36px", border: "1px solid rgba(204,120,50,0.1)" }}>
            <div style={{ fontSize: "48px", color: "rgba(204,120,50,0.2)", lineHeight: 1, marginBottom: "16px", fontFamily: serif }}>"</div>
            <p style={{ fontFamily: serif, fontSize: "16px", lineHeight: 1.65, color: "rgba(245,230,211,0.7)", marginBottom: "28px", fontStyle: "italic" }}>
              {t.full}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", borderTop: "1px solid rgba(204,120,50,0.1)", paddingTop: "20px" }}>
              <div style={{ width: "40px", height: "40px", background: t.color, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#fff" }}>{t.initials}</div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#F5E6D3" }}>{t.name}</div>
                <div style={{ fontSize: "12px", color: "rgba(204,120,50,0.6)" }}>{t.role} · {t.company}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 5. Enterprise — Meridian Systems ────────────────────────── */
export function TestimonialsEnterprise() {
  const data = [
    { name:"Sunil Sharma", role:"VP Engineering", company:"Reliance Jio", initials:"SS", color:"#6150F6", stars:5, short:"Deployed across 3 regions in under 2 weeks.", full:"Meridian's cloud platform handled our scale from day one. We migrated 200+ microservices with zero downtime. Their support team is genuinely excellent." },
    { name:"Neha Agarwal", role:"CTO", company:"Tata Digital", initials:"NA", color:"#F59E0B", stars:5, short:"The compliance hub saved us 6 months of audit prep.", full:"SOC 2, ISO 27001, GDPR — Meridian's compliance hub automated 80% of our audit documentation. What used to take our team months now takes days." },
    { name:"Vikram Joshi", role:"Head of Infrastructure", company:"Flipkart", initials:"VJ", color:"#EC4899", stars:5, short:"99.99% uptime even during our biggest sale events.", full:"We process 10M+ requests per minute during sale events. Meridian's infrastructure has never blinked. The auto-scaling alone justifies the investment." },
  ];
  return (
    <section style={{ background: "#fff", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "80px", alignItems: "start" }}>
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A3A39D", marginBottom: "12px" }}>Client Testimonials</p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 700, color: "#0D0D0C", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "16px" }}>
              Trusted by industry leaders.
            </h2>
            <p style={{ fontSize: "14px", color: "#737370", lineHeight: 1.65, marginBottom: "24px" }}>
              Over 200 enterprise deployments across 12 industries. Proven at scale.
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              {[["99.99%","Uptime"],["< 2hr","Support SLA"]].map(([r,p]) => (
                <div key={p} style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: "8px", padding: "12px 16px", textAlign: "center" }}>
                  <div style={{ fontSize: "20px", fontWeight: 700, color: "#0D0D0C" }}>{r}</div>
                  <div style={{ fontSize: "11px", color: "#A3A39D", fontWeight: 500 }}>{p}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {data.map(t => (
              <div key={t.name} style={{ border: "1px solid rgba(0,0,0,0.07)", borderRadius: "10px", padding: "24px", display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <div style={{ width: "44px", height: "44px", background: t.color, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#fff", flexShrink: 0 }}>{t.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <div>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "#0D0D0C" }}>{t.name}</span>
                      <span style={{ fontSize: "12px", color: "#A3A39D", marginLeft: "8px" }}>{t.role} · {t.company}</span>
                    </div>
                    <div style={{ display: "flex", gap: "2px" }}>
                      {[...Array(t.stars)].map((_, i) => <Star key={i} size={11} fill="#F59E0B" color="#F59E0B" />)}
                    </div>
                  </div>
                  <p style={{ fontSize: "13px", color: "#525250", lineHeight: 1.6 }}>"{t.short}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 6. Luxury — Maison Aurélien ────────────────────────────── */
export function TestimonialsLuxury() {
  const main = { name:"Isabelle Favre", role:"Private Client", company:"Geneva", initials:"IF", color:"#C9A84C", full:"The bespoke commission exceeded every expectation. What impressed me most was the attention to provenance — every material was sourced with extraordinary care. This is what true luxury means." };
  const others = [
    { name:"Henri Delacroix", role:"Art Collector", company:"Paris", initials:"HD", color:"#C9A84C" },
    { name:"Sofia Marchetti", role:"Interior Designer", company:"Milan", initials:"SM", color:"#C9A84C" },
  ];
  return (
    <section style={{ background: "#13120F", padding: "96px 48px", fontFamily: sans, textAlign: "center" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <div style={{ fontFamily: serif, fontSize: "60px", color: "rgba(201,168,76,0.3)", lineHeight: 1, marginBottom: "0" }}>"</div>
        <p style={{ fontFamily: serif, fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 400, color: "#F0EAD6", lineHeight: 1.65, fontStyle: "italic", marginBottom: "40px" }}>
          {main.full}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", justifyContent: "center", marginBottom: "56px" }}>
          <div style={{ height: "1px", width: "32px", background: "rgba(201,168,76,0.3)" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#F0EAD6" }}>{main.name}</div>
            <div style={{ fontFamily: serif, fontSize: "12px", color: "rgba(201,168,76,0.6)", fontStyle: "italic" }}>{main.role} · {main.company}</div>
          </div>
          <div style={{ height: "1px", width: "32px", background: "rgba(201,168,76,0.3)" }} />
        </div>
        <div style={{ display: "flex", gap: "32px", justifyContent: "center" }}>
          {[main, ...others].map((t, i) => (
            <div key={t.name} style={{ cursor: "pointer", opacity: i === 0 ? 1 : 0.35, transition: "opacity 0.2s" }}>
              <div style={{ width: "32px", height: "32px", background: t.color, borderRadius: "50%", margin: "0 auto 6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, color: "#13120F" }}>{t.initials}</div>
              <div style={{ fontSize: "10px", color: "rgba(240,234,214,0.4)", letterSpacing: "0.06em" }}>{t.name.split(" ")[0]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 7. Startup — Launchpad ─────────────────────────────────── */
export function TestimonialsStartup() {
  const data = [
    { name:"Kavya Reddy", role:"Founder", company:"MediConnect", initials:"KR", color:"#6150F6", full:"Launchpad helped us go from idea to ₹3Cr seed round in 4 months. The investor introductions and pitch coaching made all the difference." },
    { name:"Arjun Nair", role:"Co-founder", company:"GreenGrid Energy", initials:"AN", color:"#F59E0B", full:"We had the technology but no business model. Launchpad's sprints forced us to validate our assumptions before building. Saved us 6 months of wasted development." },
    { name:"Meera Iyer", role:"Founder", company:"SkillBridge", initials:"MI", color:"#EC4899", full:"From 0 to 50,000 users in 3 months post-launch. The growth playbook they gave us wasn't generic — it was built specifically for our market and audience." },
  ];
  return (
    <section style={{ background: "linear-gradient(135deg,#F2F0FF 0%,#fff 60%)", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ display: "inline-flex", gap: "4px", marginBottom: "8px" }}>
            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />)}
          </div>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, color: "#0D0D0C", letterSpacing: "-0.025em" }}>
            Over 50 startups launched
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
          {data.map(t => (
            <div key={t.name} style={{ background: "#fff", borderRadius: "20px", padding: "28px", boxShadow: "0 4px 24px rgba(97,80,246,0.08)", border: "1px solid rgba(97,80,246,0.08)" }}>
              <div style={{ background: `${t.color}15`, borderRadius: "12px", padding: "12px 16px", marginBottom: "16px" }}>
                <p style={{ fontSize: "14px", color: "#0D0D0C", lineHeight: 1.6, fontStyle: "italic", fontWeight: 500 }}>"{t.full}"</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", background: t.color, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "#fff" }}>{t.initials}</div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#0D0D0C" }}>{t.name}</div>
                  <div style={{ fontSize: "11px", color: "#A3A39D" }}>{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 8. Modern Tech — Resonance Records ──────────────────────── */
export function TestimonialsModernTech() {
  const data = [
    { name:"Zara Khan", role:"Artist", company:"Resonance Records", initials:"ZK", color:"#6150F6", stars:5, short:"They understood my sound before I could articulate it.", full:"Resonance didn't just sign me — they developed my artistic identity. From the first session, they understood my sound better than I could articulate it." },
    { name:"Vikram Singh", role:"Producer", company:"Studio Sessions", initials:"VS", color:"#F59E0B", stars:5, short:"The studio sessions are world-class. Period.", full:"I've recorded in studios across Mumbai and LA. The Resonance studio is on another level — the acoustics, the gear, the engineers. Every session feels like magic." },
    { name:"Ananya Das", role:"A&R Director", company:"Resonance Records", initials:"AD", color:"#EC4899", stars:5, short:"Our artists stay because we actually care about their craft.", full:"We're not a volume label. We sign 12 artists a year and give each one the attention they deserve. Our retention rate speaks for itself — 95% of artists renew." },
  ];
  return (
    <section style={{ background: "#08080A", padding: "80px 40px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "48px" }}>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Verified Reviews · 200+ entries</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
          {data.map(t => (
            <div key={t.name} style={{ background: "#08080A", padding: "28px" }}>
              <div style={{ display: "flex", gap: "3px", marginBottom: "16px" }}>
                {[...Array(t.stars)].map((_, i) => <Star key={i} size={11} fill="#F59E0B" color="#F59E0B" />)}
              </div>
              <p style={{ fontFamily: mono, fontSize: "13px", color: "rgba(243,243,241,0.6)", lineHeight: 1.7, marginBottom: "20px" }}>"{t.short}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "32px", height: "32px", background: t.color, borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, color: "#fff" }}>{t.initials}</div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#F3F3F1" }}>{t.name}</div>
                  <code style={{ fontFamily: mono, fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>{t.company.toLowerCase().replace(/\s/g,"-")}</code>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 9. Brutalist — Pulse Fitness ────────────────────────────── */
export function TestimonialsBrutalist() {
  const data = [
    { name:"Riya Sharma", role:"Member", company:"Pulse Fitness", initials:"RS", color:"#EF4444", stars:5, short:"Lost 12kg in 4 months. The coaching is next level.", full:"I tried 5 gyms before Pulse. The difference is the coaching — they actually care about your form, your recovery, and your goals. Lost 12kg in 4 months without injury." },
    { name:"Aditya Mehta", role:"Member", company:"Pulse Fitness", initials:"AM", color:"#F59E0B", stars:5, short:"The recovery suite alone is worth the membership.", full:"Between the cryo, sauna, and sports massage, I recover twice as fast. The group classes are intense but the coaches always scale for your level." },
    { name:"Kavita Rao", role:"Member", company:"Pulse Fitness", initials:"KR", color:"#EC4899", stars:5, short:"Best investment in my health. Period.", full:"The nutrition coaching changed everything. I finally understand what to eat, when to eat, and how to fuel my training. Best investment in my health." },
  ];
  return (
    <section style={{ background: "#0A0A0A", fontFamily: sans, padding: "80px 40px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px" }}>
          <div>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>Testimonials</p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: "#fff" }}>What members say</h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "18px", fontWeight: 700, color: "#EF4444" }}>4.9</span>
            <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>★ from 2,400+ reviews</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
          {data.map(t => (
            <div key={t.name} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "24px" }}>
              <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
                {[...Array(t.stars)].map((_, i) => <span key={i} style={{ color: "#EF4444", fontSize: "14px" }}>★</span>)}
              </div>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.65, marginBottom: "20px" }}>"{t.full}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "16px" }}>
                <div style={{ width: "32px", height: "32px", background: t.color, borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, color: "#fff" }}>{t.initials}</div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#fff" }}>{t.name}</div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 10. High-End Portfolio — Atelier Noir ───────────────────── */
export function TestimonialsHighEndPortfolio() {
  const data = [
    { name:"Isabelle Morel", role:"Creative Director, Vogue Paris", initials:"IM", color:"#525250", full:"Noir has an extraordinary ability to capture silence in a frame. Every image from our last editorial felt like a painting — considered, intimate, and timeless." },
    { name:"Takeshi Honda", role:"Brand Director, Comme des Garçons", initials:"TH", color:"#525250", full:"Working with Atelier Noir is unlike any other shoot. There's a reverence for the subject that elevates everything. Our campaign images became the reference point for the entire season." },
  ];
  return (
    <section style={{ background: "#FAFAF9", padding: "96px 48px", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
          <div>
            <p style={{ fontFamily: serif, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A3A39D", fontStyle: "italic", marginBottom: "24px" }}>From the lens</p>
            <p style={{ fontFamily: serif, fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 300, color: "#0D0D0C", lineHeight: 1.35, letterSpacing: "-0.005em", fontStyle: "italic" }}>
              "The best photographs are the ones where you forget a camera was there."
            </p>
            <div style={{ height: "1px", width: "60px", background: "rgba(0,0,0,0.15)", margin: "32px 0" }} />
            <p style={{ fontSize: "14px", color: "#A3A39D", lineHeight: 1.65 }}>Published in Vogue, Dazed, i-D, and AnOther</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {data.map(t => (
              <div key={t.name} style={{ borderLeft: "1px solid rgba(0,0,0,0.1)", paddingLeft: "28px" }}>
                <p style={{ fontFamily: serif, fontSize: "18px", fontWeight: 400, color: "#0D0D0C", lineHeight: 1.65, fontStyle: "italic", marginBottom: "20px" }}>"{t.full}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "6px", height: "6px", background: t.color, borderRadius: "50%" }} />
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#0D0D0C" }}>{t.name}</span>
                  <span style={{ fontSize: "12px", color: "#A3A39D" }}>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
