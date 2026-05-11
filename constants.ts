import { Service, Project, BlogPost, Testimonial, TechStack } from './types';
import { 
  Layout, Figma, Code, Activity, Search, PenTool, Share2, 
  Monitor, Smartphone, Database, BarChart, Globe, Box, Server, Layers, HardDrive,
  Zap, Shield, Cpu, Brain
} from 'lucide-react';

export const SERVICES: Service[] = [
  {
    id: '0',
    slug: 'ai-solutions-integration',
    image: '/images/services/ai-solutions.png',
    title: 'AI Solutions & Integration',
    description: 'Production-ready AI systems including machine learning, NLP, computer vision, intelligent automation, and AI-powered web applications.',
    iconName: 'Brain',
    features: ['Machine Learning', 'NLP Systems', 'Computer Vision', 'AI Deployment', 'AI APIs', 'Intelligent Automation']
  },
  {
    id: '1',
    slug: 'ui-ux-design',
    image: '/images/services/ui-ux-design.png',
    title: 'UI/UX Design Studio',
    description: 'High-converting, aesthetic UI/UX design tailored to your brand identity.',
    image: '/images/services/prototyping.jpg?v=service-20260509',
    iconName: 'Layout',
    features: ['User Research', 'Wireframing', 'High-Fidelity Mockups', 'Design Systems']
  },
  {
    id: '2',
    slug: 'web-development',
    image: '/images/services/web-development.png',
    title: 'Web Development Agency',
    description: 'Robust, scalable frontend and backend engineering using modern stacks.',
    image: '/images/services/web-development.png?v=service-20260509',
    iconName: 'Code',
    features: ['React & TypeScript', 'Spring Boot / Python', 'CMS Integration', 'API Development']
  },
  {
    id: '3',
    slug: 'react-development',
    image: '/images/services/react-development.png',
    title: 'React Development Company',
    description: 'Specialized high-performance React and Next.js development for modern web apps.',
    image: '/images/services/website-design.jpg?v=service-20260509',
    iconName: 'Layers',
    features: ['Single Page Applications', 'Server-Side Rendering', 'Micro-frontends', 'State Management']
  },
  {
    id: '4',
    slug: 'custom-web-applications',
    image: '/images/services/custom-web-applications.png',
    title: 'Custom Web Applications',
    description: 'Complex SaaS platforms and internal tools engineered for scale.',
    image: '/images/services/custom-web-applications.png?v=service-20260509',
    iconName: 'Database',
    features: ['SaaS Development', 'Cloud Architecture', 'Database Design', 'Third-Party Integrations']
  },
  {
    id: '5',
    slug: 'maintenance-support',
    image: '/images/services/maintenance-support.png',
    title: 'Website Maintenance Services',
    description: 'Keep your digital assets secure, up-to-date, and performing optimally.',
    image: '/images/services/maintenance-support.png?v=service-20260509',
    iconName: 'Activity',
    features: ['Security Updates', 'Performance Monitoring', 'Content Updates', 'Bug Fixes']
  },
  {
    id: '6',
    slug: 'seo-friendly-websites',
    image: '/images/services/seo-friendly-websites.png',
    title: 'SEO Website Development',
    description: 'Websites engineered from the ground up to rank on Google and capture organic traffic.',
    image: '/images/services/seo-friendly-websites.png?v=service-20260509',
    iconName: 'Search',
    features: ['Technical Audit', 'Keyword Strategy', 'On-Page Optimization', 'Core Web Vitals']
  }
];

export const PROJECTS: Project[] = [
  {
    id: '0',
    slug: 'intellidocs-ai',
    title: 'IntelliDocs AI',
    category: 'AI System',
    description: 'An intelligent document processing system designed to automate extraction, analysis, and organization of unstructured documents using AI technologies.',
    image: '/images/work/intellidocs-ai.png',
    tags: ['Python', 'FastAPI', 'OpenCV', 'Transformers', 'React', 'NLP'],
    challenge: 'Manual document processing is slow, error-prone, and difficult to scale. Organizations struggle to extract insights from large volumes of unstructured documents, leading to inefficiencies and missed opportunities.',
    solution: 'We developed an AI-powered document intelligence system combining OCR, NLP, and semantic search. The system uses computer vision for text extraction, transformer models for summarization, and vector embeddings for intelligent document retrieval.',
    process: 'We architected a scalable pipeline with FastAPI for the backend, integrated Tesseract OCR and OpenCV for document processing, implemented transformer-based summarization, and built a vector search layer using FAISS. The frontend dashboard was built with React for real-time document management.',
    metrics: [
      { label: 'OCR Accuracy', value: '94%' },
      { label: 'Processing Speed', value: '< 2s' },
      { label: 'API Response', value: '< 300ms' }
    ],
    results: ['Real-time OCR text extraction', 'AI-generated document summaries', 'Semantic search with 92% relevance', 'Scalable API-based architecture'],
    businessImpact: ['Automated document workflows', 'Reduced manual processing time by 80%', 'Intelligent document classification and tagging'],
    gallery: ['/images/work/intellidocs-ai.png'],
    relatedServices: ['ai-solutions-integration', 'custom-web-applications', 'react-development'],
    projectType: 'Internal R&D Project'
  },
  {
    id: '1',
    slug: 'fintech-dashboard',
    title: 'Nova Fintech Dashboard',
    category: 'Web Application',
    description: 'A real-time financial analytics dashboard for institutional investors.',
    image: '/images/work/fintech-dashboard.png',
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
    businessImpact: ['Secured 15 new institutional contracts', 'Reduced customer support tickets by 30%', 'Recognized as Top 3 Fintech UI 2023'],
    gallery: ['/images/work/fintech-dashboard.png'],
    relatedServices: ['react-development', 'custom-web-applications', 'web-development']
  },
  {
    id: '2',
    slug: 'lux-ecommerce',
    title: 'LUX Fashion E-Commerce',
    category: 'E-Commerce',
    description: 'A headless e-commerce experience for a high-end sustainable fashion brand.',
    image: '/images/work/lux-ecommerce.png',
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
    businessImpact: ['150% increase in mobile revenue', 'Bounce rate dropped from 72% to 28%', 'Lowered customer acquisition cost by 18%'],
    gallery: ['/images/work/lux-ecommerce.png'],
    relatedServices: ['web-development', 'seo-friendly-websites', 'ui-ux-design']
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
    businessImpact: ['Shortened time-to-diagnosis by 50%', 'Investor-ready product in record time', 'Highly scalable design system created'],
    gallery: ['/images/work/health-ai.png'],
    relatedServices: ['ui-ux-design', 'react-development', 'custom-web-applications']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: 'Sarah Chen',
    role: 'CEO at Nova Finance',
    initial: 'S',
    project: 'Fintech Dashboard',
    quote: 'Aesthetix Studio delivered a highly optimized dashboard that significantly improved our institutional user retention. The sub-200ms latency they achieved was a game-changer for our trading team.',
    results: '40% increase in session duration'
  },
  {
    id: '2',
    author: 'Marcus Thorne',
    role: 'Founder of LUX Fashion',
    initial: 'M',
    project: 'E-Commerce Migration',
    quote: 'The headless migration was seamless. Our mobile conversion rate tripled within two months of launch, and we saw zero drop in our organic search rankings. Their technical SEO expertise is world-class.',
    results: '210% increase in conversions'
  },
  {
    id: '3',
    author: 'Dr. Elena Rossi',
    role: 'Product Lead at MediScan',
    initial: 'E',
    project: 'AI Prototype',
    quote: 'The prototype Aesthetix built helped us secure our Series A funding in record time. They understood the medical workflow immediately and translated complex requirements into an intuitive interface.',
    results: 'Secured $2M Series A funding'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'why-react-websites-need-seo-setup',
    title: 'Why Most React Websites Fail at SEO (and how to fix it)',
    excerpt: 'Many agencies build beautiful React sites that are invisible to Google. Learn the technical architectural shifts required to make SPAs rank like static sites.',
    category: 'SEO',
    date: 'April 20, 2025',
    readTime: '8 min read',
    image: '/images/work/lux-ecommerce.png',
    relatedServiceSlug: 'seo-friendly-websites'
  },
  {
    id: '2',
    slug: 'core-web-vitals-explained',
    title: 'Core Web Vitals Explained: How Website Speed Affects Your Google Ranking',
    excerpt: 'LCP, FID, CLS — understand what Google actually measures and how improving these scores can directly boost your organic search traffic.',
    category: 'Performance',
    date: 'Apr 28, 2025',
    readTime: '6 min read',
    image: '/images/work/fintech-dashboard.png',
    relatedServiceSlug: 'web-development'
  },
  {
    id: '3',
    slug: 'saas-landing-page-best-practices',
    title: 'SaaS Landing Page Best Practices That Actually Drive Conversions',
    excerpt: 'Your landing page is your best salesperson. Here are the UI/UX design patterns that top SaaS companies use to convert visitors into paying customers.',
    category: 'Design',
    date: 'May 05, 2025',
    readTime: '8 min read',
    image: '/images/work/health-ai.png',
    relatedServiceSlug: 'ui-ux-design'
  },
  {
    id: '4',
    slug: 'vite-vs-nextjs-for-seo',
    title: 'Vite vs Next.js for SEO: Which Stack Should You Choose?',
    excerpt: 'A practical comparison of Vite, Next.js, prerendering, and server rendering for businesses that need both speed and search visibility.',
    category: 'Technical SEO',
    date: 'May 12, 2025',
    readTime: '7 min read',
    image: '/images/work/lux-ecommerce.png',
    relatedServiceSlug: 'react-development'
  },
  {
    id: '5',
    slug: 'why-website-speed-impacts-revenue',
    title: 'Why Website Speed Impacts Revenue More Than Most Teams Realize',
    excerpt: 'Slow websites increase acquisition costs, reduce trust, and lower conversion rates. Here is how performance turns into measurable business value.',
    category: 'Business',
    date: 'May 18, 2025',
    readTime: '6 min read',
    image: '/images/work/fintech-dashboard.png',
    relatedServiceSlug: 'web-development'
  },
  {
    id: '6',
    slug: 'ui-ux-mistakes-that-hurt-conversion',
    title: 'UI UX Mistakes That Hurt Conversion on Modern Websites',
    excerpt: 'Common design mistakes that make websites feel polished but fail to convert, from weak hierarchy to unclear calls to action.',
    category: 'Design',
    date: 'May 24, 2025',
    readTime: '8 min read',
    image: '/images/work/health-ai.png',
    relatedServiceSlug: 'ui-ux-design'
  }
];

export const TECH_STACK: TechStack[] = [
  { name: 'React', icon: Layers },
  { name: 'TypeScript', icon: Code },
  { name: 'Next.js', icon: Globe },
  { name: 'Vite', icon: Zap },
  { name: 'Figma', icon: Figma },
  { name: 'Tailwind', icon: Layout }
];

export const getIcon = (name: string) => {
  const icons: Record<string, any> = {
    Layout, Figma, Code, Activity, Search, PenTool, Share2, 
    Monitor, Smartphone, Database, BarChart, Globe, Box, Server, Layers, HardDrive, Zap, Shield, Cpu, Brain
  };
  return icons[name] || Box;
};



