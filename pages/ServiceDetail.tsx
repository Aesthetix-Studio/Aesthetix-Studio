import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useLocation, Link, Navigate } from 'react-router-dom';
import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import { Button, SectionHeader } from '../components/UI';
import { SERVICES, BLOG_POSTS, PROJECTS, getIcon } from '../constants';
import SEO from '../components/SEO';
import { generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from '../utils/schemaMarkup';

// Rich per-service content for dedicated landing pages
const SERVICE_CONTENT: Record<string, {
  seoTitle: string;
  seoDescription: string;
  headline: string;
  intro: string;
  benefits: string[];
  process: { title: string; description: string }[];
  faqs: { q: string; a: string }[];
  relatedBlogSlugs: string[];
  relatedProjectSlugs: string[];
}> = {
  'ui-ux-design': {
    seoTitle: 'UI/UX Design Services India | Aesthetix Studio',
    seoDescription: 'Professional UI/UX design studio in India. We create high-converting user interfaces and seamless user experiences for web and mobile apps using Figma and modern design systems.',
    headline: 'UI/UX Design Services That Drive Conversions',
    intro: 'Great design is not just how it looks — it is how it works. Our UI/UX design studio in India creates research-driven interfaces that delight users and drive measurable business results. From user research to high-fidelity prototypes, we handle the entire design lifecycle using industry-standard tools like Figma.',
    benefits: [
      'Increase conversion rates with data-driven design decisions',
      'Reduce development costs by validating ideas before code',
      'Create consistent brand experiences with custom design systems',
      'Improve user retention with intuitive navigation patterns',
      'Accelerate time-to-market with rapid prototyping workflows'
    ],
    process: [
      { title: 'User Research', description: 'We start with understanding your users through interviews, surveys, and competitive analysis.' },
      { title: 'Wireframing', description: 'Low-fidelity layouts to establish information architecture and user flows.' },
      { title: 'Visual Design', description: 'High-fidelity mockups with your brand identity, typography, and color system.' },
      { title: 'Prototyping & Testing', description: 'Interactive Figma prototypes validated with real users before handoff.' }
    ],
    faqs: [
      { q: 'What design tools do you use?', a: 'We primarily use Figma for all UI/UX work — from wireframes and prototyping to design systems and developer handoff. We also use tools like Maze for usability testing.' },
      { q: 'How long does a UI/UX design project take?', a: 'A typical design sprint takes 2–4 weeks. Full product design with user research, multiple iterations, and a complete design system can take 4–8 weeks.' },
      { q: 'Do you provide developer handoff?', a: 'Yes. All designs include detailed specs, component documentation, and Figma dev mode access for a seamless transition to development.' },
      { q: 'Can you redesign an existing product?', a: 'Absolutely. We regularly audit and redesign existing apps and websites to improve usability, accessibility, and conversion rates.' }
    ],
    relatedBlogSlugs: ['saas-landing-page-best-practices'],
    relatedProjectSlugs: ['health-ai']
  },
  'web-development': {
    seoTitle: 'Web Development Agency India | Aesthetix Studio',
    seoDescription: 'Full-stack web development agency in India. We build fast, scalable, and SEO-friendly websites using React, TypeScript, and modern backend technologies.',
    headline: 'Full-Stack Web Development Agency',
    intro: 'We build websites and web applications that are fast, accessible, and engineered for growth. As a web development agency based in India, we use React, TypeScript, and modern backend stacks to deliver production-grade solutions — from marketing sites to complex SaaS platforms.',
    benefits: [
      'Sub-second page load times with optimized build pipelines',
      'SEO-friendly architecture with structured data from day one',
      'Scalable codebases built on React, TypeScript, and clean architecture',
      'Responsive design that works perfectly on every device',
      'Ongoing maintenance and performance monitoring available'
    ],
    process: [
      { title: 'Technical Discovery', description: 'We define your tech stack, architecture, and deployment strategy based on project requirements.' },
      { title: 'Frontend Development', description: 'Component-driven React development with TypeScript, Tailwind CSS, and modern state management.' },
      { title: 'Backend & API Integration', description: 'RESTful or GraphQL APIs built with Spring Boot or Python, plus third-party integrations.' },
      { title: 'Testing & Deployment', description: 'Automated testing, CI/CD pipelines, and deployment to cloud infrastructure like Vercel or AWS.' }
    ],
    faqs: [
      { q: 'Which technologies do you use for web development?', a: 'Our core stack includes React, TypeScript, Next.js, and Vite for frontends, and Spring Boot or Python for backends. We deploy to Vercel, AWS, or your preferred cloud provider.' },
      { q: 'Do you build both frontend and backend?', a: 'Yes. We are a full-stack agency. We handle everything from UI components to database design, API development, and cloud deployment.' },
      { q: 'How do you ensure website performance?', a: 'We optimize for Core Web Vitals from the start — code splitting, lazy loading, image optimization, and CDN configuration are all standard in our workflow.' },
      { q: 'Can you migrate our existing website to a modern stack?', a: 'Absolutely. We have extensive experience migrating legacy websites to React-based architectures without losing SEO rankings.' }
    ],
    relatedBlogSlugs: ['core-web-vitals-explained', 'why-react-websites-need-seo-setup'],
    relatedProjectSlugs: ['lux-ecommerce']
  },
  'react-development': {
    seoTitle: 'React Development Company India | Aesthetix Studio',
    seoDescription: 'Expert React and Next.js development company in India. We build high-performance single page applications, micro-frontends, and server-rendered React solutions.',
    headline: 'Expert React & Next.js Development',
    intro: 'React powers some of the world\'s most demanding web applications. As a specialized React development company based in India, we build performant SPAs, server-rendered apps, and micro-frontend architectures that scale. From component libraries to full production deployments, React is our core expertise.',
    benefits: [
      'Lightning-fast SPAs with optimal code splitting and lazy loading',
      'Server-side rendering with Next.js for maximum SEO visibility',
      'Reusable component libraries and design system integration',
      'Expert state management with Redux, Zustand, or React Query',
      'Micro-frontend architectures for enterprise-scale applications'
    ],
    process: [
      { title: 'Architecture Planning', description: 'We design your component tree, state management strategy, and rendering approach (CSR, SSR, or SSG).' },
      { title: 'Component Development', description: 'Modular, typed React components with Storybook documentation and unit tests.' },
      { title: 'Performance Optimization', description: 'Bundle analysis, code splitting, and Core Web Vitals tuning for maximum speed.' },
      { title: 'CI/CD & Deployment', description: 'Automated build pipelines with preview deployments, staging environments, and production rollouts.' }
    ],
    faqs: [
      { q: 'Should I use React or Next.js?', a: 'It depends on your SEO needs. Next.js provides server-side rendering which is better for SEO-critical pages. Standard React (Vite) is ideal for dashboards and authenticated apps where SEO is less critical.' },
      { q: 'Can you build a React component library for our team?', a: 'Yes. We build custom component libraries with Storybook documentation, TypeScript types, and automated visual regression testing.' },
      { q: 'Do you handle React performance optimization?', a: 'Absolutely. We audit existing React apps for performance bottlenecks — unnecessary re-renders, bundle bloat, and memory leaks — and implement targeted fixes.' },
      { q: 'What about testing?', a: 'We implement comprehensive testing strategies including unit tests (Vitest/Jest), integration tests (React Testing Library), and end-to-end tests (Playwright).' }
    ],
    relatedBlogSlugs: ['how-we-build-scalable-react-applications', 'vite-vs-nextjs-for-seo'],
    relatedProjectSlugs: ['fintech-dashboard']
  },
  'custom-web-applications': {
    seoTitle: 'Custom Web Application Development India | Aesthetix Studio',
    seoDescription: 'Custom web application and SaaS development company in India. We build complex platforms, internal tools, and data-driven applications engineered for scale.',
    headline: 'Custom Web Application Development',
    intro: 'Off-the-shelf solutions do not fit every business. We build custom web applications — SaaS platforms, internal tools, dashboards, and data-driven systems — engineered from the ground up for your specific workflow. Our India-based team handles everything from database design to cloud deployment.',
    benefits: [
      'Purpose-built solutions that match your exact business processes',
      'Scalable cloud architecture designed for growth',
      'Secure authentication, authorization, and data protection',
      'Third-party integrations with payment gateways, CRMs, and APIs',
      'Ongoing support and iterative feature development'
    ],
    process: [
      { title: 'Requirements Analysis', description: 'Deep-dive into your business processes, user roles, and data flows.' },
      { title: 'System Architecture', description: 'Database schema design, API contracts, and cloud infrastructure planning.' },
      { title: 'Iterative Development', description: 'Agile sprints with regular demos, feedback loops, and priority adjustments.' },
      { title: 'Launch & Scale', description: 'Production deployment with monitoring, alerting, and scaling strategies.' }
    ],
    faqs: [
      { q: 'What types of custom applications do you build?', a: 'We build SaaS platforms, admin dashboards, CRM systems, booking engines, marketplace platforms, and internal business tools. If it runs in a browser, we can build it.' },
      { q: 'How do you handle data security?', a: 'We implement industry-standard security practices including encrypted data storage, JWT authentication, role-based access control, and regular security audits.' },
      { q: 'Can you integrate with our existing systems?', a: 'Yes. We build APIs that integrate with existing databases, CRMs (Salesforce, HubSpot), payment providers (Stripe, Razorpay), and any system with a REST or GraphQL API.' },
      { q: 'What is the typical cost of a custom web application?', a: 'Costs vary based on complexity. A basic internal tool may start at ₹25k, while a full SaaS platform with user management and payment integration can range from ₹50k–₹2L+. We provide detailed estimates after our discovery phase.' }
    ],
    relatedBlogSlugs: ['how-we-build-scalable-react-applications'],
    relatedProjectSlugs: ['fintech-dashboard']
  },
  'maintenance-support': {
    seoTitle: 'Website Maintenance Services India | Aesthetix Studio',
    seoDescription: 'Reliable website maintenance and support services in India. Security updates, performance monitoring, content updates, and bug fixes to keep your site running optimally.',
    headline: 'Website Maintenance & Support Services',
    intro: 'Launching a website is just the beginning. Our website maintenance services keep your site secure, fast, and up-to-date so you can focus on running your business. Based in India, we offer flexible monthly plans for startups and enterprises alike.',
    benefits: [
      'Regular security patches and dependency updates',
      'Continuous performance monitoring and uptime alerts',
      'Content updates and minor feature additions',
      'Monthly analytics reports with actionable insights',
      'Priority bug fixes with guaranteed response times'
    ],
    process: [
      { title: 'Site Audit', description: 'We assess your current site for security vulnerabilities, performance issues, and outdated dependencies.' },
      { title: 'Maintenance Plan', description: 'A custom plan based on your update frequency, traffic, and business criticality.' },
      { title: 'Ongoing Monitoring', description: 'Automated uptime checks, error tracking, and Core Web Vitals monitoring.' },
      { title: 'Monthly Reporting', description: 'Transparent reports on work completed, metrics improved, and recommendations for the month ahead.' }
    ],
    faqs: [
      { q: 'What does a maintenance plan include?', a: 'Our plans typically include security updates, performance monitoring, minor content updates, bug fixes, monthly backups, and analytics reporting. We customize based on your needs.' },
      { q: 'How quickly do you respond to issues?', a: 'Critical issues (site down, security breach) get a response within 2 hours. Standard requests are addressed within 24 business hours.' },
      { q: 'Do I need a maintenance plan if my site is new?', a: 'Yes. Even new websites need regular dependency updates, security patches, and performance monitoring. Web technologies evolve rapidly and sites can become vulnerable quickly.' },
      { q: 'Can you maintain a site you did not build?', a: 'Yes, as long as it uses technologies within our expertise (React, Next.js, Vite, WordPress, etc.). We start with a thorough codebase audit before onboarding.' }
    ],
    relatedBlogSlugs: ['core-web-vitals-explained'],
    relatedProjectSlugs: ['lux-ecommerce']
  },
  'seo-friendly-websites': {
    seoTitle: 'SEO-Friendly Website Development India | Aesthetix Studio',
    seoDescription: 'We build SEO-optimized websites from the ground up. Technical SEO, structured data, Core Web Vitals optimization, and keyword strategy baked into every project.',
    headline: 'SEO-Friendly Website Development',
    intro: 'Most agencies treat SEO as an afterthought — a plugin or a checklist after the site is built. We engineer SEO into the foundation. From structured data and semantic HTML to Core Web Vitals optimization and keyword-targeted page architecture, every site we build is designed to rank.',
    benefits: [
      'Technical SEO architecture built into the development process',
      'Structured data (JSON-LD schema) for rich search results',
      'Core Web Vitals optimization for Google ranking signals',
      'Keyword-targeted page structure and heading hierarchy',
      'Sitemap, robots.txt, and canonical tag configuration'
    ],
    process: [
      { title: 'SEO Audit & Strategy', description: 'Keyword research, competitive analysis, and page architecture planning.' },
      { title: 'Technical Implementation', description: 'Schema markup, meta tags, semantic HTML, and performance optimization.' },
      { title: 'Content Optimization', description: 'Heading hierarchy, internal linking, and keyword density tuning.' },
      { title: 'Monitoring & Iteration', description: 'Google Search Console setup, rank tracking, and ongoing optimization.' }
    ],
    faqs: [
      { q: 'Can a React website rank well on Google?', a: 'Yes — but it requires careful implementation. We ensure proper server-side rendering or pre-rendering, structured data, and optimized meta tags so Google can fully index React-powered sites.' },
      { q: 'What SEO tools do you use?', a: 'We use Google Search Console, PageSpeed Insights, Lighthouse, Ahrefs, and custom monitoring dashboards to track and improve SEO performance.' },
      { q: 'How long does it take to see SEO results?', a: 'Technical SEO improvements can show impact within 2–4 weeks. Content-driven rankings typically take 2–6 months to mature, depending on competition and domain authority.' },
      { q: 'Do you provide ongoing SEO services?', a: 'Yes. Beyond the initial build, we offer ongoing SEO maintenance including content strategy, link building guidance, rank monitoring, and monthly reporting.' }
    ],
    relatedBlogSlugs: ['why-react-websites-need-seo-setup', 'seo-mistakes-startups-make', 'vite-vs-nextjs-for-seo'],
    relatedProjectSlugs: ['lux-ecommerce']
  }
};

const ServiceDetail = () => {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const { pathname } = useLocation();
  
  // If no slug param (root level route), extract from pathname
  const slug = paramSlug || pathname.split('/').pop();
  const legacySlugMap: Record<string, string> = {
    'seo-websites': 'seo-friendly-websites',
    'custom-web-apps': 'custom-web-applications',
  };
  const normalizedSlug = slug ? legacySlugMap[slug] || slug : slug;
  const service = SERVICES.find(s => s.slug === normalizedSlug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const content = SERVICE_CONTENT[service.slug];
  const relatedBlogs = content ? BLOG_POSTS.filter(b => content.relatedBlogSlugs.includes(b.slug)) : [];
  const relatedProjects = content ? PROJECTS.filter(p => content.relatedProjectSlugs.includes(p.slug)) : [];
  const otherServices = SERVICES.filter(s => s.slug !== service.slug).slice(0, 3);
  const Icon = getIcon(service.iconName);

  // Generate Service and FAQ schemas
  const serviceSchema = generateServiceSchema(
    service.title,
    service.description
  );

  const faqSchema = content ? generateFAQSchema(
    content.faqs.map(faq => ({
      question: faq.q,
      answer: faq.a
    }))
  ) : null;
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.aesthetixstudio.com/' },
    { name: 'Services', url: 'https://www.aesthetixstudio.com/services' },
    { name: service.title, url: `https://www.aesthetixstudio.com/${service.slug}` },
  ]);

  return (
    <div>
      <SEO
        title={content?.seoTitle || service.title}
        description={content?.seoDescription || service.description}
        schema={faqSchema ? [serviceSchema, faqSchema, breadcrumbSchema] : [serviceSchema, breadcrumbSchema]}
      />

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-100 py-3">
        <div className="max-w-7xl mx-auto px-4 text-sm text-slate-500">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <ChevronRight size={14} className="inline mx-2" />
          <Link to="/services" className="hover:text-indigo-600 transition-colors">Services</Link>
          <ChevronRight size={14} className="inline mx-2" />
          <span className="text-slate-900 font-medium">{service.title}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-slate-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Icon size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
            {content?.headline || service.title}
          </h1>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto leading-relaxed">
            {content?.intro?.slice(0, 160) || service.description}
          </p>
        </div>
      </div>

      {/* Introduction */}
      {content && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-slate-600 text-lg leading-relaxed">
              {content.intro}
            </p>
          </div>
        </section>
      )}

      {/* Benefits */}
      {content && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">Why Choose Our {service.title}?</h2>
                <div className="space-y-4">
                  {content.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                        <Check size={12} />
                      </div>
                      <span className="text-slate-700 leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Link to="/proposal">
                    <Button>Book a Free Strategy Call</Button>
                  </Link>
                </div>
              </div>
              <div className="space-y-4">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <span className="font-semibold text-slate-900">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      {content && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 tracking-tight text-center">Our Process</h2>
            <div className="space-y-6">
              {content.process.map((step, idx) => (
                <div key={idx} className="flex gap-6 items-start bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <div className="text-2xl font-extrabold text-indigo-200 tabular-nums shrink-0 leading-none pt-1">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {content && content.faqs.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 tracking-tight text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {content.faqs.map((faq, i) => (
                <details key={i} className="group bg-white rounded-xl border border-slate-100 overflow-hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer text-slate-900 font-semibold text-lg hover:bg-slate-50 transition-colors">
                    {faq.q}
                    <span className="ml-4 text-indigo-500 group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Content — Internal Linking */}
      {(relatedBlogs.length > 0 || relatedProjects.length > 0) && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Related Case Studies */}
              {relatedProjects.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Case Studies</h2>
                  {relatedProjects.map(project => (
                    <Link key={project.slug} to={`/projects/${project.slug}`} className="block group bg-slate-50 rounded-xl border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-video overflow-hidden">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{project.title}</h3>
                        <p className="text-slate-600 text-sm">{project.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              {/* Related Blog Posts */}
              {relatedBlogs.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Articles</h2>
                  <div className="space-y-4">
                    {relatedBlogs.map(post => (
                      <Link key={post.slug} to={`/blog/${post.slug}`} className="block group p-5 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
                        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">{post.category}</p>
                        <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{post.title}</h3>
                        <p className="text-slate-500 text-sm mt-1">{post.readTime}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Other Services — Internal Linking */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Explore Our Other Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherServices.map(s => {
              const SIcon = getIcon(s.iconName);
              return (
                <Link key={s.slug} to={`/${s.slug}`} className="group block p-6 bg-white rounded-xl border border-slate-100 hover:shadow-md transition-all">
                  <SIcon className="text-indigo-600 mb-3 group-hover:scale-110 transition-transform" size={28} />
                  <h3 className="font-bold text-slate-900 mb-1">{s.title}</h3>
                  <p className="text-slate-600 text-sm mb-3">{s.description}</p>
                  <span className="text-indigo-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn more <ArrowRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related Projects - INTERNAL LINKING BOOST */}
      {content?.relatedProjectSlugs && (
        <section className="py-24 bg-slate-900 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Case Studies</h2>
                <p className="text-slate-400 text-lg">Real-world examples of how we've applied our {service.title} expertise.</p>
              </div>
              <Link to="/projects">
                <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">View All Work <ArrowRight size={16} className="ml-2" /></Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {PROJECTS.filter(p => content.relatedProjectSlugs.includes(p.slug)).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/projects/${project.slug}`} className="group block">
                    <div className="aspect-video rounded-3xl overflow-hidden mb-6">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                    <p className="text-slate-400 line-clamp-2">{project.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Need expert {service.title}?</h2>
          <p className="text-slate-600 text-xl mb-10 leading-relaxed">
            Let's discuss your project and how Aesthetix Studio can help you achieve your business goals with sub-second load times and production-grade engineering.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/proposal">
              <Button variant="primary" size="lg">Request Custom Proposal</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">Book a Strategy Call</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
