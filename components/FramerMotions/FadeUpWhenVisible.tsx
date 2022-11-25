import { motion } from "framer-motion";
import React, { Children, FC } from "react";
import { useInView } from "react-intersection-observer";

interface FramerMotionProps {
  children?: React.ReactNode;
}

export const FadeUpWhenVisible = ({ children }: FramerMotionProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.8,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: "10px" }}
      animate={inView && { opacity: 1, y: "-20px" }}
      transition={{ duration: 1.05 }}
    >
      {children}
    </motion.div>
  );
};
