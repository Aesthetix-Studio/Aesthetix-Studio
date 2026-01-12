import React from 'react';
import SEO from '../components/SEO';

const Terms = () => {
  return (
    <div className="py-20 bg-slate-50">
      <SEO 
        title="Terms of Service" 
        description="Terms of Service for Aesthetix Studio - Terms and conditions for using our services."
      />
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Terms of Service</h1>
          <p className="text-slate-500 mb-12 text-lg">Last updated: {new Date().getFullYear()}</p>
          
          <div className="prose prose-lg max-w-none text-slate-700 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Acceptance of Terms</h2>
              <p className="leading-relaxed">By accessing and using our services, you accept and agree to be bound by the terms and provision of this agreement.</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Services</h2>
              <p className="leading-relaxed">Aesthetix Studio provides web design and development services. We reserve the right to modify or discontinue services at any time.</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Payment Terms</h2>
              <p className="leading-relaxed">Payment terms will be specified in individual project agreements. All fees are non-refundable unless otherwise stated.</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Intellectual Property</h2>
              <p className="leading-relaxed">Upon full payment, clients receive ownership of the final deliverables. We retain the right to showcase work in our portfolio.</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Limitation of Liability</h2>
              <p className="leading-relaxed">Our liability is limited to the amount paid for services. We are not liable for any indirect, incidental, or consequential damages.</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Information</h2>
              <p className="leading-relaxed">For questions about these Terms, contact us at <a href="mailto:hello@aesthetix.studio" className="text-indigo-600 hover:underline">hello@aesthetix.studio</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;