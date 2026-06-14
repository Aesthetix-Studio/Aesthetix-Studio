"use client";
import Link from "next/link";

export function NotFound() {
  return (
    <div style={styles.wrap}>
      <p style={styles.code}>404</p>
      <h1 style={styles.title}>Page not found</h1>
      <p style={styles.desc}>The page you're looking for doesn't exist or has been moved.</p>
      <div style={styles.links}>
        <Link href="/" style={styles.primary}>Back to home</Link>
        <Link href="/admin" style={styles.ghost}>Admin</Link>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    minHeight: "100vh", background: "#080808", display: "flex",
    flexDirection: "column", alignItems: "center", justifyContent: "center",
    padding: 24, textAlign: "center",
  },
  code: {
    fontFamily: "'Instrument Serif', serif", fontSize: 120, fontWeight: 400,
    color: "rgba(240,235,224,0.08)", lineHeight: 1, marginBottom: -20,
  },
  title: {
    fontFamily: "'Instrument Serif', serif", fontSize: 32, fontWeight: 400,
    color: "#F0EBE0", margin: "0 0 12px",
  },
  desc: {
    fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 300,
    color: "rgba(240,235,224,0.4)", margin: "0 0 40px",
  },
  links: { display: "flex", gap: 12 },
  primary: {
    fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500,
    color: "#080808", background: "#F0EBE0", padding: "10px 24px",
    borderRadius: 4, textDecoration: "none",
  },
  ghost: {
    fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500,
    color: "rgba(240,235,224,0.5)", border: "1px solid rgba(255,255,255,0.12)",
    padding: "10px 24px", borderRadius: 4, textDecoration: "none",
  },
};


