import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { fetchProjects } from "../../lib/api";
import { ArrowLeft, CheckCircle2, Circle, Clock, Loader2 } from "lucide-react";

type Project = { id: string; name: string; client: string; status: string; progress: number; dueDate: string; type: string; budget: string; priority: string };

export default function PortalProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects()
      .then((r) => setProject(r.projects.find((p) => p.id === id) ?? null))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="space-y-4">
        <Link to="/portal/projects" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors no-underline" style={{ fontSize: "13px" }}>
          <ArrowLeft className="w-4 h-4" /> Back to projects
        </Link>
        <p className="text-muted-foreground text-sm py-8 text-center">Project not found.</p>
      </div>
    );
  }

  const statusColor = project.status === "Completed" ? "#16A34A" : project.status === "In Progress" ? "#6150F6" : "#F59E0B";

  const milestones = [
    { label: "Discovery & Strategy", date: "Jan 20, 2026", done: project.progress >= 20 },
    { label: "Brand Identity Design", date: "Feb 28, 2026", done: project.progress >= 40 },
    { label: "Website Wireframes", date: "Apr 5, 2026", done: project.progress >= 60 },
    { label: "Brand Guidelines PDF", date: "Jun 23, 2026", done: project.progress >= 80, current: project.progress >= 60 && project.progress < 80 },
    { label: "Website Development", date: "Jul 5, 2026", done: project.progress >= 90, current: project.progress >= 80 && project.progress < 90 },
    { label: "Launch & Handoff", date: "Jul 15, 2026", done: project.progress >= 100, current: project.progress >= 90 && project.progress < 100 },
  ];

  return (
    <div className="space-y-6">
      <Link to="/portal/projects" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors no-underline" style={{ fontSize: "13px" }}>
        <ArrowLeft className="w-4 h-4" /> Back to projects
      </Link>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-foreground" style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.02em" }}>{project.name}</h1>
          <p className="text-muted-foreground mt-1" style={{ fontSize: "14px" }}>{project.client} · {project.type}</p>
        </div>
        <span className="px-3 py-1 rounded-full" style={{ background: `${statusColor}18`, color: statusColor, fontSize: "12px", fontWeight: 600 }}>
          {project.status}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Progress", value: `${project.progress}%` },
          { label: "Due Date", value: project.dueDate },
          { label: "Budget", value: project.budget },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-4 border text-center" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="text-muted-foreground mb-1" style={{ fontSize: "12px" }}>{s.label}</div>
            <div className="text-foreground" style={{ fontSize: "18px", fontWeight: 700 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl p-5 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-foreground" style={{ fontSize: "13px", fontWeight: 600 }}>Overall Progress</span>
          <span className="text-foreground" style={{ fontSize: "13px", fontWeight: 700 }}>{project.progress}%</span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--secondary)" }}>
          <div className="h-full rounded-full" style={{ width: `${project.progress}%`, background: statusColor }} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl p-5 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h2 className="text-foreground mb-4" style={{ fontSize: "14px", fontWeight: 600 }}>Milestones</h2>
          <div className="space-y-0">
            {milestones.map((m, i) => (
              <div key={m.label} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10" style={{ background: m.done ? "#16A34A18" : m.current ? "var(--brand)18" : "var(--secondary)" }}>
                    {m.done ? <CheckCircle2 className="w-4 h-4" style={{ color: "#16A34A" }} /> : m.current ? <Clock className="w-4 h-4" style={{ color: "var(--brand)" }} /> : <Circle className="w-4 h-4 text-muted-foreground" />}
                  </div>
                  {i < milestones.length - 1 && <div className="w-px flex-1 my-1" style={{ background: "var(--border)", minHeight: "16px" }} />}
                </div>
                <div className="pb-4 pt-0.5">
                  <p className={m.done ? "text-muted-foreground" : "text-foreground"} style={{ fontSize: "13px", fontWeight: m.current ? 600 : 500 }}>
                    {m.label}
                    {m.current && <span className="ml-2 px-1.5 py-0.5 rounded-full" style={{ background: "var(--brand)18", color: "var(--brand)", fontSize: "10px", fontWeight: 600 }}>Current</span>}
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{m.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-5 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h2 className="text-foreground mb-4" style={{ fontSize: "14px", fontWeight: 600 }}>Project Details</h2>
          <div className="space-y-3">
            {[
              { label: "Client", value: project.client },
              { label: "Service Type", value: project.type },
              { label: "Priority", value: project.priority },
              { label: "Budget", value: project.budget },
              { label: "Due Date", value: project.dueDate },
              { label: "Status", value: project.status },
            ].map((d) => (
              <div key={d.label} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <span className="text-muted-foreground" style={{ fontSize: "13px" }}>{d.label}</span>
                <span className="text-foreground" style={{ fontSize: "13px", fontWeight: 500 }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
