/**
 * Aesthetix Studio — Custom logo mark
 * A 4-pointed sparkle star with concave sides.
 * Inspired by premium creative studio identity systems.
 * Works at any size from 12px to full display scale.
 */

interface AesthetixMarkProps {
  size?: number;
  className?: string;
  color?: string;
  gradient?: boolean;
}

let gradientIdCounter = 0;

export function AesthetixMark({ size = 24, className = "", color = "currentColor", gradient = false }: AesthetixMarkProps) {
  const gradientId = `spark-gradient-${++gradientIdCounter}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {gradient && (
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
      )}
      {/* 4-pointed sparkle star — concave cubic bezier sides */}
      <path
        d="M12 1.5
           C 12.9 7.1 16.9 11.1 22.5 12
           C 16.9 12.9 12.9 16.9 12 22.5
           C 11.1 16.9 7.1 12.9 1.5 12
           C 7.1 11.1 11.1 7.1 12 1.5 Z"
        fill={gradient ? `url(#${gradientId})` : color}
      />
    </svg>
  );
}

/** Wordmark — mark + logotype, for nav headers */
interface AesthetixWordmarkProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  inverted?: boolean;
}

export function AesthetixWordmark({ size = "md", className = "", inverted = false }: AesthetixWordmarkProps) {
  const containerH = { sm: "h-5", md: "h-6", lg: "h-8" }[size];
  const markSize = { sm: 16, md: 20, lg: 28 }[size];
  const textSize = { sm: "12px", md: "15px", lg: "20px" }[size];
  const textColor = inverted ? "rgba(255,255,255,0.9)" : "var(--foreground)";
  const mutedColor = inverted ? "rgba(255,255,255,0.45)" : "var(--muted-foreground)";
  const markColor = inverted ? "rgba(255,255,255,0.9)" : "var(--foreground)";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <AesthetixMark size={markSize} color={markColor} />
      <span style={{ fontSize: textSize, fontWeight: 700, letterSpacing: "-0.01em", color: textColor, fontFamily: "'Plus Jakarta Sans','Inter',system-ui,sans-serif", lineHeight: 1 }}>
        Aesthetix<span style={{ fontWeight: 400, color: mutedColor }}> Studio</span>
      </span>
    </div>
  );
}

/** Icon-only badge, for small containers like sidebars */
interface AesthetixBadgeProps {
  size?: number;
  className?: string;
}

export function AesthetixBadge({ size = 28, className = "" }: AesthetixBadgeProps) {
  const markSize = Math.round(size * 0.55);
  const radius = Math.round(size * 0.28);
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      <AesthetixMark size={size} gradient />
    </div>
  );
}
