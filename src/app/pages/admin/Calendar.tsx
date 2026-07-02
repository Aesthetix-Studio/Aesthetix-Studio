import { ChevronLeft, ChevronRight } from "lucide-react";

type CalEvent = { label: string; color: string };

const events: Record<number, CalEvent[]> = {
  18: [{ label: "Luminary design review", color: "#7C3AED" }],
  20: [{ label: "Discovery call", color: "#EF4444" }],
  23: [
    { label: "Brand guidelines review", color: "#7C3AED" },
    { label: "Nexus flows", color: "#3B82F6" },
  ],
  24: [{ label: "Verdant QA", color: "#16A34A" }],
  26: [{ label: "Team standup", color: "#737370" }],
  27: [{ label: "Helix presentation", color: "#EC4899" }],
};

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const JUNE_START_DOW = 0;
const JUNE_DAYS = 30;
const TODAY = 21;

export default function AdminCalendar() {
  const totalCells = JUNE_START_DOW + JUNE_DAYS;
  const rows = Math.ceil(totalCells / 7);

  const cells: (number | null)[] = [];
  for (let i = 0; i < JUNE_START_DOW; i++) cells.push(null);
  for (let d = 1; d <= JUNE_DAYS; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Calendar</h1>
          <p className="text-muted-foreground mt-1 text-sm">Studio schedule and project milestones.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-border hover:bg-secondary transition-colors">
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <span className="text-foreground px-2 text-sm font-semibold">June 2026</span>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-border hover:bg-secondary transition-colors">
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="rounded-2xl border border-border overflow-hidden">
        <div className="grid grid-cols-7 border-b border-border bg-secondary/50">
          {daysOfWeek.map((d) => (
            <div key={d} className="py-3 text-center text-muted-foreground text-xs font-semibold">
              {d}
            </div>
          ))}
        </div>

        {Array.from({ length: rows }).map((_, rowIdx) => (
          <div key={rowIdx} className="grid grid-cols-7" style={{ borderBottom: rowIdx < rows - 1 ? "1px solid var(--border)" : undefined }}>
            {cells.slice(rowIdx * 7, rowIdx * 7 + 7).map((day, colIdx) => {
              const isToday = day === TODAY;
              const dayEvents = day ? events[day] ?? [] : [];
              return (
                <div
                  key={colIdx}
                  className="min-h-24 p-2 border-r border-border last:border-r-0"
                  style={{ background: day ? "var(--card)" : "var(--secondary)" }}
                >
                  {day && (
                    <>
                      <div className="mb-1.5 flex justify-start">
                        <span
                          className={`w-7 h-7 flex items-center justify-center rounded-full text-[13px] ${
                            isToday ? "bg-brand text-white font-bold" : "text-foreground"
                          }`}
                        >
                          {day}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {dayEvents.map((ev, ei) => (
                          <div
                            key={ei}
                            className="px-1.5 py-0.5 rounded truncate text-[10px] font-semibold"
                            style={{ background: `${ev.color}22`, color: ev.color }}
                          >
                            {ev.label}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 flex-wrap">
        {[
          { label: "Design", color: "#7C3AED" },
          { label: "Discovery", color: "#EF4444" },
          { label: "Development", color: "#3B82F6" },
          { label: "QA", color: "#16A34A" },
          { label: "Internal", color: "#737370" },
          { label: "Presentations", color: "#EC4899" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
            <span className="text-muted-foreground text-xs">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
