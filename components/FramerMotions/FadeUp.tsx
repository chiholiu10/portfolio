import { m } from "motion/react";
import React from "react";
import { premiumEase } from "./motion.config";

type FadeUpProps = {
  id: string;
  children: React.ReactNode;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
};

export const FadeUp = ({
  id,
  children,
  delay = 0,
  threshold = 0.25,
  rootMargin = "-80px 0px -80px 0px",
}: FadeUpProps) => {
  return (
    <m.div
      id={id}
      initial={{ opacity: 0, y: 24, scale: 0.99 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: threshold, margin: rootMargin }}
      transition={{
        duration: 0.82,
        ease: premiumEase,
        delay,
      }}
      style={{
        willChange: "transform, opacity",
      }}
    >
      {children}
    </m.div>
  );
};
