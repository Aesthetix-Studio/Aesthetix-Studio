import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip,
  PieChart, Pie, Cell,
} from "recharts";
import { TrendingUp, DollarSign, Users, RefreshCw } from "lucide-react";

const monthlyRevenue = [
  { month: "Jan", revenue: 200000 },
  { month: "Feb", revenue: 240000 },
  { month: "Mar", revenue: 180000 },
  { month: "Apr", revenue: 320000 },
  { month: "May", revenue: 280000 },
  { month: "Jun", revenue: 300000 },
];

const serviceRevenue = [
  { name: "Web Design", value: 42, color: "#6150F6" },
  { name: "Brand Identity", value: 28, color: "#F59E0B" },
  { name: "Development", value: 18, color: "#3B82F6" },
  { name: "SEO", value: 12, color: "#10B981" },
];

const leadSources = [
  { source: "Referral", leads: 14 },
  { source: "Dribbble", leads: 9 },
  { source: "Website", leads: 7 },
  { source: "Conference", leads: 5 },
  { source: "LinkedIn", leads: 4 },
];

const stats = [
  { label: "Total Revenue", value: "₹15,20,000", change: "+18% YoY", icon: DollarSign, color: "#6150F6" },
  { label: "Avg Project Value", value: "₹80,000", change: "across 20 projects", icon: TrendingUp, color: "#3B82F6" },
  { label: "Lead Conv. Rate", value: "34%", change: "+4% this quarter", icon: Users, color: "#F59E0B" },
  { label: "Client Retention", value: "91%", change: "industry avg 78%", icon: RefreshCw, color: "#10B981" },
];

export default function AdminAnalytics() {
  const totalRevenue = monthlyRevenue.reduce((s, m) => s + m.revenue, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-1 text-sm">Studio performance metrics and insights.</p>
      </div>

      {/* Stat Cards */}
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

      {/* Monthly Revenue Bar Chart */}
      <div className="rounded-2xl p-5 border border-border bg-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-foreground text-sm font-semibold">Monthly Revenue — 2026</h2>
          <span className="text-muted-foreground text-xs">YTD: ₹{totalRevenue.toLocaleString("en-IN")}</span>
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyRevenue} barCategoryGap="30%">
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Service Revenue Donut */}
        <div className="rounded-2xl p-5 border border-border bg-card">
          <h2 className="text-foreground mb-4 text-sm font-semibold">Revenue by Service</h2>
          <div className="flex items-center gap-6">
            <div className="h-[180px] w-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceRevenue}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
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

        {/* Lead Sources Horizontal Bar */}
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
