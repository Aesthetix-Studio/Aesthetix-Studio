import { Outlet, NavLink, Link } from "react-router";
import { LayoutDashboard, Users, Briefcase, CheckSquare, Calendar, BarChart2, BookOpen, Settings, Bell, Search, UserCircle, FolderKanban, ChevronDown, LogOut } from "lucide-react";
import { clearSession, getSession, refreshSession } from "../lib/session";
import { useEffect, useState } from "react";
import { AesthetixMark } from "../components/AesthetixMark";

interface NavItem {
  to: string;
  icon: React.ComponentType<any>;
  label: string;
  end?: boolean;
  badge?: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  { label:"Overview", items:[{ to:"/admin", icon:LayoutDashboard, label:"Dashboard", end:true }] },
  { label:"CRM", items:[
    { to:"/admin/leads", icon:Users, label:"Leads", badge:"5" },
    { to:"/admin/clients", icon:UserCircle, label:"Clients" },
  ]},
  { label:"Work", items:[
    { to:"/admin/projects", icon:Briefcase, label:"Projects" },
    { to:"/admin/projects/board", icon:FolderKanban, label:"Board" },
    { to:"/admin/tasks", icon:CheckSquare, label:"Tasks", badge:"3" },
    { to:"/admin/calendar", icon:Calendar, label:"Calendar" },
  ]},
  { label:"Studio", items:[
    { to:"/admin/team", icon:Users, label:"Team" },
    { to:"/admin/analytics", icon:BarChart2, label:"Analytics" },
    { to:"/admin/content", icon:BookOpen, label:"Content" },
    { to:"/admin/settings", icon:Settings, label:"Settings" },
  ]},
];

export default function AdminLayout() {
  const [session, setSessionState] = useState(getSession());

  useEffect(() => {
    const sync = () => setSessionState(getSession());
    sync();
    window.addEventListener("storage", sync);
    refreshSession().then((next) => {
      if (next) setSessionState(next);
    });
    return () => window.removeEventListener("storage", sync);
  }, []);

  const displayName = session?.displayName ?? session?.email?.split("@")[0].replace(/[._-]+/g, " ") ?? "Admin";
  const initials = displayName.slice(0, 2).toUpperCase();
  const companyName = "aesthetixstudio.dev";
  const handleSignOut = () => {
    clearSession();
    setSessionState(null);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <aside className="w-56 shrink-0 flex flex-col overflow-y-auto bg-card border-r border-border">
        <div className="px-4 py-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <AesthetixMark size={24} color="var(--brand)" />
            <div>
              <div className="text-foreground text-xs font-bold">Aesthetix</div>
              <div className="text-muted-foreground text-[9px] uppercase tracking-widest">Admin</div>
            </div>
          </Link>
        </div>
        <div className="px-3 py-3 border-b border-border">
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg bg-secondary/60">
            <div className="w-7 h-7 rounded-full bg-brand flex items-center justify-center text-white shrink-0 text-[10px] font-bold">{initials}</div>
            <div className="min-w-0 flex-1">
              <div className="text-foreground truncate text-xs font-semibold">{displayName}</div>
              <div className="text-muted-foreground truncate text-[10px]">{companyName}</div>
            </div>
            <ChevronDown className="w-3 h-3 text-muted-foreground shrink-0" />
          </div>
        </div>
        <nav className="flex-1 px-3 py-3 overflow-y-auto">
          {navGroups.map(({ label, items }) => (
            <div key={label} className="mb-4">
              <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-widest px-2.5 pb-1.5">{label}</p>
              <div className="space-y-0.5">
                {items.map(({ to, icon:Icon, label:lbl, end, badge }) => (
                  <NavLink key={to} to={to} end={end}
                    className={({ isActive }) => `flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all duration-150 no-underline text-[13px] ${isActive ? "bg-brand/15 text-brand font-medium" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="flex-1">{lbl}</span>
                    {badge && <span className="px-1.5 py-0.5 rounded-full bg-brand/15 text-brand text-[10px] font-bold">{badge}</span>}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="px-3 py-3 border-t border-border">
          <Link
            to="/auth/login"
            onClick={handleSignOut}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors no-underline text-[13px]"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </Link>
        </div>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-12 flex items-center justify-between px-6 border-b border-border bg-card shrink-0">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input placeholder="Search…" className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/50 text-[13px]" />
            <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border text-muted-foreground text-[10px]">⌘K</kbd>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-1.5 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-destructive" />
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
