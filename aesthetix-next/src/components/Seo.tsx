import Head from 'next/head';
import { useRouter } from 'next/navigation';

interface SeoProps {
  title?: string;
  description?: string;
  image?: string; // absolute URL for OG image
}

export const Seo = ({ title, description, image }: SeoProps) => {
  const router = useRouter();
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const defaultTitle = 'Aesthetix Studio | Creative Design & Tech Studio';
  const defaultDescription = 'A premium creative design and digital product studio building exceptional visual experiences.';
  const defaultImage = `${process.env.NEXT_PUBLIC_SITE_URL || ''}/og-image.png`;

  const seo = {
    title: title ?? defaultTitle,
    description: description ?? defaultDescription,
    image: image ?? defaultImage,
    url,
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Aesthetix Studio',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    logo: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
  };

  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.url} />
      <meta property="og:image" content={seo.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <link rel="canonical" href={seo.url} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Head>
  );
};
