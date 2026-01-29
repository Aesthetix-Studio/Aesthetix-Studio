import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '../components/UI';
import { SERVICES, getIcon } from '../constants';
import SEO from '../components/SEO';

const Services = () => {
  return (
    <div className="pt-12 pb-24">
      <SEO 
        title="Our Services" 
        description="Comprehensive design and web engineering solutions. From Website Design and Prototyping to SEO and Custom Development."
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Our Services" 
          subtitle="Comprehensive design and engineering solutions tailored for growth."
          center
        />
        
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
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base text-slate-500">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4">
                    <Link to={`/services/${service.slug}`} className="inline-flex items-center font-medium text-accent hover:gap-2 transition-all text-sm sm:text-base">
                      View Details <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
                <div className="flex-1 w-full h-64 bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center">
                   {/* Placeholder for service illustration */}
                   <img 
                     src={`https://picsum.photos/600/400?random=${index + 10}`} 
                     alt={service.title}
                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                     loading="lazy"
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