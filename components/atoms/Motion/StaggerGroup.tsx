import { useSkipEntrance } from "@/components/atoms/Motion/RevealSession";
import { m } from "motion/react";

export const StaggerGroup = ({ children, stagger = 0.08 }) => {
  const skip = useSkipEntrance();
  return (
    <m.div
      initial="hidden"
      animate={skip ? "visible" : undefined}
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
            staggerChildren: skip ? 0 : stagger,
            delayChildren: skip ? 0 : 0.04,
          },
        },
      }}
    >
      {children}
    </m.div>
  );
};
