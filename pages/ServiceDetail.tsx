import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/UI';
import { SERVICES } from '../constants';
import SEO from '../components/SEO';

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find(s => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div>
      <SEO 
        title={service.title} 
        description={service.description}
      />

      {/* Hero */}
      <div className="bg-primary text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{service.title}</h1>
          <p className="text-slate-300 text-xl">{service.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">What We Deliver</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              We take a systematic approach to {service.title.toLowerCase()}. 
              Our team integrates seamlessly with your workflow to ensure transparency and speed without sacrificing quality.
            </p>
            
            <div className="space-y-4 mb-8">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                    <Check size={12} />
                  </div>
                  <span className="text-slate-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <Link to="/proposal">
              <Button>Get Started with {service.title}</Button>
            </Link>
          </div>
          
          <div className="space-y-8">
             <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4">Why Aesthetix?</h3>
                <p className="text-slate-600 mb-4">Unlike traditional agencies, we treat every project like a software product. We engineer for scalability from day one.</p>
                <Link to="/work" className="text-accent font-medium hover:underline">See our previous work &rarr;</Link>
             </div>
             
             <div className="bg-indigo-600 p-8 rounded-2xl text-white">
                <h3 className="font-bold text-white mb-4">Need a Custom Quote?</h3>
                <p className="text-indigo-100 mb-6">Every business is unique. Let's discuss your specific requirements.</p>
                <Link to="/contact">
                  <Button variant="outline" className="text-white border-white hover:bg-white hover:text-indigo-600">Contact Sales</Button>
                </Link>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;