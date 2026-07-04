import { motion } from "motion/react";
import { Award, Shield, Star, Trophy, BadgeCheck, Gem } from "lucide-react";

const awards = [
  {
    icon: Trophy,
    title: "Clutch Top Agency",
    subtitle: "Verified Reviews",
    description: "4.9/5 rating on Clutch with verified client reviews",
    link: "https://www.clutch.co/profile/aesthetix-studio",
  },
  {
    icon: Star,
    title: "Dribbble Featured",
    subtitle: "Design Excellence",
    description: "Featured shots with 10k+ views on Dribbble",
    link: "https://dribbble.com/aesthetix-studio",
  },
  {
    icon: Award,
    title: "Behance Featured",
    subtitle: "Curated Work",
    description: "Selected projects featured on Behance's main gallery",
    link: "https://behance.net/aesthetix-studio",
  },
  {
    icon: Shield,
    title: "WCAG AA Certified",
    subtitle: "Accessibility",
    description: "Accessible by design — WCAG 2.1 AA compliance",
    link: null,
  },
  {
    icon: BadgeCheck,
    title: "Google Partner",
    subtitle: "Certified",
    description: "Google Ads and Analytics certified professionals",
    link: null,
  },
  {
    icon: Gem,
    title: "Awwwards Nominee",
    subtitle: "Web Excellence",
    description: "Nominated for web design excellence awards",
    link: null,
  },
];

export function HPAwards() {
  return (
    <section className="bg-card py-14 border-b border-border/60">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35 }}
          className="text-center mb-10"
        >
          <p className="text-muted-foreground" style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Recognized by industry leaders
          </p>
        </motion.div>

        {/* Awards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {awards.map((award, i) => {
            const Wrapper = award.link ? "a" : "div";
            const wrapperProps = award.link ? { href: award.link, target: "_blank", rel: "noopener noreferrer" } : {};
            return (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Wrapper
                  {...wrapperProps}
                  className="group block text-center p-4 rounded-xl border border-border bg-background hover:shadow-md hover:border-border/80 transition-all duration-200 no-underline"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-brand/15 transition-colors">
                    <award.icon className="w-5 h-5 text-brand" />
                  </div>
                  <div className="text-foreground mb-0.5" style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '-0.01em' }}>
                    {award.title}
                  </div>
                  <div className="text-muted-foreground" style={{ fontSize: '11px' }}>
                    {award.subtitle}
                  </div>
                </Wrapper>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
