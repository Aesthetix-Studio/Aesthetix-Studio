import { useParams, Link } from "react-router";
import { ArrowLeft, Clock, Calendar, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchBlogPost } from "../lib/api";
import SEO from "../components/SEO";

const articles: Record<string, {
  title: string; category: string; date: string; readTime: string;
  author: string; initials: string; role: string; gradient: string;
  excerpt: string; content: { heading?: string; body: string }[];
}> = {
  "systematic-design": {
    title: "The Case for Systematic Design: Why Ad Hoc Always Fails",
    category: "Design Systems", date: "Jun 14, 2026", readTime: "6 min",
    author: "Anna Reeves", initials: "AR", role: "Lead Designer & Co-founder",
    gradient: "from-violet-400 to-purple-600",
    excerpt: "Why ad hoc creative decisions always fail at scale — and how a design system changes everything.",
    content: [
      { body: "Great design systems are like great architecture — invisible when working, immediately felt when absent." },
      { heading: "The problem with ad hoc design", body: "Every design project starts with good intentions. The designer opens Figma, the brief is clear, and the first screens look excellent. Then three months in, something shifts. New components appear. A different designer joins. Slowly, the system that never existed becomes a system that cannot be maintained." },
      { body: "Ad hoc design decisions compound. Each individual choice seems reasonable in isolation — a slightly different shadow here, a new button variant there. But at scale, the result is a product that feels inconsistent, a codebase filled with one-off implementations, and a design process where every decision requires debate rather than lookup." },
      { heading: "Tokens are the foundation", body: "A design system doesn't start with components — it starts with tokens. Color, typography, spacing, shadow, and motion values defined once and referenced everywhere. When a brand color changes, you update one token. When the typography scale shifts, every component inherits the update automatically." },
      { body: "This is the part most teams skip because it's unsexy. But it's the difference between a real design system and a component library with a style guide PDF that nobody reads." },
      { heading: "Components as decisions made in advance", body: "The real value of a component is not that it saves implementation time — it's that it represents a decision made in advance. When you build a Button component, you encode which variants exist, what states are supported, how it responds to different contexts." },
      { body: "When a designer opens Figma and needs a button, they don't Google 'best button design 2026.' They use the Button component because it already embodies every decision the team has made about how buttons should work." },
    ],
  },
  "motion-enterprise": {
    title: "Motion Design Principles for Enterprise Software",
    category: "Motion Design", date: "May 28, 2026", readTime: "4 min",
    author: "Kai Tanaka", initials: "KT", role: "Motion Designer",
    gradient: "from-blue-400 to-cyan-500",
    excerpt: "How subtle animation cues improve usability in data-heavy interfaces without becoming a distraction.",
    content: [
      { body: "Enterprise software has a reputation for being ugly, but the real problem is that it's often invisible in the wrong ways. Users don't notice when things work — they only notice when things break. Motion design is the bridge between these two states." },
      { heading: "Why motion matters in enterprise", body: "In data-heavy interfaces, users process enormous amounts of information. Motion provides context: where did this element come from? Where did it go? What just changed? Without these cues, every state change feels like a page reload." },
      { body: "The goal isn't to make enterprise software fun — it's to make it legible. A well-placed 200ms transition tells the user 'this changed because of what you just did.' That feedback loop is what separates intuitive software from software that requires training." },
      { heading: "The 200ms rule", body: "Most interface animations should be between 150ms and 300ms. Below 100ms, the eye can't track the change. Above 400ms, it feels sluggish. The sweet spot for most UI transitions is around 200ms — fast enough to feel responsive, slow enough to register." },
      { body: "Easing matters as much as duration. Ease-out (fast start, slow end) feels natural for elements appearing. Ease-in (slow start, fast end) works for elements disappearing. Ease-in-out handles movements between positions." },
      { heading: "Motion for data visualization", body: "Charts and data dashboards benefit enormously from animation. When data updates, don't just swap the numbers — animate the transition. Let bars grow, let lines extend, let numbers count up. This makes the change comprehensible rather than jarring." },
    ],
  },
  "typography-products": {
    title: "Choosing Type for Digital Products",
    category: "Typography", date: "May 10, 2026", readTime: "8 min",
    author: "Lena Morris", initials: "LM", role: "Design Lead",
    gradient: "from-amber-400 to-orange-500",
    excerpt: "Variable fonts, optical sizing, and pairing logic for UI typography that scales without breaking.",
    content: [
      { body: "Typography in digital products isn't about picking a pretty font — it's about building a system that works at every size, on every screen, in every context. The type system you choose will either scale gracefully or become your biggest maintenance headache." },
      { heading: "Start with constraints", body: "Before choosing fonts, define your constraints. How many sizes do you need? What are the minimum and maximum? How will line height scale? What about weight variation? Answering these questions first prevents the common trap of choosing a beautiful typeface that breaks at small sizes." },
      { body: "A type scale is a set of predefined sizes. The most common approach uses a modular scale — each step is a consistent ratio larger than the last. A 1.25 ratio gives you: 12, 15, 19, 24, 30, 37, 46, 58 pixels. These steps feel natural because they're mathematically consistent." },
      { heading: "Variable fonts change everything", body: "Variable fonts are the biggest typography advancement since web fonts. Instead of loading separate files for Regular, Bold, and Italic, a single variable font file contains the entire range of weights and styles. This means fewer HTTP requests, smaller page sizes, and the ability to use any weight — not just the predefined steps." },
      { body: "Optical sizing, a feature of variable fonts, adjusts letter spacing and stroke contrast based on size. Text designed for 12px has different proportions than text designed for 72px. Variable fonts handle this automatically." },
      { heading: "Pairing strategy", body: "For most products, one typeface is enough. If you need a second, use it sparingly — headings vs. body, or UI vs. content. The safest pairing is two weights of the same family. The riskiest is two different typefaces with similar proportions." },
    ],
  },
  "seo-agencies": {
    title: "SEO for Creative Agencies: Stop Ignoring It",
    category: "SEO", date: "Apr 22, 2026", readTime: "5 min",
    author: "Lena Morris", initials: "LM", role: "Design Lead",
    gradient: "from-emerald-400 to-green-600",
    excerpt: "Why most creative agencies have terrible organic presence — and how to fix it in 90 days.",
    content: [
      { body: "Here's the irony: creative agencies build beautiful websites for clients but often have terrible SEO themselves. We've seen award-winning studios with no meta descriptions, broken sitemaps, and homepage-only indexing. The cobbler's children have no shoes." },
      { heading: "Why agencies ignore SEO", body: "The reason is cultural, not technical. Creative agencies value visual impact and originality. SEO feels like the opposite — formulaic, constrained, uncreative. But this is a false dichotomy. The best SEO is invisible; it enhances the creative work without compromising it." },
      { body: "The real cost of ignoring SEO is opportunity loss. A studio that ranks for 'web design agency Hyderabad' or 'SaaS design company' generates warm leads while they sleep. A studio that relies entirely on referrals and cold outreach is always one dry month from a crisis." },
      { heading: "The 90-day fix", body: "Month 1: Technical foundation. Fix meta tags, generate a sitemap, ensure mobile responsiveness, add alt text to all images, implement structured data. These are one-time fixes that take 20-40 hours." },
      { body: "Month 2: Content. Write 4-6 service pages with real descriptions, create case studies with detailed narratives, add a blog with monthly posts. Content quality matters more than quantity." },
      { body: "Month 3: Authority. Submit to design directories (Clutch, Dribbble, Behance), get listed on local business directories, request client reviews, share case studies on social media. Backlinks from authoritative sources boost domain authority." },
      { heading: "Measuring success", body: "Track three metrics: organic impressions (are more people seeing you?), organic clicks (are they visiting?), and form submissions from organic traffic (are they converting?). Ignore vanity metrics like total visitors — what matters is the quality of traffic." },
    ],
  },
  "dark-mode": {
    title: "Dark Mode Done Right",
    category: "UI/UX", date: "Apr 5, 2026", readTime: "7 min",
    author: "Anna Reeves", initials: "AR", role: "Lead Designer & Co-founder",
    gradient: "from-slate-600 to-zinc-800",
    excerpt: "The design decisions that separate a thoughtful dark mode from a quick color inversion.",
    content: [
      { body: "Dark mode is not 'light mode with inverted colors.' It's a fundamentally different visual environment that requires its own design decisions. Done well, it reduces eye strain, saves battery on OLED screens, and looks premium. Done poorly, it's unreadable." },
      { heading: "The surface hierarchy", body: "In light mode, we use shadows to create depth. In dark mode, shadows are invisible against dark backgrounds. Instead, use lighter surfaces for elevated elements. The background is darkest, cards are slightly lighter, and modals are lighter still. This creates depth through brightness, not shadow." },
      { body: "A common mistake is using pure black (#000) for backgrounds. This creates harsh contrast with white text. Instead, use very dark grays (#121212, #1a1a1a) that feel softer and allow for a more nuanced surface hierarchy." },
      { heading: "Color in dark mode", body: "Saturated colors that look great on white backgrounds can vibrate painfully on dark backgrounds. The fix: reduce saturation by 10-20% for dark mode. A brand blue that's #3B82F6 on white might need to be #60A5FA on dark." },
      { body: "Text color matters enormously. Pure white (#fff) on pure black (#000) is the highest possible contrast ratio — and it's too much for long-form reading. Use off-white (#e5e5e5, #d4d4d4) for body text and brighter white for headings." },
      { heading: "Transitioning between modes", body: "The switch between light and dark mode should be instant — no fade, no animation. Users toggling modes want immediate feedback. The transition should feel like flipping a light switch, not watching a sunset." },
      { body: "Respect the user's system preference with prefers-color-scheme, but always provide a manual toggle. Some users want dark mode during the day and light mode at night. Let them choose." },
    ],
  },
  "pricing-design": {
    title: "How to Price Creative Work",
    category: "Business", date: "Mar 18, 2026", readTime: "6 min",
    author: "Mia Chen", initials: "MC", role: "Strategy Lead",
    gradient: "from-rose-400 to-pink-600",
    excerpt: "A transparent look at how we think about pricing — and why cheap design costs more.",
    content: [
      { body: "Pricing creative work is one of the most uncomfortable conversations in our industry. Studios undercharge because they're afraid of losing projects. Clients overpay because they don't know what things should cost. The result is a market filled with misleading price signals." },
      { heading: "Value-based pricing", body: "The most common pricing models are hourly, fixed-price, and value-based. Hourly pricing punishes efficiency — the faster you work, the less you earn. Fixed-price is better but requires accurate scoping. Value-based pricing ties your fee to the outcome you create." },
      { body: "A website that generates ₹10 lakh in annual revenue is worth more than a website that generates ₹1 lakh. The design effort might be identical, but the value is 10x different. Value-based pricing captures this difference." },
      { heading: "The cost of cheap design", body: "When a client chooses the cheapest option, they're not saving money — they're deferring costs. A poorly designed website needs a redesign sooner. Bad UX loses customers. Inconsistent branding confuses the market. The total cost of cheap design is always higher than the upfront savings." },
      { body: "We've seen clients who spent ₹50,000 on a website that cost them ₹5 lakh in lost conversions over two years. Then they spent ₹3 lakh to redo it properly. Total cost: ₹3.5 lakh. If they'd spent ₹2 lakh initially, they'd have saved ₹1.5 lakh and two years of lost revenue." },
      { heading: "How we structure pricing", body: "We use fixed-price projects because they align incentives. The client knows exactly what they'll pay. We know exactly what we'll deliver. No surprises, no scope creep debates, no hourly tracking." },
      { body: "Our pricing reflects the value of the outcome, not the hours spent. A landing page for a Series B startup converting at 5% is worth more than a landing page for a local business converting at 1%. Same design effort, different pricing." },
    ],
  },
};

export default function BlogArticle() {
  const { slug } = useParams();
  const fallback = slug ? articles[slug] : undefined;
  const [article, setArticle] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) { setLoading(false); return; }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetchBlogPost(slug);
        if (cancelled) return;
        if (res?.post) {
          let content = [];
          try { content = JSON.parse(res.post.content || "[]"); } catch { content = [{ body: res.post.content || "" }]; }
          setArticle({
            title: res.post.title,
            category: res.post.category || "Journal",
            date: res.post.created_at?.slice(0,10) || "",
            readTime: `${Math.max(1, Math.ceil((res.post.content || "").split(/\s+/).length / 200))} min`,
            author: res.post.author || "Aesthetix Studio",
            initials: (res.post.author || "AS").split(" ").map((w:string)=>w[0]).join("").slice(0,2).toUpperCase(),
            role: "Team",
            gradient: "from-violet-400 to-purple-600",
            excerpt: res.post.excerpt || "",
            content,
          });
        }
      } catch {
        // keep fallback
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-background min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-brand" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="bg-background min-h-[60vh] flex items-center justify-center px-5">
        <div className="text-center">
          <h1 className="text-foreground mb-3" style={{ fontSize: "24px", fontWeight: 700 }}>Article not found</h1>
          <p className="text-muted-foreground mb-6" style={{ fontSize: "14px" }}>The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="text-brand hover:underline" style={{ fontSize: "14px" }}>← Back to Journal</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <SEO
        title={article.title}
        description={article.excerpt}
        url={`/blog/${slug}`}
      />
      <section className="border-b border-border py-12 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 no-underline transition-colors" style={{ fontSize:"13px" }}>
            <ArrowLeft className="w-3.5 h-3.5" /> Journal
          </Link>
          <span className="px-2.5 py-1 rounded-full bg-brand-muted text-brand-muted-foreground mb-4 inline-block" style={{ fontSize:"11px", fontWeight:500 }}>{article.category}</span>
          <h1 className="text-foreground mb-4" style={{ fontSize:"clamp(26px,4vw,44px)", fontWeight:800, letterSpacing:"-0.025em", lineHeight:1.15 }}>
            {article.title}
          </h1>
          <p className="text-muted-foreground mb-6" style={{ fontSize:"18px", lineHeight:1.65 }}>{article.excerpt}</p>
          <div className="flex items-center gap-5 border-t border-border pt-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white" style={{ fontSize:"11px", fontWeight:700 }}>{article.initials}</div>
              <div>
                <div className="text-foreground" style={{ fontSize:"13px", fontWeight:600 }}>{article.author}</div>
                <div className="text-muted-foreground" style={{ fontSize:"11px" }}>{article.role}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground" style={{ fontSize:"12px" }}><Calendar className="w-3.5 h-3.5" /> {article.date}</div>
            <div className="flex items-center gap-1 text-muted-foreground" style={{ fontSize:"12px" }}><Clock className="w-3.5 h-3.5" /> {article.readTime} read</div>
          </div>
        </div>
      </section>
      <div className={`h-72 sm:h-96 bg-gradient-to-br ${article.gradient}`} />
      <article className="max-w-3xl mx-auto px-5 sm:px-8 py-16" style={{ fontSize:"17px", lineHeight:1.8, color:"var(--foreground)" }}>
        {article.content.map((block, i) => (
          <div key={i}>
            {i === 0 && (
              <p className="mb-6 pl-5" style={{ color:"var(--muted-foreground)", fontStyle:"italic", borderLeft:"3px solid var(--brand)" }}>
                {block.body}
              </p>
            )}
            {i > 0 && block.heading && (
              <>
                <h2 style={{ fontSize:"22px", fontWeight:700, letterSpacing:"-0.01em", marginBottom:"12px", marginTop:"40px" }}>{block.heading}</h2>
                <p className="mb-5">{block.body}</p>
              </>
            )}
            {i > 0 && !block.heading && (
              <p className="mb-5">{block.body}</p>
            )}
          </div>
        ))}
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
