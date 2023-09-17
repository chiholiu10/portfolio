import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface FramerMotionProps {
  children?: React.ReactNode;
}

export const FadeRightToLeft = ({ children }: FramerMotionProps) => {
  const { ref } = useInView({
    threshold: 0.8,
  });

  return (
    <motion.div
        ref={ref}
        viewport={{ once: true }}
        animate={{ opacity: [0, 0.7, 0.9, 1], x: ["300px", "70px",  "30px", "0px"], color: ["#000000", "#000000", "#808080", "#FFFFFF"] }}
        transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};
