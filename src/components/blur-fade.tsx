import type { ReactNode } from "react";

import { motion } from "motion/react";

import { cn } from "@/utils/styles";

export function BlurFade({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ y: 6, opacity: 0, filter: "blur(6px)" }}
      animate={{ y: -6, opacity: 1, filter: "blur(0px)" }}
      transition={{ delay: 0.04 + delay, duration: 0.4, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function BlurFadeText({
  text,
  className,
  delay = 0,
  yOffset = 8,
}: {
  text: string;
  className?: string;
  delay?: number;
  yOffset?: number;
}) {
  return (
    <div className="flex">
      <motion.span
        initial={{ y: yOffset, opacity: 0, filter: "blur(8px)" }}
        animate={{ y: -yOffset, opacity: 1, filter: "blur(0px)" }}
        transition={{ delay, ease: "easeOut" }}
        className={cn("inline-block", className)}
      >
        {text}
      </motion.span>
    </div>
  );
}
