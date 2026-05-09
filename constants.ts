import { Service, Project, BlogPost, ProjectType, BudgetRange } from './types';
import { 
  Layout, Figma, Code, Activity, Search, PenTool, Share2, 
  Monitor, Smartphone, Database, BarChart, Globe, Box, Server, Layers, HardDrive 
} from 'lucide-react';

export const SERVICES: Service[] = [
  {
    id: '1',
    slug: 'ui-ux-design',
    title: 'UI/UX Design Studio',
    description: 'High-converting, aesthetic UI/UX design tailored to your brand identity.',
    iconName: 'Layout',
    features: ['User Research', 'Wireframing', 'High-Fidelity Mockups', 'Design Systems']
  },
  {
    id: '2',
    slug: 'web-development',
    title: 'Web Development Agency',
    description: 'Robust, scalable frontend and backend engineering using modern stacks.',
    iconName: 'Code',
    features: ['React & TypeScript', 'Spring Boot / Python', 'CMS Integration', 'API Development']
  },
  {
    id: '3',
    slug: 'react-development',
    title: 'React Development Company',
    description: 'Specialized high-performance React and Next.js development for modern web apps.',
    iconName: 'Layers',
    features: ['Single Page Applications', 'Server-Side Rendering', 'Micro-frontends', 'State Management']
  },
  {
    id: '4',
    slug: 'custom-web-apps',
    title: 'Custom Web Applications',
    description: 'Complex SaaS platforms and internal tools engineered for scale.',
    iconName: 'Database',
    features: ['SaaS Development', 'Cloud Architecture', 'Database Design', 'Third-Party Integrations']
  },
  {
    id: '5',
    slug: 'maintenance-support',
    title: 'Website Maintenance Services',
    description: 'Keep your digital assets secure, up-to-date, and performing optimally.',
    iconName: 'Activity',
    features: ['Security Updates', 'Performance Monitoring', 'Content Updates', 'Bug Fixes']
  },
  {
    id: '6',
    slug: 'seo-websites',
    title: 'SEO Website Development',
    description: 'Websites engineered from the ground up to rank on Google and capture organic traffic.',
    iconName: 'Search',
    features: ['Technical Audit', 'Keyword Strategy', 'On-Page Optimization', 'Core Web Vitals']
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    slug: 'fintech-dashboard',
    title: 'Nova Fintech Dashboard',
    category: 'Web Application',
    description: 'A real-time financial analytics dashboard for institutional investors.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
    tags: ['React', 'D3.js', 'Spring Boot', 'WebSockets'],
    challenge: 'The client needed to visualize millions of market data points with sub-second latency. Their legacy dashboard was slow, causing institutional traders to miss critical market movements.',
    solution: 'We architected a real-time streaming layer using WebSockets and a GPU-accelerated visualization engine built on D3.js. The frontend was built with a highly optimized React component tree to prevent unnecessary re-renders.',
    process: 'We started with a 1-week technical discovery to audit their data pipelines. Then, we built a proof-of-concept for the visualization engine. After validation, we spent 8 weeks on the full product build, including rigorous performance stress testing.',
    metrics: [
      { label: 'Data Latency', value: '< 200ms' },
      { label: 'Render Speed', value: '60 FPS' },
      { label: 'Lighthouse', value: '99' }
    ],
    results: ['40% increase in user session time', 'Reduced data load time by 85%', 'Zero downtime during high-volatility events'],
    businessImpact: ['Secured 15 new institutional contracts', 'Reduced customer support tickets by 30%', 'Recognized as Top 3 Fintech UI 2023']
  },
  {
    id: '2',
    slug: 'lux-ecommerce',
    title: 'LUX Fashion E-Commerce',
    category: 'E-Commerce',
    description: 'A headless e-commerce experience for a high-end sustainable fashion brand.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
    tags: ['Next.js', 'Shopify Plus', 'Tailwind', 'Framermotion'],
    challenge: 'A sustainable fashion brand was losing 60% of mobile traffic due to 5-second load times on their legacy Shopify theme. They needed a premium, fast, and SEO-dominant experience.',
    solution: 'We moved them to a headless architecture using Next.js for the frontend and Shopify Plus for the backend. We implemented ISR (Incremental Static Regeneration) for lightning-fast product pages.',
    process: 'Phase 1 focused on a complete UX redesign to align with their luxury brand. Phase 2 was the headless integration and migration of 500+ products. Phase 3 involved a massive technical SEO audit to ensure zero rank loss during migration.',
    metrics: [
      { label: 'Mobile Load Time', value: '1.2s' },
      { label: 'Conversion Rate', value: '+210%' },
      { label: 'SEO Score', value: '100' }
    ],
    results: ['Page speed score increased from 45 to 98', 'Zero loss in organic traffic during migration', 'Perfect Core Web Vitals'],
    businessImpact: ['150% increase in mobile revenue', 'Bounce rate dropped from 72% to 28%', 'Lowered customer acquisition cost by 18%']
  },
  {
    id: '3',
    slug: 'health-ai',
    title: 'MediScan AI Interface',
    category: 'Medical Prototype',
    description: 'Interface design for an AI-powered medical imaging diagnostic tool.',
    image: '/images/work/health-ai.png',
    tags: ['Figma', 'React', 'TypeScript', 'Canvas API'],
    challenge: 'Radiologists were struggling with complex, unintuitive software that slowed down life-critical diagnoses. The startup needed a trustworthy, high-performance UI to secure funding.',
    solution: 'We built a high-contrast, keyboard-optimized interface focused on radiologist workflow. We used the HTML5 Canvas API for smooth, lag-free medical image manipulation.',
    process: 'We conducted 10+ deep-dive interviews with practicing doctors to map their diagnostic workflow. We then built a functional high-fidelity prototype in 2 weeks to validate the UX.',
    metrics: [
      { label: 'User Workflow', value: '2x Faster' },
      { label: 'Confidence Score', value: '94%' },
      { label: 'Prototyping', value: '14 Days' }
    ],
    results: ['Validated core workflow with 10 senior doctors', 'Secured $2M Series A funding based on the prototype', 'Reduced future dev time by 3 months'],
    businessImpact: ['Shortened time-to-diagnosis by 50%', 'Investor-ready product in record time', 'Highly scalable design system created']
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'why-react-websites-need-seo-setup',
    title: 'Why React Websites Need Proper SEO Setup (And How to Fix It)',
    excerpt: 'Single Page Apps are powerful, but they can be invisible to Google without the right configuration. Here is how to make your React site fully crawlable.',
    category: 'Technical SEO',
    date: 'Apr 20, 2025',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop&crop=center&auto=format&q=80'
  },
  {
    id: '2',
    slug: 'core-web-vitals-explained',
    title: 'Core Web Vitals Explained: How Website Speed Affects Your Google Ranking',
    excerpt: 'LCP, FID, CLS — understand what Google actually measures and how improving these scores can directly boost your organic search traffic.',
    category: 'Performance',
    date: 'Apr 28, 2025',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center&auto=format&q=80'
  },
  {
    id: '3',
    slug: 'saas-landing-page-best-practices',
    title: 'SaaS Landing Page Best Practices That Actually Drive Conversions',
    excerpt: 'Your landing page is your best salesperson. Here are the UI/UX design patterns that top SaaS companies use to convert visitors into paying customers.',
    category: 'Design',
    date: 'May 05, 2025',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop&crop=center&auto=format&q=80'
  },
  {
    id: '4',
    slug: 'vite-vs-nextjs-for-seo',
    title: 'Vite vs Next.js for SEO: Which Should You Choose in 2025?',
    excerpt: 'Both are excellent tools, but they have very different implications for search engine visibility. Here is a thorough comparison from the perspective of a web development agency.',
    category: 'Engineering',
    date: 'May 09, 2025',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop&crop=center&auto=format&q=80'
  },
  {
    id: '5',
    slug: 'seo-mistakes-startups-make',
    title: '5 Critical SEO Mistakes Startups Make (And How We Fix Them)',
    excerpt: 'From missing structured data to client-side-only rendering, these are the most damaging technical SEO errors we see when auditing startup websites.',
    category: 'SEO',
    date: 'May 12, 2025',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop&crop=center&auto=format&q=80'
  },
  {
    id: '6',
    slug: 'how-we-build-scalable-react-applications',
    title: 'How We Build Scalable React Applications at Aesthetix Studio',
    excerpt: 'A behind-the-scenes look at our React development workflow — from component architecture and state management to CI/CD pipelines and cloud deployment.',
    category: 'Engineering',
    date: 'May 15, 2025',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&crop=center&auto=format&q=80'
  }
];

export const TESTIMONIALS = [
  {
    quote: "Aesthetix Studio delivered a stunning SaaS dashboard that tripled our institutional user engagement. Their attention to sub-second data visualization performance is world-class.",
    author: "Ravi Mehta",
    role: "CTO, Nova Fintech",
    project: "Fintech Dashboard",
    initial: "R"
  },
  {
    quote: "They doubled our mobile conversion rate in 3 months. Page speed went from a 45 to 98 on Lighthouse. This is the only team I trust for SEO-first React development.",
    author: "Priya Sharma",
    role: "Founder, LUX Fashion",
    project: "E-Commerce Re-platforming",
    initial: "P"
  },
  {
    quote: "The Figma prototype they built in 2 weeks was key to our Series A round. Investors were blown away by the clarity and depth of the user experience.",
    author: "Dr. Anil Kumar",
    role: "CEO, MediScan AI",
    project: "AI Medical Interface",
    initial: "A"
  }
];

export const TECH_STACK = [
  { name: 'Figma', icon: Figma },
  { name: 'React', icon: Code },
  { name: 'Angular', icon: Layers },
  { name: 'Java Spring', icon: Server },
  { name: 'Python', icon: BarChart }, // Using BarChart for Data/Python
  { name: 'Oracle', icon: Database },
  { name: 'MySQL', icon: HardDrive },
  { name: 'Blender', icon: Box }, 
];

// Helper to mimic icon component lookup
export const getIcon = (name: string) => {
  const icons: any = {
    Layout, Figma, Code, Activity, Search, PenTool, Share2,
    Monitor, Smartphone, Database, BarChart, Globe, Box,
    Server, Layers, HardDrive
  };
  return icons[name] || Code;
};