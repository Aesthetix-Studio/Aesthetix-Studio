import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Code, Award, Globe, CheckCircle, ArrowRight } from 'lucide-react';
import { Button, SectionHeader } from '../components/UI';
import SEO from '../components/SEO';

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Strategy',
    description: 'We start every engagement with a deep-dive into your business goals, target audience, and competitive landscape. No guesswork — only data-driven strategy.',
  },
  {
    step: '02',
    title: 'UI/UX Design',
    description: 'Our designers build high-fidelity wireframes and prototypes in Figma. You see and approve the exact experience before a single line of code is written.',
  },
  {
    step: '03',
    title: 'Engineering & Development',
    description: 'We build using React, TypeScript, and modern backend stacks. Every feature is code-reviewed, tested, and documented to production standards.',
  },
  {
    step: '04',
    title: 'SEO & Performance Tuning',
    description: 'Before launch, we run full Lighthouse audits, optimize Core Web Vitals, implement structured schema, and verify all on-page SEO fundamentals.',
  },
  {
    step: '05',
    title: 'Launch & Ongoing Support',
    description: 'We deploy to reliable cloud infrastructure and stay on to monitor performance, fix bugs, and keep your site secure and up-to-date.',
  },
];

const EXPERTISE = [
  'React & Next.js Development',
  'UI/UX Design (Figma)',
  'SEO-First Architecture',
  'Spring Boot & Python APIs',
  'SaaS Product Engineering',
  'Core Web Vitals Optimization',
  'Custom CMS Integration',
  'Cloud Deployment (Vercel, AWS)',
];

const About = () => {
  return (
    <div>
      <SEO
        title="About Aesthetix Studio | Web Design & Development Agency India"
        description="Aesthetix Studio is a design-first web development agency based in India, helping startups and businesses build high-performance, SEO-friendly websites using React and modern web technologies."
      />

      {/* Hero */}
      <section className="pt-24 pb-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold uppercase tracking-wide mb-6">
            Web Design & Development Agency · India
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            We Build Digital Products <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-indigo-600">
              That Actually Work
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Aesthetix Studio is a web design and development agency based in India, helping startups and established businesses across the globe build high-performance, SEO-friendly digital experiences.
          </p>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '3+', label: 'Years Experience' },
              { value: '30+', label: 'Projects Delivered' },
              { value: '100%', label: 'Client Satisfaction' },
              { value: 'India', label: 'Serving Worldwide' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-extrabold text-indigo-600 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story / Mission */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4">Our Story</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-6">
                Built by Engineers, Designed for Humans
              </h2>
              <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                <p>
                  Founded in 2023 and operating from India, Aesthetix Studio emerged from a simple observation: most agencies are either great at design <em>or</em> great at development — but rarely both.
                </p>
                <p>
                  We bridge that gap. Our team combines senior frontend engineers with deep design expertise, allowing us to build products that are both visually stunning and technically sound — from initial wireframe to final deployment.
                </p>
                <p>
                  Whether you're a startup launching your first SaaS product, or an established business looking to modernize your online presence, we treat every project like a software product: proper architecture, rigorous testing, and full documentation.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-slate-500 text-sm">
                <Globe size={16} className="text-indigo-500" />
                <span>Headquartered in India · Serving clients worldwide</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Target, title: 'Design-First', description: 'Every project starts with a Figma prototype before code.' },
                { icon: Code, title: 'Modern Stack', description: 'React, TypeScript, Spring Boot, and cloud-native deployments.' },
                { icon: Award, title: 'Quality Obsessed', description: 'Production-ready code with testing and documentation.' },
                { icon: Globe, title: 'SEO Built-In', description: 'Structured data, Core Web Vitals, and keyword strategy from day one.' },
              ].map(item => (
                <div key={item.title} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
                    <item.icon size={20} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/3">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl bg-slate-100 border border-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=faces&auto=format&q=80" 
                  alt="Abrar - Founder of Aesthetix Studio" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Meet the Founder</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                Abrar – Engineering for Excellence
              </h2>
              <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                <p>
                  With a background in full-stack engineering and a passion for high-performance web architecture, I started Aesthetix Studio to help businesses move beyond "template-based" web presence.
                </p>
                <p>
                  In a world where attention spans are measured in milliseconds and search algorithms demand technical perfection, "good enough" isn't enough. Every site we build is an engineering project first — optimized for sub-second load times, technical SEO, and massive scalability.
                </p>
                <p>
                  Based in India, I personally oversee the architecture of every project we take on, ensuring our team maintains the highest standards of code quality and design precision.
                </p>
              </div>
              <div className="pt-4">
                <Link to="/contact">
                  <Button variant="outline">Connect on LinkedIn</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="How We Work"
            subtitle="A transparent, step-by-step process — so you always know exactly where your project stands."
            center
          />
          <div className="space-y-8">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="flex gap-6 items-start bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-3xl font-extrabold text-indigo-100 tabular-nums shrink-0 leading-none pt-1">{step.step}</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader
            title="Our Technical Expertise"
            subtitle="From design tools to cloud infrastructure, we cover the full stack."
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            {EXPERTISE.map((skill) => (
              <div key={skill} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <CheckCircle size={18} className="text-indigo-600 shrink-0" />
                <span className="font-medium text-slate-700">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Something Great?</h2>
          <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
            We work with startups and businesses worldwide. Tell us about your project and get a free strategy consultation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/proposal">
              <Button variant="secondary" size="lg">Book a Free Strategy Call</Button>
            </Link>
            <Link to="/projects">
              <Button variant="outline" size="lg" className="text-white border-white/20 hover:bg-white/10 hover:text-white">
                View Our Work <ArrowRight size={16} className="inline ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
