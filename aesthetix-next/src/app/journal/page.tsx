import { JournalPage, Post } from "@/components/journal";

export const metadata = {
  title: "Journal | Aesthetix Studio",
  description: "Thoughts on design, strategy, and craft.",
};

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";

export const revalidate = 3600;

export default async function Page() {
  let posts: Post[] = [];
  try {
    const res = await fetch(`${API}/api/posts`, { next: { revalidate: 3600 } });
    if (res.ok) {
      posts = await res.json();
    }
  } catch (e) {}

  return <JournalPage initialPosts={posts.length > 0 ? posts : undefined} />;
}

