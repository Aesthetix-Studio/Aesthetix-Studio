import { useState, useEffect } from "react";
import { fetchTasks } from "../../lib/api";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

type Task = { id: string; title: string; project: string; assignee: string; due: string; priority: string; status: string };

const filterTabs = ["All", "To Do", "In Progress", "Done", "High", "Medium", "Low"];

const priorityColors: Record<string, string> = {
  Urgent: "#DC2626", High: "#F59E0B", Medium: "#6150F6", Low: "#737370",
};

export default function AdminTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchTasks().then((r) => setTasks(r.tasks)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = tasks.filter((t) => {
    if (filter === "All") return true;
    if (filter === "To Do") return t.status === "To Do";
    if (filter === "In Progress") return t.status === "In Progress";
    if (filter === "Done") return t.status === "Done";
    if (filter === "High") return t.priority === "High" || t.priority === "Urgent";
    if (filter === "Medium") return t.priority === "Medium";
    if (filter === "Low") return t.priority === "Low";
    return true;
  });

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
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Tasks</h1>
        <p className="text-muted-foreground mt-1 text-sm">Manage and track all tasks across projects.</p>
      </div>

      <div className="flex gap-1 p-1 rounded-xl bg-secondary w-fit flex-wrap">
        {filterTabs.map((tab) => (
          <button key={tab} onClick={() => setFilter(tab)} className={`px-4 py-2 rounded-lg transition-all text-[13px] font-medium ${filter === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-border overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-muted-foreground text-xs font-medium uppercase tracking-wider">Task</th>
                <th className="px-4 py-3 text-muted-foreground text-xs font-medium uppercase tracking-wider">Project</th>
                <th className="px-4 py-3 text-muted-foreground text-xs font-medium uppercase tracking-wider">Assignee</th>
                <th className="px-4 py-3 text-muted-foreground text-xs font-medium uppercase tracking-wider">Due</th>
                <th className="px-4 py-3 text-muted-foreground text-xs font-medium uppercase tracking-wider">Priority</th>
                <th className="px-4 py-3 text-muted-foreground text-xs font-medium uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground text-sm">No tasks found.</td></tr>
              ) : (
                filtered.map((t) => (
                  <tr key={t.id} className="border-b border-border last:border-0 hover:bg-secondary transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {t.status === "Done" ? <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> : <Circle className="w-4 h-4 text-muted-foreground shrink-0" />}
                        <span className={`text-sm font-medium ${t.status === "Done" ? "text-muted-foreground line-through" : "text-foreground"}`}>{t.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-sm">{t.project}</td>
                    <td className="px-4 py-3 text-foreground text-sm">{t.assignee}</td>
                    <td className="px-4 py-3 text-muted-foreground text-sm">{t.due}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium" style={{ color: priorityColors[t.priority] ?? "#737370" }}>{t.priority}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium" style={{
                        background: t.status === "Done" ? "#16A34A18" : t.status === "In Progress" ? "#6150F618" : "#73737018",
                        color: t.status === "Done" ? "#16A34A" : t.status === "In Progress" ? "#6150F6" : "#737370",
                      }}>{t.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
