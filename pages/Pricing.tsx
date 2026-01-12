import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button, SectionHeader } from '../components/UI';
import SEO from '../components/SEO';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: '₹4,500',
      description: 'Perfect for small businesses needing a high-quality landing page.',
      features: ['Custom Design (Figma)', 'Responsive Development', 'CMS Integration', 'Basic SEO Setup', '1 Revision Round'],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Growth',
      price: '₹8,500',
      description: 'Multi-page corporate site with blog and lead generation tools.',
      features: ['5-Page Custom Website', 'Advanced SEO & Analytics', 'Newsletter Integration', 'Speed Optimization', '3 Revision Rounds'],
      cta: 'Most Popular',
      popular: true
    },
    {
      name: 'Pro',
      price: '₹15,000+',
      description: 'Complex web applications, e-commerce, or enterprise portals.',
      features: ['Web Application (React/Next.js)', 'Backend Integration', 'Custom User Auth', 'Payment Processing', 'Priority Support'],
      cta: 'Get Proposal',
      popular: false
    }
  ];

  return (
    <div className="py-20 bg-slate-50">
      <SEO 
        title="Pricing & Packages" 
        description="Transparent pricing for professional web design and development services. Choose the plan that fits your growth."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Simple, Transparent Pricing" 
          subtitle="No hidden fees. Choose the package that fits your stage of growth."
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan) => (
            <div key={plan.name} className={`relative bg-white rounded-2xl p-8 border ₹{plan.popular ? 'border-indigo-600 ring-2 ring-indigo-600/20 shadow-xl' : 'border-slate-200 shadow-sm'}`}>
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  Best Value
                </div>
              )}
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                {plan.price.includes('+') && <span className="text-slate-500 text-sm font-normal">starting at</span>}
              </div>
              <p className="text-slate-500 text-sm mb-8">{plan.description}</p>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                    <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              
              <Link to="/proposal" className="block">
                <Button variant={plan.popular ? 'primary' : 'outline'} className="w-full">
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Trial Section */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">Not sure yet? Try us risk-free.</h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">
              We offer a free pilot program for qualified startups. Get a homepage prototype or functional spec document in 48 hours.
            </p>
            <Link to="/trial">
              <Button variant="secondary" size="lg">Start Free Trial</Button>
            </Link>
          </div>
          {/* Decoration */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500 opacity-20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;