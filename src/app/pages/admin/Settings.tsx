import { useState } from "react";
import { Wrench } from "lucide-react";
import { AXSwitch, AXInput, AXSelect } from "../../components/ds-forms";

const tabs = ["General", "Team", "Billing", "Integrations", "Notifications"] as const;
type Tab = typeof tabs[number];

const featureFlags = [
  { key: "portal", label: "Client Portal", desc: "Enable the client-facing project portal" },
  { key: "invoicing", label: "Invoicing", desc: "Show invoicing features in admin and portal" },
  { key: "messages", label: "Messaging", desc: "Enable in-app messaging between team and clients" },
  { key: "calendar", label: "Calendar sync", desc: "Sync events with Google Calendar" },
];

const timezoneOptions = [
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "Europe/London", label: "London (GMT)" },
];

export default function AdminSettings() {
  const [tab, setTab] = useState<Tab>("General");
  const [flags, setFlags] = useState<Record<string, boolean>>({
    portal: true,
    invoicing: true,
    messages: true,
    calendar: false,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1 text-sm">Configure your studio workspace.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-secondary w-fit">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg transition-all whitespace-nowrap text-[13px] font-medium ${
              tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* General Tab */}
      {tab === "General" && (
        <div className="space-y-5 max-w-xl">
          {/* Studio Details */}
          <div className="rounded-2xl p-6 border border-border bg-card">
            <h2 className="text-foreground mb-5 text-base font-semibold">Studio Details</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <AXInput label="Studio Name" defaultValue="Aesthetix Studio" />
              <AXInput label="Contact Email" type="email" defaultValue="hello@aesthetix.studio" />
              <AXInput label="Website" type="url" defaultValue="https://aesthetix.studio" />
              <AXSelect label="Timezone" options={timezoneOptions} defaultValue="America/Los_Angeles" />
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand text-white hover:bg-brand/90 transition-all text-sm font-semibold"
                >
                  Save changes
                </button>
                {saved && <span className="text-green-500 text-sm">Saved!</span>}
              </div>
            </form>
          </div>

          {/* Feature Flags */}
          <div className="rounded-2xl p-6 border border-border bg-card">
            <h2 className="text-foreground mb-5 text-base font-semibold">Feature Flags</h2>
            <div className="space-y-1">
              {featureFlags.map((f) => (
                <div
                  key={f.key}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div>
                    <p className="text-foreground text-[13px] font-medium">{f.label}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs">{f.desc}</p>
                  </div>
                  <AXSwitch
                    checked={flags[f.key]}
                    onChange={(v) => setFlags((prev) => ({ ...prev, [f.key]: v }))}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Other tabs — Coming Soon */}
      {tab !== "General" && (
        <div className="rounded-2xl p-12 border border-border bg-card flex flex-col items-center justify-center text-center max-w-xl">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-secondary">
            <Wrench className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-foreground mb-2 text-base font-semibold">{tab} Settings</p>
          <p className="text-muted-foreground text-sm">This section is coming soon. Check back in the next update.</p>
        </div>
      )}
    </div>
  );
}
