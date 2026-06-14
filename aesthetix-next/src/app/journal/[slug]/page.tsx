import { BlogPost, Post } from "@/components/BlogPost";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API}/api/posts`);
    const posts = await res.json();
    return posts.map((post: { slug: string }) => ({
      slug: post.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  try {
    const res = await fetch(`${API}/api/posts/${params.slug}`);
    if (res.ok) {
      const post = await res.json();
      return {
        title: `${post.seo_title || post.title} | Aesthetix Studio`,
        description: post.seo_description || post.excerpt,
      };
    }
  } catch {}
  return {
    title: "Post | Aesthetix Studio",
  };
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  let post: Post | undefined = undefined;
  try {
    const res = await fetch(`${API}/api/posts/${params.slug}`, { next: { revalidate: 3600 } });
    if (res.ok) {
      post = await res.json();
    }
  } catch (e) {}

  return <BlogPost initialPost={post} initialSlug={params.slug} />;
}
