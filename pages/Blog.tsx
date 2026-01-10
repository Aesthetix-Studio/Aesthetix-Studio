import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/UI';
import { BLOG_POSTS } from '../constants';
import SEO from '../components/SEO';

const Blog = () => {
  return (
    <div className="py-20">
      <SEO 
        title="Blog & Insights" 
        description="Expert thoughts on web design trends, engineering best practices, and digital marketing strategies."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Insights" 
          subtitle="Thoughts on design, engineering, and the future of the web."
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="flex flex-col group">
              <div className="mb-4 overflow-hidden rounded-xl">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                <span className="font-bold text-accent uppercase tracking-wider">{post.category}</span>
                <span>&bull;</span>
                <span>{post.date}</span>
                <span>&bull;</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-accent transition-colors">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">
                {post.excerpt}
              </p>
              <Link to={`/blog/${post.slug}`} className="text-accent text-sm font-medium hover:underline">
                Read Article
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;