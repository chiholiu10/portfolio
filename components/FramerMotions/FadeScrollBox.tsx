import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const BoxVariants = {
  visible: { opacity: 1, y: 150, transition: { duration: 2 } },
  hidden: { opacity: 0, y: 50 },
};

export const FadeScrollBox = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={BoxVariants}
    >
      {children}
    </motion.div>
  );
};
