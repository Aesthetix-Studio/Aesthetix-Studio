import { useState } from "react";
import { useNavigate } from "react-router";
import { AXInput, AXTextarea, AXSelect, AXCheckbox } from "../components/ds-forms";
import { ArrowRight } from "lucide-react";
import { submitInquiry } from "../lib/api";
import SEO from "../components/SEO";

const steps = ["About You","Your Project","Budget & Timeline"];

export default function ProjectInquiry() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    service: "",
    projectSummary: "",
    inspiration: "",
    budget: "",
    startDate: "",
  });

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await submitInquiry({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        company: form.company,
        service: form.service,
        projectSummary: form.projectSummary,
        budget: form.budget,
      });
      navigate("/thank-you");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit brief");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-background">
      <SEO title="Project Inquiry" description="Submit your project brief to Aesthetix Studio. Tell us about your goals, timeline, and budget — we'll get back to you within 24 hours." url="/inquiry" />
      <section className="border-b border-border py-14 px-5 sm:px-8">
        <div className="max-w-2xl mx-auto">
          <p className="text-muted-foreground mb-3" style={{ fontSize:"11px", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.1em" }}>Project Brief</p>
          <h1 className="text-foreground" style={{ fontSize:"clamp(26px,4.5vw,42px)", fontWeight:800, letterSpacing:"-0.03em", lineHeight:1.1 }}>Tell us about your project.</h1>
        </div>
      </section>
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-12">
        <div className="flex items-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className="flex items-center justify-center w-7 h-7 rounded-full" style={{ background:step>i+1?"var(--success)":step===i+1?"var(--foreground)":"var(--secondary)", color:step>=i+1?"var(--background)":"var(--muted-foreground)", fontSize:"11px", fontWeight:700 }}>
                {step > i+1 ? "✓" : i+1}
              </div>
              <span className="text-muted-foreground" style={{ fontSize:"12px" }}>{s}</span>
              {i < 2 && <div className="h-px w-6 bg-border" />}
            </div>
          ))}
        </div>
        <form onSubmit={handleNext} className="space-y-5">
          {step === 1 && <>
            <div className="grid grid-cols-2 gap-4">
              <AXInput label="First name" placeholder="Jane" required value={form.firstName} onChange={(e) => setForm((s) => ({ ...s, firstName: e.target.value }))} />
              <AXInput label="Last name" placeholder="Smith" required value={form.lastName} onChange={(e) => setForm((s) => ({ ...s, lastName: e.target.value }))} />
            </div>
            <AXInput label="Work email" placeholder="jane@company.com" type="email" required value={form.email} onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))} />
            <AXInput label="Company / Brand name" placeholder="Acme Inc." required value={form.company} onChange={(e) => setForm((s) => ({ ...s, company: e.target.value }))} />
            <AXInput label="Website (if you have one)" placeholder="https://acme.com" optional />
          </>}
          {step === 2 && <>
            <AXSelect label="Primary service needed" value={form.service} onChange={(e) => setForm((s) => ({ ...s, service: e.target.value }))} options={[{ value:"", label:"Select…" },{ value:"brand", label:"Brand Identity" },{ value:"web", label:"Web Design" },{ value:"dev", label:"Web Development" },{ value:"seo", label:"SEO" },{ value:"full", label:"Full Package" }]} />
            <AXTextarea label="Describe your project" placeholder="What are you trying to achieve? Who is your audience? What does success look like?" rows={5} value={form.projectSummary} onChange={(e) => setForm((s) => ({ ...s, projectSummary: e.target.value }))} />
            <AXTextarea label="What inspired this brief?" placeholder="Are there brands or websites you admire?" rows={3} optional value={form.inspiration} onChange={(e) => setForm((s) => ({ ...s, inspiration: e.target.value }))} />
          </>}
          {step === 3 && <>
            <AXSelect label="Budget range" value={form.budget} onChange={(e) => setForm((s) => ({ ...s, budget: e.target.value }))} options={[{ value:"", label:"Select…" },{ value:"50k-1L", label:"₹50,000–₹1,00,000" },{ value:"1L-2.5L", label:"₹1,00,000–₹2,50,000" },{ value:"2.5L-5L", label:"₹2,50,000–₹5,00,000" },{ value:"5L+", label:"₹5,00,000+" }]} />
            <AXSelect label="Ideal start date" value={form.startDate} onChange={(e) => setForm((s) => ({ ...s, startDate: e.target.value }))} options={[{ value:"", label:"When do you want to start?" },{ value:"asap", label:"As soon as possible" },{ value:"4w", label:"Within 4 weeks" },{ value:"2m", label:"1–2 months" }]} />
            <AXCheckbox label="I understand this is a project brief, not a contract." checked={agreed} onChange={setAgreed} description="We'll review and respond within 24 hours." />
          </>}
          {error && <p className="text-red-600" style={{ fontSize: "12px" }}>{error}</p>}
          <div className="flex items-center justify-between pt-2">
            {step > 1 ? <button type="button" onClick={() => setStep(step-1)} className="text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize:"13px" }}>← Back</button> : <div />}
            <button type="submit" disabled={loading || (step===3 && !agreed)} className="flex items-center gap-2 bg-foreground text-background px-6 py-2.5 rounded-xl hover:bg-foreground/90 disabled:opacity-40 transition-all" style={{ fontSize:"13px", fontWeight:600 }}>
              {loading ? "Sending…" : step===3 ? "Submit Brief" : "Continue"} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
