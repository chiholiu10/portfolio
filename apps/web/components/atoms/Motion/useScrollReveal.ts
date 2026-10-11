import { useEffect, useRef } from "react";
import {
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { observeScrollReveal } from "@/components/atoms/Motion/scroll-reveal-scheduler";

/** Scroll controls the reveal from 70% to 50% of the viewport height. */
export function useScrollReveal<Element extends HTMLElement>(
  staggerIndex = 0,
  { once = false }: { once?: boolean } = {},
) {
  const ref = useRef<Element>(null);
  const reduceMotion = useReducedMotion();
  const scrollYProgress = useMotionValue(0);
  const targetProgress = useTransform(
    scrollYProgress,
    [Math.min(staggerIndex * 0.08, 0.24), 1],
    [0, 1],
  );
  const smoothedProgress = useSpring(targetProgress, {
    stiffness: 280,
    damping: 34,
    mass: 0.35,
    restDelta: 0.001,
  });
  // Keep the established completion point even during a fast scroll.
  const progress = useTransform(() =>
    targetProgress.get() >= 1 ? 1 : smoothedProgress.get(),
  );
  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const y = useTransform(progress, [0, 1], [18, 0]);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (reduceMotion) {
      scrollYProgress.set(1);
      return;
    }
    return observeScrollReveal(element, {
      once,
      offset: () => y.get(),
      update: (value) => scrollYProgress.set(value),
    });
  }, [once, reduceMotion, scrollYProgress, y]);
  return {
    ref,
    progress,
    reduceMotion,
    style: reduceMotion ? { opacity: 1, y: 0 } : { opacity, y },
  };
}
