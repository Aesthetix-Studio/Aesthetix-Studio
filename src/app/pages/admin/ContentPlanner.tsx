import { useState } from "react";

type ContentItem = {
  id: string;
  title: string;
  type: "Blog Post" | "Case Study" | "Newsletter" | "Social" | "Website Copy";
  status: "Published" | "Draft" | "Scheduled" | "In Review";
  date: string;
  author: string;
  tags: string[];
};

const content: ContentItem[] = [
  {
    id: "c1",
    title: "How Great Branding Drives Business Growth",
    type: "Blog Post",
    status: "Published",
    date: "Jun 15, 2026",
    author: "Lena Morris",
    tags: ["Branding", "Growth"],
  },
  {
    id: "c2",
    title: "Luminary Financial — Rebrand Case Study",
    type: "Case Study",
    status: "In Review",
    date: "Jun 22, 2026",
    author: "Anna Reeves",
    tags: ["Client Work", "Finance"],
  },
  {
    id: "c3",
    title: "June Studio Updates & New Projects",
    type: "Newsletter",
    status: "Scheduled",
    date: "Jun 25, 2026",
    author: "Mia Chen",
    tags: ["Studio", "Updates"],
  },
  {
    id: "c4",
    title: "5 Web Design Trends for 2026",
    type: "Blog Post",
    status: "Draft",
    date: "Jul 1, 2026",
    author: "Kai Tanaka",
    tags: ["Design", "Trends"],
  },
  {
    id: "c5",
    title: "Behind the scenes: Nexus Dashboard",
    type: "Social",
    status: "Scheduled",
    date: "Jun 28, 2026",
    author: "Anna Reeves",
    tags: ["Social Media", "Product"],
  },
  {
    id: "c6",
    title: "Services page rewrite — Growth package",
    type: "Website Copy",
    status: "Draft",
    date: "Jul 5, 2026",
    author: "Lena Morris",
    tags: ["Copy", "Services"],
  },
];

const types = ["All", "Blog Post", "Case Study", "Newsletter", "Social", "Website Copy"] as const;

const contentStatusColors: Record<string, string> = {
  Published: "#16A34A",
  Draft: "#737370",
  Scheduled: "#3B82F6",
  "In Review": "#F59E0B",
};

const typeColors: Record<string, string> = {
  "Blog Post": "#6150F6",
  "Case Study": "#F59E0B",
  Newsletter: "#3B82F6",
  Social: "#EC4899",
  "Website Copy": "#10B981",
};

export default function AdminContentPlanner() {
  const [activeType, setActiveType] = useState<string>("All");

  const filtered = content.filter((c) => activeType === "All" || c.type === activeType);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Content Planner</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage studio content across all channels.</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-brand text-white hover:bg-brand/90 transition-all text-sm font-semibold">
          + New Content
        </button>
      </div>

      {/* Type Filter */}
      <div className="flex gap-1.5 flex-wrap">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setActiveType(t)}
            className={`px-3 py-1.5 rounded-lg transition-all text-xs font-medium ${
              activeType === t
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
              {["Title", "Type", "Status", "Date", "Author", "Tags", ""].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-muted-foreground text-[11px] font-semibold uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => {
              const sc = contentStatusColors[item.status] ?? "#737370";
              const tc = typeColors[item.type] ?? "#6150F6";
              return (
                <tr
                  key={item.id}
                  className="border-t border-border hover:bg-secondary/30 transition-colors"
                  style={{ background: i % 2 === 0 ? "var(--card)" : undefined }}
                >
                  <td className="px-4 py-3">
                    <span className="text-foreground text-[13px] font-medium">{item.title}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-0.5 rounded-full whitespace-nowrap text-[11px] font-semibold"
                      style={{ background: `${tc}18`, color: tc }}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-0.5 rounded-full text-[11px] font-semibold"
                      style={{ background: `${sc}18`, color: sc }}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-muted-foreground text-[13px]">{item.date}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-foreground text-[13px]">{item.author}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 rounded bg-secondary text-muted-foreground text-[10px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-muted-foreground hover:text-foreground transition-colors text-xs">
                      Edit
                    </button>
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
