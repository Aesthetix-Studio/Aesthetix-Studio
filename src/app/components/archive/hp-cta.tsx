import { motion } from "motion/react";
import { ArrowRight, Calendar, MessageSquare } from "lucide-react";
import { Link } from "react-router";

const offerings = [
  {
    icon: Calendar,
    title: "Discovery Call",
    desc: "30 minutes. No pitch, no pressure. We talk about your goals and figure out if we're the right fit.",
    cta: "Book a call",
    to: "/discovery-call",
  },
  {
    icon: MessageSquare,
    title: "Send a Brief",
    desc: "Have a detailed project in mind? Send us your brief and we'll come back with a full proposal within 48 hours.",
    cta: "Submit brief",
    to: "/inquiry",
  },
];

export function HPFinalCTA() {
  return (
    <section className="bg-foreground py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: headline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <div
              className="mb-4"
              style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(243,243,241,0.4)' }}
            >
              Let's work together
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-family-display)',
                fontSize: 'clamp(30px, 4.5vw, 52px)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: '#F3F3F1',
              }}
            >
              Ready to build something
              <br />
              <span style={{ color: 'var(--brand)' }}>worth talking about?</span>
            </h2>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'rgba(243,243,241,0.55)', marginTop: '20px', maxWidth: '420px' }}>
              We take on a limited number of new projects each quarter to protect the quality of our work. Spots for Q3 2026 are filling up.
            </p>

            {/* Urgency signal */}
            <div className="flex items-center gap-3 mt-8">
              <div className="flex -space-x-2">
                {["SC", "MW", "PN"].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-foreground bg-brand/80 flex items-center justify-center" style={{ fontSize: '10px', fontWeight: 700, color: 'white' }}>
                    {i}
                  </div>
                ))}
              </div>
              <span style={{ fontSize: '14px', color: 'rgba(243,243,241,0.5)' }}>
                2 of 4 Q3 spots remaining
              </span>
            </div>
          </motion.div>

          {/* Right: action cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-4"
          >
            {offerings.map(({ icon: Icon, title, desc, cta, to }) => (
              <Link
                key={title}
                to={to}
                className="group block p-6 rounded-lg border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/8 transition-all duration-180 ease-standard no-underline"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-white/70" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white mb-1" style={{ fontSize: '16px', fontWeight: 600 }}>{title}</div>
                    <p className="text-white/50 mb-4" style={{ fontSize: '14px', lineHeight: '1.6' }}>{desc}</p>
                    <div className="flex items-center gap-2 text-brand group-hover:gap-3 transition-all duration-180" style={{ fontSize: '14px', fontWeight: 600 }}>
                      {cta}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            <p style={{ fontSize: '13px', color: 'rgba(243,243,241,0.30)', paddingTop: '8px', textAlign: 'center' }}>
              Typical response time: under 4 business hours
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
