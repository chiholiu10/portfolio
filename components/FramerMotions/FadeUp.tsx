// components/Animations/FadeUp.tsx
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React, { useEffect, useState, useRef } from "react";

const animatedIds = new Set<string>();

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
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold,
    rootMargin,
  });

  const [hasAnimated, setHasAnimated] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const lastScrollY = useRef(0);

  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY.current ? "down" : "up");
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check of deze ID al eerder is geanimeerd
  useEffect(() => {
    if (animatedIds.has(id)) {
      setHasAnimated(true);
    }
  }, [id]);

  useEffect(() => {
    if (
      !inView ||
      hasAnimated ||
      animatedIds.has(id) ||
      scrollDirection !== "down"
    ) {
      return;
    }

    const timer = setTimeout(() => {
      setHasAnimated(true);
      animatedIds.add(id);
    }, 100);

    /* eslint-disable consistent-return */
    return () => clearTimeout(timer);
  }, [inView, hasAnimated, id, scrollDirection]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={{
        opacity: hasAnimated ? 1 : 0,
        y: hasAnimated ? 0 : 40,
      }}
      transition={{
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        delay: hasAnimated ? delay : 0,
      }}
      style={{
        willChange: "transform, opacity",
      }}
    >
      {children}
    </motion.div>
  );
};
