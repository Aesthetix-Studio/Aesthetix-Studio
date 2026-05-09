import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Code, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, SectionHeader } from '../components/UI';
import { SERVICES, TECH_STACK, TESTIMONIALS, getIcon } from '../constants';
import SEO from '../components/SEO';

const Home = () => {
  return (
    <div>
      <SEO 
        title="Web Design & Development Agency in India | Aesthetix Studio" 
        description="Aesthetix Studio is a premier web design and development agency in India, helping startups and enterprises build high-performance digital products and scalable web architectures."
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
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight"
          >
            Web Design & Development <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-indigo-600">Agency in India</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed"
          >
            Aesthetix Studio is a web design and development agency helping startups and businesses across India build 
            high-performance, SEO-friendly websites using React, Vite, and modern web technologies.
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
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-6">Powering experiences with modern tech</p>
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
              className="p-6 sm:p-8 bg-slate-50 rounded-2xl border border-slate-100"
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">Speed & Performance</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                We engineer for sub-second load times. Core Web Vitals are our primary metric, ensuring Google loves your site as much as your users do.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-6 sm:p-8 bg-slate-50 rounded-2xl border border-slate-100"
            >
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Code size={24} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">Clean Architecture</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Built on React, TypeScript, and Spring Boot. Our codebases are modular, testable, and designed to scale with your business.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="p-6 sm:p-8 bg-slate-50 rounded-2xl border border-slate-100"
            >
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <Shield size={24} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">Enterprise Security</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
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
                  <Link to={`/${service.slug}`} className="group block p-6 sm:p-8 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all h-full">
                    <Icon className="text-indigo-600 mb-4 group-hover:scale-110 transition-transform" size={32} />
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{service.title}</h4>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                    <span className="text-indigo-600 font-medium text-sm sm:text-base flex items-center gap-1 group-hover:gap-2 transition-all">
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

      {/* Testimonials / Social Proof */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="What Our Clients Say"
            subtitle="Measurable results from the startups and enterprises we've helped scale."
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex flex-col group hover:shadow-lg transition-all duration-300"
              >
                <div className="flex-1 mb-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-indigo-400 text-5xl leading-none font-serif">"</div>
                    <div className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {t.project}
                    </div>
                  </div>
                  <p className="text-slate-700 leading-relaxed italic">{t.quote}</p>
                </div>
                <div className="flex items-center gap-3 border-t border-slate-200 pt-5">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shrink-0">
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t.author}</p>
                    <p className="text-slate-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location / Trust signal */}
      <section className="py-10 bg-slate-50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-base">
            🇮🇳 <strong className="text-slate-700">Based in India</strong> — helping startups and businesses across India, the Middle East, and globally build high-performance, SEO-friendly websites.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about working with Aesthetix Studio."
            center
          />
          <div className="space-y-4">
            {[
              { q: 'What makes Aesthetix Studio different?', a: 'We combine design-thinking with senior software engineering. Every project is treated like a production product with proper architecture, code reviews, and performance optimization.' },
              { q: 'Do you work with global clients?', a: 'Yes. Based in India, we serve startups and established businesses across the USA, UK, Middle East, and Asia using seamless async communication.' },
              { q: 'How do I get a custom proposal?', a: 'Click the "Request Proposal" button to share your project details, and our team will get back to you with a tailored strategy and estimate within 24 hours.' }
            ].map((faq, i) => (
              <details key={i} className="group bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer text-slate-900 font-semibold text-lg hover:bg-slate-100 transition-colors">
                  {faq.q}
                  <span className="ml-4 text-indigo-500 group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
         {/* Abstract shapes */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Ready to elevate your digital presence?</h2>
          <p className="text-slate-300 text-base sm:text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Join forward-thinking companies who trust Aesthetix to build their most critical digital products.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/proposal">
               <Button variant="secondary" size="lg">Book a Free Strategy Call</Button>
            </Link>
            <Link to="/contact">
               <Button variant="outline" size="lg" className="text-white border-white/20 hover:bg-white/10 hover:text-white">Launch Faster With Aesthetix</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
