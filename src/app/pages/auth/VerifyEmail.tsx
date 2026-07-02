import { useState } from "react";
import { Link } from "react-router";
import { Mail } from "lucide-react";

export default function VerifyEmail() {
  const [resent, setResent] = useState(false);

  const handleResend = () => {
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  };

  return (
    <div className="text-center">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
        style={{ background: "color-mix(in srgb, var(--brand) 12%, transparent)" }}
      >
        <Mail className="w-8 h-8" style={{ color: "var(--brand)" }} />
      </div>
      <h1 className="text-foreground mb-3" style={{ fontSize: "24px", fontWeight: 800, letterSpacing: "-0.02em" }}>Verify your email</h1>
      <p className="text-muted-foreground mb-2" style={{ fontSize: "14px" }}>
        We've sent a verification link to your email address.
      </p>
      <p className="text-muted-foreground mb-8" style={{ fontSize: "14px" }}>
        Click the link in that email to activate your account and get started.
      </p>

      <div
        className="rounded-xl p-4 mb-8 border text-left"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <p className="text-muted-foreground" style={{ fontSize: "13px" }}>
          <strong className="text-foreground">Tip:</strong> If you don't see it, check your spam or junk folder. The link expires in 24 hours.
        </p>
      </div>

      <p className="text-muted-foreground mb-2" style={{ fontSize: "13px" }}>Didn't receive the email?</p>
      {resent ? (
        <p className="mb-6" style={{ fontSize: "13px", color: "var(--brand)", fontWeight: 500 }}>
          Email resent! Check your inbox.
        </p>
      ) : (
        <button
          type="button"
          onClick={handleResend}
          className="mb-6 hover:underline"
          style={{ fontSize: "13px", fontWeight: 500, color: "var(--brand)" }}
        >
          Resend verification email
        </button>
      )}

      <div className="pt-4 border-t border-border/50">
        <Link
          to="/auth/login"
          className="text-muted-foreground hover:text-foreground transition-colors no-underline"
          style={{ fontSize: "13px" }}
        >
          ← Back to sign in
        </Link>
      </div>
    </div>
  );
}
