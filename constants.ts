import { Service, Project, BlogPost, ProjectType, BudgetRange } from './types';
import { 
  Layout, Figma, Code, Activity, Search, PenTool, Share2, 
  Monitor, Smartphone, Database, BarChart, Globe, Box, Server, Layers, HardDrive 
} from 'lucide-react';

export const SERVICES: Service[] = [
  {
    id: '1',
    slug: 'website-design',
    title: 'Website Design',
    description: 'High-converting, aesthetic UI/UX design tailored to your brand identity.',
    iconName: 'Layout',
    features: ['User Research', 'Wireframing', 'High-Fidelity Mockups', 'Design Systems']
  },
  {
    id: '2',
    slug: 'prototyping-figma',
    title: 'Prototyping (Figma)',
    description: 'Interactive prototypes to validate ideas before writing a single line of code.',
    iconName: 'Figma',
    features: ['Clickable Prototypes', 'User Testing Setup', 'Interaction Design', 'Developer Handoff']
  },
  {
    id: '3',
    slug: 'web-development',
    title: 'Web Development',
    description: 'Robust, scalable frontend and backend engineering using modern stacks.',
    iconName: 'Code',
    features: ['React & TypeScript', 'Spring Boot / Python', 'CMS Integration', 'API Development']
  },
  {
    id: '4',
    slug: 'maintenance',
    title: 'Maintenance & Support',
    description: 'Keep your digital assets secure, up-to-date, and performing optimally.',
    iconName: 'Activity',
    features: ['Security Updates', 'Performance Monitoring', 'Content Updates', 'Bug Fixes']
  },
  {
    id: '5',
    slug: 'seo-marketing',
    title: 'SEO & Marketing',
    description: 'Technical SEO and content strategies to drive organic traffic.',
    iconName: 'Search',
    features: ['Technical Audit', 'Keyword Strategy', 'On-Page Optimization', 'Analytics']
  },
  {
    id: '6',
    slug: 'content-writing',
    title: 'Content Writing',
    description: 'Compelling copy that speaks your brand voice and converts visitors.',
    iconName: 'PenTool',
    features: ['Blog Posts', 'Landing Page Copy', 'Whitepapers', 'Email Sequences']
  },
  {
    id: '7',
    slug: 'social-management',
    title: 'Social Management',
    description: 'Strategic social media presence to engage your community.',
    iconName: 'Share2',
    features: ['Content Calendar', 'Asset Creation', 'Community Engagement', 'Reporting']
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    slug: 'fintech-dashboard',
    title: 'Nova Fintech Dashboard',
    category: 'Web Application',
    description: 'A real-time financial analytics dashboard for institutional investors.',
    image: 'https://picsum.photos/800/600?random=1',
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
    image: 'https://picsum.photos/800/600?random=2',
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
    image: 'https://picsum.photos/800/600?random=3',
    tags: ['Figma', 'Python', 'Medical'],
    challenge: 'Creating a trustworthy and efficient interface for radiologists who need to process images rapidly.',
    solution: 'Conducted deep user research with doctors to create a high-contrast, keyboard-driven interface prototype validated before development.',
    results: ['Validated core workflow in 2 weeks', 'Secured Series A funding based on prototype', 'Reduced planned dev time by 3 months']
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'future-of-web-design-2025',
    title: 'The Future of Web Design: Trends to Watch in 2025',
    excerpt: 'From AI-generated layouts to spatial computing interfaces, here is what is coming next.',
    category: 'Design',
    date: 'Oct 12, 2024',
    readTime: '5 min read',
    image: 'https://picsum.photos/600/400?random=4'
  },
  {
    id: '2',
    slug: 'why-react-is-still-king',
    title: 'Why React Reigns Supreme for Enterprise Apps',
    excerpt: 'Analyzing the ecosystem, performance, and talent pool benefits of the React stack.',
    category: 'Engineering',
    date: 'Nov 03, 2024',
    readTime: '8 min read',
    image: 'https://picsum.photos/600/400?random=5'
  },
  {
    id: '3',
    slug: 'seo-mistakes-to-avoid',
    title: '5 Critical SEO Mistakes Startups Make',
    excerpt: 'Don\'t let technical debt kill your organic growth. Fix these common issues.',
    category: 'Marketing',
    date: 'Nov 15, 2024',
    readTime: '4 min read',
    image: 'https://picsum.photos/600/400?random=6'
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