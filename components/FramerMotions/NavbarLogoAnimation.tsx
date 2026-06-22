import { motion } from "framer-motion";

export const NavbarLogoAnimation = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ display: "flex", alignItems: "center" }}
    >
      {children}
    </motion.div>
  );
};
