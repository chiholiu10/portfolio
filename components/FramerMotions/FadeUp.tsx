import { motion } from "framer-motion";
import { useScrollDirection } from "../../hooks/useScrollDirection";

const seen = new Set<string>();

export const FadeUp = ({ id, children }) => {
  const direction = useScrollDirection();

  const shouldAnimate = !seen.has(id);

  const handleEnter = () => {
    if (direction.current === "down" && !seen.has(id)) {
      seen.add(id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: shouldAnimate ? 1 : 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      onViewportEnter={handleEnter}
      viewport={{ once: false, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
};
