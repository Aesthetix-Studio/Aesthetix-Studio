import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip,
  PieChart, Pie, Cell,
} from "recharts";
import { TrendingUp, DollarSign, Users, RefreshCw, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchProjects, fetchTasks } from "../../lib/api";
import { fetchLeads, type LeadRow } from "../../lib/leads";
import { fetchInvoices, type InvoiceRow } from "../../lib/invoices";

const serviceColors: Record<string, string> = {
  Website: "#6150F6", Branding: "#F59E0B", "Web App": "#3B82F6", SaaS: "#10B981", "E-commerce": "#EF4444",
};

export default function AdminAnalytics() {
  const [projects, setProjects] = useState<{ id: string; type: string; budget: string; status: string }[]>([]);
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
  const [tasks, setTasks] = useState<{ id: string; status: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchProjects().then((r) => r.projects).catch(() => []),
      fetchLeads().then((r) => r.leads).catch(() => []),
      fetchInvoices().then((r) => r.invoices).catch(() => []),
      fetchTasks().then((r) => r.tasks).catch(() => []),
    ]).then(([p, l, inv, t]) => { setProjects(p); setLeads(l); setInvoices(inv); setTasks(t); }).finally(() => setLoading(false));
  }, []);

  const totalRevenue = invoices.reduce((s, inv) => s + (inv.amountCents ?? 0), 0);
  const paidCount = invoices.filter((i) => i.status === "Paid").length;
  const totalCount = invoices.length || 1;
  const completedProjects = projects.filter((p) => p.status === "Completed").length;
  const completedTasks = tasks.filter((t) => t.status === "Done").length;
  const totalTasks = tasks.length || 1;

  const serviceMap: Record<string, number> = {};
  projects.forEach((p) => { serviceMap[p.type] = (serviceMap[p.type] ?? 0) + 1; });
  const serviceRevenue = Object.entries(serviceMap).map(([name, count]) => ({
    name, value: Math.round((count / projects.length) * 100) || 1,
    color: serviceColors[name] ?? "#737370",
  }));

  const sourceMap: Record<string, number> = {};
  leads.forEach((l) => { const src = l.source ?? "Unknown"; sourceMap[src] = (sourceMap[src] ?? 0) + 1; });
  const leadSources = Object.entries(sourceMap).map(([source, leads]) => ({ source, leads })).sort((a, b) => b.leads - a.leads);

  const stats = [
    { label: "Total Revenue", value: `₹${(totalRevenue / 100).toLocaleString("en-IN")}`, change: `${paidCount} invoices paid`, icon: DollarSign, color: "#6150F6" },
    { label: "Active Projects", value: String(projects.length), change: `${completedProjects} completed`, icon: TrendingUp, color: "#3B82F6" },
    { label: "Total Leads", value: String(leads.length), change: `${leads.filter((l) => l.status === "Hot").length} hot`, icon: Users, color: "#F59E0B" },
    { label: "Task Completion", value: `${Math.round((completedTasks / totalTasks) * 100)}%`, change: `${completedTasks}/${tasks.length} done`, icon: RefreshCw, color: "#10B981" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-1 text-sm">Studio performance metrics and insights.</p>
      </div>

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

      <div className="rounded-2xl p-5 border border-border bg-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-foreground text-sm font-semibold">Revenue by Service Type</h2>
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={serviceRevenue} barCategoryGap="30%">
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(value: number) => [`${value}%`, "Share"]}
                contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }}
                labelStyle={{ color: "var(--foreground)", fontWeight: 600 }}
              />
              <Bar dataKey="value" fill="var(--brand)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl p-5 border border-border bg-card">
          <h2 className="text-foreground mb-4 text-sm font-semibold">Revenue by Service</h2>
          <div className="flex items-center gap-6">
            <div className="h-[180px] w-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={serviceRevenue} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                    {serviceRevenue.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v: number) => [`${v}%`, "Share"]}
                    contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2.5">
              {serviceRevenue.map((s) => (
                <div key={s.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.color }} />
                  <span className="text-foreground text-xs">{s.name}</span>
                  <span className="text-muted-foreground ml-auto text-xs font-semibold">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-5 border border-border bg-card">
          <h2 className="text-foreground mb-4 text-sm font-semibold">Lead Sources</h2>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadSources} layout="vertical" barCategoryGap="20%">
                <XAxis type="number" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis dataKey="source" type="category" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={80} />
                <Tooltip
                  formatter={(value: number) => [value, "Leads"]}
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }}
                  labelStyle={{ color: "var(--foreground)", fontWeight: 600 }}
                />
                <Bar dataKey="leads" fill="#6150F6" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
