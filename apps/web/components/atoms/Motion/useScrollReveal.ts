import { useRef } from "react";
import {
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

/** Scroll controls the reveal from 70% to 50% of the viewport height. */
export function useScrollReveal<Element extends HTMLElement>(staggerIndex = 0) {
  const ref = useRef<Element>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "start 0.5"],
  });
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
  return {
    ref,
    progress,
    reduceMotion,
    style: reduceMotion ? { opacity: 1, y: 0 } : { opacity, y },
  };
}
