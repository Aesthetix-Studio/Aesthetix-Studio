import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/UI';
import { AlertTriangle } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden">
      <SEO title="Page Not Found" description="The page you are looking for does not exist." />
      
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
        <span className="text-[20rem] font-extrabold text-slate-50 select-none leading-none">404</span>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle size={32} />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Page not found</h1>
        
        <p className="text-slate-600 max-w-lg text-lg mb-10 leading-relaxed">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or the URL might be incorrect.
        </p>
        
        <div className="flex gap-4">
          <Link to="/">
            <Button variant="primary" size="lg">Return Home</Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="lg">Contact Support</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;