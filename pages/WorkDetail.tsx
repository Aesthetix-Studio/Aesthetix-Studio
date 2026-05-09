import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Zap, BarChart, Settings, Rocket } from 'lucide-react';
import { Button } from '../components/UI';
import { PROJECTS } from '../constants';
import SEO from '../components/SEO';

const WorkDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find(p => p.slug === slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="pb-24">
      <SEO 
        title={`${project.title} | Case Study | Aesthetix Studio`} 
        description={`Detailed case study for ${project.title}: ${project.challenge}`}
      />

      {/* Hero */}
      <div className="bg-slate-900 text-white pt-24 pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:24px_24px] -z-0"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Link to="/projects" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 font-medium mb-8 transition-colors group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Case Studies
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="max-w-3xl">
              <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-semibold mb-6 border border-indigo-500/30">
                {project.category}
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
                {project.title}
              </h1>
              <p className="text-slate-300 text-xl md:text-2xl leading-relaxed">
                {project.description}
              </p>
            </div>
            
            {/* Performance Badges */}
            {project.metrics && (
              <div className="flex flex-wrap md:flex-col gap-4">
                {project.metrics.map(metric => (
                  <div key={metric.label} className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl flex flex-col items-center justify-center min-w-[120px]">
                    <span className="text-2xl font-bold text-white">{metric.value}</span>
                    <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">{metric.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
        <div className="rounded-3xl overflow-hidden shadow-2xl mb-24 border border-slate-200 bg-slate-100 aspect-video lg:aspect-[21/9]">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-8 space-y-16">
            <section>
              <div className="flex items-center gap-3 text-indigo-600 font-bold uppercase tracking-widest text-sm mb-4">
                <Settings size={18} />
                The Challenge
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">Understanding the Problem</h2>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
                {project.challenge}
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 text-indigo-600 font-bold uppercase tracking-widest text-sm mb-4">
                <Zap size={18} />
                The Solution
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">Our Engineering Approach</h2>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
                {project.solution}
              </p>
            </section>

            {project.process && (
              <section>
                <div className="flex items-center gap-3 text-indigo-600 font-bold uppercase tracking-widest text-sm mb-4">
                  <Rocket size={18} />
                  The Process
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">How We Built It</h2>
                <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
                  {project.process}
                </p>
              </section>
            )}
          </div>

          <div className="lg:col-span-4 space-y-8">
            {/* Tech Stack Card */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 pb-4 border-b border-slate-200">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold shadow-sm hover:border-indigo-200 hover:text-indigo-600 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Results Card */}
            <div className="bg-indigo-600 p-8 rounded-2xl text-white shadow-xl shadow-indigo-200">
              <div className="flex items-center gap-3 text-indigo-100 font-bold uppercase tracking-widest text-xs mb-6">
                <BarChart size={16} />
                Performance Results
              </div>
              <ul className="space-y-4">
                {project.results.map((result, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="bg-white/20 p-1 rounded-full shrink-0 mt-1">
                      <CheckCircle size={14} className="text-white" />
                    </div>
                    <span className="font-medium text-sm md:text-base">{result}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Impact Card */}
            {project.businessImpact && (
              <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100 shadow-sm">
                <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-widest mb-6">Business Impact</h3>
                <ul className="space-y-4">
                  {project.businessImpact.map((impact, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-emerald-800">
                      <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span className="font-medium text-sm">{impact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Closing CTA */}
        <div className="bg-slate-900 rounded-[2.5rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to achieve <br className="hidden sm:block" /> similar results?</h2>
            <p className="text-slate-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Let's discuss how our design-driven engineering team can help your business build high-performance digital products.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/proposal">
                <Button variant="secondary" size="lg">Request Custom Proposal</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="text-white border-white/20 hover:bg-white/10">Book Strategy Call</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkDetail;
