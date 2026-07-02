import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { signInWithPassword } from "../../lib/api";
import { setSession } from "../../lib/session";

export default function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    try {
      const result = await signInWithPassword(String(form.get("email") ?? ""), String(form.get("password") ?? ""));
      setSession({
        accessToken: result.access_token,
        refreshToken: result.refresh_token,
        role: result.user?.app_metadata?.role ?? "authenticated",
        email: result.user?.email,
        displayName: result.user?.user_metadata?.full_name ?? result.user?.user_metadata?.name ?? result.user?.email ?? undefined,
      });
      navigate(result.user?.app_metadata?.role === "admin" ? "/admin" : "/portal");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1 className="text-foreground mb-1" style={{ fontSize:"24px", fontWeight:800, letterSpacing:"-0.02em" }}>Welcome back</h1>
      <p className="text-muted-foreground mb-8" style={{ fontSize:"14px" }}>Sign in to your client portal</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-foreground mb-1.5" style={{ fontSize:"13px", fontWeight:500 }}>Email</label>
          <input name="email" type="email" placeholder="you@company.com" required className="w-full h-10 px-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/30" style={{ fontSize:"14px" }} />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-foreground" style={{ fontSize:"13px", fontWeight:500 }}>Password</label>
            <Link to="/auth/forgot-password" className="text-brand hover:underline no-underline" style={{ fontSize:"12px" }}>Forgot?</Link>
          </div>
          <div className="relative">
            <input name="password" type={showPass ? "text" : "password"} placeholder="••••••••" required className="w-full h-10 pl-3 pr-9 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/30" style={{ fontSize:"14px" }} />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        {error && <p className="text-red-600" style={{ fontSize: "12px" }}>{error}</p>}
        <button type="submit" disabled={loading} className="w-full py-2.5 rounded-xl bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 transition-all" style={{ fontSize:"14px", fontWeight:600 }}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <p className="text-center mt-6 text-muted-foreground" style={{ fontSize:"13px" }}>
        No account? <Link to="/auth/signup" className="text-brand hover:underline no-underline" style={{ fontWeight:500 }}>Sign up</Link>
      </p>
      <div className="mt-6 pt-4 border-t border-border/50 text-center">
        <Link to="/admin" className="text-muted-foreground hover:text-brand no-underline" style={{ fontSize:"12px" }}>Admin access →</Link>
      </div>
    </div>
  );
}
