import { motion } from "framer-motion";
import React from "react";
import { useInView } from "react-intersection-observer";

interface FramerMotionProps {
  children?: React.ReactNode;
}

export const FadeRightToLeft = ({ children }: FramerMotionProps) => {
  const { ref, inView } = useInView({
    threshold: 0.8,
  });

  return (
    <motion.div
        ref={ref}
        viewport={{ once: true }}
        animate={{ opacity: [0, 0.5, 0.9, 1], x: ["200px", "70px",  "30px", "0px"], color: ["#000000", "#000000", "#808080", "#FFFFFF"] }}
        transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};
