import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";

const API = import.meta.env.VITE_API_URL || "http://localhost:8787";

export function getToken() {
  return sessionStorage.getItem("admin_token") ?? "";
}

export function adminHeaders() {
  return { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` };
}

export function AdminLayout() {
  const navigate = useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem("admin_token") ?? "");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setChecking(true);
    setError("");
    try {
      const res = await fetch(`${API}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: input }),
      });
      if (!res.ok) { setError("Wrong password"); return; }
      const { token: t } = await res.json();
      sessionStorage.setItem("admin_token", t);
      setToken(t);
      navigate("/admin/leads");
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

  return (
    <div style={styles.shell}>
      <aside style={styles.sidebar}>
        <p style={styles.logo}>Aesthetix</p>
        <NavLink to="/admin/leads" style={navStyle}>Leads</NavLink>
        <NavLink to="/admin/projects" style={navStyle}>Projects</NavLink>
        <NavLink to="/admin/blog" style={navStyle}>Blog</NavLink>
        <NavLink to="/admin/case-studies" style={navStyle}>Case Studies</NavLink>
        <NavLink to="/admin/proposals" style={navStyle}>Proposals</NavLink>
        <NavLink to="/admin/brief-analyzer" style={navStyle}>Brief Analyzer</NavLink>
        <button onClick={logout} style={styles.logoutBtn}>Logout</button>
      </aside>
      <main style={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}

function navStyle({ isActive }: { isActive: boolean }) {
  return { ...styles.navLink, ...(isActive ? styles.navActive : {}) };
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
