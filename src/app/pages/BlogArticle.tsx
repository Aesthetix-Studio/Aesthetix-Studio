import { useParams, Link } from "react-router";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

export default function BlogArticle() {
  return (
    <div className="bg-background">
      <section className="border-b border-border py-12 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 no-underline transition-colors" style={{ fontSize:"13px" }}>
            <ArrowLeft className="w-3.5 h-3.5" /> Journal
          </Link>
          <span className="px-2.5 py-1 rounded-full bg-brand-muted text-brand-muted-foreground mb-4 inline-block" style={{ fontSize:"11px", fontWeight:500 }}>Design Systems</span>
          <h1 className="text-foreground mb-4" style={{ fontSize:"clamp(26px,4vw,44px)", fontWeight:800, letterSpacing:"-0.025em", lineHeight:1.15 }}>
            The Case for Systematic Design: Why Ad Hoc Always Fails
          </h1>
          <p className="text-muted-foreground mb-6" style={{ fontSize:"18px", lineHeight:1.65 }}>Why ad hoc creative decisions always fail at scale — and how a design system changes everything.</p>
          <div className="flex items-center gap-5 border-t border-border pt-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white" style={{ fontSize:"11px", fontWeight:700 }}>AR</div>
              <div>
                <div className="text-foreground" style={{ fontSize:"13px", fontWeight:600 }}>Anna Reeves</div>
                <div className="text-muted-foreground" style={{ fontSize:"11px" }}>Lead Designer & Co-founder</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground" style={{ fontSize:"12px" }}><Calendar className="w-3.5 h-3.5" /> Jun 14, 2026</div>
            <div className="flex items-center gap-1 text-muted-foreground" style={{ fontSize:"12px" }}><Clock className="w-3.5 h-3.5" /> 6 min read</div>
          </div>
        </div>
      </section>
      <div className="h-72 sm:h-96 bg-gradient-to-br from-violet-400 to-purple-600" />
      <article className="max-w-3xl mx-auto px-5 sm:px-8 py-16" style={{ fontSize:"17px", lineHeight:1.8, color:"var(--foreground)" }}>
        <p className="mb-6 pl-5" style={{ color:"var(--muted-foreground)", fontStyle:"italic", borderLeft:"3px solid var(--brand)" }}>
          Great design systems are like great architecture — invisible when working, immediately felt when absent.
        </p>
        <h2 style={{ fontSize:"22px", fontWeight:700, letterSpacing:"-0.01em", marginBottom:"12px", marginTop:"40px" }}>The problem with ad hoc design</h2>
        <p className="mb-5">Every design project starts with good intentions. The designer opens Figma, the brief is clear, and the first screens look excellent. Then three months in, something shifts. New components appear. A different designer joins. Slowly, the system that never existed becomes a system that cannot be maintained.</p>
        <p className="mb-5">Ad hoc design decisions compound. Each individual choice seems reasonable in isolation — a slightly different shadow here, a new button variant there. But at scale, the result is a product that feels inconsistent, a codebase filled with one-off implementations, and a design process where every decision requires debate rather than lookup.</p>
        <h2 style={{ fontSize:"22px", fontWeight:700, letterSpacing:"-0.01em", marginBottom:"12px", marginTop:"40px" }}>Tokens are the foundation</h2>
        <p className="mb-5">A design system doesn't start with components — it starts with tokens. Color, typography, spacing, shadow, and motion values defined once and referenced everywhere. When a brand color changes, you update one token. When the typography scale shifts, every component inherits the update automatically.</p>
        <p className="mb-5">This is the part most teams skip because it's unsexy. But it's the difference between a real design system and a component library with a style guide PDF that nobody reads.</p>
        <h2 style={{ fontSize:"22px", fontWeight:700, letterSpacing:"-0.01em", marginBottom:"12px", marginTop:"40px" }}>Components as decisions made in advance</h2>
        <p className="mb-5">The real value of a component is not that it saves implementation time — it's that it represents a decision made in advance. When you build a Button component, you encode which variants exist, what states are supported, how it responds to different contexts.</p>
        <div className="border-t border-border mt-12 pt-8 flex items-center justify-between">
          <Link to="/blog" className="flex items-center gap-2 text-muted-foreground hover:text-foreground no-underline transition-colors" style={{ fontSize:"13px" }}>
            <ArrowLeft className="w-4 h-4" /> Back to Journal
          </Link>
          <Link to="/contact" className="flex items-center gap-2 bg-brand text-white px-4 py-2 rounded-lg no-underline hover:bg-brand-hover transition-colors" style={{ fontSize:"13px", fontWeight:600 }}>
            Work with us
          </Link>
        </div>
      </article>
    </div>
  );
}
