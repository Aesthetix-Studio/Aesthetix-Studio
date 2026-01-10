import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Work from './pages/Work';
import Pricing from './pages/Pricing';
import Proposal from './pages/Proposal';
import Blog from './pages/Blog';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import SEO from './components/SEO';
import PageTransition from './components/PageTransition';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Simple Placeholders for undefined pages with SEO
const Placeholder = ({ title }: { title: string }) => (
  <div className="py-32 text-center">
    <SEO title={title} description={`${title} - Coming soon to Aesthetix Studio.`} />
    <h1 className="text-3xl font-bold text-slate-900 mb-4">{title}</h1>
    <p className="text-slate-500">This page is under construction for the demo.</p>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/services/:slug" element={<PageTransition><ServiceDetail /></PageTransition>} />
        <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
        <Route path="/work/:slug" element={<PageTransition><Placeholder title="Case Study Details" /></PageTransition>} />
        <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
        <Route path="/proposal" element={<PageTransition><Proposal /></PageTransition>} />
        <Route path="/trial" element={<PageTransition><Proposal /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/blog/:slug" element={<PageTransition><Placeholder title="Blog Post" /></PageTransition>} />
        <Route path="/about" element={<PageTransition><Placeholder title="About Us" /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Placeholder title="Contact" /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  );
};

export default App;