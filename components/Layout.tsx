import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const NavLink = ({ to, children, mobile = false }: { to: string; children: React.ReactNode; mobile?: boolean }) => {
    const isActive = location.pathname.startsWith(to) && to !== '/' || location.pathname === to;
    const baseClass = mobile
      ? "block px-3 py-2 rounded-md text-base font-medium transition-colors"
      : "text-sm font-medium transition-colors hover:text-accent";
    
    const activeClass = mobile
      ? "bg-indigo-50 text-accent"
      : "text-accent";
      
    const inactiveClass = mobile
      ? "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      : "text-slate-600";

    return (
      <Link to={to} className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}>
        {children}
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center group">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-2 group-hover:scale-105 transition-transform">
                  <span className="text-white font-serif font-bold text-xl">A</span>
                </div>
                <div className="flex flex-col">
                    <span className="font-serif font-bold text-lg leading-tight tracking-tight">Aesthetix</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest">Studio</span>
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink to="/services">Services</NavLink>
              <NavLink to="/work">Work</NavLink>
              <NavLink to="/pricing">Pricing</NavLink>
              <NavLink to="/blog">Blog</NavLink>
              <NavLink to="/about">About</NavLink>
              <Link to="/trial" className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2">
                Start Trial
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-slate-900 p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink to="/services" mobile>Services</NavLink>
              <NavLink to="/work" mobile>Work</NavLink>
              <NavLink to="/pricing" mobile>Pricing</NavLink>
              <NavLink to="/blog" mobile>Blog</NavLink>
              <NavLink to="/about" mobile>About</NavLink>
              <Link to="/trial" className="block w-full text-center mt-4 bg-primary text-white px-4 py-2 rounded-md text-base font-medium hover:bg-slate-800">
                Start Free Trial
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center mr-2">
                  <span className="text-white font-serif font-bold text-sm">A</span>
                </div>
                <span className="font-serif font-bold text-md">Aesthetix</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Beautifully engineered websites that convert. We combine aesthetic precision with full-stack power.
              </p>
              <div className="mt-6 flex space-x-4">
                {/* Social Placeholders */}
                <div className="w-8 h-8 bg-slate-200 rounded-full hover:bg-accent transition-colors cursor-pointer"></div>
                <div className="w-8 h-8 bg-slate-200 rounded-full hover:bg-accent transition-colors cursor-pointer"></div>
                <div className="w-8 h-8 bg-slate-200 rounded-full hover:bg-accent transition-colors cursor-pointer"></div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Studio</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link to="/work" className="hover:text-accent">Portfolio</Link></li>
                <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-accent">Careers</Link></li>
                <li><Link to="/admin" className="hover:text-accent">Admin Login</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link to="/services/website-design" className="hover:text-accent">Web Design</Link></li>
                <li><Link to="/services/web-development" className="hover:text-accent">Development</Link></li>
                <li><Link to="/services/seo-marketing" className="hover:text-accent">SEO & Marketing</Link></li>
                <li><Link to="/proposal" className="hover:text-accent">Request Proposal</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-4">Get in Touch</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>hello@aesthetix.studio</li>
                <li>+1 (555) 123-4567</li>
                <li>101 Design Ave, Suite 400<br/>San Francisco, CA</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
            <p>&copy; {new Date().getFullYear()} Aesthetix Studio. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-slate-600">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-slate-600">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;