import { Outlet, Link } from "react-router";
import { Sparkles } from "lucide-react";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col" style={{ fontFamily: "'Plus Jakarta Sans','Inter',system-ui,sans-serif" }}>
      <header className="flex items-center justify-between px-6 py-4 border-b border-border/50">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-foreground" style={{ fontSize:"15px", fontWeight:700, letterSpacing:"-0.01em" }}>Aesthetix Studio</span>
        </Link>
        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors no-underline" style={{ fontSize:"13px" }}>
          ← Back to site
        </Link>
      </header>
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
      <footer className="py-4 text-center border-t border-border/50">
        <p className="text-muted-foreground" style={{ fontSize:"12px" }}>
          © 2026 Aesthetix Studio ·{" "}
          <Link to="/faq" className="hover:text-foreground transition-colors no-underline">Privacy</Link>
          {" · "}
          <Link to="/faq" className="hover:text-foreground transition-colors no-underline">Terms</Link>
        </p>
      </footer>
    </div>
  );
}
