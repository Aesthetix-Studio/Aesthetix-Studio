import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Check, ArrowRight, Loader2 } from "lucide-react";
import SEO from "../components/SEO";
import { createOrder, openRazorpayCheckout, verifyPayment } from "../lib/razorpay";
import { getSession } from "../lib/session";
import { captureError } from "../lib/error-tracking";

const plans = [
  { name:"Starter", price:"₹25,000", priceAmount:2500000, sub:"project", desc:"For early-stage founders needing a strong foundation.", features:["Brand identity kit","5-page website","Basic SEO setup","2 revision rounds","3-week delivery","Style guide PDF"], cta:"Get Started", pop:false, href:"/inquiry" },
  { name:"Growth", price:"₹75,000", priceAmount:7500000, sub:"project", desc:"Complete brand and web for teams ready to scale.", features:["Full brand system","Custom website (8 pages)","SEO + analytics","Motion assets","4 revision rounds","6-week delivery","Design handoff","30-day support"], cta:"Start Project", pop:true, href:"/discovery-call" },
  { name:"Enterprise", price:"Custom", priceAmount:0, sub:"engagement", desc:"Dedicated team for complex multi-channel work.", features:["End-to-end design system","Product UI/UX","Ongoing retainer available","Priority delivery","Dedicated PM","Unlimited revisions"], cta:"Contact Sales", pop:false, href:"/contact" },
];

const addons = [
  { name:"SEO Monthly Retainer", price:"From ₹15,000/mo", desc:"Ongoing optimization, content strategy, and monthly reporting." },
  { name:"Design Retainer", price:"From ₹25,000/mo", desc:"On-call design support for new pages, campaigns, and iterations." },
  { name:"Motion Package", price:"From ₹12,000", desc:"Animated logo, hero section motion, and micro-interactions." },
];

export default function Pricing() {
  const navigate = useNavigate();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleCheckout = async (plan: typeof plans[0]) => {
    if (plan.priceAmount === 0) return;

    if (!getSession()) {
      navigate("/auth/login", { state: { from: "/pricing" } });
      return;
    }

    setLoadingPlan(plan.name);
    try {
      const order = await createOrder(plan.priceAmount, { plan: plan.name.toLowerCase() });
      openRazorpayCheckout({
        orderId: order.orderId,
        amount: order.amount,
        currency: order.currency,
        key: order.keyId,
        name: "Aesthetix Studio",
        description: `${plan.name} Plan — ${plan.price}`,
        onSuccess: async (response) => {
          await verifyPayment(response);
          window.location.href = "/thank-you";
        },
        onDismiss: () => setLoadingPlan(null),
      });
    } catch (err) {
      captureError(err, { context: "pricing-checkout" });
      setLoadingPlan(null);
    }
  };

  return (
    <div className="bg-background">
      <SEO
        title="Pricing"
        description="Simple, transparent pricing for brand identity, web design, and development. Fixed-price projects with everything included upfront."
        url="/pricing"
      />
      <section className="border-b border-border py-16 px-5 sm:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-muted-foreground mb-3" style={{ fontSize:"11px", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.1em" }}>Pricing</p>
          <h1 className="text-foreground mb-4" style={{ fontSize:"clamp(30px,5vw,50px)", fontWeight:800, letterSpacing:"-0.03em", lineHeight:1.1 }}>Simple, transparent pricing.</h1>
          <p className="text-muted-foreground" style={{ fontSize:"17px", lineHeight:1.65 }}>No hidden fees. No surprise invoices. Fixed-price projects with everything included upfront.</p>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16 items-start">
          {plans.map(p => (
            <div key={p.name} className={`relative bg-card rounded-2xl border overflow-hidden ${p.pop ? "border-brand shadow-brand scale-[1.02]" : "border-border hover:shadow-md transition-shadow"}`}>
              {p.pop && <div className="bg-brand text-white text-center py-1.5" style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.04em" }}>MOST POPULAR</div>}
              <div className="p-6">
                <h3 className="text-foreground mb-1" style={{ fontSize:"16px", fontWeight:700 }}>{p.name}</h3>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="text-foreground" style={{ fontSize:"36px", fontWeight:800, letterSpacing:"-0.03em" }}>{p.price}</span>
                  {p.price !== "Custom" && <span className="text-muted-foreground" style={{ fontSize:"14px" }}>/ {p.sub}</span>}
                </div>
                <p className="text-muted-foreground mb-6" style={{ fontSize:"13px", lineHeight:1.55 }}>{p.desc}</p>
                <ul className="space-y-2.5 mb-6">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-success-muted flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-success" strokeWidth={3} />
                      </div>
                      <span className="text-muted-foreground" style={{ fontSize:"13px" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                {p.priceAmount > 0 ? (
                  <button
                    onClick={() => handleCheckout(p)}
                    disabled={loadingPlan !== null}
                    className={`flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl transition-colors ${p.pop ? "bg-brand text-white hover:bg-brand-hover" : "bg-secondary text-foreground hover:bg-secondary/70 border border-border"}`}
                    style={{ fontSize:"13px", fontWeight:600 }}
                  >
                    {loadingPlan === p.name ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <>{p.cta} <ArrowRight className="w-3.5 h-3.5" /></>}
                  </button>
                ) : (
                  <Link to={p.href} className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl no-underline transition-colors ${p.pop ? "bg-brand text-white hover:bg-brand-hover" : "bg-secondary text-foreground hover:bg-secondary/70 border border-border"}`} style={{ fontSize:"13px", fontWeight:600 }}>
                    {p.cta} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mb-14">
          <h2 className="text-foreground mb-6" style={{ fontSize:"20px", fontWeight:700, letterSpacing:"-0.01em" }}>Add-ons & Retainers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {addons.map(a => (
              <div key={a.name} className="bg-card border border-border rounded-xl p-5">
                <h3 className="text-foreground mb-1" style={{ fontSize:"14px", fontWeight:700 }}>{a.name}</h3>
                <p className="text-brand mb-2" style={{ fontSize:"14px", fontWeight:600 }}>{a.price}</p>
                <p className="text-muted-foreground" style={{ fontSize:"13px", lineHeight:1.55 }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center bg-secondary/50 rounded-2xl border border-border p-8">
          <p className="text-foreground mb-2" style={{ fontSize:"17px", fontWeight:700 }}>Not sure which plan is right for you?</p>
          <p className="text-muted-foreground mb-5" style={{ fontSize:"14px" }}>Book a free 30-minute discovery call — we'll recommend the right approach.</p>
          <Link to="/discovery-call" className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-3.5 rounded-xl no-underline hover:bg-foreground/90 transition-colors" style={{ fontSize:"13px", fontWeight:600 }}>
            Book Discovery Call <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
