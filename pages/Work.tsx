import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/UI';
import { PROJECTS } from '../constants';
import SEO from '../components/SEO';

const Work = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))];

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <div className="py-20">
      <SEO 
        title="Selected Work" 
        description="Explore our portfolio of high-performance websites, web applications, and e-commerce platforms built with modern technologies."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Selected Work" 
          subtitle="A showcase of our finest digital engineering and design projects."
          center
        />

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat 
                  ? 'bg-slate-900 text-white' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <Link key={project.id} to={`/work/${project.slug}`} className="group block">
              <div className="relative overflow-hidden rounded-xl mb-4 shadow-sm border border-slate-100">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full aspect-[4/3] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300"></div>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">{project.category}</p>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-accent transition-colors">{project.title}</h3>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-900">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;