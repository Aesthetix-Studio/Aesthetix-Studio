import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:8787";

interface Post {
  id: string; title: string; slug: string; excerpt: string | null;
  cover_image: string | null; created_at: string;
}

export function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/posts`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => setPosts(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading || posts.length === 0) return null;

  return (
    <section id="blog" style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Latest Insights</h2>
        <p style={styles.sub}>Thoughts on design, strategy, and building brands that last.</p>
        <div style={styles.grid}>
          {posts.slice(0, 3).map(post => (
            <article key={post.id} style={styles.card}>
              {post.cover_image && (
                <div style={styles.imageWrap}>
                  <img src={post.cover_image} alt={post.title} style={styles.image} />
                </div>
              )}
              <div style={styles.cardContent}>
                <time style={styles.date}>
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    month: "short", day: "numeric", year: "numeric"
                  })}
                </time>
                <h3 style={styles.title}>{post.title}</h3>
                {post.excerpt && <p style={styles.excerpt}>{post.excerpt}</p>}
                <a href={`/blog/${post.slug}`} style={styles.link}>Read more →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: { padding: "120px 24px", background: "#080808" },
  container: { maxWidth: 1000, margin: "0 auto" },
  heading: { fontSize: 32, fontWeight: 600, color: "#fff", margin: "0 0 8px", letterSpacing: -0.5 },
  sub: { color: "#666", fontSize: 16, margin: "0 0 48px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 },
  card: { background: "#111", border: "1px solid #1f1f1f", borderRadius: 8, overflow: "hidden", transition: "border-color 0.2s" },
  imageWrap: { aspectRatio: "16/9", overflow: "hidden", background: "#1a1a1a" },
  image: { width: "100%", height: "100%", objectFit: "cover" },
  cardContent: { padding: "20px 24px 24px" },
  date: { fontSize: 12, color: "#555", textTransform: "uppercase" as const, letterSpacing: 1 },
  title: { fontSize: 18, fontWeight: 600, color: "#fff", margin: "8px 0", lineHeight: 1.3 },
  excerpt: { fontSize: 14, color: "#888", margin: "0 0 16px", lineHeight: 1.6 },
  link: { color: "#aaa", fontSize: 13, textDecoration: "none", borderBottom: "1px solid #333", paddingBottom: 2 },
};
