import { motion } from "framer-motion";

export const StaggerItem = ({ children }) => {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 10,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      transition={{
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        willChange: "transform, opacity",
      }}
    >
      {children}
    </motion.div>
  );
};
