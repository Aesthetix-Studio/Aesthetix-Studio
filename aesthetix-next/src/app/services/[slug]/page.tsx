import { ServicePage } from "@/components/ServicePage";

export const revalidate = false; // Services are completely static

export async function generateStaticParams() {
  return [
    { slug: "ui-ux-design" },
    { slug: "web-development" },
    { slug: "ai-solutions" },
    { slug: "seo" },
  ];
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const titles: Record<string, string> = {
    "ui-ux-design": "UI/UX Design Agency in Hyderabad",
    "web-development": "React Development Company in Hyderabad",
    "ai-solutions": "AI Solutions Agency in Hyderabad",
    "seo": "SEO & Growth Agency in Hyderabad",
  };
  return {
    title: `${titles[params.slug] || "Service"} | Aesthetix Studio`,
  };
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  return <ServicePage initialSlug={params.slug} />;
}
