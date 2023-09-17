import { useInView } from "react-intersection-observer"; // 1.9K gzipped
import { SectionPopUp, SectionPopUpText } from "../../styles/General.styles";
import { useOnScreen } from "../../hooks/useIntersectionObserver";
import { useRef } from "react";
// import { motion } from "framer-motion";

export const FadePopup = ({children}) =>{
  const elementRef = useRef(null);
  const { isOnScreen, checkBottomElement} = useOnScreen(elementRef);
  console.log(checkBottomElement, isOnScreen);

  return (
    <SectionPopUp isInView={isOnScreen} bottomElement={checkBottomElement} ref={elementRef}>
    <SectionPopUpText >
    {/* <motion.div
      ref={elementRef}
      whileInView="visible"
      initial={{ opacity: 0, filter: "blur(2px)", y: "10px" }}
      animate={isOnScreen && { position: "absolute", bottom: "50px"}}
      transition={{ duration: 0.8 }}
    > */}
      {children}
      {/* </motion.div> */}
    </SectionPopUpText>
  </SectionPopUp>
  )
};