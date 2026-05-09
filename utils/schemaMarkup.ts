// Schema Markup Generation Utilities for SEO

export interface ArticleSchema {
  '@context': string;
  '@type': string;
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: {
    '@type': string;
    name: string;
  };
  publisher: {
    '@type': string;
    name: string;
  };
}

export interface ServiceSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  provider: {
    '@type': string;
    name: string;
  };
  areaServed?: string[];
}

export interface ReviewSchema {
  '@context': string;
  '@type': string;
  reviewRating: {
    '@type': string;
    ratingValue: number;
    bestRating: number;
  };
  reviewBody: string;
  author: {
    '@type': string;
    name: string;
  };
}

export interface BreadcrumbSchema {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

export interface ContactSchema {
  '@context': string;
  '@type': string;
  contactType: string;
  telephone?: string;
  email?: string;
  areaServed: string[];
  availableLanguage: string[];
}

export interface FAQSchema {
  '@context': string;
  '@type': string;
  mainEntity: Array<{
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }>;
}

export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Aesthetix Studio',
  url: 'https://www.aesthetixstudio.com',
  email: 'hello@aesthetix.studio',
  telephone: '+918499908716',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hyderabad',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.linkedin.com/company/aesthetix-studio',
    'https://dribbble.com/aesthetixstudio',
  ],
});

/**
 * Generate Article/BlogPost Schema
 */
export const generateArticleSchema = (
  headline: string,
  description: string,
  datePublished: string,
  dateModified?: string,
  image?: string,
  author: string = 'Aesthetix Studio'
): ArticleSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    image: image || 'https://aesthetixstudio.com/og-image.jpg',
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Aesthetix Studio',
    },
  };
};

/**
 * Generate Service Schema
 */
export const generateServiceSchema = (
  name: string,
  description: string,
  areaServed: string[] = ['IN', 'US', 'UK', 'AE']
): ServiceSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: 'Aesthetix Studio',
    },
    areaServed,
  };
};

/**
 * Generate Review/Testimonial Schema
 */
export const generateReviewSchema = (
  quote: string,
  author: string,
  rating: number = 5
): ReviewSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: Math.min(rating, 5),
      bestRating: 5,
    },
    reviewBody: quote,
    author: {
      '@type': 'Person',
      name: author,
    },
  };
};

/**
 * Generate Breadcrumb Schema
 */
export const generateBreadcrumbSchema = (
  breadcrumbs: Array<{ name: string; url: string }>
): BreadcrumbSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
};

/**
 * Generate Contact Point Schema
 */
export const generateContactSchema = (
  telephone?: string,
  email?: string
): ContactSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    ...(telephone && { telephone }),
    ...(email && { email }),
    areaServed: ['IN', 'US', 'UK', 'AE', 'CA'],
    availableLanguage: ['en'],
  };
};

/**
 * Generate FAQ Schema
 */
export const generateFAQSchema = (
  faqs: Array<{ question: string; answer: string }>
): FAQSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

/**
 * Utility to render schema as JSON-LD script tag
 */
export const renderSchemaScript = (schema: object): string => {
  return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
};
