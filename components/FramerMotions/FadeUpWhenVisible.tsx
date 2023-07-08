import { motion, useScroll } from "framer-motion";
import React from "react";
import { useInView } from "react-intersection-observer";

interface FramerMotionProps {
  children?: React.ReactNode;
}

export const FadeUpWhenVisible = ({ children }: FramerMotionProps) => {
  const { ref, inView } = useInView({
    threshold: 0.8,
  });

  return (
    <motion.div
      ref={ref}
      whileInView="visible"
      viewport={{ once: true }}
      initial={{ opacity: 0, filter: "blur(2px)", y: "10px" }}
      animate={inView && { opacity: 1, filter: "blur(0)", y: "-20px" }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};
