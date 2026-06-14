"use client";
import { useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";

export function getToken() {
  return typeof window !== 'undefined' ? sessionStorage.getItem("admin_token") ?? "" : "";
}

export function adminHeaders() {
  return { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` };
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [token, setToken] = useState(typeof window !== 'undefined' ? sessionStorage.getItem("admin_token") ?? "" : "");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [cooldown, setCooldown] = useState(0);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    // Prevent login if a cooldown is active
    if (cooldown > 0) {
      setError(`Please wait ${cooldown} seconds before trying again.`);
      return;
    }
    setChecking(true);
    setError(""); // clear previous errors
    // Prevent rapid re‑submits; button is already disabled while checking.
    // If a previous 429 set a timeout, the UI will show the message until cleared.
    try {
      const res = await fetch(`${API}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: input }),
      });
      if (res.status === 429) {
        // Server is rate‑limiting. Increment attempts and apply exponential backoff.
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        const base = 5; // base wait seconds
        const waitSec = Math.min(60, Math.pow(2, newAttempts - 1) * base);
        setCooldown(waitSec);
        setError(`Too many attempts. Please wait ${waitSec} seconds.`);
        // Reset cooldown after timeout
        setTimeout(() => setCooldown(0), waitSec * 1000);
        return;
      }
      // Successful login – reset attempts and cooldown
      setLoginAttempts(0);
      setCooldown(0);
      const { token: t } = await res.json();
      sessionStorage.setItem("admin_token", t);
      setToken(t);
      router.push("/admin/leads");
    } catch {
      setError("Network error");
    } finally {
      setChecking(false);
    }
  }

  if (!token) {
    return (
      <div style={styles.loginWrap}>
        <form onSubmit={login} style={styles.loginBox}>
          <p style={styles.logo}>Aesthetix / Admin</p>
          <input
            type="password"
            placeholder="Admin password"
            value={input}
            onChange={e => setInput(e.target.value)}
            style={styles.input}
            autoFocus
          />
          {error && <p style={styles.err}>{error}</p>}
          <button type="submit" disabled={checking} style={styles.btn}>
            {checking ? "…" : "Enter"}
          </button>
        </form>
      </div>
    );
  }

  function logout() {
    sessionStorage.removeItem("admin_token");
    setToken("");
  }

  const navLink = (path: string, label: string) => {
    const isActive = pathname === path;
    return (
      <Link href={path} style={{ ...styles.navLink, ...(isActive ? styles.navActive : {}) }}>
        {label}
      </Link>
    );
  };

  return (
    <div style={styles.shell}>
      <aside style={styles.sidebar}>
        <p style={styles.logo}>Aesthetix</p>
        {navLink("/admin/leads", "Leads")}
        {navLink("/admin/projects", "Projects")}
        {navLink("/admin/blog", "Blog")}
        {navLink("/admin/case-studies", "Case Studies")}
        {navLink("/admin/proposals", "Proposals")}
        {navLink("/admin/brief-analyzer", "Brief Analyzer")}
        <button onClick={logout} style={styles.logoutBtn}>Logout</button>
      </aside>
      <main style={styles.content}>
        {children}
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  loginWrap: { minHeight: "100vh", background: "#080808", display: "flex", alignItems: "center", justifyContent: "center" },
  loginBox: { display: "flex", flexDirection: "column", gap: 12, width: 280 },
  logo: { color: "#fff", fontFamily: "sans-serif", fontSize: 14, letterSpacing: 2, marginBottom: 8 },
  input: { background: "#1a1a1a", border: "1px solid #333", color: "#fff", padding: "10px 14px", fontSize: 14, borderRadius: 4, outline: "none" },
  err: { color: "#f87171", fontSize: 13, margin: 0 },
  btn: { background: "#fff", color: "#000", border: "none", padding: "10px 0", fontSize: 14, cursor: "pointer", borderRadius: 4 },
  shell: { display: "flex", minHeight: "100vh", background: "#080808", fontFamily: "sans-serif" },
  sidebar: { width: 180, background: "#111", display: "flex", flexDirection: "column", padding: "24px 16px", gap: 4, flexShrink: 0 },
  navLink: { color: "#aaa", textDecoration: "none", padding: "8px 12px", borderRadius: 4, fontSize: 14 },
  navActive: { color: "#fff", background: "#1f1f1f" },
  logoutBtn: { marginTop: "auto", background: "none", border: "1px solid #333", color: "#666", cursor: "pointer", padding: "8px 12px", fontSize: 12, borderRadius: 4, textAlign: "left" },
  content: { flex: 1, padding: 32, color: "#fff", overflowY: "auto" },
};

