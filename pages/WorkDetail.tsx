import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '../components/UI';
import { PROJECTS } from '../constants';
import SEO from '../components/SEO';

const WorkDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find(p => p.slug === slug);

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  return (
    <div className="pb-24">
      <SEO 
        title={`${project.title} | Case Study`} 
        description={`Case study: ${project.description}`}
      />

      {/* Hero */}
      <div className="bg-slate-900 text-white pt-24 pb-32">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/work" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 font-medium mb-8 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to all work
          </Link>
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-semibold mb-6">
            {project.category}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
            {project.title}
          </h1>
          <p className="text-slate-300 text-xl md:text-2xl max-w-2xl leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-10">
        <div className="rounded-2xl overflow-hidden shadow-2xl mb-16 border border-slate-200 bg-slate-100 aspect-video">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="md:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">The Challenge</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                {project.challenge || "Our client needed a modern, scalable solution to handle their growing user base while maintaining a seamless user experience. The legacy system was causing slow load times and preventing them from ranking on search engines."}
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">Our Solution</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                {project.solution || "We completely re-architected the platform using modern web technologies. By implementing server-side rendering and a headless CMS, we were able to drastically improve performance metrics and developer velocity."}
              </p>
            </section>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {project.results && project.results.length > 0 && (
              <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-wider mb-4">Key Results</h3>
                <ul className="space-y-3">
                  {project.results.map((result, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-indigo-800">
                      <CheckCircle size={18} className="text-indigo-600 shrink-0 mt-0.5" />
                      <span className="font-medium text-sm">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to build something similar?</h2>
          <p className="text-slate-300 mb-8 max-w-lg mx-auto">Let's discuss how our team can help you achieve these kinds of results for your business.</p>
          <Link to="/proposal">
            <Button variant="primary" size="lg">Start Your Project</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorkDetail;
