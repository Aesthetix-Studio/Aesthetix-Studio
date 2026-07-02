import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Mail, Phone, Globe, Clock, PhoneCall, UserCheck } from "lucide-react";
import { fetchLead, type LeadRow } from "../../lib/leads";

const statusColors: Record<string, string> = {
  "Hot": "#EF4444", "Warm": "#F59E0B", "Cold": "#737370",
};

const activity = [
  { type: "note", text: "Added initial notes after discovery call.", time: "Jun 18, 2026 · 2:14 PM", by: "Mia Chen" },
  { type: "email", text: "Sent intro email with portfolio and pricing tiers.", time: "Jun 18, 2026 · 3:00 PM", by: "Anna Reeves" },
  { type: "meeting", text: "15-min call booked for June 20 via Calendly.", time: "Jun 19, 2026 · 10:30 AM", by: "Mia Chen" },
  { type: "status", text: "Status updated from Warm → Hot after discovery call.", time: "Jun 20, 2026 · 4:45 PM", by: "Anna Reeves" },
];

export default function AdminLeadDetails() {
  const { id } = useParams();
  const [lead, setLead] = useState<LeadRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      if (!id) {
        setError("Missing lead id");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const result = await fetchLead(id);
        if (!active) return;
        setLead(result);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Failed to load lead");
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [id]);

  const sc = statusColors[lead?.status ?? ""] ?? "#737370";

  return (
    <div className="space-y-6">
      <Link
        to="/admin/leads"
        className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors no-underline text-[13px]"
      >
        <ArrowLeft className="w-4 h-4" /> Back to leads
      </Link>

      {loading ? (
        <div className="rounded-2xl p-6 border border-border bg-card">
          Loading lead details...
        </div>
      ) : error ? (
        <div className="rounded-2xl p-6 border border-border bg-card">
          {error}
        </div>
      ) : lead ? (
        <>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-foreground">{lead.name}</h1>
              <p className="text-muted-foreground mt-1 text-sm">{lead.company} · {lead.service}</p>
            </div>
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: `${sc}18`, color: sc }}
            >
              {lead.status}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-5">
              <div className="rounded-2xl p-5 border border-border bg-card">
                <h2 className="text-foreground mb-4 text-sm font-semibold">Contact Details</h2>
                <div className="space-y-3">
                  {[
                    { icon: Mail, label: "Email", value: lead.email },
                    { icon: Phone, label: "Phone", value: lead.phone },
                    { icon: Globe, label: "Source", value: lead.source },
                    { icon: Clock, label: "Date Added", value: lead.date },
                  ].map((d) => (
                    <div key={d.label} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-secondary">
                        <d.icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-muted-foreground text-[11px]">{d.label}</p>
                        <p className="text-foreground text-[13px] font-medium">{d.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-5 border border-border bg-card">
                <h2 className="text-foreground mb-3 text-sm font-semibold">Notes</h2>
                <textarea
                  defaultValue={lead.notes}
                  rows={4}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none text-[13px]"
                />
                <button className="mt-3 px-4 py-2 rounded-xl bg-brand text-white hover:bg-brand/90 transition-all text-sm font-semibold">
                  Save notes
                </button>
              </div>

              <div className="rounded-2xl p-5 border border-border bg-card">
                <h2 className="text-foreground mb-4 text-sm font-semibold">Activity Log</h2>
                <div className="space-y-4">
                  {activity.map((a, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-secondary">
                        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-foreground text-[13px]">{a.text}</p>
                        <p className="text-muted-foreground mt-0.5 text-[11px]">{a.time} · by {a.by}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl p-5 border border-border bg-card">
                <h2 className="text-foreground mb-4 text-sm font-semibold">Lead Details</h2>
                <div className="space-y-3">
                  {[
                    { label: "Service", value: lead.service },
                    { label: "Budget", value: lead.budget },
                    { label: "Source", value: lead.source },
                    { label: "Status", value: lead.status },
                    { label: "Added", value: lead.date },
                  ].map((d) => (
                    <div key={d.label} className="flex items-center justify-between border-b border-border/50 pb-2 last:border-0">
                      <span className="text-muted-foreground text-xs">{d.label}</span>
                      <span className="text-foreground text-xs font-medium">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border text-foreground hover:bg-secondary transition-all text-sm font-semibold">
                  <PhoneCall className="w-4 h-4" />
                  Schedule Call
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand text-white hover:bg-brand/90 transition-all text-sm font-semibold">
                  <UserCheck className="w-4 h-4" />
                  Convert to Client
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
