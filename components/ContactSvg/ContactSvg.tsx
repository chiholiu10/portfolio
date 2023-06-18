import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ContactSVG } from "./Contact.styles";

export const ContactSvg = ({ index, icon }) => {
  const [ref, inView] = useInView();

  const svg_properties = {
    initial: { pathLength: 0 },
    animate: inView && { pathLength: 1 },
    viewport: { once: true },
    fill: "transparent",
    strokeWidth: 13,
    whileInView: "visible",
    stroke: "rgba(255, 255, 255, 0.69)",
    transition: { duration: 2, ease: "easeInOut", delay: index * 0.05 },
  };

  if (index !== undefined && icon !== undefined) {
    return (
      <ContactSVG data-testid={"contactTest" + index}>
        <motion.svg ref={ref} viewBox="0 0 512 512">
          <motion.path {...svg_properties} d={icon[index][index]} />
        </motion.svg>
      </ContactSVG>
    );
  } else {
    return <div data-testid="noContactSvg"></div>;
  }
};
