import { Outlet, NavLink, Link } from "react-router";
import { LayoutDashboard, FolderOpen, Paperclip, MessageSquare, Receipt, Settings, Sparkles, LogOut, Bell, ChevronDown } from "lucide-react";
import { clearSession, getSession, refreshSession } from "../lib/session";
import { useEffect, useState } from "react";

const navItems = [
  { to:"/portal", icon:LayoutDashboard, label:"Dashboard", end:true },
  { to:"/portal/projects", icon:FolderOpen, label:"Projects" },
  { to:"/portal/files", icon:Paperclip, label:"Files" },
  { to:"/portal/messages", icon:MessageSquare, label:"Messages", badge:2 },
  { to:"/portal/invoices", icon:Receipt, label:"Invoices" },
  { to:"/portal/settings", icon:Settings, label:"Settings" },
];

export default function PortalLayout() {
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

  const displayName = session?.displayName ?? session?.email?.split("@")[0].replace(/[._-]+/g, " ") ?? "Sarah Chen";
  const initials = displayName.slice(0, 2).toUpperCase();
  const companyName = session?.role === "admin" ? "Aesthetix Studio" : "Luminary Financial";
  const handleSignOut = () => {
    clearSession();
    setSessionState(null);
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ fontFamily:"'Plus Jakarta Sans','Inter',system-ui,sans-serif", background:"var(--background)", color:"var(--foreground)" }}>
      {/* Sidebar */}
      <aside className="w-56 shrink-0 flex flex-col overflow-y-auto bg-card border-r border-border">
        <div className="px-4 py-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div className="w-6 h-6 rounded-md bg-brand flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <div className="text-foreground" style={{ fontSize:"12px", fontWeight:700 }}>Aesthetix</div>
              <div className="text-muted-foreground" style={{ fontSize:"9px", textTransform:"uppercase", letterSpacing:"0.08em" }}>Client Portal</div>
            </div>
          </Link>
        </div>
        <div className="px-3 py-3 border-b border-border">
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg bg-secondary/60">
            <div className="w-7 h-7 rounded-full bg-brand flex items-center justify-center text-white shrink-0" style={{ fontSize:"10px", fontWeight:700 }}>{initials}</div>
            <div className="min-w-0">
              <div className="text-foreground truncate" style={{ fontSize:"12px", fontWeight:600 }}>{displayName}</div>
              <div className="text-muted-foreground truncate" style={{ fontSize:"10px" }}>{companyName}</div>
            </div>
            <ChevronDown className="w-3 h-3 text-muted-foreground shrink-0" />
          </div>
        </div>
        <nav className="flex-1 px-3 py-3 space-y-0.5">
          {navItems.map(({ to, icon:Icon, label, end, badge }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) => `flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all duration-150 no-underline ${isActive ? "bg-brand/10 text-brand" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`}
              style={{ fontSize:"13px" }}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1">{label}</span>
              {badge && <span className="w-4 h-4 rounded-full bg-brand text-white flex items-center justify-center" style={{ fontSize:"9px", fontWeight:700 }}>{badge}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-border">
          <Link
            to="/auth/login"
            onClick={handleSignOut}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors no-underline"
            style={{ fontSize:"13px" }}
          >
            <LogOut className="w-4 h-4" /> Sign out
          </Link>
        </div>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-12 flex items-center justify-between px-6 border-b border-border bg-card shrink-0">
          <div />
          <div className="flex items-center gap-2">
            <button className="relative p-1.5 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-brand" />
            </button>
            <div className="w-7 h-7 rounded-full bg-brand flex items-center justify-center text-white" style={{ fontSize:"10px", fontWeight:700 }}>{initials}</div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-background">
          <div style={{ padding: "24px 32px" }}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
