import { useSkipEntrance } from "@/components/atoms/Motion/RevealSession";
import { m, useReducedMotion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { ContactSVG } from "@/components/atoms/ContactSvg/Contact.styles";
import { premiumEase } from "@/components/atoms/Motion/motion.config";

export type IconPath = Record<number, string>;

type ContactSvgProps = {
  index: number;
  icon: IconPath[];
};

export const ContactSvg = ({ index, icon }: ContactSvgProps) => {
  const [ref, inView] = useInView({ triggerOnce: true });
  const prefersReducedMotion = useReducedMotion();
  const skip = useSkipEntrance();
  const reduceMotion = prefersReducedMotion || skip;

  const iconPath = icon?.[index]?.[index];

  const svgProperties = {
    initial: { pathLength: reduceMotion ? 1 : 0 },
    animate: { pathLength: inView || reduceMotion ? 1 : 0 },
    fill: "transparent",
    strokeWidth: 13,
    stroke: "currentColor",
    transition: {
      duration: reduceMotion ? 0 : 1.05,
      ease: premiumEase,
      delay: reduceMotion ? 0 : index * 0.035,
    },
  };

  if (!iconPath) {
    return (
      <div className="ui-div" data-testid="noContactSvg">
        No icon available
      </div>
    );
  }

  return (
    <ContactSVG data-testid={`contactTest${index}`}>
      <m.svg
        className="ui-svg"
        ref={ref}
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <m.path className="ui-path" {...svgProperties} d={iconPath} />
      </m.svg>
    </ContactSVG>
  );
};
