import { useEffect, useState } from "react";
import { fetchTeam, fetchTasks } from "../../lib/api";
import { Mail, Loader2 } from "lucide-react";

export default function AdminTeam() {
  const [team, setTeam] = useState<{ id: string; name: string; role: string; email: string; avatar: string; color: string; status: string }[]>([]);
  const [tasks, setTasks] = useState<{ id: string; assignee: string; status: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchTeam().then((r) => r.team).catch(() => []),
      fetchTasks().then((r) => r.tasks).catch(() => []),
    ]).then(([t, tk]) => { setTeam(t); setTasks(tk); }).finally(() => setLoading(false));
  }, []);

  const getTaskCount = (name: string) => tasks.filter((t) => t.assignee === name && t.status !== "Done").length;

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
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Team</h1>
        <p className="text-muted-foreground mt-1 text-sm">Manage your team members and their assignments.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {team.length === 0 ? (
          <p className="text-muted-foreground text-sm col-span-2 py-8">No team members found.</p>
        ) : (
          team.map((m) => {
            const taskCount = getTaskCount(m.name);
            return (
              <div key={m.id} className="rounded-2xl p-4 border border-border bg-card hover:bg-secondary transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ background: m.color }}>
                    {m.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground font-semibold truncate">{m.name}</p>
                    <p className="text-muted-foreground text-sm truncate">{m.role}</p>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <span className="text-foreground text-sm font-semibold">{taskCount}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                  <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground text-xs truncate">{m.email}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
