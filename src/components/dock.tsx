import { createContext, useContext, useRef, type ReactNode } from "react";

import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";

import { cn } from "@/utils/styles";

const MAGNIFICATION = 60;
const DISTANCE = 140;
const BASE_SIZE = 40;

const MouseXContext = createContext<MotionValue<number> | null>(null);

export function Dock({ className, children }: { className?: string; children: ReactNode }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={event => mouseX.set(event.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn("mx-auto flex h-full w-max items-end rounded-full border p-2", className)}
    >
      <MouseXContext value={mouseX}>{children}</MouseXContext>
    </motion.div>
  );
}

export function DockIcon({ className, children }: { className?: string; children: ReactNode }) {
  const mouseX = useContext(MouseXContext);
  if (!mouseX) {
    throw new Error("DockIcon must be rendered inside Dock");
  }
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, value => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return value - bounds.x - bounds.width / 2;
  });
  const targetWidth = useTransform(
    distance,
    [-DISTANCE, 0, DISTANCE],
    [BASE_SIZE, MAGNIFICATION, BASE_SIZE]
  );
  const width = useSpring(targetWidth, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
