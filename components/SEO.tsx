import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop&crop=center&auto=format&q=80', // Default fallback image
  url = window.location.href,
  type = 'website'
}) => {
  useEffect(() => {
    // Update Title
    const siteTitle = 'Aesthetix Studio';
    document.title = `${title} | ${siteTitle}`;

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
    updateMeta('og:url', url, 'property');
    updateMeta('og:title', title, 'property');
    updateMeta('og:description', description, 'property');
    updateMeta('og:image', image, 'property');
    updateMeta('og:site_name', siteTitle, 'property');

    // Twitter
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:url', url);
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);

  }, [title, description, image, url, type]);

  return null;
};

export default SEO;