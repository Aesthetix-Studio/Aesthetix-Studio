import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 160, damping: 22, mass: 0.35 });
  const springY = useSpring(mouseY, { stiffness: 160, damping: 22, mass: 0.35 });

  const dotLeft = useTransform(mouseX, (x) => x - 4);
  const dotTop = useTransform(mouseY, (y) => y - 4);
  const ringLeft = useTransform(springX, (x) => x - 18);
  const ringTop = useTransform(springY, (y) => y - 18);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full hidden md:block"
        style={{
          width: 8,
          height: 8,
          backgroundColor: "#F0EBE0",
          left: dotLeft,
          top: dotTop,
          mixBlendMode: "difference",
        }}
      />
      <motion.div
        className="pointer-events-none fixed z-[9998] rounded-full hidden md:block"
        style={{
          width: 36,
          height: 36,
          border: "1px solid rgba(240,235,224,0.18)",
          left: ringLeft,
          top: ringTop,
        }}
      />
    </>
  );
}
