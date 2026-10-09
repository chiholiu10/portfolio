import { useSkipEntrance } from "@/components/atoms/Motion/RevealSession";
import { m } from "motion/react";
import { premiumEase } from "@/components/atoms/Motion/motion.config";

export const StaggerItem = ({ children }) => {
  const skip = useSkipEntrance();
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
        duration: skip ? 0 : 0.72,
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
