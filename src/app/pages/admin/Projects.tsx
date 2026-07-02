import { useState } from "react";
import { Link } from "react-router";
import { mockProjects, statusColors } from "../../lib/data";
import { Search, LayoutGrid } from "lucide-react";

export default function AdminProjects() {
  const [search, setSearch] = useState("");

  const filtered = mockProjects.filter((p) => {
    const q = search.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.client.toLowerCase().includes(q) || p.type.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1 text-sm">All studio projects across clients.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/admin/projects/board"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-foreground hover:bg-secondary transition-all no-underline text-sm font-medium"
          >
            <LayoutGrid className="w-4 h-4" />
            Board view
          </Link>
          <button className="px-4 py-2 rounded-xl bg-brand text-white hover:bg-brand/90 transition-all text-sm font-semibold">
            + New Project
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search projects…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-9 pl-9 pr-3 rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/30 text-[13px]"
        />
      </div>

      {/* Project List */}
      <div className="space-y-3">
        {filtered.map((project) => {
          const sc = statusColors[project.status] ?? "#737370";
          const pc = statusColors[project.priority] ?? "#737370";
          return (
            <div
              key={project.id}
              className="rounded-2xl p-4 border border-border bg-card flex items-center gap-4 hover:border-brand/30 transition-all"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="text-foreground text-sm font-semibold">{project.name}</h3>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: `${sc}18`, color: sc }}>{project.status}</span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: `${pc}18`, color: pc }}>{project.priority}</span>
                </div>
                <p className="text-muted-foreground text-xs">{project.client} · {project.type} · Due {project.dueDate}</p>
              </div>

              <div className="hidden md:flex items-center gap-4">
                <div style={{ width: 120 }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-muted-foreground text-[11px]">Progress</span>
                    <span className="text-[11px] font-semibold" style={{ color: sc }}>{project.progress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden bg-secondary">
                    <div className="h-full rounded-full" style={{ width: `${project.progress}%`, background: sc }} />
                  </div>
                </div>
                <div className="text-right" style={{ minWidth: 80 }}>
                  <p className="text-foreground text-[13px] font-semibold">{project.budget}</p>
                  <p className="text-muted-foreground text-[11px]">budget</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
