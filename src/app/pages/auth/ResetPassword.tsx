import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Eye, EyeOff, Lock, ArrowLeft } from "lucide-react";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => navigate("/auth/login"), 1000);
  };

  return (
    <div>
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
        style={{ background: "color-mix(in srgb, var(--brand) 12%, transparent)" }}
      >
        <Lock className="w-5 h-5" style={{ color: "var(--brand)" }} />
      </div>
      <h1 className="text-foreground mb-1" style={{ fontSize: "24px", fontWeight: 800, letterSpacing: "-0.02em" }}>Set new password</h1>
      <p className="text-muted-foreground mb-8" style={{ fontSize: "14px" }}>
        Your new password must be at least 8 characters.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-foreground mb-1.5" style={{ fontSize: "13px", fontWeight: 500 }}>New password</label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              placeholder="••••••••"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full h-10 pl-3 pr-9 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/30"
              style={{ fontSize: "14px" }}
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-foreground mb-1.5" style={{ fontSize: "13px", fontWeight: 500 }}>Confirm password</label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="••••••••"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full h-10 pl-3 pr-9 rounded-xl border bg-input-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/30 ${error ? "border-red-500" : "border-border"}`}
              style={{ fontSize: "14px" }}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {error && <p className="mt-1.5 text-red-500" style={{ fontSize: "12px" }}>{error}</p>}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-xl bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 transition-all"
          style={{ fontSize: "14px", fontWeight: 600 }}
        >
          {loading ? "Resetting…" : "Reset password"}
        </button>
      </form>
      <div className="mt-6 text-center">
        <Link
          to="/auth/login"
          className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors no-underline"
          style={{ fontSize: "13px" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
