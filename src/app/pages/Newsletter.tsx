import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Check } from "lucide-react";
import SEO from "../components/SEO";
import { subscribeNewsletter } from "../lib/api";

const previews = ["The Case for Systematic Design","Motion Design in Enterprise Software","Choosing Type for Digital Products","SEO for Creative Agencies"];

export default function Newsletter() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await subscribeNewsletter(email);
      navigate("/thank-you");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to subscribe");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-background min-h-[80vh] flex items-center justify-center px-5 py-20">
      <SEO title="Newsletter" description="Monthly design insights, brand strategy, and creative process articles from Aesthetix Studio. Subscribe for free." url="/newsletter" />
      <div className="max-w-md w-full">
        <div className="w-12 h-12 rounded-2xl bg-brand-muted flex items-center justify-center mb-6"><Mail className="w-6 h-6 text-brand" /></div>
        <h1 className="text-foreground mb-3" style={{ fontSize:"clamp(26px,4vw,38px)", fontWeight:800, letterSpacing:"-0.025em", lineHeight:1.15 }}>Design thinking,<br />delivered monthly.</h1>
        <p className="text-muted-foreground mb-6" style={{ fontSize:"16px", lineHeight:1.7 }}>Monthly dispatches on design, brand strategy, and the craft. No fluff — just things we're genuinely thinking about.</p>
        <div className="bg-card border border-border rounded-xl p-4 mb-6">
          <p className="text-muted-foreground mb-3" style={{ fontSize:"12px", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.07em" }}>Recent articles</p>
          <ul className="space-y-2">
            {previews.map(p => (
              <li key={p} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-success shrink-0" />
                <span className="text-muted-foreground" style={{ fontSize:"13px" }}>{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required className="w-full h-10 px-4 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/30" style={{ fontSize:"14px" }} />
          {error && <p className="text-red-600" style={{ fontSize: "12px" }}>{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-2.5 rounded-xl bg-brand text-white hover:bg-brand-hover disabled:opacity-50 transition-colors" style={{ fontSize:"14px", fontWeight:600 }}>
            {loading ? "Subscribing…" : "Subscribe — it's free"}
          </button>
        </form>
        <p className="text-muted-foreground mt-3 text-center" style={{ fontSize:"12px" }}>Monthly, max. Unsubscribe anytime.</p>
      </div>
    </div>
  );
}
