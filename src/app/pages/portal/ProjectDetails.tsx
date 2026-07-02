import { useParams, Link } from "react-router";
import { mockProjects, statusColors } from "../../lib/data";
import { ArrowLeft, CheckCircle2, Circle, Clock } from "lucide-react";

const milestones = [
  { label: "Discovery & Strategy", date: "Jan 20, 2026", done: true },
  { label: "Brand Identity Design", date: "Feb 28, 2026", done: true },
  { label: "Website Wireframes", date: "Apr 5, 2026", done: true },
  { label: "Brand Guidelines PDF", date: "Jun 23, 2026", done: false, current: true },
  { label: "Website Development", date: "Jul 5, 2026", done: false },
  { label: "Launch & Handoff", date: "Jul 15, 2026", done: false },
];

export default function PortalProjectDetails() {
  const { id } = useParams();
  const project = mockProjects.find((p) => p.id === id) ?? mockProjects[0];
  const statusColor = statusColors[project.status] ?? "#737370";

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        to="/portal/projects"
        className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors no-underline"
        style={{ fontSize: "13px" }}
      >
        <ArrowLeft className="w-4 h-4" /> Back to projects
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-foreground" style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.02em" }}>{project.name}</h1>
          <p className="text-muted-foreground mt-1" style={{ fontSize: "14px" }}>{project.client} · {project.type}</p>
        </div>
        <span
          className="px-3 py-1 rounded-full"
          style={{ background: `${statusColor}18`, color: statusColor, fontSize: "12px", fontWeight: 600 }}
        >
          {project.status}
        </span>
      </div>

      {/* Stat Boxes */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Progress", value: `${project.progress}%` },
          { label: "Due Date", value: project.dueDate },
          { label: "Budget", value: project.budget },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl p-4 border text-center"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <div className="text-muted-foreground mb-1" style={{ fontSize: "12px" }}>{s.label}</div>
            <div className="text-foreground" style={{ fontSize: "18px", fontWeight: 700 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
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
        {/* Milestone Timeline */}
        <div className="rounded-2xl p-5 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h2 className="text-foreground mb-4" style={{ fontSize: "14px", fontWeight: 600 }}>Milestones</h2>
          <div className="space-y-0">
            {milestones.map((m, i) => (
              <div key={m.label} className="flex gap-3">
                {/* Timeline line + icon */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10"
                    style={{
                      background: m.done ? "#16A34A18" : m.current ? "var(--brand)18" : "var(--secondary)",
                    }}
                  >
                    {m.done ? (
                      <CheckCircle2 className="w-4 h-4" style={{ color: "#16A34A" }} />
                    ) : m.current ? (
                      <Clock className="w-4 h-4" style={{ color: "var(--brand)" }} />
                    ) : (
                      <Circle className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="w-px flex-1 my-1" style={{ background: "var(--border)", minHeight: "16px" }} />
                  )}
                </div>
                {/* Content */}
                <div className="pb-4 pt-0.5">
                  <p
                    className={m.done ? "text-muted-foreground" : "text-foreground"}
                    style={{ fontSize: "13px", fontWeight: m.current ? 600 : 500 }}
                  >
                    {m.label}
                    {m.current && (
                      <span
                        className="ml-2 px-1.5 py-0.5 rounded-full"
                        style={{ background: "var(--brand)18", color: "var(--brand)", fontSize: "10px", fontWeight: 600 }}
                      >
                        Current
                      </span>
                    )}
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{m.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Details Grid */}
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
