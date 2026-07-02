import { useState } from "react";
import { AXSwitch } from "../../components/ds-forms";

const tabs = ["Profile", "Notifications", "Security"] as const;
type Tab = typeof tabs[number];

const notifications = [
  { key: "project_updates", label: "Project updates", desc: "When a project milestone is reached or status changes" },
  { key: "new_messages", label: "New messages", desc: "When you receive a new message from your studio team" },
  { key: "invoice_alerts", label: "Invoice alerts", desc: "When a new invoice is issued or payment is due" },
  { key: "file_uploads", label: "File uploads", desc: "When new files are shared with you" },
];

export default function PortalSettings() {
  const [tab, setTab] = useState<Tab>("Profile");
  const [notifs, setNotifs] = useState<Record<string, boolean>>({
    project_updates: true,
    new_messages: true,
    invoice_alerts: true,
    file_uploads: false,
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
        <h1 className="text-foreground" style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.02em" }}>Settings</h1>
        <p className="text-muted-foreground mt-1" style={{ fontSize: "14px" }}>Manage your account preferences.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl" style={{ background: "var(--secondary)", width: "fit-content" }}>
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 rounded-lg transition-all"
            style={{
              fontSize: "13px",
              fontWeight: 500,
              background: tab === t ? "var(--card)" : "transparent",
              color: tab === t ? "var(--foreground)" : "var(--muted-foreground)",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {tab === "Profile" && (
        <div className="rounded-2xl p-6 border max-w-xl" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h2 className="text-foreground mb-5" style={{ fontSize: "15px", fontWeight: 600 }}>Profile Information</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-foreground mb-1.5" style={{ fontSize: "13px", fontWeight: 500 }}>First name</label>
                <input
                  type="text"
                  defaultValue="Sarah"
                  className="w-full h-10 px-3 rounded-xl border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                  style={{ fontSize: "14px" }}
                />
              </div>
              <div>
                <label className="block text-foreground mb-1.5" style={{ fontSize: "13px", fontWeight: 500 }}>Last name</label>
                <input
                  type="text"
                  defaultValue="Chen"
                  className="w-full h-10 px-3 rounded-xl border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>
            <div>
              <label className="block text-foreground mb-1.5" style={{ fontSize: "13px", fontWeight: 500 }}>Email</label>
              <input
                type="email"
                defaultValue="sarah@luminary.io"
                className="w-full h-10 px-3 rounded-xl border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                style={{ fontSize: "14px" }}
              />
            </div>
            <div>
              <label className="block text-foreground mb-1.5" style={{ fontSize: "13px", fontWeight: 500 }}>Company</label>
              <input
                type="text"
                defaultValue="Luminary Financial"
                className="w-full h-10 px-3 rounded-xl border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                style={{ fontSize: "14px" }}
              />
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-all"
                style={{ fontSize: "13px", fontWeight: 600 }}
              >
                Save changes
              </button>
              {saved && <span className="text-green-500" style={{ fontSize: "13px" }}>Saved!</span>}
            </div>
          </form>
        </div>
      )}

      {/* Notifications Tab */}
      {tab === "Notifications" && (
        <div className="rounded-2xl p-6 border max-w-xl" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h2 className="text-foreground mb-5" style={{ fontSize: "15px", fontWeight: 600 }}>Notification Preferences</h2>
          <div className="space-y-1">
            {notifications.map((n) => (
              <div
                key={n.key}
                className="flex items-center justify-between py-4 border-b last:border-0"
                style={{ borderColor: "var(--border)" }}
              >
                <div>
                  <p className="text-foreground" style={{ fontSize: "13px", fontWeight: 500 }}>{n.label}</p>
                  <p className="text-muted-foreground mt-0.5" style={{ fontSize: "12px" }}>{n.desc}</p>
                </div>
                <AXSwitch
                  checked={notifs[n.key]}
                  onChange={(v) => setNotifs((prev) => ({ ...prev, [n.key]: v }))}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security Tab */}
      {tab === "Security" && (
        <div className="rounded-2xl p-6 border max-w-xl" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h2 className="text-foreground mb-5" style={{ fontSize: "15px", fontWeight: 600 }}>Change Password</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-foreground mb-1.5" style={{ fontSize: "13px", fontWeight: 500 }}>Current password</label>
              <input
                type="password"
                placeholder="••••••••"
                required
                className="w-full h-10 px-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/30"
                style={{ fontSize: "14px" }}
              />
            </div>
            <div>
              <label className="block text-foreground mb-1.5" style={{ fontSize: "13px", fontWeight: 500 }}>New password</label>
              <input
                type="password"
                placeholder="••••••••"
                required
                className="w-full h-10 px-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/30"
                style={{ fontSize: "14px" }}
              />
            </div>
            <div>
              <label className="block text-foreground mb-1.5" style={{ fontSize: "13px", fontWeight: 500 }}>Confirm new password</label>
              <input
                type="password"
                placeholder="••••••••"
                required
                className="w-full h-10 px-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/30"
                style={{ fontSize: "14px" }}
              />
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-all"
                style={{ fontSize: "13px", fontWeight: 600 }}
              >
                Update password
              </button>
              {saved && <span className="text-green-500" style={{ fontSize: "13px" }}>Updated!</span>}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
