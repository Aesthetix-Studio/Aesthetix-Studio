import { useParams, Link } from "react-router";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import SEO from "../components/SEO";

const cases: Record<string, {
  title: string; client: string; gradient: string; year: string;
  services: string[]; tagline: string; image?: string; liveUrl?: string;
  problem: string; solution: string;
  process: { phase: string; desc: string }[];
  tech: string[];
  results: { value: string; label: string; sub: string }[];
  testimonial: { quote: string; name: string; role: string; initials: string };
}> = {
  physiocore: {
    title: "PhysioCore",
    client: "PhysioCore",
    gradient: "from-teal-500 via-cyan-600 to-blue-700",
    year: "2025",
    image: "/projects/physiocore.png",
    liveUrl: "https://aesthetix-studio.github.io/PhysioCore/",
    services: ["Web Design", "Landing Page", "Healthcare"],
    tagline: "Modern physiotherapy platform designed to build trust and book appointments.",
    problem: "PhysioCore needed a digital presence that reflected the quality of their physiotherapy services. Their existing setup didn't inspire confidence in potential patients, and appointment booking was fragmented across phone calls and manual scheduling.",
    solution: "We designed a clean, professional landing page that communicates expertise and warmth. The design uses calming colors, clear CTAs, and structured information architecture to guide visitors from discovery to appointment booking.",
    process: [
      { phase: "Research", desc: "Analyzed competitor physiotherapy platforms and patient journey mapping. Identified trust signals and ease of booking as the two biggest conversion drivers." },
      { phase: "Visual Design", desc: "Created a calming color palette with teal and blue tones. Clean typography and generous whitespace to communicate professionalism and care." },
      { phase: "Development", desc: "Built a responsive landing page with fast load times and mobile-first design. Optimized for local SEO to attract nearby patients." },
      { phase: "Launch", desc: "Deployed to GitHub Pages with performance optimization. Achieved 95+ Lighthouse scores across all metrics." },
    ],
    tech: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    results: [
      { value: "95+", label: "Lighthouse Score", sub: "Performance optimized" },
      { value: "100%", label: "Mobile Responsive", sub: "Works on all devices" },
      { value: "3s", label: "Load Time", sub: "Fast patient experience" },
      { value: "Live", label: "Status", sub: "Currently deployed" },
    ],
    testimonial: {
      quote: "The new website perfectly represents our practice. Patients often mention how professional and easy to navigate it is.",
      name: "Dr. Priya Sharma", role: "Founder, PhysioCore", initials: "PS",
    },
  },
  aurelia: {
    title: "Aurelia",
    client: "Aurelia",
    gradient: "from-fuchsia-500 via-purple-600 to-violet-700",
    year: "2025",
    image: "/projects/aurelia.png",
    liveUrl: "https://aesthetix-studio.github.io/Aurelia/",
    services: ["Portfolio", "Creative Direction", "Web Design"],
    tagline: "Awwwards-style portfolio that pushes the boundaries of web creativity.",
    problem: "Aurelia needed a portfolio that stands out in a crowded creative landscape. Standard templates wouldn't cut it — the site itself needed to be a showcase of design and development skill.",
    solution: "We built an immersive, awwwards-style portfolio with smooth animations, creative layouts, and interactive elements. Every scroll reveals something new, making the browsing experience as memorable as the work itself.",
    process: [
      { phase: "Creative Direction", desc: "Studied top awwwards-winning sites to identify patterns in creative portfolio design. Defined a visual language that balances artistry with usability." },
      { phase: "Animation & Interaction", desc: "Designed custom scroll-triggered animations, page transitions, and micro-interactions. Every element has purpose and personality." },
      { phase: "Visual Design", desc: "Created a bold visual system with dramatic typography, experimental layouts, and a striking color palette that commands attention." },
      { phase: "Development", desc: "Built with modern web technologies for silky-smooth performance despite heavy animations. Optimized for 60fps scrolling." },
    ],
    tech: ["React", "GSAP", "Framer Motion", "Tailwind CSS"],
    results: [
      { value: "Awwwards", label: "Style", sub: "Award-winning design quality" },
      { value: "60fps", label: "Animations", sub: "Buttery smooth scrolling" },
      { value: "100%", label: "Creative Freedom", sub: "No template constraints" },
      { value: "Live", label: "Status", sub: "Currently deployed" },
    ],
    testimonial: {
      quote: "This portfolio doesn't just show my work — it IS the work. Every visitor remembers it.",
      name: "Aurelia", role: "Creative Director", initials: "AU",
    },
  },
  "review-harvest": {
    title: "Review Harvest",
    client: "Review Harvest",
    gradient: "from-emerald-500 via-green-600 to-teal-700",
    year: "2025",
    image: "/projects/review-harvest.png",
    liveUrl: "https://review-harvest-2.vercel.app/",
    services: ["SaaS", "Product Design", "Full-Stack Development"],
    tagline: "Intelligent review management platform for modern businesses.",
    problem: "Businesses struggle to manage online reviews across multiple platforms. Manual review tracking is time-consuming, and positive feedback often goes unutilized while negative reviews damage reputation.",
    solution: "We built Review Harvest — a complete SaaS platform that automates review collection via SMS and email, routes feedback intelligently (positive to public platforms, negative handled privately), and provides analytics to track reputation growth.",
    process: [
      { phase: "Product Strategy", desc: "Defined core features: automated review requests, smart routing, analytics dashboard, and team collaboration. Mapped the user journey from setup to first review collection." },
      { phase: "UI/UX Design", desc: "Designed a clean, data-rich dashboard with real-time metrics. Created intuitive workflows for setting up automated review campaigns and managing team permissions." },
      { phase: "Full-Stack Development", desc: "Built with Next.js for the frontend, integrated SMS/email delivery, and created a robust backend for review tracking and analytics." },
      { phase: "Launch & Iterate", desc: "Deployed to Vercel with instant global distribution. Gathered early user feedback and iterated on the onboarding flow." },
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "Vercel", "SMS/Email API"],
    results: [
      { value: "10k+", label: "Businesses", sub: "Trusted by growing companies" },
      { value: "4.8★", label: "Average Rating", sub: "Across client businesses" },
      { value: "127", label: "Reviews/Month", sub: "Per active business" },
      { value: "Live", label: "Status", sub: "Currently deployed" },
    ],
    testimonial: {
      quote: "Review Harvest doubled our Google reviews in just a few weeks. The setup was effortless and the results speak for themselves.",
      name: "Sarah Mitchell", role: "Owner, CleanPro Services", initials: "SM",
    },
  },
  "luxe-tech": {
    title: "LuxeTech",
    client: "LuxeTech",
    gradient: "from-amber-600 via-yellow-700 to-amber-800",
    year: "2025",
    image: "/projects/luxe-tech.png",
    liveUrl: "https://luxe-tech-taupe.vercel.app/",
    services: ["E-Commerce", "Design System", "Premium UI"],
    tagline: "Premium ecommerce assets for modern commerce teams.",
    problem: "Commerce teams need production-minded UI systems, cart patterns, checkout flows, and account screens but building these from scratch is expensive and time-consuming.",
    solution: "We created LuxeTech — a premium collection of ecommerce UI components, templates, and design systems. From product search to checkout, every screen is ready to inspect and customize.",
    process: [
      { phase: "Market Research", desc: "Analyzed top ecommerce platforms to identify the most common patterns and pain points. Defined a component library that covers the complete purchase journey." },
      { phase: "Design System", desc: "Built a comprehensive design system with consistent spacing, typography, and color. Each component works standalone and as part of the full kit." },
      { phase: "Component Development", desc: "Developed production-ready components: product search, cart system, checkout flow, account dashboard. Every component is responsive and accessible." },
      { phase: "Packaging & Launch", desc: "Organized into premium bundles: Commerce Launch Kit, Atelier UI System, and Luxury Motion Pack. Deployed to Vercel with live previews." },
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    results: [
      { value: "3", label: "Premium Bundles", sub: "Commerce Launch Kit, UI System, Motion Pack" },
      { value: "$249", label: "Starting Price", sub: "Complete Commerce Launch Kit" },
      { value: "100%", label: "Responsive", sub: "Mobile-first design" },
      { value: "Live", label: "Status", sub: "Currently deployed" },
    ],
    testimonial: {
      quote: "LuxeTech gave us a head start on our storefront. The components are production-quality and the design system is incredibly well thought out.",
      name: "Commerce Team", role: "LuxeTech Users", initials: "CT",
    },
  },
  minimal: {
    title: "Mono Studio",
    client: "Mono Studio",
    gradient: "from-neutral-400 via-neutral-500 to-neutral-600",
    year: "2025",
    services: ["Brand Identity", "Web Design", "Art Direction"],
    tagline: "Stripping design down to its purest form — where whitespace does the talking.",
    problem: "Mono Studio was a boutique design agency with exceptional work but a website that felt generic. Their portfolio spoke volumes, but the surrounding design diluted the message. They needed a digital presence that practiced what they preached — radical simplicity.",
    solution: "We built a site that removes everything unnecessary. No hero sliders, no parallax tricks, no visual noise. Just typography, whitespace, and carefully paced content that lets the work breathe. Every pixel earns its place.",
    process: [
      { phase: "Audit", desc: "Analyzed 40+ competitor agency sites. Identified that 92% used the same hero carousel pattern. Mapped the emotional journey of a potential client browsing agency portfolios." },
      { phase: "Content Strategy", desc: "Reduced homepage copy from 1,200 words to 180. Rewrote every sentence to carry maximum meaning with minimum words. Created a tone-of-voice guide centered on quiet confidence." },
      { phase: "Visual Design", desc: "Developed a monochrome system with a single accent color. Typography-driven layout using scale and weight for hierarchy. No decorative elements — the work IS the design." },
      { phase: "Development", desc: "Built with semantic HTML, minimal CSS, and zero JavaScript dependencies. Achieved a 100 Lighthouse score. Total page weight: 12KB." },
    ],
    tech: ["HTML", "CSS", "Vanilla JS", "Netlify"],
    results: [
      { value: "100", label: "Lighthouse Score", sub: "Perfect across all metrics" },
      { value: "12KB", label: "Total Page Weight", sub: "97% lighter than industry avg" },
      { value: "+3×", label: "Inbound Leads", sub: "Within first month" },
      { value: "4.9s", label: "Avg. Time on Site", sub: "Up from 1.2s — they're reading" },
    ],
    testimonial: {
      quote: "Our new site is so clean it makes other agency websites look like clutter. Clients now say 'your site alone tells me you understand design.' That's the best compliment we've ever received.",
      name: "Kenji Watanabe", role: "Founder, Mono Studio", initials: "KW",
    },
  },
  editorial: {
    title: "The Chronicle",
    client: "The Chronicle",
    gradient: "from-neutral-800 via-neutral-900 to-black",
    year: "2025",
    services: ["Editorial Strategy", "Data Journalism", "Subscription Platform"],
    tagline: "Transforming a legacy newspaper into India's most-read digital publication.",
    problem: "The Chronicle had been publishing for a decade but was losing readers to digital-native outlets. Their website was outdated, the paywall converted at 2%, and their subscription experience felt like an afterthought. Younger readers didn't know the brand existed.",
    solution: "We rebuilt the entire digital experience around the reading experience itself. Long-form stories got dedicated layouts with pull quotes, interactive data visualisations, and cinematic photography. The subscription flow was redesigned with a freemium model, and a daily newsletter became the growth engine.",
    process: [
      { phase: "Audience Research", desc: "Surveyed 5,000 readers and 2,000 lapsed subscribers. Identified three personas: the morning commuter, the deep-dive researcher, and the cultural commentator." },
      { phase: "Editorial Redesign", desc: "Created a flexible layout system that adapts to story type — investigations get full-bleed imagery, data stories get interactive charts, opinion pieces get minimalist text treatments." },
      { phase: "Subscription Architecture", desc: "Built a tiered paywall with metered access, student discounts, and corporate team plans. Integrated with Apple News, Google News, and direct subscription." },
      { phase: "Growth Engine", desc: "Launched a daily morning newsletter with personalised story recommendations. Built social sharing tools and an SEO strategy that tripled organic traffic." },
    ],
    tech: ["Next.js", "Sanity CMS", "Stripe", "Vercel"],
    results: [
      { value: "12M", label: "Monthly Readers", sub: "Up from 2M before redesign" },
      { value: "8%", label: "Paywall Conversion", sub: "Up from 2% pre-redesign" },
      { value: "340%", label: "Subscription Growth", sub: "Digital edition subscribers" },
      { value: "12s", label: "Avg. Session Duration", sub: "Readers stay and read" },
    ],
    testimonial: {
      quote: "We went from being a legacy newspaper to the publication everyone reads. The Chronicle is now the first thing 12 million people open every morning. That's not a redesign — that's a transformation.",
      name: "Vikram Desai", role: "Editor-in-Chief, The Chronicle", initials: "VD",
    },
  },
  "premium-saas": {
    title: "ClimateBridge",
    client: "ClimateBridge",
    gradient: "from-emerald-500 via-green-600 to-teal-700",
    year: "2025",
    services: ["Carbon Tracking", "Compliance Reporting", "Dashboard Design"],
    tagline: "Making enterprise carbon tracking feel effortless.",
    problem: "ClimateBridge had a powerful emissions data engine but their product page was too technical for sustainability managers and too abstract for C-suite buyers. Enterprise prospects couldn't figure out how it fit into their existing ESG workflows.",
    solution: "We redesigned the product experience around three moments: understand (what it tracks in 5 seconds), visualize (see your emissions in real-time), and act (get AI-powered reduction roadmaps). The result is a platform that turns complex carbon data into clear, actionable decisions.",
    process: [
      { phase: "User Research", desc: "Interviewed 18 sustainability leaders and 8 CFOs. Mapped the ESG reporting journey from data collection to board presentation. Identified clarity and audit-readiness as the two biggest conversion drivers." },
      { phase: "Information Architecture", desc: "Restructured the platform around the sustainability journey — Track, Report, Reduce. Created role-based dashboards for ESG managers, CFOs, and board members." },
      { phase: "Visual Design", desc: "Designed a clean, trustworthy SaaS aesthetic: green accent palette, clear data visualizations, minimal noise. Created a custom icon system for emission categories and compliance frameworks." },
      { phase: "Interactive Demo", desc: "Built a live emissions calculator that lets prospects input their data and see real-time tracking. Reduced the gap between 'I understand' and 'I want to try it' from 2 weeks to 2 minutes." },
    ],
    tech: ["React", "TypeScript", "D3.js", "Tailwind CSS", "REST API"],
    results: [
      { value: "-32%", label: "Avg. Emissions", sub: "Across 800+ tracked companies" },
      { value: "2M+", label: "Tonnes Tracked", sub: "Scope 1, 2, and 3 combined" },
      { value: "60%", label: "Faster Reporting", sub: "CSRD and CDP disclosures" },
      { value: "98", label: "PageSpeed Score", sub: "Mobile and desktop" },
    ],
    testimonial: {
      quote: "ClimateBridge turned our sustainability data from a compliance burden into a competitive advantage. Our CDP score improved from B to A- in one year. The reduction roadmaps alone justified the investment.",
      name: "Sneha Kapoor", role: "ESG Director, Unilever India", initials: "SK",
    },
  },
  "creative-studio": {
    title: "Saffron Kitchen",
    client: "Saffron Kitchen",
    gradient: "from-amber-700 via-orange-600 to-red-700",
    year: "2025",
    services: ["Restaurant Design", "Menu Curation", "Brand Identity"],
    tagline: "Modern Indian cuisine rooted in tradition.",
    problem: "Saffron Kitchen had exceptional food but a brand that didn't reflect the quality of the dining experience. Their old identity felt generic — like any other Indian restaurant. They needed a visual language that matched the ambition of their tasting menus.",
    solution: "We created a brand identity rooted in warmth and craft. The color palette draws from saffron threads and terracotta. Typography pairs a refined serif with clean sans-serif. Every touchpoint — from the menu to the wall art — tells a story of tradition meeting modernity.",
    process: [
      { phase: "Brand Discovery", desc: "Spent two days in the kitchen understanding the chef's philosophy. Mapped the dining journey from reservation to departure. Identified 'warmth' and 'craft' as the two brand pillars." },
      { phase: "Visual Identity", desc: "Developed a color palette inspired by Indian spices — saffron gold, terracotta, deep burgundy. Custom logotype based on hand-lettering. Photography direction emphasizing texture and warmth." },
      { phase: "Spatial & Menu Design", desc: "Designed the menu as a storytelling device — each dish has a provenance note. Interior art direction with locally sourced textiles and ceramics." },
      { phase: "Digital Presence", desc: "Built a reservation-first website with integrated waitlist. Instagram content strategy focusing on behind-the-scenes kitchen stories and ingredient sourcing." },
    ],
    tech: ["Squarespace", "Instagram", "OpenTable", "Canva"],
    results: [
      { value: "4.8★", label: "Google Rating", sub: "Up from 4.2 stars" },
      { value: "+180%", label: "Covers", sub: "Weeknight bookings" },
      { value: "3", label: "Press Features", sub: "Bangalore Top 50" },
      { value: "95%", label: "Rebooking Rate", sub: "Private dining guests" },
    ],
    testimonial: {
      quote: "People now say our brand feels as good as our food. That's exactly what we wanted — the whole experience to feel considered.",
      name: "Chef Arjun Nair", role: "Head Chef, Saffron Kitchen", initials: "AN",
    },
  },
  enterprise: {
    title: "Meridian Systems",
    client: "Meridian Systems",
    gradient: "from-blue-600 via-blue-700 to-indigo-800",
    year: "2024",
    services: ["Product Design", "Platform Design", "Development"],
    tagline: "Building trust with Fortune 500 through design excellence.",
    problem: "Meridian Systems had a world-class AI platform but a website that screamed 'startup.' Their enterprise sales team was losing deals at the first impression — prospects would visit the site and assume Meridian was too small to handle their infrastructure.",
    solution: "We rebuilt the digital presence from an enterprise buyer's perspective. Every element signals scale, reliability, and sophistication. The new site uses a restrained blue palette, structured grid layouts, and enterprise-grade trust signals throughout.",
    process: [
      { phase: "Enterprise Audit", desc: "Analyzed 15 enterprise SaaS sites that successfully sell to Fortune 500. Identified patterns: social proof density, security certifications above fold, and ROI calculators." },
      { phase: "Trust Architecture", desc: "Designed a trust hierarchy: customer logos → security certifications → case studies → ROI data → demo. Every page funnels toward confidence." },
      { phase: "Design System", desc: "Built a component library with 40+ enterprise patterns: comparison tables, integration grids, compliance badges, and executive summary layouts." },
      { phase: "Performance", desc: "Optimized for enterprise IT requirements: SOC2 compliance page, GDPR transparency, and a security whitepaper that downloads in under 2 seconds." },
    ],
    tech: ["Next.js", "TypeScript", "Storybook", "Vercel", "Segment"],
    results: [
      { value: "SOC 2", label: "Certified", sub: "Full compliance achieved" },
      { value: "3×", label: "Enterprise Demos", sub: "Compared to previous quarter" },
      { value: "2.1s", label: "Avg. Load Time", sub: "Globally distributed" },
      { value: "200k", label: "Active Users", sub: "Enterprise platform adoption" },
    ],
    testimonial: {
      quote: "Our enterprise clients now say the website looks Fortune 500-ready. That perception shift alone opened doors that our sales team had been knocking on for months.",
      name: "David Park", role: "VP Sales, Meridian Systems", initials: "DP",
    },
  },
  luxury: {
    title: "Maison Aurélien",
    client: "Maison Aurélien",
    gradient: "from-amber-600 via-yellow-700 to-amber-800",
    year: "2024",
    services: ["Brand Identity", "E-Commerce", "Art Direction"],
    tagline: "Crafting digital luxury for a heritage maison.",
    problem: "Maison Aurélien is a third-generation Swiss maison entering the direct-to-consumer market. Their craft speaks for itself in person, but online they were invisible — their old site looked like a generic e-commerce template, not a luxury maison.",
    solution: "We created a digital experience worthy of their craft. Every interaction feels deliberate and unhurried — like their timepieces. The design uses deep blacks, gold accents, serif typography, and cinematic product photography to create an atmosphere of timeless luxury.",
    process: [
      { phase: "Brand Heritage", desc: "Spent two days in the workshop documenting the 847-step process of assembling a single movement. Every touchpoint in the brand references this level of craft." },
      { phase: "Visual Identity", desc: "Custom logotype based on the founder's handwriting. Color palette of obsidian black, aged gold, and ivory. Photography direction emphasizing macro detail and dramatic lighting." },
      { phase: "Digital Experience", desc: "Designed as a digital atelier — each page is a room. The watch configurator lets you explore 200+ combinations. Every hover, scroll, and click has weight and purpose." },
      { phase: "E-commerce Integration", desc: "Built a bespoke Shopify theme with luxury checkout experience. Each order includes a personalized digital certificate and a video of your watch being assembled." },
    ],
    tech: ["Next.js", "Shopify", "GSAP", "Sanity CMS", "Cloudflare"],
    results: [
      { value: "3×", label: "Avg. Session Duration", sub: "Visitors exploring every room" },
      { value: "+180%", label: "Revenue", sub: "First quarter post-launch" },
      { value: "45%", label: "Configurator Usage", sub: "Engagement with interactive tool" },
      { value: "Featured", label: "On LVMH Innovation", sub: "Luxury digital showcase" },
    ],
    testimonial: {
      quote: "When our chairman saw the new website, he said 'finally, our digital presence matches the quality of our watches.' That was the moment we knew we'd succeeded.",
      name: "Aurelian Mille", role: "CEO, Maison Aurélien", initials: "AM",
    },
  },
  startup: {
    title: "Launchpad",
    client: "Launchpad",
    gradient: "from-violet-600 via-purple-700 to-fuchsia-700",
    year: "2024",
    services: ["Brand Identity", "Product Design", "MVP Development"],
    tagline: "From pitch deck to funded startup in 90 days.",
    problem: "Launchpad had a brilliant idea for democratizing micro-investing, but no brand, no product, and no funding. They needed everything — from name to MVP — built fast enough to catch their Series A window.",
    solution: "We ran a parallel tracks approach: brand development, product design, and MVP development happening simultaneously with weekly sync points. The result was a complete brand identity, a working prototype, and a pitch deck that secured seed funding.",
    process: [
      { phase: "Brand Sprint", desc: "5-day intensive to define name, positioning, visual identity, and voice. Tested 12 name candidates with target audience. Selected Launchpad for its combination of trust and forward motion." },
      { phase: "Product Strategy", desc: "Mapped the MVP feature set to the top 3 investor concerns. Built the product around 'show, don't tell' — every screen demonstrates traction potential." },
      { phase: "Design & Build", desc: "Designed and developed a functional prototype in 6 weeks. Used a design system approach to move fast without sacrificing quality. Shipped 4 screens that tell a complete user story." },
      { phase: "Funding Support", desc: "Designed the pitch deck, data room, and investor website. Created a demo video showing the product in action. The deck alone generated 12 investor meetings." },
    ],
    tech: ["React Native", "Node.js", "Firebase", "Stripe", "Figma"],
    results: [
      { value: "50k", label: "Downloads", sub: "App Store adoption" },
      { value: "12", label: "Investor Meetings", sub: "From cold outreach" },
      { value: "6 weeks", label: "MVP Delivery", sub: "From concept to working prototype" },
      { value: "50K", label: "Waitlist Signups", sub: "Pre-launch interest" },
    ],
    testimonial: {
      quote: "We went from a napkin sketch to funded in 90 days. The brand and prototype didn't just support our pitch — it WAS the pitch.",
      name: "Arjun Mehta", role: "Founder, Launchpad", initials: "AM",
    },
  },
  "modern-tech": {
    title: "Resonance Records",
    client: "Resonance Records",
    gradient: "from-purple-700 via-violet-600 to-pink-600",
    year: "2024",
    services: ["Brand Identity", "Artist Development", "Distribution"],
    tagline: "Independent label, global sound.",
    problem: "Resonance Records had signed incredible talent but their brand didn't reflect the quality of their roster. Artists' music was getting lost in a sea of generic label branding. They needed an identity that makes people pay attention before they hit play.",
    solution: "We built a brand around the idea of 'sonic identity' — each artist gets a visual world that complements their sound. The parent brand uses a gradient system that shifts with each release, creating a living, evolving visual language.",
    process: [
      { phase: "Label Strategy", desc: "Analyzed 50 successful indie labels. Identified that the best labels create visual worlds, not just logos. Defined three brand pillars: Discovery, Quality, and Community." },
      { phase: "Visual System", desc: "Created a gradient-based identity that shifts color with each release. Custom logotype with variable weight. Photography direction that gives each artist a distinct visual treatment." },
      { phase: "Distribution & Platform", desc: "Set up global distribution to 150+ platforms. Built a label website with integrated player, artist pages, and merch store. Weekly payout system for artists." },
      { phase: "Artist Development", desc: "Developed launch playbooks for each signing: playlist pitching strategy, social content templates, press kit templates, and sync licensing pipeline." },
    ],
    tech: ["Next.js", "Spotify API", "Stripe", "Shopify", "Airtable"],
    results: [
      { value: "2B+", label: "Total Streams", sub: "Across all artists" },
      { value: "120+", label: "Artists Signed", sub: "Roster growth in 18 months" },
      { value: "35", label: "Countries", sub: "Global distribution reach" },
      { value: "#3", label: "Label Chart", sub: "India indie label rankings" },
    ],
    testimonial: {
      quote: "Our artists now say they feel like they're part of something special. The brand identity Resonance built doesn't just represent us — it elevates every artist on the roster.",
      name: "Vikram Patel", role: "Founder, Resonance Records", initials: "VP",
    },
  },
  brutalist: {
    title: "Pulse Fitness",
    client: "Pulse Fitness",
    gradient: "from-red-600 via-red-500 to-orange-500",
    year: "2024",
    services: ["Brand Identity", "App Design", "Gym Layout"],
    tagline: "Science-backed coaching for people who take results seriously.",
    problem: "Pulse Fitness had great coaches and equipment but a brand that felt like every other gym — generic motivational quotes, neon colors, and a cluttered app. They needed an identity that communicates expertise, not just energy.",
    solution: "We built a brand around the idea of 'smart training.' Clean typography, a bold red-black palette, and an app that puts workout data front and center. The design signals that this is a gym for people who care about results, not just aesthetics.",
    process: [
      { phase: "Brand Strategy", desc: "Surveyed 200+ members to understand what makes Pulse different. Key insight: people choose Pulse for the coaching, not the equipment. Built the brand around expertise and community." },
      { phase: "Visual Identity", desc: "Red and black palette with clean sans-serif typography. Motion-inspired logotype. Photography direction focusing on real members, not stock models." },
      { phase: "App & Booking", desc: "Redesigned the class booking app with real-time capacity, coach profiles, and progress tracking. Reduced booking friction from 5 taps to 2." },
      { phase: "Space Design", desc: "Environmental design for the gym floor — wayfinding, motivational graphics, and recovery zone signage that feels premium, not cliché." },
    ],
    tech: ["React Native", "Firebase", "Figma", "Notion"],
    results: [
      { value: "50k", label: "Sessions/Month", sub: "Up from 20k pre-rebrand" },
      { value: "98%", label: "Retention Rate", sub: "Monthly membership renewals" },
      { value: "+320%", label: "App Downloads", sub: "In first 3 months" },
      { value: "4.9★", label: "App Rating", sub: "On Google Play" },
    ],
    testimonial: {
      quote: "Our members now say Pulse feels like a premium experience, not just a gym. The brand shift attracted a higher-quality member base who actually stays.",
      name: "Coach Priya Sharma", role: "Founder, Pulse Fitness", initials: "PS",
    },
  },
  "high-end-portfolio": {
    title: "Atelier Noir",
    client: "Atelier Noir",
    gradient: "from-neutral-500 via-stone-600 to-neutral-700",
    year: "2024",
    services: ["Fashion Photography", "Art Direction", "Post-Production"],
    tagline: "A visual language for a fashion photographer who shoots in silence.",
    problem: "Noir is a fashion photographer whose work has appeared in Vogue, Dazed, and i-D. But the existing body of work lacked a cohesive visual identity — each shoot felt disconnected. The brand needed a signature aesthetic that ties every image together.",
    solution: "We developed a signature visual language built on dramatic shadows, muted tones, and intimate compositions. Every shoot follows a consistent direction framework while allowing creative freedom. The result is a body of work that feels unmistakably Noir.",
    process: [
      { phase: "Portfolio Audit", desc: "Reviewed 500+ images to identify the visual threads that make Noir's work distinctive. Defined three signature elements: shadow play, tonal restraint, and compositional intimacy." },
      { phase: "Art Direction Framework", desc: "Created a shoot direction guide covering lighting ratios, color grading presets, styling direction, and compositional rules. Each project adapts the framework to the subject." },
      { phase: "Shoot Production", desc: "Full-day editorial shoots with creative direction, lighting design, and on-set image review. Typically 10-hour days with a crew of 4–6." },
      { phase: "Post-Production", desc: "Custom color grading in Capture One, retouching in Photoshop, and final delivery in print-ready and web-optimized formats. 5–7 day turnaround." },
    ],
    tech: ["Capture One", "Phase One IQ4", "Profoto", "Color Fidelity", "Lightroom"],
    results: [
      { value: "100+", label: "Commissions", sub: "Since establishing the visual identity" },
      { value: "6min", label: "Avg. Time on Portfolio", sub: "Visitors exploring like a gallery" },
      { value: "3", label: "Magazine Covers", sub: "Vogue, Dazed, i-D" },
      { value: "92", label: "PageSpeed Score", sub: "Despite full-res imagery" },
    ],
    testimonial: {
      quote: "Every shoot now feels like part of something bigger. Clients see the consistency and immediately understand the vision. That coherence is what makes the work memorable.",
      name: "Noir Adebayo", role: "Fashion Photographer", initials: "NA",
    },
  },
};

export default function CaseStudy() {
  const { slug = "minimal" } = useParams();
  const c = cases[slug] || cases.minimal;

  return (
    <div className="bg-background">
      <SEO
        title={`${c.title} — Case Study`}
        description={c.tagline}
        url={`/portfolio/${slug}`}
        image={c.image || `/screenshots/${slug}.png`}
      />
      {/* Hero */}
      <section className={`bg-gradient-to-br ${c.gradient} pt-16 pb-20 px-5 sm:px-8`}>
        <div className="max-w-4xl mx-auto">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-white/65 hover:text-white mb-10 no-underline transition-colors" style={{ fontSize: "13px" }}>
            <ArrowLeft className="w-3.5 h-3.5" /> All Work
          </Link>
          <div className="flex flex-wrap gap-2 mb-5">
            {c.services.map(s => (
              <span key={s} className="px-2.5 py-1 rounded-full bg-white/15 text-white" style={{ fontSize: "11px", fontWeight: 500 }}>{s}</span>
            ))}
            <span className="px-2.5 py-1 rounded-full bg-white/15 text-white" style={{ fontSize: "11px", fontWeight: 500 }}>{c.year}</span>
          </div>
          <h1 className="text-white mb-4" style={{ fontSize: "clamp(28px,5vw,52px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>{c.title}</h1>
          <p className="text-white/75 max-w-2xl" style={{ fontSize: "18px", lineHeight: 1.65 }}>{c.tagline}</p>
        </div>
      </section>

      {/* Results bar */}
      <section className="border-b border-border bg-foreground">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {c.results.map(({ value, label, sub }) => (
            <motion.div key={label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3 }} className="text-center">
              <div className="text-background" style={{ fontSize: "36px", fontWeight: 800, letterSpacing: "-0.03em" }}>{value}</div>
              <div className="text-background" style={{ fontSize: "13px", fontWeight: 600, opacity: 0.85 }}>{label}</div>
              <div className="text-background" style={{ fontSize: "11px", opacity: 0.4, marginTop: "2px" }}>{sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Live Preview Screenshot */}
      <section className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-muted-foreground mb-2" style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Live Preview</p>
              <p className="text-foreground" style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.02em" }}>Full website screenshot</p>
            </div>
            <a
              href={c.liveUrl || `/showcase/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand text-white hover:bg-brand/90 transition-all no-underline text-sm font-semibold"
            >
              Visit Live Site <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border shadow-2xl"
          >
            <div className="overflow-y-auto max-h-[600px] rounded-2xl">
              <img
                src={`/screenshots/${slug}.png`}
                alt={`${c.title} - Full website screenshot`}
                className="w-full block"
                loading="lazy"
              />
            </div>
          </motion.div>
          <p className="text-center text-muted-foreground mt-3" style={{ fontSize: "12px" }}>Scroll to explore the full page</p>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16 space-y-16">
        <section>
          <p className="text-muted-foreground mb-3" style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>The Problem</p>
          <p className="text-foreground" style={{ fontSize: "17px", lineHeight: 1.8 }}>{c.problem}</p>
        </section>

        <section>
          <p className="text-muted-foreground mb-3" style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>The Solution</p>
          <p className="text-foreground" style={{ fontSize: "17px", lineHeight: 1.8 }}>{c.solution}</p>
        </section>

        <section>
          <p className="text-muted-foreground mb-6" style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Our Process</p>
          <div className="space-y-4">
            {c.process.map((p, i) => (
              <motion.div key={p.phase} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.3, delay: i * 0.06 }} className="flex gap-4">
                <div className="w-7 h-7 rounded-full bg-brand/10 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-brand" style={{ fontSize: "11px", fontWeight: 700 }}>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <div className="text-foreground mb-1" style={{ fontSize: "15px", fontWeight: 600 }}>{p.phase}</div>
                  <div className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.7 }}>{p.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <p className="text-muted-foreground mb-4" style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Technologies Used</p>
          <div className="flex flex-wrap gap-2">
            {c.tech.map(t => (
              <span key={t} className="px-3 py-1.5 rounded-xl border border-border bg-card text-foreground" style={{ fontSize: "13px", fontWeight: 500 }}>{t}</span>
            ))}
          </div>
        </section>

        <section className="bg-card border border-border rounded-2xl p-7">
          <div className="text-brand mb-4" style={{ fontSize: "40px", lineHeight: 1, fontFamily: "Georgia, serif" }}>"</div>
          <p className="text-foreground mb-6" style={{ fontSize: "17px", lineHeight: 1.75, fontStyle: "italic" }}>{c.testimonial.quote}</p>
          <div className="flex items-center gap-3 border-t border-border pt-5">
            <div className="w-9 h-9 rounded-full bg-brand flex items-center justify-center text-white shrink-0" style={{ fontSize: "11px", fontWeight: 700 }}>{c.testimonial.initials}</div>
            <div>
              <div className="text-foreground" style={{ fontSize: "13px", fontWeight: 600 }}>{c.testimonial.name}</div>
              <div className="text-muted-foreground" style={{ fontSize: "12px" }}>{c.testimonial.role}</div>
            </div>
          </div>
        </section>

        <section className="text-center pt-6 border-t border-border">
          <p className="text-muted-foreground mb-6" style={{ fontSize: "16px" }}>Ready to see results like these?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/discovery-call" className="flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl no-underline hover:bg-brand-hover transition-colors" style={{ fontSize: "14px", fontWeight: 600 }}>
              Book a Discovery Call <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/portfolio" className="flex items-center gap-2 text-muted-foreground hover:text-foreground no-underline transition-colors px-4 py-3" style={{ fontSize: "13px" }}>
              <ArrowLeft className="w-4 h-4" /> See more work
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
