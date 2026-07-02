import { useState } from "react";
import { Link } from "react-router";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="text-center">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{ background: "color-mix(in srgb, var(--brand) 12%, transparent)" }}
        >
          <CheckCircle className="w-7 h-7" style={{ color: "var(--brand)" }} />
        </div>
        <h1 className="text-foreground mb-2" style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.02em" }}>Check your email</h1>
        <p className="text-muted-foreground mb-2" style={{ fontSize: "14px" }}>
          We sent a password reset link to
        </p>
        <p className="text-foreground mb-8" style={{ fontSize: "14px", fontWeight: 600 }}>{email}</p>
        <p className="text-muted-foreground mb-6" style={{ fontSize: "13px" }}>
          Didn't receive the email? Check your spam folder or{" "}
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="text-brand hover:underline"
            style={{ fontWeight: 500 }}
          >
            try again
          </button>
          .
        </p>
        <Link
          to="/auth/login"
          className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors no-underline"
          style={{ fontSize: "13px" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
        style={{ background: "color-mix(in srgb, var(--brand) 12%, transparent)" }}
      >
        <Mail className="w-5 h-5" style={{ color: "var(--brand)" }} />
      </div>
      <h1 className="text-foreground mb-1" style={{ fontSize: "24px", fontWeight: 800, letterSpacing: "-0.02em" }}>Forgot password?</h1>
      <p className="text-muted-foreground mb-8" style={{ fontSize: "14px" }}>
        No worries, we'll send you reset instructions.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-foreground mb-1.5" style={{ fontSize: "13px", fontWeight: 500 }}>Email</label>
          <input
            type="email"
            placeholder="you@company.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 px-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/30"
            style={{ fontSize: "14px" }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-xl bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 transition-all"
          style={{ fontSize: "14px", fontWeight: 600 }}
        >
          {loading ? "Sending…" : "Send reset instructions"}
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
