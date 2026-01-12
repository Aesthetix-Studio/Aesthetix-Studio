import React from 'react';
import SEO from '../components/SEO';

const Privacy = () => {
  return (
    <div className="py-20 bg-slate-50">
      <SEO 
        title="Privacy Policy" 
        description="Privacy Policy for Aesthetix Studio - How we collect, use, and protect your information."
      />
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-slate-500 mb-12 text-lg">Last updated: {new Date().getFullYear()}</p>
          
          <div className="prose prose-lg max-w-none text-slate-700 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Information We Collect</h2>
              <p className="leading-relaxed">We collect information you provide directly to us, such as when you contact us through our website or request a proposal.</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">How We Use Your Information</h2>
              <p className="leading-relaxed">We use the information we collect to provide, maintain, and improve our services, communicate with you, and respond to your inquiries.</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Information Sharing</h2>
              <p className="leading-relaxed">We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Security</h2>
              <p className="leading-relaxed">We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Us</h2>
              <p className="leading-relaxed">If you have questions about this Privacy Policy, please contact us at <a href="mailto:hello@aesthetix.studio" className="text-indigo-600 hover:underline">hello@aesthetix.studio</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;