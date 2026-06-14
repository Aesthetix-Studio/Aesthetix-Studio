"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { GrainOverlay } from "./grain";
import { Nav } from "./nav";
import { Footer } from "./footer";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  created_at: string;
}

const FALLBACK_POSTS: Post[] = [
  {
    id: "1",
    title: "The Case for Restraint in Digital Design",
    slug: "case-for-restraint",
    excerpt: "Why the best digital experiences are defined as much by what's removed as what's added.",
    cover_image: null,
    created_at: "2025-03-15",
  },
  {
    id: "2",
    title: "Building Design Systems That Scale",
    slug: "design-systems-scale",
    excerpt: "A practical framework for creating component libraries that grow with your product.",
    cover_image: null,
    created_at: "2025-02-20",
  },
  {
    id: "3",
    title: "Edge Computing and the Future of Web Performance",
    slug: "edge-computing-performance",
    excerpt: "How Cloudflare Workers and edge architecture are reshaping what's possible on the web.",
    cover_image: null,
    created_at: "2025-01-10",
  },
];

export function JournalPage({ initialPosts }: { initialPosts?: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts || []);
  const [loading, setLoading] = useState(!initialPosts);

  useEffect(() => {
    if (initialPosts) return;
    fetch(`${API}/api/posts`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [initialPosts]);

  const displayPosts = posts.length > 0 ? posts : loading ? [] : FALLBACK_POSTS;

  return (
    <div style={{ backgroundColor: "#080808", minHeight: "100vh", overflowX: "hidden" }}>
      <GrainOverlay />
      <Nav />

      {/* Hero */}
      <section className="px-6 md:px-10 pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="max-w-4xl">
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "9px",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#C4A46B",
              display: "block",
              marginBottom: "16px",
            }}
          >
            Journal
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 400,
              color: "#F0EBE0",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "20px",
            }}
          >
            Thoughts on design,<br />strategy & craft.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "16px",
              fontWeight: 300,
              color: "rgba(240,235,224,0.45)",
              lineHeight: 1.7,
              maxWidth: "520px",
            }}
          >
            Case studies, process breakdowns, and reflections on building brands
            that refuse to blend in.
          </motion.p>
        </div>
      </section>

      {/* Divider */}
      <div className="px-6 md:px-10">
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }} />
      </div>

      {/* Posts grid */}
      <section className="px-6 md:px-10 py-16 md:py-24">
        {loading ? (
          <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  background: "#0d0d0d",
                  border: "1px solid rgba(255,255,255,0.04)",
                  minHeight: "320px",
                }}
              />
            ))}
          </div>
        ) : displayPosts.length === 0 ? (
          <div className="max-w-5xl text-center py-20">
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                fontWeight: 300,
                color: "rgba(240,235,224,0.35)",
              }}
            >
              No posts yet. Check back soon.
            </p>
          </div>
        ) : (
          <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4 }}
                style={{
                  background: "#0d0d0d",
                  border: "1px solid rgba(255,255,255,0.06)",
                  overflow: "hidden",
                  transition: "border-color 0.4s ease",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Cover image or gradient placeholder */}
                {post.cover_image ? (
                  <div
                    style={{
                      aspectRatio: "16/9",
                      overflow: "hidden",
                      background: "#111",
                    }}
                  >
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      aspectRatio: "16/9",
                      background: `linear-gradient(135deg, #0d0d0d 0%, #151515 100%)`,
                    }}
                  />
                )}

                {/* Content */}
                <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <time
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "10px",
                      fontWeight: 400,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(240,235,224,0.25)",
                      display: "block",
                      marginBottom: "12px",
                    }}
                  >
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                  <h2
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontSize: "22px",
                      fontWeight: 400,
                      color: "#F0EBE0",
                      lineHeight: 1.2,
                      letterSpacing: "-0.01em",
                      marginBottom: "12px",
                    }}
                  >
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13px",
                        fontWeight: 300,
                        color: "rgba(240,235,224,0.4)",
                        lineHeight: 1.7,
                        margin: 0,
                        flex: 1,
                      }}
                    >
                      {post.excerpt}
                    </p>
                  )}
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#C4A46B",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      marginTop: "20px",
                      transition: "gap 0.3s ease",
                    }}
                  >
                    Read more <span>→</span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}


