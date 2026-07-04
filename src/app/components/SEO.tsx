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
const DEFAULT_DESCRIPTION = "Design, development, and branding agency in Hyderabad, India. We build conversion-focused websites and brand systems for startups and growing businesses.";
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
      <meta property="og:locale" content="en_IN" />

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
  "@id": "https://aesthetixstudio.dev/#organization",
  name: "Aesthetix Studio",
  url: "https://aesthetixstudio.dev",
  logo: "https://aesthetixstudio.dev/favicon.svg",
  description: "Design, development, and branding agency for startups and growing businesses in Hyderabad, India.",
  sameAs: [
    "https://www.linkedin.com/company/aesthetix-studio",
    "https://dribbble.com/aesthetixstudio",
    "https://www.behance.net/aesthetixstudio",
    "https://www.clutch.co/profile/aesthetix-studio",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: "",
    email: "hello@aesthetixstudio.dev",
    availableLanguage: "English",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Falaknuma",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500053",
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
  "@type": "LocalBusiness",
  "@id": "https://aesthetixstudio.dev/#organization",
  name: "Aesthetix Studio",
  image: "https://aesthetixstudio.dev/og-image.svg",
  url: "https://aesthetixstudio.dev",
  telephone: "+91-98765-43210",
  email: "hello@aesthetixstudio.dev",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Falaknuma",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500053",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 17.385,
    longitude: 78.4867,
  },
  sameAs: [
    "https://www.linkedin.com/company/aesthetix-studio",
    "https://dribbble.com/aesthetixstudio",
    "https://www.behance.net/aesthetixstudio",
    "https://www.clutch.co/profile/aesthetix-studio",
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  priceRange: "$$",
  areaServed: [
    { "@type": "City", name: "Hyderabad" },
    { "@type": "State", name: "Telangana" },
    { "@type": "Country", name: "India" },
  ],
  hasMap: "https://www.google.com/maps/search/Aesthetix+Studio+Hyderabad",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "50",
    bestRating: "5",
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

// Knowledge Graph / Entity Schema — helps AI systems understand the business entity
export const knowledgeGraphSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://aesthetixstudio.dev/#organization",
  name: "Aesthetix Studio",
  alternateName: ["Aesthetix", "Aesthetix Studio Hyderabad"],
  url: "https://aesthetixstudio.dev",
  logo: "https://aesthetixstudio.dev/favicon.svg",
  image: "https://aesthetixstudio.dev/og-image.svg",
  description: "Aesthetix Studio is a web design and brand identity agency in Hyderabad, India. We build conversion-focused websites, brand systems, and digital products for startups and growing businesses. 80+ brands launched, 42% average conversion lift.",
  foundingDate: "2021",
  foundingLocation: {
    "@type": "Place",
    name: "Hyderabad, Telangana, India",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Falaknuma",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500053",
    addressCountry: "IN",
  },
  telephone: "+91-98765-43210",
  email: "hello@aesthetixstudio.dev",
  sameAs: [
    "https://www.linkedin.com/company/aesthetix-studio",
    "https://dribbble.com/aesthetixstudio",
    "https://www.behance.net/aesthetixstudio",
    "https://www.clutch.co/profile/aesthetix-studio",
  ],
  knowsAbout: [
    "Web Design",
    "Brand Identity",
    "UI/UX Design",
    "Product Design",
    "Design Systems",
    "React Development",
    "Next.js Development",
    "TypeScript",
    "Tailwind CSS",
    "Cloudflare Workers",
    "E-Commerce Design",
    "SaaS Design",
    "Landing Page Design",
  ],
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Design" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brand Identity" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Development" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Product Design" } },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "50",
    bestRating: "5",
    ratingProvider: "Clutch",
  },
};

// Case Study Schema — AI-readable case study structured data
export const caseStudySchema = (study: {
  title: string; client: string; industry: string;
  problem: string; solution: string; results: string[];
  url: string; datePublished: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: `${study.title} — Case Study by Aesthetix Studio`,
  description: `How Aesthetix Studio helped ${study.client} ${study.problem.slice(0, 150)}...`,
  author: {
    "@type": "Organization",
    name: "Aesthetix Studio",
    url: "https://aesthetixstudio.dev",
  },
  publisher: {
    "@type": "Organization",
    name: "Aesthetix Studio",
    logo: { "@type": "ImageObject", url: "https://aesthetixstudio.dev/favicon.svg" },
  },
  datePublished: study.datePublished,
  url: study.url,
  about: {
    "@type": "Organization",
    name: study.client,
  },
  articleSection: "Case Study",
  keywords: [study.industry, "case study", "web design", "Aesthetix Studio", study.client],
});

// Brand Mention Schema — for client testimonials and reviews
export const brandMentionSchema = (mentions: { brand: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Aesthetix Studio — Client Work",
  description: "Web design and brand identity projects by Aesthetix Studio in Hyderabad, India",
  about: mentions.map(m => ({
    "@type": "Organization",
    name: m.brand,
    url: m.url,
  })),
});
