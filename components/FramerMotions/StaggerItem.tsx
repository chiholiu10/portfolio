import { m } from "motion/react";
import { premiumEase } from "./motion.config";

export const StaggerItem = ({ children }) => {
  return (
    <m.div
      variants={{
        hidden: {
          opacity: 0,
          y: 18,
          scale: 0.985,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
        },
      }}
      transition={{
        duration: 0.72,
        ease: premiumEase,
      }}
      style={{
        willChange: "transform, opacity",
      }}
    >
      {children}
    </m.div>
  );
};
