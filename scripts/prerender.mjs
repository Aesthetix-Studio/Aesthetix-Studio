import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve('dist');
const templatePath = path.join(distDir, 'index.html');
const siteUrl = 'https://www.aesthetixstudio.com';
const defaultImage = `${siteUrl}/images/work/fintech-dashboard.png`;

const services = [
  {
    path: '/ai-solutions-integration',
    title: 'AI Solutions & Integration Services India | Aesthetix Studio',
    description: 'Production-ready AI systems including machine learning, NLP, computer vision, and intelligent automation. Expert AI development and deployment services in India.',
    h1: 'AI Solutions & Integration Services',
    body: 'Aesthetix Studio builds production-ready AI systems with machine learning, NLP pipelines, computer vision applications, intelligent automation, AI APIs, and cloud deployment.',
  },
  {
    path: '/web-development',
    title: 'Web Development Agency India | Aesthetix Studio',
    description: 'Full-stack web development agency in India building fast, scalable, SEO-friendly websites with React, TypeScript, and modern backend technologies.',
    h1: 'Full-Stack Web Development Agency',
    body: 'Aesthetix Studio builds fast, accessible, scalable websites and applications with React, TypeScript, API integrations, technical SEO, and Core Web Vitals optimization.',
  },
  {
    path: '/react-development',
    title: 'React Development Company India | Aesthetix Studio',
    description: 'Expert React and Next.js development company for high-performance SPAs, server-rendered React sites, design systems, and scalable web applications.',
    h1: 'Expert React & Next.js Development',
    body: 'We build production-grade React applications, reusable component systems, performance-focused frontends, and SEO-ready Next.js experiences.',
  },
  {
    path: '/ui-ux-design',
    title: 'UI/UX Design Services India | Aesthetix Studio',
    description: 'Professional UI/UX design studio creating high-converting interfaces, Figma prototypes, user flows, and scalable design systems.',
    h1: 'UI/UX Design Services That Drive Conversions',
    body: 'Our UI/UX process covers research, wireframes, visual design, prototyping, usability improvements, and developer-ready design systems.',
  },
  {
    path: '/seo-friendly-websites',
    title: 'SEO-Friendly Website Development India | Aesthetix Studio',
    description: 'SEO-friendly website development with structured data, semantic HTML, Core Web Vitals optimization, sitemap setup, and keyword-targeted architecture.',
    h1: 'SEO-Friendly Website Development',
    body: 'We engineer SEO into the foundation with crawlable page architecture, metadata, schema markup, internal linking, fast loading, and clean heading structure.',
  },
  {
    path: '/custom-web-applications',
    title: 'Custom Web Application Development India | Aesthetix Studio',
    description: 'Custom web application and SaaS development for dashboards, internal tools, marketplaces, integrations, and scalable business platforms.',
    h1: 'Custom Web Application Development',
    body: 'Aesthetix Studio builds SaaS platforms, internal tools, dashboards, databases, APIs, cloud deployments, and secure authenticated products.',
  },
  {
    path: '/maintenance-support',
    title: 'Website Maintenance Services India | Aesthetix Studio',
    description: 'Website maintenance and support services covering security updates, performance monitoring, content updates, bug fixes, and monthly reporting.',
    h1: 'Website Maintenance & Support Services',
    body: 'Keep your website secure, fast, current, and reliable with ongoing updates, monitoring, backups, bug fixes, and performance improvements.',
  },
];

const projects = [
  {
    slug: 'fintech-dashboard',
    title: 'Nova Fintech Dashboard Case Study | Aesthetix Studio',
    description: 'Real-time financial analytics dashboard case study with sub-200ms data latency, 60 FPS rendering, and a Lighthouse score of 99.',
    h1: 'Nova Fintech Dashboard',
    body: 'Problem: legacy market dashboards were slow. Solution: React, D3.js, Spring Boot, and WebSockets. Results: sub-200ms data latency, 60 FPS rendering, and higher institutional user retention.',
  },
  {
    slug: 'lux-ecommerce',
    title: 'LUX Fashion E-Commerce Case Study | Aesthetix Studio',
    description: 'Headless e-commerce case study with Next.js, Shopify Plus, improved mobile load time, increased conversion rate, and perfect technical SEO.',
    h1: 'LUX Fashion E-Commerce',
    body: 'Problem: mobile load times hurt conversion. Solution: headless Next.js and Shopify Plus architecture. Results: 1.2s mobile load time, 210% conversion lift, and SEO score of 100.',
  },
  {
    slug: 'health-ai',
    title: 'MediScan AI Interface Case Study | Aesthetix Studio',
    description: 'Medical AI interface case study covering workflow research, high-fidelity prototyping, React implementation, and investor-ready product design.',
    h1: 'MediScan AI Interface',
    body: 'Problem: radiologists needed faster diagnostic workflows. Solution: high-contrast UX, Canvas-based imaging, and React prototype. Results: 2x faster workflow and Series A readiness.',
  },
];

const blogPosts = [
  {
    slug: 'why-react-websites-need-seo-setup',
    title: 'Why Most React Websites Fail at SEO | Aesthetix Studio',
    description: 'Learn why React sites often struggle with SEO and how prerendering, SSR, metadata, schema, and architecture help them rank.',
    h1: 'Why Most React Websites Fail at SEO',
    body: 'React SEO depends on crawlable rendering, unique metadata, semantic HTML, schema markup, internal links, and performance-focused architecture.',
  },
  {
    slug: 'core-web-vitals-explained',
    title: 'Core Web Vitals Explained | Aesthetix Studio',
    description: 'A practical guide to Core Web Vitals, website speed, ranking signals, LCP, CLS, INP, and how performance affects revenue.',
    h1: 'Core Web Vitals Explained',
    body: 'Core Web Vitals measure real user experience. Improving LCP, CLS, and INP helps SEO, conversion, retention, and perceived product quality.',
  },
  {
    slug: 'saas-landing-page-best-practices',
    title: 'SaaS Landing Page Best Practices | Aesthetix Studio',
    description: 'UI/UX and conversion patterns for SaaS landing pages, including messaging, proof, product clarity, speed, and CTA strategy.',
    h1: 'SaaS Landing Page Best Practices',
    body: 'Effective SaaS landing pages combine clear positioning, product proof, fast performance, credible case studies, and low-friction conversion paths.',
  },
  {
    slug: 'vite-vs-nextjs-for-seo',
    title: 'Vite vs Next.js for SEO | Aesthetix Studio',
    description: 'A practical comparison of Vite, Next.js, prerendering, and server rendering for businesses that need speed and search visibility.',
    h1: 'Vite vs Next.js for SEO',
    body: 'Choosing between Vite and Next.js depends on indexing needs, rendering strategy, content scale, and how much dynamic behavior the site requires.',
  },
  {
    slug: 'why-website-speed-impacts-revenue',
    title: 'Why Website Speed Impacts Revenue | Aesthetix Studio',
    description: 'How slow websites increase acquisition costs, reduce trust, and lower conversion rates, plus how performance becomes business value.',
    h1: 'Why Website Speed Impacts Revenue',
    body: 'Website speed affects paid acquisition efficiency, organic rankings, user trust, bounce rate, conversion rate, and lifetime value.',
  },
  {
    slug: 'ui-ux-mistakes-that-hurt-conversion',
    title: 'UI UX Mistakes That Hurt Conversion | Aesthetix Studio',
    description: 'Common design mistakes that make websites look polished but fail to convert, from weak hierarchy to unclear calls to action.',
    h1: 'UI UX Mistakes That Hurt Conversion',
    body: 'Conversion-focused UI UX depends on clear hierarchy, readable copy, visible proof, fast interaction, accessible forms, and low-friction calls to action.',
  },
];

const faqs = [
  ['Do you build SEO-friendly websites?', 'Yes. We plan SEO into the architecture with semantic HTML, metadata, schema markup, sitemaps, Core Web Vitals, and internal linking.'],
  ['Which technologies do you use?', 'We build with React, TypeScript, Next.js, Vite, Tailwind CSS, and backend APIs selected around project requirements.'],
  ['How long does development take?', 'A focused website usually takes 4 to 8 weeks. Custom applications often take 8 to 16 weeks depending on complexity.'],
  ['Do you provide maintenance?', 'Yes. We provide security updates, dependency maintenance, performance monitoring, content updates, and bug fixes.'],
];

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Aesthetix Studio',
  url: siteUrl,
  email: 'hello@aesthetix.studio',
  telephone: '+918499908716',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hyderabad',
    addressCountry: 'IN',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(([name, text]) => ({
    '@type': 'Question',
    name,
    acceptedAnswer: { '@type': 'Answer', text },
  })),
};

const routes = [
  {
    path: '/',
    title: 'Web Design & Development Agency | Aesthetix Studio',
    description: 'Aesthetix Studio builds scalable, SEO-friendly digital experiences with React development, UI/UX design, custom web applications, and technical SEO.',
    h1: 'Modern Web Design & Development Studio',
    body: 'Aesthetix Studio is a web design and development agency focused on performance-first websites, React applications, UI/UX design, SEO-friendly architecture, case studies, and conversion-focused delivery.',
    schema: [organizationSchema, faqSchema],
  },
  {
    path: '/services',
    title: 'Web Development & UI/UX Design Services | Aesthetix Studio',
    description: 'Explore Aesthetix Studio services: web development, React development, UI/UX design, SEO-friendly websites, custom web applications, and maintenance support.',
    h1: 'Web Development & UI/UX Design Services',
    body: services.map(service => service.h1).join('. '),
    schema: organizationSchema,
  },
  ...services.map(service => ({
    ...service,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.h1,
      description: service.description,
      provider: { '@type': 'Organization', name: 'Aesthetix Studio' },
      areaServed: ['India', 'United States', 'United Kingdom', 'UAE'],
    },
  })),
  {
    path: '/projects',
    title: 'Projects & Case Studies | Aesthetix Studio',
    description: 'Read Aesthetix Studio case studies across fintech dashboards, headless e-commerce, medical AI interfaces, React development, UI/UX, and SEO.',
    h1: 'Projects & Case Studies',
    body: projects.map(project => project.body).join(' '),
    schema: organizationSchema,
  },
  ...projects.map(project => ({
    path: `/projects/${project.slug}`,
    ...project,
    schema: organizationSchema,
  })),
  {
    path: '/about',
    title: 'About Aesthetix Studio | Web Design & Development Team',
    description: 'Learn about Aesthetix Studio, our story, workflow, design philosophy, technology stack, and mission for performance-first digital products.',
    h1: 'About Aesthetix Studio',
    body: 'Aesthetix Studio combines design craft, React engineering, technical SEO, accessibility, and performance discipline to build digital products that scale.',
    schema: organizationSchema,
  },
  {
    path: '/blog',
    title: 'Web Design, React & SEO Blog | Aesthetix Studio',
    description: 'Insights on React SEO, Core Web Vitals, SaaS landing pages, web performance, UI/UX strategy, and modern web development.',
    h1: 'Web Design, React & SEO Insights',
    body: blogPosts.map(post => post.h1).join('. '),
    schema: organizationSchema,
  },
  ...blogPosts.map(post => ({
    path: `/blog/${post.slug}`,
    ...post,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.h1,
      description: post.description,
      author: { '@type': 'Organization', name: 'Aesthetix Studio' },
      publisher: { '@type': 'Organization', name: 'Aesthetix Studio' },
    },
  })),
  {
    path: '/contact',
    title: 'Contact Aesthetix Studio | Start a Web Design Project',
    description: 'Contact Aesthetix Studio to plan a website, React application, UI/UX redesign, SEO-friendly build, or maintenance engagement.',
    h1: 'Start Your Project',
    body: 'Contact Aesthetix Studio for web development, UI/UX design, React applications, custom web apps, technical SEO, and website maintenance.',
    schema: organizationSchema,
  },
];

const escapeHtml = value => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const stripExistingSeo = html => html
  .replace(/<title>[\s\S]*?<\/title>/i, '')
  .replace(/<meta name="description"[\s\S]*?>/i, '')
  .replace(/<link rel="canonical"[\s\S]*?>/i, '')
  .replace(/<meta (?:property|name)="(?:og|twitter):[\s\S]*?>/gi, '')
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');

const renderHead = route => {
  const canonical = `${siteUrl}${route.path === '/' ? '' : route.path}`;
  const schema = route.schema ? `<script type="application/ld+json">${JSON.stringify(route.schema)}</script>` : '';
  return `
    <title>${escapeHtml(route.title)}</title>
    <meta name="description" content="${escapeHtml(route.description)}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Aesthetix Studio" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${escapeHtml(route.title)}" />
    <meta property="og:description" content="${escapeHtml(route.description)}" />
    <meta property="og:image" content="${defaultImage}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(route.title)}" />
    <meta name="twitter:description" content="${escapeHtml(route.description)}" />
    <meta name="twitter:image" content="${defaultImage}" />
    ${schema}`;
};

const renderFallback = route => `
    <div id="root">
      <main class="seo-fallback">
        <h1>${escapeHtml(route.h1)}</h1>
        <p>${escapeHtml(route.description)}</p>
        <p>${escapeHtml(route.body)}</p>
      </main>
    </div>`;

const writeRoute = async (template, route) => {
  const html = stripExistingSeo(template)
    .replace('</head>', `${renderHead(route)}\n  </head>`)
    .replace(/<div id="root">[\s\S]*?<\/div>/, renderFallback(route));

  const outDir = route.path === '/' ? distDir : path.join(distDir, route.path.slice(1));
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, 'index.html'), html);
};

const template = await readFile(templatePath, 'utf8');
await Promise.all(routes.map(route => writeRoute(template, route)));

console.log(`Prerendered ${routes.length} routes.`);
