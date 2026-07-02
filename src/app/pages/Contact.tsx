import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Mail, Clock, ArrowRight, MessageSquare } from "lucide-react";
import { submitContact } from "../lib/api";
import SEO from "../components/SEO";

const services = ["Brand Identity","Web Design","Web Development","SEO","Full Package (Brand + Web)","Design System","Other"];
const budgets = ["₹50,000–₹1,00,000","₹1,00,000–₹2,50,000","₹2,50,000–₹5,00,000","₹5,00,000+","Not sure yet"];
const timelines = ["ASAP","Within 4 weeks","1–2 months","3+ months","Just exploring"];
const industries = ["SaaS / Software","Fintech","Healthcare","E-commerce","Real Estate","Education","Startup (pre-revenue)","Professional Services","Other"];

function Field({ label, required, optional, children }: { label: string; required?: boolean; optional?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 mb-1.5 text-foreground" style={{ fontSize: "13px", fontWeight: 500 }}>
        {label}
        {optional && <span className="text-muted-foreground" style={{ fontSize: "11px", fontWeight: 400 }}>(optional)</span>}
        {required && <span className="text-destructive" style={{ fontSize: "11px" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full h-11 px-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring transition-all";
const selectCls = inputCls + " appearance-none cursor-pointer pr-8";

export default function Contact() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    try {
      await submitContact({
        firstName: String(form.get("firstName") ?? ""),
        lastName: String(form.get("lastName") ?? ""),
        email: String(form.get("email") ?? ""),
        company: String(form.get("company") ?? ""),
        service: String(form.get("service") ?? ""),
        budget: String(form.get("budget") ?? ""),
        message: [
          form.get("industry") ? `Industry: ${form.get("industry")}` : "",
          form.get("timeline") ? `Timeline: ${form.get("timeline")}` : "",
          form.get("website") ? `Website: ${form.get("website")}` : "",
          form.get("goals") ? `Goals: ${form.get("goals")}` : "",
          form.get("notes") ? `Notes: ${form.get("notes")}` : "",
        ].filter(Boolean).join("\n\n"),
      });
      navigate("/thank-you");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background">
      <SEO
        title="Contact"
        description="Get in touch with Aesthetix Studio. Book a discovery call or send us a project inquiry."
        url="/contact"
      />
      <section className="border-b border-border py-16 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-muted-foreground mb-3" style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Contact</p>
          <h1 className="text-foreground mb-4" style={{ fontSize: "clamp(30px,5vw,50px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Let's talk about your project.
          </h1>
          <p className="text-muted-foreground max-w-xl" style={{ fontSize: "16px", lineHeight: 1.65 }}>
            The more detail you share, the better we can assess whether we're the right fit — and how to help you.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-14">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact info */}
            <div>
              <h2 className="text-foreground mb-4" style={{ fontSize: "15px", fontWeight: 700 }}>About you</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="First name" required>
                    <input name="firstName" placeholder="Jane" required className={inputCls} style={{ fontSize: "14px" }} />
                  </Field>
                  <Field label="Last name" required>
                    <input name="lastName" placeholder="Smith" required className={inputCls} style={{ fontSize: "14px" }} />
                  </Field>
                </div>
                <Field label="Work email" required>
                  <input name="email" type="email" placeholder="jane@company.com" required className={inputCls} style={{ fontSize: "14px" }} />
                </Field>
                <Field label="Company / Business name" required>
                  <input name="company" placeholder="Acme Inc." required className={inputCls} style={{ fontSize: "14px" }} />
                </Field>
                <Field label="Industry" optional>
                  <div className="relative">
                    <select name="industry" className={selectCls} style={{ fontSize: "13px" }}>
                      <option value="">Select your industry…</option>
                      {industries.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">▾</span>
                  </div>
                </Field>
                <Field label="Current website" optional>
                  <input name="website" type="url" placeholder="https://yoursite.com" className={inputCls} style={{ fontSize: "14px" }} />
                </Field>
              </div>
            </div>

            {/* Project info */}
            <div className="pt-2 border-t border-border">
              <h2 className="text-foreground mb-4 pt-4" style={{ fontSize: "15px", fontWeight: 700 }}>Your project</h2>
              <div className="space-y-4">
                <Field label="Service needed" required>
                  <div className="relative">
                    <select name="service" required className={selectCls} style={{ fontSize: "13px" }}>
                      <option value="">Select a service…</option>
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">▾</span>
                  </div>
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Budget range" required>
                    <div className="relative">
                      <select name="budget" required className={selectCls} style={{ fontSize: "13px" }}>
                        <option value="">Select a range…</option>
                        {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">▾</span>
                    </div>
                  </Field>
                  <Field label="Ideal timeline" optional>
                    <div className="relative">
                      <select name="timeline" className={selectCls} style={{ fontSize: "13px" }}>
                        <option value="">When do you want to start?</option>
                        {timelines.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">▾</span>
                    </div>
                  </Field>
                </div>
                <Field label="What are your goals?" required>
                  <textarea
                    name="goals"
                    required
                    placeholder="What does success look like for this project? What problem are you trying to solve? Who is your target audience?"
                    rows={4}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none transition-all"
                    style={{ fontSize: "13px" }}
                  />
                </Field>
                <Field label="Additional notes" optional>
                  <textarea
                    name="notes"
                    placeholder="Anything else we should know — competitors, inspiration, tech constraints, existing assets…"
                    rows={3}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none transition-all"
                    style={{ fontSize: "13px" }}
                  />
                </Field>
              </div>
            </div>

            {error && (
              <p className="text-destructive px-4 py-3 rounded-xl bg-red-50 dark:bg-destructive/10 border border-destructive/20" style={{ fontSize: "13px" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-foreground text-background py-4 rounded-xl hover:bg-foreground/90 disabled:opacity-50 transition-all"
              style={{ fontSize: "14px", fontWeight: 600 }}
            >
              {loading ? "Sending your brief…" : <><span>Send Project Brief</span><ArrowRight className="w-4 h-4" /></>}
            </button>
            <p className="text-muted-foreground text-center" style={{ fontSize: "12px" }}>
              We respond within 4 business hours. Your information is never shared.
            </p>
          </form>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
              <h3 className="text-foreground" style={{ fontSize: "14px", fontWeight: 700 }}>Other ways to reach us</h3>
              {[
                { icon: Mail, label: "Email", value: "hello@aesthetix.studio" },
                { icon: Clock, label: "Response time", value: "Under 4 business hours" },
                { icon: MessageSquare, label: "Office hours", value: "Mon–Fri · 9am–6pm ET" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-muted-foreground" style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>{label}</div>
                    <div className="text-foreground" style={{ fontSize: "13px" }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <p className="text-muted-foreground mb-1" style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>Prefer a call first?</p>
              <p className="text-foreground mb-3" style={{ fontSize: "14px", fontWeight: 600 }}>Book a free 30-min discovery call</p>
              <p className="text-muted-foreground mb-4" style={{ fontSize: "13px", lineHeight: 1.6 }}>No pitch — just a real conversation about your goals and whether we're the right fit.</p>
              <Link to="/discovery-call" className="flex items-center gap-2 text-brand no-underline hover:underline" style={{ fontSize: "13px", fontWeight: 600 }}>
                Book a call <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-card border border-border rounded-xl p-5">
              <p className="text-foreground mb-3" style={{ fontSize: "13px", fontWeight: 600 }}>Q3 2026 availability</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span className="text-muted-foreground" style={{ fontSize: "12px" }}>2 of 4 spots remaining</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
