import { Link } from "react-router";
import { useEffect, useState } from "react";
import { fetchProjects } from "../../lib/api";
import { ChevronRight, Loader2 } from "lucide-react";

type Project = { id: string; name: string; client: string; status: string; progress: number; dueDate: string; type: string; budget: string };

export default function PortalProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects().then((r) => setProjects(r.projects.slice(0, 3))).catch(() => {}).finally(() => setLoading(false));
  }, []);

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
        <h1 className="text-foreground" style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.02em" }}>Your Projects</h1>
        <p className="text-muted-foreground mt-1" style={{ fontSize: "14px" }}>Track progress and details for all your active engagements.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.length === 0 ? (
          <p className="text-muted-foreground text-sm py-8 text-center">No projects yet.</p>
        ) : (
          projects.map((project) => {
            const statusColor = project.status === "Completed" ? "#16A34A" : project.status === "In Progress" ? "#6150F6" : "#F59E0B";
            return (
              <Link key={project.id} to={`/portal/projects/${project.id}`} className="no-underline group">
                <div className="rounded-2xl p-5 border transition-all group-hover:border-brand/30" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-foreground group-hover:text-brand transition-colors" style={{ fontSize: "16px", fontWeight: 700 }}>{project.name}</h2>
                      <p className="text-muted-foreground mt-0.5" style={{ fontSize: "13px" }}>{project.type} · Due {project.dueDate}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2.5 py-1 rounded-full" style={{ background: `${statusColor}18`, color: statusColor, fontSize: "11px", fontWeight: 600 }}>
                        {project.status}
                      </span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-brand transition-colors" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground" style={{ fontSize: "12px" }}>Progress</span>
                    <span className="text-foreground" style={{ fontSize: "12px", fontWeight: 600 }}>{project.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden mb-3" style={{ background: "var(--secondary)" }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${project.progress}%`, background: statusColor }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor }} />
                      <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{project.client}</span>
                    </div>
                    <span className="text-foreground" style={{ fontSize: "13px", fontWeight: 600 }}>{project.budget}</span>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
