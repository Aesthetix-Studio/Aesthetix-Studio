import { useState } from "react";
import { Calendar, Clock, Video, Check } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { AXInput } from "../components/ds-forms";
import { submitDiscoveryCall } from "../lib/api";

const slots = ["9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","2:00 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM"];
const days = ["Mon Jun 23","Tue Jun 24","Wed Jun 25","Thu Jun 26","Fri Jun 27"];
const includes = ["We listen first — no pitch","Project scope assessment","Honest fit assessment","Preliminary timeline estimate","Next steps (if it's a match)"];

export default function DiscoveryCall() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState<number|null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (selectedTime === null) return;
    setLoading(true);
    setError(null);
    try {
      await submitDiscoveryCall({
        name,
        email,
        day: days[selectedDay],
        time: slots[selectedTime],
      });
      navigate("/thank-you");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to book call");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background">
      <section className="border-b border-border py-14 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-muted-foreground mb-3" style={{ fontSize:"11px", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.1em" }}>Book a Call</p>
          <h1 className="text-foreground mb-3" style={{ fontSize:"clamp(28px,4.5vw,46px)", fontWeight:800, letterSpacing:"-0.03em", lineHeight:1.1 }}>30-minute discovery call.</h1>
          <p className="text-muted-foreground" style={{ fontSize:"17px", lineHeight:1.65 }}>No pitch, no pressure. We'll talk about your goals and figure out if we're the right fit.</p>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-foreground mb-5" style={{ fontSize:"16px", fontWeight:700 }}>Select a time</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <AXInput label="Your name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith" />
              <AXInput label="Work email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@company.com" type="email" />
            </div>
            <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
              {days.map((d, i) => (
                <button key={d} onClick={() => { setSelectedDay(i); setSelectedTime(null); }} className="flex flex-col items-center px-3 py-2 rounded-xl border shrink-0 transition-all" style={{ minWidth:"80px", background:selectedDay===i?"var(--foreground)":"var(--secondary)", borderColor:selectedDay===i?"var(--foreground)":"var(--border)", color:selectedDay===i?"var(--background)":"var(--muted-foreground)" }}>
                  <span style={{ fontSize:"10px", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em" }}>{d.split(" ")[0]}</span>
                  <span style={{ fontSize:"14px", fontWeight:700 }}>{d.split(" ")[1]}</span>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {slots.map((t, i) => (
                <button key={t} onClick={() => setSelectedTime(i)} className="py-2.5 rounded-xl border text-center transition-all" style={{ fontSize:"13px", fontWeight:500, background:selectedTime===i?"var(--brand)":"var(--secondary)", borderColor:selectedTime===i?"var(--brand)":"var(--border)", color:selectedTime===i?"#fff":"var(--foreground)" }}>
                  {t}
                </button>
              ))}
            </div>
            {error && <p className="text-red-600 mt-4" style={{ fontSize: "12px" }}>{error}</p>}
            {selectedTime !== null && (
              <button onClick={handleSubmit} disabled={loading || !name || !email} className="w-full mt-5 py-3 rounded-xl bg-brand text-white hover:bg-brand-hover disabled:opacity-50 transition-colors" style={{ fontSize:"14px", fontWeight:600 }}>
                {loading ? "Booking…" : `Confirm — ${days[selectedDay]} at ${slots[selectedTime]}`}
              </button>
            )}
          </div>
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="text-foreground mb-4" style={{ fontSize:"14px", fontWeight:700 }}>Call details</h3>
              <div className="space-y-3">
                {[{ icon:Clock, text:"30 minutes" },{ icon:Video, text:"Google Meet (link sent by email)" },{ icon:Calendar, text:"Mon–Fri, 9am–5pm ET" }].map(({ icon:Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5"><Icon className="w-4 h-4 text-muted-foreground" /><span className="text-muted-foreground" style={{ fontSize:"13px" }}>{text}</span></div>
                ))}
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="text-foreground mb-3" style={{ fontSize:"14px", fontWeight:700 }}>What we'll cover</h3>
              <ul className="space-y-2">
                {includes.map(i => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-success shrink-0" />
                    <span className="text-muted-foreground" style={{ fontSize:"13px" }}>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-muted-foreground" style={{ fontSize:"12px" }}>
              Prefer email? <Link to="/contact" className="text-brand hover:underline no-underline">hello@aesthetix.studio</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
