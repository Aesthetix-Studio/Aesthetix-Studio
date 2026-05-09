import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  schema?: object | object[];
}

const SITE_URL = 'https://www.aesthetixstudio.com';

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop&crop=center&auto=format&q=80', // Default fallback image
  url,
  type = 'website',
  schema
}) => {
  useEffect(() => {
    // Update Title
    const siteTitle = 'Aesthetix Studio';
    document.title = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;

    // Helper to update or create meta tags
    const updateMeta = (name: string, content: string, attribute: string = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard Meta
    updateMeta('description', description);

    // Open Graph / Facebook
    updateMeta('og:type', type, 'property');
    const canonicalUrl = url || `${SITE_URL}${window.location.pathname}`;

    updateMeta('og:url', canonicalUrl, 'property');
    updateMeta('og:title', title, 'property');
    updateMeta('og:description', description, 'property');
    updateMeta('og:image', image, 'property');
    updateMeta('og:site_name', siteTitle, 'property');

    // Twitter
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:url', canonicalUrl);
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // JSON-LD Schema Markup
    if (schema) {
      let schemaScript = document.querySelector('script[data-seo-schema]') as HTMLScriptElement;
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.setAttribute('type', 'application/ld+json');
        schemaScript.setAttribute('data-seo-schema', 'true');
        document.head.appendChild(schemaScript);
      }
      const schemas = Array.isArray(schema) ? schema : [schema];
      schemaScript.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : {
        '@context': 'https://schema.org',
        '@graph': schemas.map(({ '@context': _context, ...schemaItem }: any) => schemaItem),
      });
    } else {
      document.querySelector('script[data-seo-schema]')?.remove();
    }

  }, [title, description, image, url, type, schema]);

  return null;
};

export default SEO;
