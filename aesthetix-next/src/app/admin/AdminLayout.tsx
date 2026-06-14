"use client";
import { useState, ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  BookOpen,
  Users,
  LogOut,
  Bell,
  Search,
  ChevronRight,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";

/* ─── Auth helpers ───────────────────────────────── */

export function getToken() {
  return typeof window !== "undefined"
    ? sessionStorage.getItem("admin_token") ?? ""
    : "";
}

export function adminHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

/* ─── Navigation ─────────────────────────────────── */

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Inquiries", icon: MessageSquare },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/blog", label: "Journal", icon: BookOpen },
  { href: "/admin/case-studies", label: "Case Studies", icon: Users },
];

const SECTION_LABELS: Record<string, string> = {
  "/admin/dashboard": "Overview",
  "/admin/leads": "Inquiries",
  "/admin/projects": "Projects",
  "/admin/blog": "Journal",
  "/admin/case-studies": "Case Studies",
};

/* ─── Main Layout ────────────────────────────────── */

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [token, setToken] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [cooldown, setCooldown] = useState(0);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_token");
    if (saved) setToken(saved);
  }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    if (cooldown > 0) {
      setError(`Please wait ${cooldown} seconds before trying again.`);
      return;
    }
    setChecking(true);
    setError("");
    try {
      const res = await fetch(`${API}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: input }),
      });
      if (res.status === 429) {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        const base = 5;
        const waitSec = Math.min(60, Math.pow(2, newAttempts - 1) * base);
        setCooldown(waitSec);
        setError(`Too many attempts. Please wait ${waitSec} seconds.`);
        setTimeout(() => setCooldown(0), waitSec * 1000);
        setChecking(false);
        return;
      }
      setLoginAttempts(0);
      setCooldown(0);
      const { token: t } = await res.json();
      sessionStorage.setItem("admin_token", t);
      setToken(t);
      router.push("/admin/dashboard");
    } catch {
      setError("Network error");
    } finally {
      setChecking(false);
    }
  }

  function logout() {
    sessionStorage.removeItem("admin_token");
    setToken("");
    router.push("/");
  }

  /* ─── Login Screen ────────────────────────────── */

  if (!token) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#080808",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Grain overlay */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            opacity: 0.035,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "400px",
            background:
              "radial-gradient(ellipse, rgba(196,164,107,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: "420px",
            padding: "0 24px",
          }}
        >
          {/* Logo mark */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "48px",
              opacity: 1,
            }}
          >
            <span
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "32px",
                color: "#F0EBE0",
                fontStyle: "italic",
                letterSpacing: "-0.02em",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Æ
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "9px",
                fontWeight: 500,
                color: "rgba(240,235,224,0.35)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Studio Admin
            </span>
          </div>
          {/* Card */}
          <div
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
              padding: "40px",
              position: "relative",
            }}
          >
            {/* Top accent line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "20%",
                right: "20%",
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(196,164,107,0.5), transparent)",
              }}
            />
            <h1
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "28px",
                color: "#F0EBE0",
                fontStyle: "italic",
                letterSpacing: "-0.02em",
                marginBottom: "6px",
                lineHeight: 1.2,
              }}
            >
              Welcome back
            </h1>
            <p
              style={{
                fontSize: "12px",
                color: "rgba(240,235,224,0.4)",
                letterSpacing: "0.02em",
                marginBottom: "36px",
              }}
            >
              Sign in to your studio dashboard
            </p>
            <form
              onSubmit={login}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {/* Password */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label
                  style={{
                    fontSize: "10px",
                    fontWeight: 500,
                    color: "rgba(240,235,224,0.45)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Password
                </label>
                <div
                  style={{
                    position: "relative",
                    borderBottom: `1px solid ${
                      focused === "password"
                        ? "rgba(196,164,107,0.6)"
                        : "rgba(255,255,255,0.1)"
                    }`,
                    transition: "border-color 0.3s ease",
                    paddingBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="password"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused(null)}
                    placeholder="••••••••••"
                    autoFocus
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      fontSize: "14px",
                      color: "#F0EBE0",
                      fontFamily: "'Inter', sans-serif",
                      caretColor: "#C4A46B",
                    }}
                  />
                </div>
              </div>
              {error && (
                <p
                  style={{
                    color: "#f87171",
                    fontSize: "12px",
                    margin: 0,
                    letterSpacing: "0.02em",
                  }}
                >
                  {error}
                </p>
              )}
              {/* Submit */}
              <button
                type="submit"
                disabled={checking}
                style={{
                  width: "100%",
                  padding: "14px 24px",
                  background: "#F0EBE0",
                  border: "none",
                  cursor: checking ? "not-allowed" : "pointer",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#080808",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  marginTop: "8px",
                  transition: "background 0.2s ease",
                  opacity: checking ? 0.6 : 1,
                }}
              >
                {checking ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
          {/* Footer note */}
          <p
            style={{
              textAlign: "center",
              marginTop: "28px",
              fontSize: "10px",
              color: "rgba(240,235,224,0.2)",
              letterSpacing: "0.05em",
            }}
          >
            Aesthetix Studio · Internal Platform
          </p>
        </div>
      </div>
    );
  }

  /* ─── Authenticated Shell ─────────────────────── */

  const currentLabel = SECTION_LABELS[pathname] || "Admin";

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#080808",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Grain */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ─── Sidebar ──────────────────────────────── */}
      <div
        style={{
          width: "228px",
          minWidth: "228px",
          height: "100vh",
          backgroundColor: "#0A0A0A",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          padding: "0",
          position: "sticky",
          top: 0,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "28px 24px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <span
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "22px",
                color: "#F0EBE0",
                fontStyle: "italic",
                letterSpacing: "-0.02em",
              }}
            >
              Æ
            </span>
          </Link>
          <div
            style={{
              width: "1px",
              height: "14px",
              background: "rgba(255,255,255,0.1)",
            }}
          />
          <div>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 500,
                color: "rgba(240,235,224,0.7)",
                letterSpacing: "0.04em",
              }}
            >
              Aesthetix
            </div>
            <div
              style={{
                fontSize: "8px",
                color: "rgba(240,235,224,0.25)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Studio Admin
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav
          style={{
            flex: 1,
            padding: "16px 12px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "9px 12px",
                  background: isActive
                    ? "rgba(196,164,107,0.08)"
                    : "transparent",
                  border: isActive
                    ? "1px solid rgba(196,164,107,0.15)"
                    : "1px solid transparent",
                  color: isActive
                    ? "#C4A46B"
                    : "rgba(240,235,224,0.4)",
                  fontSize: "12px",
                  fontWeight: isActive ? 500 : 400,
                  letterSpacing: "0.02em",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                  width: "100%",
                }}
              >
                <Icon size={14} strokeWidth={isActive ? 2 : 1.5} />
                <span style={{ flex: 1 }}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User / Logout */}
        <div
          style={{
            padding: "16px 12px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 12px",
              marginBottom: "4px",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                background:
                  "linear-gradient(135deg, rgba(196,164,107,0.3), rgba(196,164,107,0.1))",
                border: "1px solid rgba(196,164,107,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                fontWeight: 600,
                color: "#C4A46B",
                fontFamily: "'Inter', sans-serif",
                flexShrink: 0,
              }}
            >
              AS
            </div>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  color: "rgba(240,235,224,0.8)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Admin
              </div>
              <div
                style={{
                  fontSize: "9px",
                  color: "rgba(240,235,224,0.25)",
                  letterSpacing: "0.04em",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                hello@aesthetixstudio.com
              </div>
            </div>
          </div>
          <button
            onClick={logout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "9px 12px",
              background: "transparent",
              border: "1px solid transparent",
              cursor: "pointer",
              color: "rgba(240,235,224,0.3)",
              fontSize: "12px",
              fontFamily: "'Inter', sans-serif",
              transition: "all 0.2s ease",
              width: "100%",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#f87171";
              e.currentTarget.style.background = "rgba(239,68,68,0.05)";
              e.currentTarget.style.borderColor = "rgba(239,68,68,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(240,235,224,0.3)";
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "transparent";
            }}
          >
            <LogOut size={14} strokeWidth={1.5} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* ─── Main Content ─────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Top Bar */}
        <div
          style={{
            height: "60px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 32px",
            backgroundColor: "#080808",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                fontSize: "11px",
                color: "rgba(240,235,224,0.25)",
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.04em",
              }}
            >
              Aesthetix Studio
            </span>
            <ChevronRight
              size={12}
              color="rgba(240,235,224,0.2)"
            />
            <span
              style={{
                fontSize: "11px",
                color: "rgba(240,235,224,0.7)",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                letterSpacing: "0.04em",
              }}
            >
              {currentLabel}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                padding: "6px 14px",
                width: "200px",
              }}
            >
              <Search size={12} color="rgba(240,235,224,0.3)" />
              <input
                placeholder="Search..."
                style={{
                  background: "none",
                  border: "none",
                  outline: "none",
                  fontSize: "12px",
                  color: "rgba(240,235,224,0.6)",
                  fontFamily: "'Inter', sans-serif",
                  width: "100%",
                  caretColor: "#C4A46B",
                }}
              />
            </div>
            <button
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                width: "34px",
                height: "34px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                color: "rgba(240,235,224,0.5)",
              }}
            >
              <Bell size={13} />
              <div
                style={{
                  position: "absolute",
                  top: "6px",
                  right: "6px",
                  width: "6px",
                  height: "6px",
                  background: "#C4A46B",
                  borderRadius: "50%",
                }}
              />
            </button>
          </div>
        </div>

        {/* Page content */}
        <main style={{ flex: 1, padding: "36px 40px", overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
