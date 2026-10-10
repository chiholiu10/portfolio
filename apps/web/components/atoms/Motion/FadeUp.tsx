import { m } from "motion/react";
import type { ReactNode } from "react";
import { useScrollReveal } from "@/components/atoms/Motion/useScrollReveal";

type FadeUpProps = { id: string; children: ReactNode };

export const FadeUp = ({ id, children }: FadeUpProps) => {
  const { ref, style } = useScrollReveal<HTMLDivElement>();
  return (
    <m.div className="ui-div" id={id} ref={ref} style={style}>
      {children}
    </m.div>
  );
};
