import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Share2 } from 'lucide-react';
import { BLOG_POSTS } from '../constants';
import SEO from '../components/SEO';

const BlogPostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="pb-24">
      <SEO 
        title={`${post.title} | Blog | Aesthetix Studio`} 
        description={post.excerpt}
      />

      {/* Hero */}
      <div className="bg-slate-50 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/blog" className="inline-flex items-center text-slate-600 hover:text-indigo-600 font-medium mb-8 transition-colors group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Blog
          </Link>
          <div className="mb-6">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest rounded-full">
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight tracking-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              {post.readTime}
            </div>
            <div className="flex items-center gap-2">
              <User size={16} />
              Aesthetix Engineering
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-8">
        <div className="rounded-3xl overflow-hidden shadow-xl mb-12 border border-slate-200">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full aspect-[2/1] object-cover"
          />
        </div>

        <div className="prose prose-slate prose-lg max-w-none">
          <p className="text-xl text-slate-600 leading-relaxed font-medium mb-12 border-l-4 border-indigo-500 pl-6">
            {post.excerpt}
          </p>
          
          <div className="text-slate-800 leading-relaxed space-y-8">
            <p>
              In today's hyper-competitive digital landscape, building a website is only half the battle. At Aesthetix Studio, we believe that the true value of a digital product lies in its ability to be discovered, used, and scaled efficiently. 
            </p>
            
            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">The Engineering Perspective</h2>
            <p>
              Whether we're talking about technical SEO or application performance, the underlying architecture is what determines success. We focus on sub-second response times, proper semantic HTML structure, and schema metadata that search engines crave.
            </p>
            
            <p>
              Our internal workflow treats every blog post, every service page, and every client project with the same level of engineering discipline. We use modern tools like Vite for fast builds and React for interactive components, ensuring that your users never have to wait for content to load.
            </p>

            <div className="bg-indigo-600 rounded-2xl p-8 text-white my-12 shadow-xl shadow-indigo-100">
              <h3 className="text-xl font-bold mb-4">Key Takeaway</h3>
              <p className="text-indigo-100 mb-0">
                Don't sacrifice speed for design. With modern web technologies, you can have a visually stunning interface that also ranks #1 on Google. It's about how you engineer the bridge between aesthetic and performance.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Moving Forward</h2>
            <p>
              As we continue to evolve our own platform, we'll share more insights into how we handle React performance, Next.js migrations, and large-scale technical SEO audits. Stay tuned for deeper technical deep-dives and business strategy insights.
            </p>
          </div>
        </div>

        {/* Share / Footer */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
             <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Share Article</span>
             <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all">
                  <Share2 size={18} />
                </button>
             </div>
          </div>
          <div className="flex gap-4">
            <Link to="/contact">
              <button className="text-indigo-600 font-bold hover:underline">Subscribe to Insights</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;
