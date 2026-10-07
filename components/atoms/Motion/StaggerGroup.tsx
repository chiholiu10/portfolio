import { m } from "motion/react";

export const StaggerGroup = ({ children, stagger = 0.08 }) => {
  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.1,
        margin: "-50px 0px -50px 0px",
      }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: 0.04,
          },
        },
      }}
    >
      {children}
    </m.div>
  );
};
