import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Zap, Shield, BarChart, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, SectionHeader } from '../components/UI';
import { SERVICES, TECH_STACK, TESTIMONIALS, PROJECTS, getIcon } from '../constants';
import SEO from '../components/SEO';

const Home = () => {
  return (
    <div>
      <SEO 
        title="Web Design & Development Agency India | Aesthetix Studio" 
        description="Aesthetix Studio is a premier web design and development agency in India. We specialize in high-performance React websites, UI/UX design, and custom web applications with sub-second load times."
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
            Helping startups and businesses build high-performance, SEO-friendly websites using React, Vite, and modern web technologies.
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
             {TECH_STACK.slice(0, 6).map((tech) => (
               <div key={tech.name} className="flex items-center gap-2 group">
                 <tech.icon size={24} className="text-slate-800 group-hover:text-indigo-600" />
                 <span className="font-semibold text-slate-700">{tech.name}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Services Preview - SHORTER */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Core Expertise</h2>
              <p className="text-slate-600 text-lg">Precision engineering meets design excellence. We build products that rank, convert, and scale.</p>
            </div>
            <Link to="/services">
              <Button variant="outline" className="hidden md:flex">View All Services <ArrowRight size={16} className="ml-2" /></Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.slice(0, 4).map((service, index) => {
              const Icon = getIcon(service.iconName);
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/${service.slug}`} className="group block p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl transition-all h-full">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Icon size={24} />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
                    <p className="text-slate-600 text-sm mb-6 line-clamp-2">{service.description}</p>
                    <span className="text-indigo-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Explore Service <ArrowRight size={14} />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
          <div className="text-center mt-12 md:hidden">
            <Link to="/services">
              <Button variant="primary">View All Services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Work - NEW SECTION */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Work</h2>
              <p className="text-slate-400 text-lg">Tangible results delivered through rigorous engineering and design.</p>
            </div>
            <Link to="/work">
              <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">View Case Studies <ArrowRight size={16} className="ml-2" /></Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {PROJECTS.slice(0, 2).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <Link to={`/work/${project.slug}`}>
                  <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-8">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                       <span className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2">
                         View Case Study <ArrowRight size={16} />
                       </span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <span className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-2 block">{project.category}</span>
                      <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                    </div>
                    {project.metrics && (
                      <div className="flex gap-4">
                        {project.metrics.slice(0, 2).map(m => (
                          <div key={m.label} className="text-right">
                            <div className="text-xl font-bold text-white">{m.value}</div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{m.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Process"
            subtitle="Five straightforward steps from discovery to launch"
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { number: '01', title: 'Discovery', desc: 'Understand your goals, audience, and technical requirements' },
              { number: '02', title: 'Design', desc: 'Create wireframes, prototypes, and high-fidelity designs' },
              { number: '03', title: 'Development', desc: 'Build scalable, SEO-friendly code with best practices' },
              { number: '04', title: 'Optimization', desc: 'Optimize performance, SEO, and conversion metrics' },
              { number: '05', title: 'Launch', desc: 'Deploy, monitor, and provide ongoing support' }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                <div className="text-5xl font-bold text-indigo-100 mb-4">{step.number}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                {index < 4 && (
                  <div className="hidden md:block absolute top-12 -right-4 text-indigo-200">
                    <ArrowRight size={20} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - TRUST BOOST */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Evidence of Success</h2>
              <p className="text-slate-600 text-lg">Real results from the startups and businesses we've helped scale.</p>
            </div>
            <Link to="/contact" className="hidden md:block">
              <Button variant="outline">Get in Touch <ArrowRight size={16} className="ml-2" /></Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
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
          <div className="text-center mt-12">
            <Link to="/contact">
              <Button variant="primary" className="md:hidden">Get in Touch</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props - REDUCED DENSITY */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            {[
              { icon: Zap, title: 'Lighthouse 90+', desc: 'Speed is a feature. We optimize for Core Web Vitals to ensure sub-second load times and peak SEO rankings.' },
              { icon: Shield, title: 'Bank-Grade Security', desc: 'From JWT authentication to encrypted databases, we implement enterprise-standard security by default.' },
              { icon: BarChart, title: 'ROI Focused', desc: 'We don\'t just build beautiful things; we build high-converting assets that drive measurable business results.' }
            ].map(prop => (
              <div key={prop.title} className="space-y-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto md:mx-0 text-indigo-600">
                  <prop.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{prop.title}</h3>
                <p className="text-slate-600 leading-relaxed">{prop.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location / Trust signal */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            🇮🇳 <strong className="text-slate-700">Engineering Headquarters: India</strong> — Serving founders and enterprises globally with high-performance, SEO-dominant digital products.
          </p>
        </div>
      </section>

      {/* FAQ Section - MINIMAL */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Quick Questions</h2>
            <p className="text-slate-500">Everything you need to know about working with us.</p>
          </div>
          <div className="space-y-4">
            {[
              { q: 'What makes Aesthetix Studio different?', a: 'We combine design-thinking with senior software engineering. Every project is treated like a production product with proper architecture, code reviews, and performance optimization.' },
              { q: 'Do you work with global clients?', a: 'Yes. Based in India, we serve startups and established businesses across the USA, UK, Middle East, and Asia using seamless async communication.' },
              { q: 'How do I get a custom proposal?', a: 'Click the "Request Proposal" button to share your project details, and our team will get back to you with a tailored strategy and estimate within 24 hours.' }
            ].map((faq, i) => (
              <details key={i} className="group bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer text-slate-900 font-semibold hover:bg-slate-100 transition-colors">
                  {faq.q}
                  <span className="ml-4 text-indigo-500 group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 tracking-tight">Ready to build something <br/> exceptional?</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Join the forward-thinking brands who trust Aesthetix to scale their most critical digital infrastructure.
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
      </section>
    </div>
  );
};

export default Home;
