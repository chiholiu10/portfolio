import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';

interface FramerMotionProps {
  specificTransition?: number;
  hiddenOpacity?: number;
  children?:
  React.ReactNode;
}

export const FadeUpWhenVisible = ({ specificTransition, hiddenOpacity, children }: FramerMotionProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: .8
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: hiddenOpacity || 0, y: "10px" }}
      animate={inView && { opacity: 1, y: "-20px" }}
      transition={{ duration: specificTransition || 1.05 }}
    >
      {children}
    </motion.div>
  );
};

