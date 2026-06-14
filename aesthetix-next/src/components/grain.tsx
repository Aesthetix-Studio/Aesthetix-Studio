"use client";
export function GrainOverlay() {
  return (
    <>
      <style>{`
        @keyframes ae-grain {
          0%, 100% { transform: translate(0px, 0px); }
          10%       { transform: translate(-6px, -10px); }
          20%       { transform: translate(9px, 5px); }
          30%       { transform: translate(-4px, 8px); }
          40%       { transform: translate(10px, -5px); }
          50%       { transform: translate(-7px, 7px); }
          60%       { transform: translate(5px, -8px); }
          70%       { transform: translate(-10px, 5px); }
          80%       { transform: translate(7px, 11px); }
          90%       { transform: translate(-5px, -7px); }
        }
        .ae-grain-anim {
          animation: ae-grain 0.55s steps(1, end) infinite;
          will-change: transform;
        }
      `}</style>
      <div
        className="pointer-events-none fixed inset-0 z-[99] overflow-hidden"
        style={{ mixBlendMode: "overlay" }}
      >
        <div
          className="ae-grain-anim absolute"
          style={{ inset: "-50%", width: "200%", height: "200%" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <filter id="ae-noise-f">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect
              width="100%"
              height="100%"
              fill="white"
              filter="url(#ae-noise-f)"
              opacity="0.11"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
