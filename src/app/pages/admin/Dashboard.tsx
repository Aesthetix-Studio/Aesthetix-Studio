import { Link } from "react-router";
import { mockProjects, mockTasks, statusColors } from "../../lib/data";
import { api, ApiLead, ApiInvoice } from "../../lib/api-client";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp, FolderOpen, Flame, DollarSign, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const revenueData = [
  { month: "Jan", revenue: 200000 },
  { month: "Feb", revenue: 240000 },
  { month: "Mar", revenue: 180000 },
  { month: "Apr", revenue: 320000 },
  { month: "May", revenue: 280000 },
  { month: "Jun", revenue: 300000 },
];

export default function AdminDashboard() {
  const [leads, setLeads] = useState<ApiLead[]>([]);
  const [invoices, setInvoices] = useState<ApiInvoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.leads().catch(() => ({ ok: false, leads: [] })),
      api.invoices().catch(() => ({ ok: false, invoices: [] })),
    ])
      .then(([leadRes, invRes]) => {
        setLeads(leadRes.leads ?? []);
        setInvoices(invRes.invoices ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  const hotLeads = leads.filter((l) => l.status === "Hot");
  const activeProjects = mockProjects.filter((p) => p.status !== "Completed");
  const upcomingTasks = mockTasks.filter((t) => t.status !== "Done");

  const stats = [
    { label: "Monthly Revenue", value: "₹3,00,000", change: "+12%", icon: DollarSign, color: "#6150F6" },
    { label: "Active Projects", value: "4", change: "ongoing", icon: FolderOpen, color: "#3B82F6" },
    { label: "New Leads", value: String(leads.length || 8), change: "2 hot", icon: Flame, color: "#EF4444" },
    { label: "Avg Project Value", value: "₹80,000", change: "all time", icon: TrendingUp, color: "#10B981" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-sm">Studio overview for June 2026</p>
        </div>
        <Link
          to="/admin/leads"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand text-white hover:bg-brand/90 transition-all no-underline text-sm font-semibold"
        >
          View Leads <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl p-4 border border-border bg-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-muted-foreground text-xs">{s.label}</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}18` }}>
                <s.icon className="w-4 h-4" style={{ color: s.color }} />
              </div>
            </div>
            <div className="text-foreground text-2xl font-bold">{s.value}</div>
            <div className="mt-1 text-muted-foreground text-[11px]">{s.change}</div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="rounded-2xl p-5 border border-border bg-card">
        <h2 className="text-foreground mb-4 text-sm font-semibold">Monthly Revenue — 2026</h2>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData} barCategoryGap="30%">
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, "Revenue"]}
                contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }}
                labelStyle={{ color: "var(--foreground)", fontWeight: 600 }}
              />
              <Bar dataKey="revenue" fill="var(--brand)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Hot Leads */}
        <div className="rounded-2xl p-5 border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-foreground text-sm font-semibold">Hot Leads</h2>
            <Link to="/admin/leads" className="text-muted-foreground hover:text-foreground no-underline transition-colors text-xs">View all</Link>
          </div>
          <div className="space-y-3">
            {(hotLeads.length ? hotLeads : leads.slice(0, 5)).map((l) => (
              <Link
                key={l.id}
                to={`/admin/leads/${l.id}`}
                className="flex items-center justify-between no-underline group"
              >
                <div>
                  <p className="text-foreground group-hover:text-brand transition-colors text-[13px] font-medium">{l.name}</p>
                  <p className="text-muted-foreground text-[11px]">{l.company} · {l.service}</p>
                </div>
                <span className="text-muted-foreground text-xs">{l.budget}</span>
              </Link>
            ))}
            {leads.length === 0 && !loading && <p className="text-muted-foreground text-xs">No leads yet</p>}
          </div>
        </div>

        {/* Active Projects */}
        <div className="rounded-2xl p-5 border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-foreground text-sm font-semibold">Active Projects</h2>
            <Link to="/admin/projects" className="text-muted-foreground hover:text-foreground no-underline transition-colors text-xs">View all</Link>
          </div>
          <div className="space-y-3">
            {activeProjects.slice(0, 3).map((p) => {
              const sc = statusColors[p.status] ?? "#737370";
              return (
                <div key={p.id}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-foreground text-xs font-medium">{p.name}</p>
                    <span className="text-[11px] font-semibold" style={{ color: sc }}>{p.progress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden bg-secondary">
                    <div className="h-full rounded-full" style={{ width: `${p.progress}%`, background: sc }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="rounded-2xl p-5 border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-foreground text-sm font-semibold">Upcoming Tasks</h2>
            <Link to="/admin/tasks" className="text-muted-foreground hover:text-foreground no-underline transition-colors text-xs">View all</Link>
          </div>
          <div className="space-y-3">
            {upcomingTasks.slice(0, 4).map((t) => {
              const pc = statusColors[t.priority] ?? "#737370";
              return (
                <div key={t.id} className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground truncate text-xs font-medium">{t.title}</p>
                    <p className="text-muted-foreground text-[11px]">{t.assignee} · Due {t.due}</p>
                  </div>
                  <span
                    className="px-1.5 py-0.5 rounded shrink-0 text-[10px] font-semibold"
                    style={{ background: `${pc}18`, color: pc }}
                  >
                    {t.priority}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
