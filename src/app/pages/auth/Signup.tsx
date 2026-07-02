import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { signUpWithPassword } from "../../lib/api";
import { setSession } from "../../lib/session";

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = (location.state as { from?: string })?.from;
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    try {
      const result = await signUpWithPassword(String(form.get("email") ?? ""), String(form.get("password") ?? ""));
      if (result.access_token) {
        const fullName = `${String(form.get("firstName") ?? "").trim()} ${String(form.get("lastName") ?? "").trim()}`.trim();
        setSession({
          accessToken: result.access_token,
          refreshToken: result.refresh_token,
          role: result.user?.app_metadata?.role ?? "authenticated",
          email: result.user?.email,
          displayName: fullName || result.user?.email || undefined,
        });
        if (returnTo) {
          navigate(returnTo);
        } else {
          navigate("/portal");
        }
      } else {
        navigate("/auth/verify-email");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-foreground mb-1" style={{ fontSize: "24px", fontWeight: 800, letterSpacing: "-0.02em" }}>Create an account</h1>
      <p className="text-muted-foreground mb-8" style={{ fontSize: "14px" }}>Start working with your studio today</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-foreground mb-1.5" style={{ fontSize: "13px", fontWeight: 500 }}>First name</label>
            <input
              name="firstName"
              type="text"
              placeholder="Jane"
              required
              className="w-full h-10 px-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/30"
              style={{ fontSize: "14px" }}
            />
          </div>
          <div>
            <label className="block text-foreground mb-1.5" style={{ fontSize: "13px", fontWeight: 500 }}>Last name</label>
            <input
              name="lastName"
              type="text"
              placeholder="Smith"
              required
              className="w-full h-10 px-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/30"
              style={{ fontSize: "14px" }}
            />
          </div>
        </div>
        <div>
          <label className="block text-foreground mb-1.5" style={{ fontSize: "13px", fontWeight: 500 }}>Work email</label>
          <input
            name="email"
            type="email"
            placeholder="jane@company.com"
            required
            className="w-full h-10 px-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/30"
            style={{ fontSize: "14px" }}
          />
        </div>
        <div>
          <label className="block text-foreground mb-1.5" style={{ fontSize: "13px", fontWeight: 500 }}>Password</label>
          <div className="relative">
            <input
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="••••••••"
              required
              minLength={8}
              className="w-full h-10 pl-3 pr-9 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/30"
              style={{ fontSize: "14px" }}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <p className="mt-1.5 text-muted-foreground" style={{ fontSize: "12px" }}>At least 8 characters</p>
        </div>
        <label className="flex items-start gap-2.5 cursor-pointer">
          <div
            onClick={() => setAgreed(!agreed)}
            className={`mt-0.5 w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-all ${agreed ? "bg-foreground border-foreground" : "bg-input-background border-border"}`}
          >
            {agreed && (
              <svg className="w-2.5 h-2.5 text-background" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={3}>
                <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span className="text-muted-foreground" style={{ fontSize: "13px" }}>
            I agree to the{" "}
            <Link to="/terms-of-service" className="text-foreground hover:underline" style={{ fontWeight: 500 }}>Terms of Service</Link>
            {" "}and{" "}
            <Link to="/privacy-policy" className="text-foreground hover:underline" style={{ fontWeight: 500 }}>Privacy Policy</Link>
          </span>
        </label>
        {error && <p className="text-red-600" style={{ fontSize: "12px" }}>{error}</p>}
        <button
          type="submit"
          disabled={loading || !agreed}
          className="w-full py-2.5 rounded-xl bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 transition-all"
          style={{ fontSize: "14px", fontWeight: 600 }}
        >
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>
      <p className="text-center mt-6 text-muted-foreground" style={{ fontSize: "13px" }}>
        Already have an account?{" "}
        <Link to="/auth/login" className="text-brand hover:underline no-underline" style={{ fontWeight: 500 }}>Sign in</Link>
      </p>
    </div>
  );
}
