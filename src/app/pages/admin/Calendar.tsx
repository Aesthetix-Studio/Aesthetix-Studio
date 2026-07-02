import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { fetchTasks } from "../../lib/api";

type CalEvent = { label: string; color: string; day: number };

const priorityColors: Record<string, string> = {
  Urgent: "#EF4444", High: "#F59E0B", Medium: "#6150F6", Low: "#737370",
};

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function AdminCalendar() {
  const [tasks, setTasks] = useState<{ id: string; title: string; due_date: string; priority: string; status: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    fetchTasks().then((r) => setTasks(r.tasks)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDow = (firstDay.getDay() + 6) % 7;

  const events: Record<number, CalEvent[]> = useMemo(() => {
    const map: Record<number, CalEvent[]> = {};
    tasks.forEach((t) => {
      if (!t.due_date) return;
      const d = new Date(t.due_date);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate();
        if (!map[day]) map[day] = [];
        map[day].push({
          label: t.title,
          color: t.status === "Done" ? "#16A34A" : priorityColors[t.priority] ?? "#737370",
          day,
        });
      }
    });
    return map;
  }, [tasks, year, month]);

  const cells: (number | null)[] = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  const rows = Math.ceil(cells.length / 7);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

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
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Calendar</h1>
          <p className="text-muted-foreground mt-1 text-sm">Studio schedule and project milestones.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={prevMonth} className="w-8 h-8 rounded-lg flex items-center justify-center border border-border hover:bg-secondary transition-colors">
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <span className="text-foreground px-2 text-sm font-semibold">{monthNames[month]} {year}</span>
          <button onClick={nextMonth} className="w-8 h-8 rounded-lg flex items-center justify-center border border-border hover:bg-secondary transition-colors">
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-border overflow-hidden">
        <div className="grid grid-cols-7 border-b border-border bg-secondary/50">
          {daysOfWeek.map((d) => (
            <div key={d} className="py-3 text-center text-muted-foreground text-xs font-semibold">{d}</div>
          ))}
        </div>

        {Array.from({ length: rows }).map((_, rowIdx) => (
          <div key={rowIdx} className="grid grid-cols-7" style={{ borderBottom: rowIdx < rows - 1 ? "1px solid var(--border)" : undefined }}>
            {cells.slice(rowIdx * 7, rowIdx * 7 + 7).map((day, colIdx) => {
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              const dayEvents = day ? events[day] ?? [] : [];
              return (
                <div key={colIdx} className="min-h-24 p-2 border-r border-border last:border-r-0" style={{ background: day ? "var(--card)" : "var(--secondary)" }}>
                  {day && (
                    <>
                      <div className="mb-1.5 flex justify-start">
                        <span className={`w-7 h-7 flex items-center justify-center rounded-full text-[13px] ${isToday ? "bg-brand text-white font-bold" : "text-foreground"}`}>
                          {day}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {dayEvents.map((ev, ei) => (
                          <div key={ei} className="px-1.5 py-0.5 rounded truncate text-[10px] font-semibold" style={{ background: `${ev.color}22`, color: ev.color }}>
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

      <div className="flex items-center gap-4 flex-wrap">
        {[
          { label: "Urgent", color: "#EF4444" },
          { label: "High", color: "#F59E0B" },
          { label: "Medium", color: "#6150F6" },
          { label: "Done", color: "#16A34A" },
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
