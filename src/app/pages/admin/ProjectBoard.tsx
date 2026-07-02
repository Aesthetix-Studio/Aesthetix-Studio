import { Link } from "react-router";
import { useEffect, useState } from "react";
import { fetchProjects } from "../../lib/api";
import { List, Loader2 } from "lucide-react";

type Project = { id: string; name: string; client: string; status: string; progress: number; dueDate: string; priority: string };

const columns = ["Discovery", "In Progress", "In Review", "Completed"] as const;

const columnColors: Record<string, string> = {
  Discovery: "#3B82F6", "In Progress": "#6150F6", "In Review": "#F59E0B", Completed: "#16A34A",
};

export default function AdminProjectBoard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects().then((r) => setProjects(r.projects)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const byStatus = (status: string) => projects.filter((p) => p.status === status);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Project Board</h1>
          <p className="text-muted-foreground mt-1 text-sm">Kanban view of all studio projects.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/admin/projects"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-foreground hover:bg-secondary transition-all no-underline text-sm font-medium"
          >
            <List className="w-4 h-4" />
            List view
          </Link>
          <button className="px-4 py-2 rounded-xl bg-brand text-white hover:bg-brand/90 transition-all text-sm font-semibold">
            + New Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {columns.map((col) => {
          const colProjects = byStatus(col);
          const cc = columnColors[col];
          return (
            <div key={col}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: cc }} />
                  <span className="text-foreground text-[13px] font-semibold">{col}</span>
                </div>
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                  style={{ background: cc }}
                >
                  {colProjects.length}
                </span>
              </div>

              <div className="rounded-2xl p-3 space-y-3 min-h-32 bg-secondary">
                {colProjects.map((p) => {
                  const sc = p.status === "Completed" ? "#16A34A" : p.status === "In Progress" ? "#6150F6" : "#F59E0B";
                  const pc = p.priority === "Urgent" ? "#DC2626" : p.priority === "High" ? "#F59E0B" : p.priority === "Medium" ? "#6150F6" : "#737370";
                  return (
                    <div
                      key={p.id}
                      className="rounded-xl p-3 border border-border bg-card cursor-grab active:cursor-grabbing hover:border-brand/30 transition-all"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-foreground text-[13px] font-semibold leading-snug">{p.name}</p>
                        <span
                          className="px-1.5 py-0.5 rounded shrink-0 text-[10px] font-semibold"
                          style={{ background: `${pc}18`, color: pc }}
                        >
                          {p.priority}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-[11px] mb-3">{p.client}</p>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-muted-foreground text-[10px]">Progress</span>
                        <span className="text-[10px] font-semibold" style={{ color: sc }}>{p.progress}%</span>
                      </div>
                      <div className="h-1 rounded-full overflow-hidden mb-2 bg-secondary">
                        <div className="h-full rounded-full" style={{ width: `${p.progress}%`, background: sc }} />
                      </div>
                      <p className="text-muted-foreground text-[10px]">Due {p.dueDate}</p>
                    </div>
                  );
                })}
                {colProjects.length === 0 && (
                  <div className="rounded-xl border-2 border-dashed border-border p-6 text-center">
                    <p className="text-muted-foreground text-xs">No projects</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
