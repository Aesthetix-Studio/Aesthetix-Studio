import { useEffect, useState } from "react";
import { Link } from "react-router";
import { fetchProjects, fetchMessages } from "../../lib/api";
import { fetchInvoices } from "../../lib/invoices";
import { FolderOpen, MessageSquare, FileText, Calendar, Download, ChevronRight, Loader2 } from "lucide-react";

type Project = { id: string; name: string; client: string; status: string; progress: number; dueDate: string; type: string; budget: string; priority: string };
type Message = { id: string; from: string; avatar: string; color: string; project: string; preview: string; time: string; unread: boolean };
type Invoice = { id: string; client: string; project: string; amount: string; status: string; issued: string; due: string };

export default function PortalDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchProjects().then((r) => r.projects).catch(() => []),
      fetchMessages().then((r) => r.messages).catch(() => []),
      fetchInvoices().then((r) => r.invoices).catch(() => []),
    ]).then(([p, m, inv]) => { setProjects(p); setMessages(m); setInvoices(inv); }).finally(() => setLoading(false));
  }, []);

  const activeProject = projects.find((p) => p.status !== "Completed") ?? projects[0];
  const pendingInvoice = invoices.find((i) => i.status === "Pending" || i.status === "Overdue");

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const stats = [
    { label: "Active Projects", value: String(projects.filter((p) => p.status !== "Completed").length || 1), icon: FolderOpen, color: "#6150F6" },
    { label: "Open Messages", value: String(messages.filter((m) => m.unread).length || 0), icon: MessageSquare, color: "#3B82F6" },
    { label: "Pending Invoice", value: pendingInvoice?.amount ?? "₹0", icon: FileText, color: "#F59E0B" },
    { label: "Projects", value: String(projects.length), icon: Calendar, color: "#10B981" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-foreground" style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.02em" }}>Dashboard</h1>
        <p className="text-muted-foreground mt-1" style={{ fontSize: "14px" }}>Here's what's happening with your projects.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{s.label}</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}18` }}>
                <s.icon className="w-4 h-4" style={{ color: s.color }} />
              </div>
            </div>
            <div className="text-foreground" style={{ fontSize: "24px", fontWeight: 700 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl p-5 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-foreground" style={{ fontSize: "14px", fontWeight: 600 }}>Active Project</h2>
            <Link to="/portal/projects" className="text-muted-foreground hover:text-foreground no-underline flex items-center gap-1 transition-colors" style={{ fontSize: "12px" }}>
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          {activeProject ? (
            <>
              <div className="mb-1 flex items-center justify-between">
                <h3 className="text-foreground" style={{ fontSize: "16px", fontWeight: 700 }}>{activeProject.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#6150F618", color: "#6150F6", fontSize: "11px", fontWeight: 600 }}>
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
            </>
          ) : (
            <p className="text-muted-foreground text-sm py-4">No active projects.</p>
          )}
        </div>

        <div className="rounded-2xl p-5 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-foreground" style={{ fontSize: "14px", fontWeight: 600 }}>Recent Files</h2>
            <Link to="/portal/files" className="text-muted-foreground hover:text-foreground no-underline transition-colors" style={{ fontSize: "12px" }}>View all</Link>
          </div>
          <p className="text-muted-foreground text-sm py-4">Files are loaded from your project uploads.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl p-5 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-foreground" style={{ fontSize: "14px", fontWeight: 600 }}>Messages</h2>
            <Link to="/portal/messages" className="text-muted-foreground hover:text-foreground no-underline transition-colors" style={{ fontSize: "12px" }}>View all</Link>
          </div>
          <div className="space-y-3">
            {messages.slice(0, 3).map((m) => (
              <Link key={m.id} to="/portal/messages" className="flex items-start gap-3 no-underline group">
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white" style={{ background: m.color, fontSize: "11px", fontWeight: 700 }}>
                  {m.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-foreground group-hover:text-brand transition-colors" style={{ fontSize: "13px", fontWeight: 600 }}>{m.from}</span>
                    <span className="text-muted-foreground shrink-0" style={{ fontSize: "11px" }}>{m.time}</span>
                  </div>
                  <p className="text-muted-foreground truncate" style={{ fontSize: "12px" }}>{m.preview}</p>
                </div>
                {m.unread && <div className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ background: "var(--brand)" }} />}
              </Link>
            ))}
            {messages.length === 0 && <p className="text-muted-foreground text-sm py-4">No messages yet.</p>}
          </div>
        </div>

        <div className="rounded-2xl p-5 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-foreground" style={{ fontSize: "14px", fontWeight: 600 }}>Invoices</h2>
            <Link to="/portal/invoices" className="text-muted-foreground hover:text-foreground no-underline transition-colors" style={{ fontSize: "12px" }}>View all</Link>
          </div>
          <div className="space-y-3">
            {invoices.slice(0, 3).map((inv) => {
              const statusColor = inv.status === "Paid" ? "#16A34A" : inv.status === "Pending" ? "#F59E0B" : "#EF4444";
              return (
                <div key={inv.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground" style={{ fontSize: "13px", fontWeight: 500 }}>{inv.id}</p>
                    <p className="text-muted-foreground" style={{ fontSize: "12px" }}>{inv.project} · Due {inv.due}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-foreground" style={{ fontSize: "13px", fontWeight: 600 }}>{inv.amount}</span>
                    <span className="px-2 py-0.5 rounded-full" style={{ background: `${statusColor}18`, color: statusColor, fontSize: "11px", fontWeight: 600 }}>
                      {inv.status}
                    </span>
                  </div>
                </div>
              );
            })}
            {invoices.length === 0 && <p className="text-muted-foreground text-sm py-4">No invoices yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
