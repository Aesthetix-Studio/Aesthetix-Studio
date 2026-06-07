import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { marked } from "marked";
import { MARKDOWN_CSS } from "./markdown-styles";

const API = import.meta.env.VITE_API_URL || "http://localhost:8787";

interface Post {
  id: string; title: string; slug: string; excerpt: string | null;
  content: string; cover_image: string | null;
  seo_title: string | null; seo_description: string | null;
  created_at: string; updated_at: string;
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/posts/${slug}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(setPost)
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div style={styles.wrap}>
        <p style={{ color: "#555" }}>Loading…</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={styles.wrap}>
        <p style={{ color: "#555" }}>Post not found.</p>
        <Link to="/" style={styles.back}>← Back to home</Link>
      </div>
    );
  }

  return (
    <article style={styles.article}>
      <style>{MARKDOWN_CSS}</style>
      <div style={styles.container}>
        <Link to="/" style={styles.back}>← Back</Link>
        <time style={styles.date}>
          {new Date(post.created_at).toLocaleDateString("en-US", {
            month: "long", day: "numeric", year: "numeric"
          })}
        </time>
        <h1 style={styles.title}>{post.title}</h1>
        {post.excerpt && <p style={styles.excerpt}>{post.excerpt}</p>}
        {post.cover_image && (
          <img src={post.cover_image} alt={post.title} style={styles.cover} />
        )}
        <div
          className="markdown-content"
          style={styles.content}
          dangerouslySetInnerHTML={{ __html: marked.parse(post.content) as string }}
        />
      </div>
    </article>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: { minHeight: "100vh", background: "#080808", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 },
  article: { minHeight: "100vh", background: "#080808", padding: "80px 24px 120px" },
  container: { maxWidth: 640, margin: "0 auto" },
  back: { color: "#555", fontSize: 14, textDecoration: "none", marginBottom: 40, display: "inline-block" },
  date: { display: "block", fontSize: 12, color: "#555", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 12 },
  title: { fontSize: 36, fontWeight: 600, color: "#fff", margin: "0 0 12px", lineHeight: 1.2, letterSpacing: -0.5 },
  excerpt: { fontSize: 18, color: "#888", margin: "0 0 32px", lineHeight: 1.5 },
  cover: { width: "100%", borderRadius: 0, marginBottom: 40 },
  content: { color: "#ccc", fontSize: 16, lineHeight: 1.8 },
};
