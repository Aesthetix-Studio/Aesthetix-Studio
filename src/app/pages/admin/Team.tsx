import { mockTeam, mockTasks } from "../../lib/data";
import { Mail } from "lucide-react";

export default function AdminTeam() {
  const getTaskCount = (name: string) => {
    const firstName = name.split(" ")[0];
    return mockTasks.filter((t) => t.assignee.startsWith(firstName) && t.status !== "Done").length;
  };

  const getProjectCount = (member: typeof mockTeam[number]) => member.projects;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Team</h1>
          <p className="text-muted-foreground mt-1 text-sm">Your studio team members and current workload.</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-brand text-white hover:bg-brand/90 transition-all text-sm font-semibold">
          + Invite Member
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockTeam.map((member) => {
          const openTasks = getTaskCount(member.name);
          const activeProjects = getProjectCount(member);
          return (
            <div
              key={member.id}
              className="rounded-2xl p-5 border border-border bg-card flex flex-col gap-4 hover:border-brand/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-white text-sm font-bold"
                  style={{ background: member.color }}
                >
                  {member.avatar}
                </div>
                <div>
                  <p className="text-foreground text-[15px] font-bold">{member.name}</p>
                  <p className="text-muted-foreground text-xs">{member.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl p-3 text-center bg-secondary">
                  <p className="text-foreground text-xl font-bold">{activeProjects}</p>
                  <p className="text-muted-foreground text-[11px]">Active projects</p>
                </div>
                <div className="rounded-xl p-3 text-center bg-secondary">
                  <p className="text-foreground text-xl font-bold">{openTasks}</p>
                  <p className="text-muted-foreground text-[11px]">Open tasks</p>
                </div>
              </div>

              <a
                href={`mailto:${member.email}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors no-underline mt-auto text-xs"
              >
                <Mail className="w-3.5 h-3.5" />
                {member.email}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
