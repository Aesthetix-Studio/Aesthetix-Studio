import { motion } from "motion/react";
import { Play, Star, Quote } from "lucide-react";

const videoTestimonials = [
  {
    id: 1,
    quote: "Aesthetix didn't just build us a website — they built us a sales machine. Our conversion rate went from 2.1% to 6.8% in the first month.",
    name: "Sarah Chen",
    role: "CEO, Luminary Financial",
    initials: "SC",
    avatarColor: "bg-violet-500",
    company: "Luminary Financial",
    stars: 5,
    duration: "2:34",
    gradient: "from-violet-500 via-purple-600 to-blue-600",
  },
  {
    id: 2,
    quote: "The strategy session alone was worth the entire engagement. They challenged our assumptions and helped us see opportunities we'd completely missed.",
    name: "Marcus Webb",
    role: "Founder, Solari Energy",
    initials: "MW",
    avatarColor: "bg-amber-500",
    company: "Solari Energy",
    stars: 5,
    duration: "1:58",
    gradient: "from-amber-300 via-orange-400 to-rose-500",
  },
  {
    id: 3,
    quote: "Our organic traffic went up 148% in four months. More importantly, the leads actually convert — because the site speaks to the right audience.",
    name: "Priya Nair",
    role: "Head of Marketing, Helix Medical",
    initials: "PN",
    avatarColor: "bg-rose-500",
    company: "Helix Medical",
    stars: 5,
    duration: "2:12",
    gradient: "from-rose-500 via-pink-600 to-purple-700",
  },
];

function VideoCard({ testimonial, index }: { testimonial: typeof videoTestimonials[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
    >
      <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
        {/* Video thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient}`} />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
          
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300 cursor-pointer">
              <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
            </div>
          </div>

          {/* Duration badge */}
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm">
            <span className="text-white" style={{ fontSize: '11px', fontWeight: 600 }}>{testimonial.duration}</span>
          </div>

          {/* Verified badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/30 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-white" style={{ fontSize: '10px', fontWeight: 600 }}>Verified Client</span>
          </div>
        </div>

        {/* Quote + attribution */}
        <div className="p-6">
          {/* Stars */}
          <div className="flex gap-0.5 mb-3">
            {[...Array(testimonial.stars)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>

          {/* Quote */}
          <div className="relative mb-5">
            <Quote className="absolute -top-1 -left-1 w-4 h-4 text-muted-foreground/20" />
            <p className="text-foreground pl-4" style={{ fontSize: '14px', lineHeight: '1.7', fontStyle: 'italic' }}>
              "{testimonial.quote}"
            </p>
          </div>

          {/* Attribution */}
          <div className="flex items-center gap-3 pt-4 border-t border-border/50">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0 ${testimonial.avatarColor}`}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>{testimonial.initials}</span>
            </div>
            <div>
              <div className="text-foreground" style={{ fontSize: '13px', fontWeight: 600 }}>{testimonial.name}</div>
              <div className="text-muted-foreground" style={{ fontSize: '12px' }}>{testimonial.role}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function HPVideoTestimonials() {
  return (
    <section className="bg-secondary/30 py-20 sm:py-28 border-b border-border/60">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-xl mb-12">
          <div className="inline-block px-3 py-1 rounded-full border border-border bg-background text-muted-foreground mb-4" style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
            Video Testimonials
          </div>
          <h2
            className="text-foreground"
            style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.2 }}
          >
            Hear it directly
            <br />
            <span className="text-muted-foreground">from our clients.</span>
          </h2>
          <p className="text-muted-foreground mt-4" style={{ fontSize: '15px', lineHeight: 1.6 }}>
            Real stories from real founders. No scripts, no edits — just honest feedback about working with us.
          </p>
        </div>

        {/* Video cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {videoTestimonials.map((testimonial, i) => (
            <VideoCard key={testimonial.id} testimonial={testimonial} index={i} />
          ))}
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center justify-center gap-6 mt-12 pt-8 border-t border-border/60"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1">
              {["SC", "MW", "PN"].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full border border-background bg-brand/80 flex items-center justify-center" style={{ fontSize: '8px', fontWeight: 700, color: 'white' }}>
                  {i}
                </div>
              ))}
            </div>
            <span className="text-muted-foreground" style={{ fontSize: '12px' }}>
              200+ happy clients
            </span>
          </div>
          <div className="w-px h-4 bg-border" />
          <span className="text-muted-foreground" style={{ fontSize: '12px' }}>
            4.9/5 average rating
          </span>
        </motion.div>
      </div>
    </section>
  );
}
