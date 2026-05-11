import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { SERVICES, getIcon } from '../constants';
import SEO from '../components/SEO';

const Services = () => {
  return (
    <div className="pt-12 pb-24">
      <SEO 
        title="Web Development & UI/UX Design Services | Aesthetix Studio India"
        description="Explore Aesthetix Studio's full range of services: UI/UX design, React web development, SEO-friendly websites, custom web applications, and website maintenance. Serving clients in India and worldwide."
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6">Services</h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">Modern web solutions built for performance, scalability, and growth.</p>
        </div>
        
        <div className="grid gap-8">
          {SERVICES.map((service, index) => {
            const Icon = getIcon(service.iconName);
            return (
              <div key={service.id} className={`flex flex-col md:flex-row items-center gap-6 sm:gap-8 p-6 sm:p-8 bg-white rounded-2xl shadow-sm border border-slate-100 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1 space-y-4">
                  <div className="w-12 h-12 bg-indigo-50 text-accent rounded-xl flex items-center justify-center">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">{service.title}</h3>
                  <p className="text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed">{service.description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base text-slate-600">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4">
                    <Link to={`/${service.slug}`} className="inline-flex items-center gap-1 font-medium text-accent hover:gap-2 transition-all text-sm sm:text-base">
                      Learn More <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
                <div className="flex-1 w-full h-64 bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center">
                   <img 
                     src={service.image} 
                     alt={`${service.title} - Professional ${service.title.toLowerCase()} services illustration`}
                     className="w-full h-full object-cover scale-[1.04] hover:scale-110 transition-transform duration-500"
                     loading="lazy"
                     onError={(e) => {
                       const target = e.target as HTMLImageElement;
                       target.src = '/images/services/web-development.png?v=service-20260509';
                     }}
                   />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
