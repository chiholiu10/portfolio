import { m } from "motion/react";
import { premiumSpring } from "./motion.config";

export const NavbarLogoAnimation = ({ children }) => {
  return (
    <m.div
      initial={{ opacity: 0, y: -6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={premiumSpring}
      style={{ display: "flex", alignItems: "center" }}
    >
      {children}
    </m.div>
  );
};
