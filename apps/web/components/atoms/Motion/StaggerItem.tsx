import type { PropsWithChildren } from "react";
import { m } from "motion/react";
import { useScrollReveal } from "@/components/atoms/Motion/useScrollReveal";

export const StaggerItem = ({
  children,
  index = 0,
}: PropsWithChildren<{ index?: number }>) => {
  const { ref, style } = useScrollReveal<HTMLDivElement>(index);
  return (
    <m.div className="ui-div" ref={ref} style={style}>
      {children}
    </m.div>
  );
};
