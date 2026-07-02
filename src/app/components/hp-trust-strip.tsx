import { Star } from "lucide-react";

const logos = ["Luminary", "Verdant", "Solari", "Nexus", "Helix", "Orbit", "Capsule", "Meridian"];

export function HPTrustStrip() {
  return (
    <section className="bg-card border-b border-border/60 py-6">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          {/* Rating */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-foreground" style={{ fontSize: "13px", fontWeight: 600 }}>4.9</span>
            <span className="text-muted-foreground" style={{ fontSize: "12px" }}>/ 200+ reviews</span>
          </div>

          <div className="hidden sm:block w-px h-5 bg-border" />

          <p className="text-muted-foreground shrink-0" style={{ fontSize: "12px", fontWeight: 500 }}>
            Trusted by 80+ growing businesses
          </p>

          <div className="hidden sm:block w-px h-5 bg-border" />

          {/* Logo names */}
          <div className="flex items-center gap-5 flex-wrap justify-center sm:justify-start overflow-hidden">
            {logos.map((name) => (
              <span
                key={name}
                className="text-muted-foreground/45 hover:text-muted-foreground/70 transition-colors"
                style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "-0.01em" }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
