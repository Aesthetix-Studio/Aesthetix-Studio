import {
  useState,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type MouseEvent,
} from "react";

const MAGNETIC_TRANSITION =
  "transform 180ms cubic-bezier(0.16,1,0.3,1), background-color 220ms ease, color 220ms ease, border-color 220ms ease, opacity 220ms ease";

function getMagneticTransform(
  event: MouseEvent<HTMLElement>,
  strength: number,
) {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width - 0.5) * strength;
  const y = ((event.clientY - rect.top) / rect.height - 0.5) * strength * 0.7;

  return `translate3d(${x}px, ${y}px, 0)`;
}

function canUseMagnetism() {
  return window.matchMedia("(pointer: fine)").matches;
}

function mergeMagneticStyle(
  style: CSSProperties | undefined,
  transform: string,
) {
  return {
    ...style,
    transform,
    transition: MAGNETIC_TRANSITION,
    willChange: "transform",
  };
}

type MagneticAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  strength?: number;
};

export function MagneticAnchor({
  strength = 7,
  style,
  onMouseMove,
  onMouseLeave,
  children,
  ...props
}: MagneticAnchorProps) {
  const [transform, setTransform] = useState("translate3d(0, 0, 0)");

  return (
    <a
      {...props}
      style={mergeMagneticStyle(style, transform)}
      onMouseMove={(event) => {
        onMouseMove?.(event);
        if (canUseMagnetism()) {
          setTransform(getMagneticTransform(event, strength));
        }
      }}
      onMouseLeave={(event) => {
        onMouseLeave?.(event);
        setTransform("translate3d(0, 0, 0)");
      }}
    >
      {children}
    </a>
  );
}

type MagneticButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  strength?: number;
};

export function MagneticButton({
  strength = 7,
  style,
  onMouseMove,
  onMouseLeave,
  children,
  ...props
}: MagneticButtonProps) {
  const [transform, setTransform] = useState("translate3d(0, 0, 0)");

  return (
    <button
      {...props}
      style={mergeMagneticStyle(style, transform)}
      onMouseMove={(event) => {
        onMouseMove?.(event);
        if (canUseMagnetism()) {
          setTransform(getMagneticTransform(event, strength));
        }
      }}
      onMouseLeave={(event) => {
        onMouseLeave?.(event);
        setTransform("translate3d(0, 0, 0)");
      }}
    >
      {children}
    </button>
  );
}
