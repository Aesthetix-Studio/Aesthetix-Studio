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
    slug: 'custom-web-applications',
    title: 'Custom Web Applications',
    description: 'Complex SaaS platforms and internal tools engineered for scale.',
    iconName: 'Database',
    features: ['SaaS Development', 'Cloud Architecture', 'Database Design', 'Third-Party Integrations']
  },
  {
    id: '5',
    slug: 'website-maintenance',
    title: 'Website Maintenance Services',
    description: 'Keep your digital assets secure, up-to-date, and performing optimally.',
    iconName: 'Activity',
    features: ['Security Updates', 'Performance Monitoring', 'Content Updates', 'Bug Fixes']
  },
  {
    id: '6',
    slug: 'seo-friendly-websites',
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
    tags: ['React', 'D3.js', 'Spring Boot'],
    challenge: 'Visualizing millions of data points with sub-second latency while maintaining a clean, accessible UI.',
    solution: 'We utilized WebSockets for real-time data and D3.js for custom GPU-accelerated charts, wrapped in a highly modular React architecture.',
    results: ['40% increase in user session time', 'Reduced data load time by 2s', 'Awarded Best UX in Fintech 2023']
  },
  {
    id: '2',
    slug: 'lux-ecommerce',
    title: 'LUX Fashion E-Commerce',
    category: 'E-Commerce',
    description: 'A headless e-commerce experience for a high-end sustainable fashion brand.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
    tags: ['Next.js', 'Shopify Plus', 'Tailwind'],
    challenge: 'Migrating from a monolithic legacy platform to a modern headless stack without losing SEO ranking.',
    solution: 'Implemented a static-generated architecture using Next.js, optimizing core web vitals and implementing a robust redirect strategy.',
    results: ['200% increase in mobile conversions', 'Page speed score increased from 45 to 98', 'Seamless global scaling']
  },
  {
    id: '3',
    slug: 'health-ai',
    title: 'MediScan AI Interface',
    category: 'Prototype',
    description: 'Interface design for an AI-powered medical imaging diagnostic tool.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
    tags: ['Figma', 'Python', 'Medical'],
    challenge: 'Creating a trustworthy and efficient interface for radiologists who need to process images rapidly.',
    solution: 'Conducted deep user research with doctors to create a high-contrast, keyboard-driven interface prototype validated before development.',
    results: ['Validated core workflow in 2 weeks', 'Secured Series A funding based on prototype', 'Reduced planned dev time by 3 months']
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