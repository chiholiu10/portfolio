import { useSkipEntrance } from "@/components/atoms/Motion/RevealSession";
import { m } from "motion/react";
import { premiumSpring } from "@/components/atoms/Motion/motion.config";

export const NavbarLogoAnimation = ({ children }) => {
  const skip = useSkipEntrance();
  return (
    <m.div
      initial={{ opacity: 0, y: -6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={skip ? { duration: 0 } : premiumSpring}
      style={{ display: "flex", alignItems: "center" }}
    >
      {children}
    </m.div>
  );
};
