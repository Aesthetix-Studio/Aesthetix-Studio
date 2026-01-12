import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Code, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, SectionHeader } from '../components/UI';
import { SERVICES, TECH_STACK, getIcon } from '../constants';
import SEO from '../components/SEO';

const Home = () => {
  return (
    <div>
      <SEO 
        title="Design-First Web Development Studio" 
        description="Aesthetix Studio builds beautifully engineered websites that convert. Specializing in React, Figma, and high-performance digital experiences."
      />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-surface -z-10">
           <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wide mb-8"
          >
            New: AI-Powered SEO Audits
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight"
          >
            Beautifully Engineered <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-indigo-600">Websites That Convert</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 mb-10"
          >
            Aesthetix Studio combines world-class design with robust engineering. 
            We build scalable, high-performance digital experiences for modern brands.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link to="/trial">
              <Button variant="secondary" size="lg">Free Trial — Get a Prototype</Button>
            </Link>
            <Link to="/proposal">
              <Button variant="outline" size="lg">Request Proposal</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-10 border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">Powering experiences with modern tech</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             {TECH_STACK.map((tech) => (
               <div key={tech.name} className="flex items-center gap-2 group">
                 <tech.icon size={24} className="text-slate-800 group-hover:text-indigo-600" />
                 <span className="font-semibold text-slate-700">{tech.name}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-slate-50 rounded-2xl border border-slate-100"
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Speed & Performance</h3>
              <p className="text-slate-600 leading-relaxed">
                We engineer for sub-second load times. Core Web Vitals are our primary metric, ensuring Google loves your site as much as your users do.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-8 bg-slate-50 rounded-2xl border border-slate-100"
            >
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Code size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Clean Architecture</h3>
              <p className="text-slate-600 leading-relaxed">
                Built on React, TypeScript, and Spring Boot. Our codebases are modular, testable, and designed to scale with your business.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="p-8 bg-slate-50 rounded-2xl border border-slate-100"
            >
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Enterprise Security</h3>
              <p className="text-slate-600 leading-relaxed">
                Security isn't an afterthought. We implement industry-standard practices from day one to protect your data and your users.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Our Expertise" 
            subtitle="From initial prototype to global deployment, we cover the entire digital lifecycle."
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.slice(0, 6).map((service, index) => {
              const Icon = getIcon(service.iconName);
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Link to={`/services/${service.slug}`} className="group block p-8 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all h-full">
                    <Icon className="text-indigo-600 mb-4 group-hover:scale-110 transition-transform" size={32} />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                    <p className="text-slate-500 text-sm mb-4">{service.description}</p>
                    <span className="text-indigo-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn more <ArrowRight size={14} />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="primary">View All Services</Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
         {/* Abstract shapes */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Ready to elevate your digital presence?</h2>
          <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
            Join forward-thinking companies who trust Aesthetix to build their most critical digital products.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/proposal">
               <Button variant="secondary" size="lg">Start Your Project</Button>
            </Link>
            <Link to="/contact">
               <Button variant="outline" size="lg" className="text-white border-white/20 hover:bg-white/10 hover:text-white">Contact Sales</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;