import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Target, Award } from 'lucide-react';
import { Button, SectionHeader } from '../components/UI';
import SEO from '../components/SEO';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Design-First Approach',
      description: 'Every project starts with user experience. We prototype in Figma before writing a single line of code.'
    },
    {
      icon: Users,
      title: 'Full-Stack Expertise',
      description: 'From React frontends to Spring Boot APIs, we handle the complete technical stack.'
    },
    {
      icon: Award,
      title: 'Quality Obsessed',
      description: 'We ship production-ready code with comprehensive testing and documentation.'
    }
  ];

  return (
    <div>
      <SEO 
        title="About Aesthetix Studio" 
        description="Learn about our design-first approach to web development. We combine aesthetic precision with full-stack engineering expertise."
      />
      
      {/* Hero */}
      <section className="pt-20 pb-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            We Build Digital Products That <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-indigo-600">Actually Work</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Aesthetix Studio bridges the gap between beautiful design and robust engineering. We're a team of designers and developers who believe great products need both.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Our Approach" 
            subtitle="We combine design thinking with engineering discipline to build products that scale."
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center p-8">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-6">Built by Engineers, Designed for Humans</h2>
            <p className="text-lg text-slate-600">
              Founded in 2023, Aesthetix Studio emerged from a simple observation: most agencies are either great at design or great at development, but rarely both.
            </p>
          </div>
          
          <div className="prose prose-lg mx-auto text-slate-600">
            <p>
              We started with a mission to bridge this gap. Our team combines senior engineers with design expertise, 
              allowing us to build products that are both beautiful and technically sound.
            </p>
            <p>
              Today, we work with startups and established companies to build web applications, marketing sites, 
              and digital products that perform at scale. Every project is treated like a software product, 
              with proper architecture, testing, and documentation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Work Together?</h2>
          <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
            Let's discuss your project and see how we can help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/proposal">
              <Button variant="secondary" size="lg">Start Your Project</Button>
            </Link>
            <Link to="/work">
              <Button variant="outline" size="lg" className="text-white border-white/20 hover:bg-white/10 hover:text-white">
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;