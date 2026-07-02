import { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router";
import { getSession, refreshSession } from "../lib/session";

type State = "checking" | "authenticated" | "unauthenticated";

/**
 * Wraps protected route trees (/portal, /admin).
 * Reads the local session on mount, optionally re-validates against /api/auth/me,
 * then either renders <Outlet /> or redirects to /auth/login.
 */
export function AuthGate() {
  const location = useLocation();
  const [state, setState] = useState<State>(() =>
    getSession() ? "checking" : "unauthenticated"
  );

  useEffect(() => {
    let cancelled = false;

    async function verify() {
      const session = await refreshSession().catch(() => null);
      if (!cancelled) {
        setState(session ? "authenticated" : "unauthenticated");
      }
    }

    // If we have a local session, re-validate it; otherwise bail immediately.
    if (getSession()) {
      verify();
    } else {
      setState("unauthenticated");
    }

    return () => {
      cancelled = true;
    };
  }, []);

  if (state === "checking") {
    return (
      <div
        className="flex-1 flex items-center justify-center"
        style={{ minHeight: "60vh" }}
      >
        <div
          className="w-7 h-7 rounded-full border-2 animate-spin"
          style={{
            borderColor: "var(--border)",
            borderTopColor: "var(--brand)",
          }}
        />
      </div>
    );
  }

  if (state === "unauthenticated") {
    return (
      <Navigate
        to="/auth/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
}
