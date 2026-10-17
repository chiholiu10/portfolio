import { m } from "motion/react";
import type { ReactNode } from "react";
import { useScrollReveal } from "@/components/atoms/Motion/useScrollReveal";

type FadeUpProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

export const FadeUp = ({ id, children, className }: FadeUpProps) => {
  const { ref, style } = useScrollReveal<HTMLDivElement>();
  return (
    <m.div
      className={["ui-div", className].filter(Boolean).join(" ")}
      id={id}
      ref={ref}
      style={style}
    >
      {children}
    </m.div>
  );
};
