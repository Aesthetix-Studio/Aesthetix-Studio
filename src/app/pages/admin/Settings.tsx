import { useState, useEffect } from "react";
import { Wrench, Users, CreditCard, Plug, Bell, Save, Loader2 } from "lucide-react";
import { AXSwitch, AXInput, AXSelect } from "../../components/ds-forms";
import { fetchSettings, saveSettings, fetchTeam } from "../../lib/api";

const tabs = ["General", "Team", "Billing", "Integrations", "Notifications"] as const;
type Tab = typeof tabs[number];

const featureFlags = [
  { key: "portal", label: "Client Portal", desc: "Enable the client-facing project portal" },
  { key: "invoicing", label: "Invoicing", desc: "Show invoicing features in admin and portal" },
  { key: "messages", label: "Messaging", desc: "Enable in-app messaging between team and clients" },
  { key: "calendar", label: "Calendar sync", desc: "Sync events with Google Calendar" },
];

const timezoneOptions = [
  { value: "Asia/Kolkata", label: "India Standard Time (IST)" },
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "Europe/London", label: "London (GMT)" },
];

export default function AdminSettings() {
  const [tab, setTab] = useState<Tab>("General");
  const [flags, setFlags] = useState<Record<string, boolean>>({
    portal: true, invoicing: true, messages: true, calendar: false,
  });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [studioName, setStudioName] = useState("Aesthetix Studio");
  const [studioEmail, setStudioEmail] = useState("hello@aesthetixstudio.dev");
  const [studioWebsite, setStudioWebsite] = useState("https://aesthetixstudio.dev");
  const [studioTimezone, setStudioTimezone] = useState("Asia/Kolkata");
  const [team, setTeam] = useState<{ id: string; name: string; role: string; email: string; avatar: string; color: string; status: string }[]>([]);
  const [teamLoading, setTeamLoading] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");

  useEffect(() => {
    fetchSettings().then((res) => {
      const s = res.settings;
      if (s.studioName) setStudioName(String(s.studioName));
      if (s.studioEmail) setStudioEmail(String(s.studioEmail));
      if (s.studioWebsite) setStudioWebsite(String(s.studioWebsite));
      if (s.studioTimezone) setStudioTimezone(String(s.studioTimezone));
      if (s.featureFlags && typeof s.featureFlags === "object") setFlags(s.featureFlags as Record<string, boolean>);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (tab === "Team") {
      setTeamLoading(true);
      fetchTeam().then((res) => setTeam(res.team)).catch(() => {}).finally(() => setTeamLoading(false));
    }
  }, [tab]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveSettings({ studioName, studioEmail, studioWebsite, studioTimezone, featureFlags: flags });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {} finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1 text-sm">Configure your studio workspace.</p>
      </div>

      <div className="flex gap-1 p-1 rounded-xl bg-secondary w-fit">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg transition-all whitespace-nowrap text-[13px] font-medium ${tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === "General" && (
        <div className="space-y-5 max-w-xl">
          <div className="rounded-2xl p-6 border border-border bg-card">
            <h2 className="text-foreground mb-5 text-base font-semibold">Studio Details</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <AXInput label="Studio Name" value={studioName} onChange={(e) => setStudioName(e.target.value)} />
              <AXInput label="Contact Email" type="email" value={studioEmail} onChange={(e) => setStudioEmail(e.target.value)} />
              <AXInput label="Website" type="url" value={studioWebsite} onChange={(e) => setStudioWebsite(e.target.value)} />
              <AXSelect label="Timezone" options={timezoneOptions} value={studioTimezone} onChange={(e) => setStudioTimezone(e.target.value)} />
              <div className="flex items-center gap-3 pt-2">
                <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2 rounded-xl bg-brand text-white hover:bg-brand/90 transition-all text-sm font-semibold disabled:opacity-50">
                  {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  {saving ? "Saving..." : "Save changes"}
                </button>
                {saved && <span className="text-green-500 text-sm">Saved!</span>}
              </div>
            </form>
          </div>

          <div className="rounded-2xl p-6 border border-border bg-card">
            <h2 className="text-foreground mb-5 text-base font-semibold">Feature Flags</h2>
            <div className="space-y-1">
              {featureFlags.map((f) => (
                <div key={f.key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="text-foreground text-[13px] font-medium">{f.label}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs">{f.desc}</p>
                  </div>
                  <AXSwitch checked={flags[f.key]} onChange={(v) => setFlags((prev) => ({ ...prev, [f.key]: v }))} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "Team" && (
        <div className="space-y-5 max-w-xl">
          <div className="rounded-2xl p-6 border border-border bg-card">
            <div className="flex items-center gap-2 mb-5">
              <Users className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-foreground text-base font-semibold">Team Members</h2>
            </div>
            {teamLoading ? (
              <p className="text-muted-foreground text-sm py-4">Loading team...</p>
            ) : team.length === 0 ? (
              <p className="text-muted-foreground text-sm py-4">No team members yet.</p>
            ) : (
              <div className="space-y-3 mb-6">
                {team.map((m) => (
                  <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl border border-border">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0" style={{ background: m.color, fontSize: "11px", fontWeight: 700 }}>
                      {m.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground truncate" style={{ fontSize: "13px", fontWeight: 600 }}>{m.name}</p>
                      <p className="text-muted-foreground truncate" style={{ fontSize: "11px" }}>{m.role} · {m.email}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: m.status === "Active" ? "#16A34A18" : "#73737018", color: m.status === "Active" ? "#16A34A" : "#737370" }}>
                      {m.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "Billing" && (
        <div className="space-y-5 max-w-xl">
          <div className="rounded-2xl p-6 border border-border bg-card">
            <div className="flex items-center gap-2 mb-5">
              <CreditCard className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-foreground text-base font-semibold">Billing & Payments</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-secondary">
                <p className="text-foreground text-sm font-medium">Razorpay Integration</p>
                <p className="text-muted-foreground text-xs mt-1">Payment processing is active. All transactions are handled securely through Razorpay.</p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-green-600 text-xs font-medium">Connected</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-secondary">
                <p className="text-foreground text-sm font-medium">Invoice Settings</p>
                <p className="text-muted-foreground text-xs mt-1">Invoices are generated automatically. Payment terms: 50% upfront, 50% on completion.</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary">
                <p className="text-foreground text-sm font-medium">Payment Methods</p>
                <p className="text-muted-foreground text-xs mt-1">UPI, Netbanking, Cards, and Wallets are enabled through Razorpay.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "Integrations" && (
        <div className="space-y-5 max-w-xl">
          <div className="rounded-2xl p-6 border border-border bg-card">
            <div className="flex items-center gap-2 mb-5">
              <Plug className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-foreground text-base font-semibold">Integrations</h2>
            </div>
            <div className="space-y-3">
              {[
                { name: "Supabase", desc: "Authentication & database", status: "Connected", connected: true },
                { name: "Cloudflare", desc: "Hosting & CDN", status: "Connected", connected: true },
                { name: "Razorpay", desc: "Payment processing", status: "Connected", connected: true },
                { name: "Google Analytics", desc: "Website analytics", status: "Configure VITE_GA4_ID", connected: false },
                { name: "Microsoft Clarity", desc: "Session recordings", status: "Configure VITE_CLARITY_ID", connected: false },
              ].map((i) => (
                <div key={i.name} className="flex items-center justify-between p-3 rounded-xl border border-border">
                  <div>
                    <p className="text-foreground text-sm font-medium">{i.name}</p>
                    <p className="text-muted-foreground text-xs">{i.desc}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${i.connected ? "bg-green-500" : "bg-yellow-500"}`} />
                    <span className={`text-xs font-medium ${i.connected ? "text-green-600" : "text-yellow-600"}`}>{i.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "Notifications" && (
        <div className="space-y-5 max-w-xl">
          <div className="rounded-2xl p-6 border border-border bg-card">
            <div className="flex items-center gap-2 mb-5">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-foreground text-base font-semibold">Notification Preferences</h2>
            </div>
            <div className="space-y-1">
              {[
                { key: "new_lead", label: "New lead submissions", desc: "Get notified when a new lead is submitted" },
                { key: "payment_received", label: "Payment received", desc: "Get notified when a payment is processed" },
                { key: "project_update", label: "Project updates", desc: "Get notified when project status changes" },
                { key: "message_received", label: "New messages", desc: "Get notified when you receive a message" },
                { key: "weekly_report", label: "Weekly report", desc: "Receive a weekly summary of studio activity" },
              ].map((n) => (
                <div key={n.key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="text-foreground text-[13px] font-medium">{n.label}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs">{n.desc}</p>
                  </div>
                  <AXSwitch checked={flags[n.key] ?? true} onChange={(v) => setFlags((prev) => ({ ...prev, [n.key]: v }))} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
