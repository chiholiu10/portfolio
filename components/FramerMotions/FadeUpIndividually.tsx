import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const FadeUpIndividually = ({ time, children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }

    return () => {
      controls.stop();
    };
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 1.4, delay: time * 0.25 }}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0.1 },
      }}
    >
      {children}
    </motion.div>
  );
};
