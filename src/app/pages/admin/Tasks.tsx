import { useState } from "react";
import { mockTasks, statusColors } from "../../lib/data";
import { CheckCircle2, Circle } from "lucide-react";

const filterTabs = ["All", "To Do", "In Progress", "Done", "High", "Medium", "Low"];

export default function AdminTasks() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = mockTasks.filter((t) => {
    if (activeFilter === "All") return true;
    return t.status === activeFilter || t.priority === activeFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Tasks</h1>
          <p className="text-muted-foreground mt-1 text-sm">Track team tasks across all projects.</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-brand text-white hover:bg-brand/90 transition-all text-sm font-semibold">
          + New Task
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 flex-wrap">
        {filterTabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveFilter(t)}
            className={`px-3 py-1.5 rounded-lg transition-all text-xs font-medium ${
              activeFilter === t
                ? "bg-foreground text-background"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-secondary/50">
              {["Task", "Project", "Assignee", "Due", "Priority", "Status"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-muted-foreground text-[11px] font-semibold uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((task, i) => {
              const isDone = task.status === "Done";
              const pc = statusColors[task.priority] ?? "#737370";
              const ssc = statusColors[task.status] ?? "#737370";
              return (
                <tr
                  key={task.id}
                  className="border-t border-border hover:bg-secondary/30 transition-colors"
                  style={{ background: i % 2 === 0 ? "var(--card)" : undefined }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-green-500" />
                      ) : (
                        <Circle className="w-4 h-4 shrink-0 text-muted-foreground" />
                      )}
                      <span
                        className={`text-[13px] font-medium ${
                          isDone ? "text-muted-foreground line-through" : "text-foreground"
                        }`}
                      >
                        {task.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-muted-foreground text-[13px]">{task.project}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-foreground text-[13px]">{task.assignee}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-muted-foreground text-[13px]">Jun {task.due.replace("Jun ", "")}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-0.5 rounded-full text-[11px] font-semibold"
                      style={{ background: `${pc}18`, color: pc }}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-0.5 rounded-full text-[11px] font-semibold"
                      style={{ background: `${ssc}18`, color: ssc }}
                    >
                      {task.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
