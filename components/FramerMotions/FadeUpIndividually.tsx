import { motion } from "framer-motion";

export const FadeUpIndividually = ({ time, children }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 1.1, delay: time * 0.35 }}
    variants={{
      visible: { opacity: 1 },
      hidden: { opacity: 0 }
    }}
  >
    {children}
  </motion.div>
);