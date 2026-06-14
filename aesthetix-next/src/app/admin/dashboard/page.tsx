"use client";
import { useEffect, useState, useMemo } from "react";
import { motion } from "motion/react";
import { TrendingUp, Loader2 } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { adminHeaders } from "../AdminLayout";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";

/* ─── Types ─────────────────────────────────────── */

interface Lead {
  id: string; name: string; email: string; company: string | null;
  budget: string | null; project_details: string | null; status: string; created_at: string;
}

interface Project {
  id: string; title: string; slug: string; category: string | null;
  summary: string | null; result: string | null; year: number | null;
  image: string | null; details: string[]; is_featured: number;
}

interface Post {
  id: string; title: string; slug: string; published: number; created_at: string;
}

interface CaseStudy {
  id: string; client: string; slug: string; published: number; created_at: string;
}

/* ─── Helpers ────────────────────────────────────── */

const statusColor: Record<string, { bg: string; text: string }> = {
  new: { bg: "rgba(196,164,107,0.1)", text: "#C4A46B" },
  contacted: { bg: "rgba(74,222,128,0.08)", text: "#4ade80" },
  closed: { bg: "rgba(255,255,255,0.05)", text: "rgba(240,235,224,0.5)" },
};

function StatusBadge({ status }: { status: string }) {
  const colors = statusColor[status] || { bg: "rgba(255,255,255,0.05)", text: "rgba(240,235,224,0.4)" };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 10px",
        background: colors.bg,
        color: colors.text,
        fontSize: "10px",
        fontWeight: 500,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {status}
    </span>
  );
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}


/* ─── Stat Card ──────────────────────────────────── */

function StatCard({
  label,
  value,
  sub,
  trend,
  accent = false,
  delay = 0,
}: {
  label: string;
  value: string;
  sub: string;
  trend?: string;
  accent?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {accent && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: "linear-gradient(90deg, rgba(196,164,107,0.8), rgba(196,164,107,0.1))",
          }}
        />
      )}
      <div
        style={{
          fontSize: "10px",
          fontWeight: 500,
          color: "rgba(240,235,224,0.35)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontFamily: "'Inter', sans-serif",
          marginBottom: "16px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: "36px",
          color: "#F0EBE0",
          fontStyle: "italic",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          marginBottom: "10px",
        }}
      >
        {value}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "11px", color: "rgba(240,235,224,0.35)", fontFamily: "'Inter', sans-serif" }}>
          {sub}
        </span>
        {trend && (
          <span
            style={{
              fontSize: "10px",
              color: trend.startsWith("+") ? "#4ade80" : "#f87171",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
            }}
          >
            {trend}
          </span>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Custom Tooltip ─────────────────────────────── */

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#111",
          border: "1px solid rgba(255,255,255,0.1)",
          padding: "10px 16px",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div style={{ fontSize: "10px", color: "rgba(240,235,224,0.4)", marginBottom: "4px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          {label}
        </div>
        <div style={{ fontSize: "16px", fontFamily: "'Instrument Serif', serif", fontStyle: "italic", color: "#F0EBE0" }}>
          {payload[0].value}
        </div>
      </div>
    );
  }
  return null;
}

/* ─── Page ───────────────────────────────────────── */

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [leadsRes, projectsRes, postsRes, csRes] = await Promise.allSettled([
          fetch(`${API}/api/leads`, { headers: adminHeaders() }),
          fetch(`${API}/api/projects`),
          fetch(`${API}/api/admin/posts`, { headers: adminHeaders() }),
          fetch(`${API}/api/admin/case-studies`, { headers: adminHeaders() }),
        ]);

        if (leadsRes.status === "fulfilled" && leadsRes.value.ok) {
          setLeads(await leadsRes.value.json());
        }
        if (projectsRes.status === "fulfilled" && projectsRes.value.ok) {
          setProjects(await projectsRes.value.json());
        }
        if (postsRes.status === "fulfilled" && postsRes.value.ok) {
          setPosts(await postsRes.value.json());
        }
        if (csRes.status === "fulfilled" && csRes.value.ok) {
          setCaseStudies(await csRes.value.json());
        }
      } catch {
        // Silently fail — dashboard shows zeros
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  /* ─── Computed stats ──────────────────────────── */

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "new").length;
  const contactedLeads = leads.filter((l) => l.status === "contacted").length;
  const closedLeads = leads.filter((l) => l.status === "closed").length;
  const conversionRate = totalLeads > 0 ? Math.round((closedLeads / totalLeads) * 100) : 0;

  const totalProjects = projects.length;
  const publishedPosts = posts.filter((p) => p.published).length;
  const draftPosts = posts.filter((p) => !p.published).length;
  const publishedCS = caseStudies.filter((c) => c.published).length;

  /* ─── Lead activity chart (grouped by month) ──── */

  const chartData = useMemo(() => {
    const monthMap: Record<string, number> = {};
    const now = new Date();
    // Build last 6 months
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toLocaleString("en-US", { month: "short", year: "2-digit" });
      monthMap[key] = 0;
    }
    leads.forEach((lead) => {
      const d = new Date(lead.created_at);
      const key = d.toLocaleString("en-US", { month: "short", year: "2-digit" });
      if (key in monthMap) monthMap[key]++;
    });
    return Object.entries(monthMap).map(([month, count]) => ({ month, leads: count }));
  }, [leads]);

  const chartTotal = chartData.reduce((sum, d) => sum + d.leads, 0);

  /* ─── Loading state ───────────────────────────── */

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <Loader2 size={24} color="rgba(240,235,224,0.3)" style={{ animation: "spin 1s linear infinite" }} />
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  /* ─── Render ──────────────────────────────────── */

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* Section title */}
      <div>
        <h1
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "32px",
            fontStyle: "italic",
            color: "#F0EBE0",
            letterSpacing: "-0.02em",
            marginBottom: "4px",
          }}
        >
          {getGreeting()}
        </h1>
        <p style={{ fontSize: "12px", color: "rgba(240,235,224,0.35)", fontFamily: "'Inter', sans-serif" }}>
          Here&apos;s what&apos;s happening at the studio.
        </p>
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
        <StatCard
          label="Total Leads"
          value={String(totalLeads)}
          sub={`${newLeads} new · ${contactedLeads} contacted`}
          accent
          delay={0}
        />
        <StatCard
          label="Active Projects"
          value={String(totalProjects)}
          sub={`${publishedCS} case studies`}
          delay={0.05}
        />
        <StatCard
          label="Journal Posts"
          value={String(publishedPosts)}
          sub={`${draftPosts} drafts`}
          delay={0.1}
        />
        <StatCard
          label="Conversion"
          value={`${conversionRate}%`}
          sub={`${closedLeads} of ${totalLeads} leads won`}
          trend={conversionRate > 0 ? `+${conversionRate}%` : undefined}
          delay={0.15}
        />
      </div>

      {/* Lead activity chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.07)",
          padding: "28px 28px 20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "28px" }}>
          <div>
            <div style={{ fontSize: "10px", fontWeight: 500, color: "rgba(240,235,224,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif", marginBottom: "6px" }}>
              Lead Activity — Last 6 Months
            </div>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: "28px", fontStyle: "italic", color: "#F0EBE0", letterSpacing: "-0.02em" }}>
              {chartTotal} leads
            </div>
          </div>
          {totalLeads > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 12px", background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.12)" }}>
              <TrendingUp size={12} color="#4ade80" />
              <span style={{ fontSize: "10px", color: "#4ade80", fontFamily: "'Inter', sans-serif", fontWeight: 500, letterSpacing: "0.06em" }}>
                {newLeads} new
              </span>
            </div>
          )}
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="leadsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C4A46B" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#C4A46B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="month"
              tick={{ fill: "rgba(240,235,224,0.25)", fontSize: 10, fontFamily: "'Inter', sans-serif" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(196,164,107,0.2)", strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey="leads"
              stroke="#C4A46B"
              strokeWidth={1.5}
              fill="url(#leadsGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Recent inquiries + projects */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
        {/* Recent inquiries */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: "#080808", padding: "24px" }}
        >
          <div style={{ fontSize: "10px", fontWeight: 500, color: "rgba(240,235,224,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif", marginBottom: "20px" }}>
            Recent Inquiries
          </div>
          {leads.length === 0 ? (
            <p style={{ fontSize: "12px", color: "rgba(240,235,224,0.2)", fontFamily: "'Inter', sans-serif" }}>No inquiries yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {leads.slice(0, 4).map((lead, i) => (
                <div
                  key={lead.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 0",
                    borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "12px", color: "rgba(240,235,224,0.8)", fontFamily: "'Inter', sans-serif", fontWeight: 500, marginBottom: "4px" }}>
                      {lead.name}
                    </div>
                    <div style={{ fontSize: "11px", color: "rgba(240,235,224,0.35)" }}>
                      {lead.company || lead.email}
                    </div>
                  </div>
                  <StatusBadge status={lead.status} />
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Projects */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: "#080808", padding: "24px" }}
        >
          <div style={{ fontSize: "10px", fontWeight: 500, color: "rgba(240,235,224,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif", marginBottom: "20px" }}>
            Projects
          </div>
          {projects.length === 0 ? (
            <p style={{ fontSize: "12px", color: "rgba(240,235,224,0.2)", fontFamily: "'Inter', sans-serif" }}>No projects yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {projects.slice(0, 4).map((project, i) => (
                <div
                  key={project.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 0",
                    borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "12px", color: "rgba(240,235,224,0.8)", fontFamily: "'Inter', sans-serif", fontWeight: 500, marginBottom: "4px" }}>
                      {project.title}
                      {project.is_featured ? (
                        <span style={{ fontSize: "9px", color: "#C4A46B", marginLeft: "6px" }}>★</span>
                      ) : null}
                    </div>
                    <div style={{ fontSize: "11px", color: "rgba(240,235,224,0.35)" }}>
                      {project.category || "Uncategorized"}
                    </div>
                  </div>
                  <div style={{ fontSize: "11px", color: "rgba(240,235,224,0.4)", fontFamily: "'Inter', sans-serif" }}>
                    {project.year || "—"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
