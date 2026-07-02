import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
}

const SITE_NAME = "Aesthetix Studio";
const DEFAULT_DESCRIPTION = "Design, development, and branding agency for startups and growing businesses. We build brands that convert.";
const DEFAULT_IMAGE = "/og-image.svg";

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url,
  type = "website",
  structuredData,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const baseUrl = "https://aesthetixstudio.dev";
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImage = image.startsWith("http") ? image : `${baseUrl}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aesthetix Studio",
  url: "https://aesthetixstudio.dev",
  logo: "https://aesthetixstudio.dev/favicon.svg",
  description: "Design, development, and branding agency for startups and growing businesses.",
  sameAs: [
    "https://www.linkedin.com/company/aesthetix-studio",
    "https://dribbble.com/aesthetixstudio",
    "https://www.behance.net/aesthetixstudio",
    "https://www.clutch.co/profile/aesthetix-studio",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "hello@aesthetixstudio.dev",
    availableLanguage: "English",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Aesthetix Studio",
  url: "https://aesthetixstudio.dev",
  description: "Design, development, and branding agency for startups and growing businesses.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://aesthetixstudio.dev/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Web Design and Development",
  provider: {
    "@type": "Organization",
    name: "Aesthetix Studio",
  },
  areaServed: "IN",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Design" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brand Identity" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Development" } },
    ],
  },
};

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
});

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Aesthetix Studio",
  image: "https://aesthetixstudio.dev/og-image.svg",
  url: "https://aesthetixstudio.dev",
  telephone: "+91-9876543210",
  email: "hello@aesthetixstudio.dev",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 17.385,
    longitude: 78.4867,
  },
  sameAs: [],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  priceRange: "$$",
  areaServed: {
    "@type": "Country",
    name: "India",
  },
};

export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Aesthetix Studio",
  description: "Premium creative studio specializing in brand identity, web design, product design, and design systems.",
  url: "https://aesthetixstudio.dev",
  serviceType: [
    "Brand Identity Design",
    "Web Design",
    "Web Development",
    "Product Design",
    "Design Systems",
    "Motion Graphics",
  ],
  provider: {
    "@type": "Organization",
    name: "Aesthetix Studio",
  },
  areaServed: "IN",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Creative Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brand Identity Design", description: "Complete brand identity systems including logos, typography, color palettes, and brand guidelines." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Design", description: "Custom website design with responsive layouts, modern aesthetics, and conversion-focused UX." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Development", description: "Full-stack web development with React, TypeScript, and Cloudflare infrastructure." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Product Design", description: "End-to-end product design from research and wireframing to high-fidelity prototypes." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Design Systems", description: "Scalable design systems with tokens, components, and documentation." } },
    ],
  },
};
