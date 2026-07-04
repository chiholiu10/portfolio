import { m } from "motion/react";
import { useInView } from "react-intersection-observer";
import { IconPath } from "../Contact/Contact";
import { ContactSVG } from "./Contact.styles";
import { premiumEase } from "../FramerMotions/motion.config";

type ContactSvgProps = {
  index: number;
  icon: IconPath[];
};

export const ContactSvg = ({ index, icon }: ContactSvgProps) => {
  const [ref, inView] = useInView();

  const iconPath = icon?.[index]?.[index];

  const svgProperties = {
    initial: { pathLength: 0 },
    animate: inView ? { pathLength: 1 } : { pathLength: 0 },
    viewport: { once: true },
    fill: "transparent",
    strokeWidth: 13,
    whileInView: "visible",
    stroke: "rgba(255, 255, 255, 0.69)",
    transition: {
      duration: 1.05,
      ease: premiumEase,
      delay: index * 0.035,
    },
  };

  if (!iconPath) {
    return <div data-testid="noContactSvg">No icon available</div>;
  }

  return (
    <ContactSVG data-testid={`contactTest${index}`}>
      <m.svg
        ref={ref}
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <m.path {...svgProperties} d={iconPath} />
      </m.svg>
    </ContactSVG>
  );
};
