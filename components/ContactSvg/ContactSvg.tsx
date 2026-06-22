import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { IconPath } from "../Contact/Contact";
import { ContactSVG } from "./Contact.styles";

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
      duration: 2,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: index * 0.05,
    },
  };

  if (!iconPath) {
    return <div data-testid="noContactSvg">No icon available</div>;
  }

  return (
    <ContactSVG data-testid={`contactTest${index}`}>
      <motion.svg
        ref={ref}
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path {...svgProperties} d={iconPath} />
      </motion.svg>
    </ContactSVG>
  );
};
