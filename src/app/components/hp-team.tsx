import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { studio, collaborators, studioStats } from "../../content";

export function HPTeam() {
  return (
    <section className="bg-background py-20 sm:py-28 border-b border-border/60">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section header */}
        <div className="max-w-xl mb-14">
          <div className="inline-block px-3 py-1 rounded-full border border-border bg-card text-muted-foreground mb-4" style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
            The Studio
          </div>
          <h2
            className="text-foreground"
            style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.2 }}
          >
            An independent studio with
            <br />
            <span className="text-muted-foreground">a network of specialists.</span>
          </h2>
        </div>

        {/* Founder card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <div className="bg-card rounded-2xl border border-border p-8 sm:p-10 hover:shadow-md transition-shadow duration-200">
            <div className="grid sm:grid-cols-[auto_1fr] gap-8 items-start">
              {/* Avatar + name */}
              <div className="flex flex-col items-center sm:items-start gap-4">
                <div className="w-20 h-20 rounded-2xl bg-brand/10 flex items-center justify-center border border-brand/20">
                  <span className="text-brand" style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.02em' }}>
                    {studio.initials}
                  </span>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-foreground" style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em' }}>
                    {studio.name}
                  </h3>
                  <p className="text-muted-foreground" style={{ fontSize: '13px' }}>
                    {studio.role}
                  </p>
                </div>
              </div>

              {/* Bio + stats */}
              <div>
                <p className="text-muted-foreground mb-6" style={{ fontSize: '15px', lineHeight: 1.7 }}>
                  {studio.bio}
                </p>
                <div className="flex flex-wrap gap-6">
                  {studioStats.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-foreground" style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em' }}>
                        {stat.value}
                      </div>
                      <div className="text-muted-foreground" style={{ fontSize: '12px', fontWeight: 500 }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Collaborator grid */}
        <div className="grid sm:grid-cols-3 gap-4">
          {collaborators.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="bg-card rounded-2xl border border-border p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl ${member.color} flex items-center justify-center`}>
                  <span className="text-white" style={{ fontSize: '11px', fontWeight: 700 }}>
                    {member.initials}
                  </span>
                </div>
                <div>
                  <div className="text-foreground" style={{ fontSize: '14px', fontWeight: 700 }}>
                    {member.name}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground" style={{ fontSize: '13px', lineHeight: 1.6 }}>
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* About link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            style={{ fontSize: '13px', fontWeight: 600 }}
          >
            Learn more about our story
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
