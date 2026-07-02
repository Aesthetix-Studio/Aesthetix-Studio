import { Link } from "react-router";
import { mockProjects, mockMessages, mockInvoices } from "../../lib/data";
import { FolderOpen, MessageSquare, FileText, Calendar, Download, ChevronRight } from "lucide-react";

const recentFiles = [
  { name: "Luminary_Brand_Guidelines_v2.pdf", size: "4.2 MB", date: "Jun 20, 2026" },
  { name: "Homepage_Design_Final.fig", size: "18.6 MB", date: "Jun 18, 2026" },
  { name: "Logo_Package.zip", size: "2.1 MB", date: "Jun 15, 2026" },
];

export default function PortalDashboard() {
  const activeProject = mockProjects[0];

  const stats = [
    { label: "Active Projects", value: "1", icon: FolderOpen, color: "#6150F6" },
    { label: "Open Messages", value: "2", icon: MessageSquare, color: "#3B82F6" },
    { label: "Pending Invoice", value: "₹2.25L", icon: FileText, color: "#F59E0B" },
    { label: "Days to Delivery", value: "26", icon: Calendar, color: "#10B981" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-foreground" style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.02em" }}>
          Good morning, Sarah Chen 👋
        </h1>
        <p className="text-muted-foreground mt-1" style={{ fontSize: "14px" }}>
          Here's what's happening with your projects.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl p-4 border"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{s.label}</span>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${s.color}18` }}
              >
                <s.icon className="w-4 h-4" style={{ color: s.color }} />
              </div>
            </div>
            <div className="text-foreground" style={{ fontSize: "24px", fontWeight: 700 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Active Project */}
        <div
          className="lg:col-span-2 rounded-2xl p-5 border"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-foreground" style={{ fontSize: "14px", fontWeight: 600 }}>Active Project</h2>
            <Link
              to="/portal/projects/p1"
              className="text-muted-foreground hover:text-foreground no-underline flex items-center gap-1 transition-colors"
              style={{ fontSize: "12px" }}
            >
              View details <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="mb-1 flex items-center justify-between">
            <h3 className="text-foreground" style={{ fontSize: "16px", fontWeight: 700 }}>{activeProject.name}</h3>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: "#6150F618", color: "#6150F6", fontSize: "11px", fontWeight: 600 }}
            >
              {activeProject.status}
            </span>
          </div>
          <p className="text-muted-foreground mb-4" style={{ fontSize: "13px" }}>{activeProject.type} · Due {activeProject.dueDate}</p>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-muted-foreground" style={{ fontSize: "12px" }}>Overall progress</span>
            <span className="text-foreground" style={{ fontSize: "12px", fontWeight: 600 }}>{activeProject.progress}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--secondary)" }}>
            <div className="h-full rounded-full" style={{ width: `${activeProject.progress}%`, background: "var(--brand)" }} />
          </div>
          <div
            className="mt-4 p-3 rounded-xl"
            style={{ background: "var(--secondary)" }}
          >
            <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Next milestone</p>
            <p className="text-foreground mt-0.5" style={{ fontSize: "13px", fontWeight: 500 }}>Brand guidelines PDF — due Jun 23</p>
          </div>
        </div>

        {/* Recent Files */}
        <div
          className="rounded-2xl p-5 border"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-foreground" style={{ fontSize: "14px", fontWeight: 600 }}>Recent Files</h2>
            <Link
              to="/portal/files"
              className="text-muted-foreground hover:text-foreground no-underline transition-colors"
              style={{ fontSize: "12px" }}
            >
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentFiles.map((f) => (
              <div key={f.name} className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-foreground truncate" style={{ fontSize: "12px", fontWeight: 500 }}>{f.name}</p>
                  <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{f.size} · {f.date}</p>
                </div>
                <button className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Messages Preview */}
        <div
          className="rounded-2xl p-5 border"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-foreground" style={{ fontSize: "14px", fontWeight: 600 }}>Messages</h2>
            <Link to="/portal/messages" className="text-muted-foreground hover:text-foreground no-underline transition-colors" style={{ fontSize: "12px" }}>View all</Link>
          </div>
          <div className="space-y-3">
            {mockMessages.slice(0, 2).map((m) => (
              <Link
                key={m.id}
                to="/portal/messages"
                className="flex items-start gap-3 no-underline group"
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white"
                  style={{ background: m.color, fontSize: "11px", fontWeight: 700 }}
                >
                  {m.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-foreground group-hover:text-brand transition-colors" style={{ fontSize: "13px", fontWeight: 600 }}>{m.from}</span>
                    <span className="text-muted-foreground shrink-0" style={{ fontSize: "11px" }}>{m.time}</span>
                  </div>
                  <p className="text-muted-foreground truncate" style={{ fontSize: "12px" }}>{m.preview}</p>
                </div>
                {m.unread && (
                  <div className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ background: "var(--brand)" }} />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Invoices Preview */}
        <div
          className="rounded-2xl p-5 border"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-foreground" style={{ fontSize: "14px", fontWeight: 600 }}>Invoices</h2>
            <Link to="/portal/invoices" className="text-muted-foreground hover:text-foreground no-underline transition-colors" style={{ fontSize: "12px" }}>View all</Link>
          </div>
          <div className="space-y-3">
            {mockInvoices.slice(0, 2).map((inv) => {
              const statusColor = inv.status === "Paid" ? "#16A34A" : inv.status === "Pending" ? "#F59E0B" : "#EF4444";
              return (
                <div key={inv.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground" style={{ fontSize: "13px", fontWeight: 500 }}>{inv.id}</p>
                    <p className="text-muted-foreground" style={{ fontSize: "12px" }}>{inv.project} · Due {inv.due}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-foreground" style={{ fontSize: "13px", fontWeight: 600 }}>{inv.amount}</span>
                    <span
                      className="px-2 py-0.5 rounded-full"
                      style={{ background: `${statusColor}18`, color: statusColor, fontSize: "11px", fontWeight: 600 }}
                    >
                      {inv.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
