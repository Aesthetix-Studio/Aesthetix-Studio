import { Star, ExternalLink } from "lucide-react";

const logos = ["Luminary", "Verdant", "Solari", "Nexus", "Helix", "Orbit", "Capsule", "Meridian"];

const reviewPlatforms = [
  { name: "Clutch", rating: "4.9", reviews: "50+", url: "https://www.clutch.co/profile/aesthetix-studio" },
  { name: "Google", rating: "4.8", reviews: "30+", url: "https://www.google.com/maps" },
];

export function HPTrustStrip() {
  return (
    <section className="bg-card border-b border-border/60 py-6">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          {/* Rating with links */}
          <div className="flex items-center gap-3 shrink-0">
            {reviewPlatforms.map((platform, i) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 group"
                title={`View our ${platform.name} reviews`}
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-foreground group-hover:text-brand transition-colors" style={{ fontSize: "12px", fontWeight: 600 }}>
                  {platform.rating}
                </span>
                <span className="text-muted-foreground" style={{ fontSize: "11px" }}>
                  ({platform.reviews})
                </span>
                <ExternalLink className="w-2.5 h-2.5 text-muted-foreground/40 group-hover:text-muted-foreground/70 transition-colors" />
                {i < reviewPlatforms.length - 1 && <span className="text-muted-foreground/30 mx-1">·</span>}
              </a>
            ))}
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
