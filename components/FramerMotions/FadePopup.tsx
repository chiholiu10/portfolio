import { useInView } from "react-intersection-observer"; // 1.9K gzipped
import { SectionPopUp, SectionPopUpText } from "../../styles/General.styles";
import { useOnScreen } from "../../hooks/useIntersectionObserver";
import { useRef } from "react";
import { useAnimation } from "framer-motion";
// import { motion } from "framer-motion";

export const FadePopup = ({children}) =>{
  const elementRef = useRef(null);
  const { isOnScreen, checkBottomElement} = useOnScreen(elementRef);

  return (
    <SectionPopUp isInView={isOnScreen} bottomElement={checkBottomElement} ref={elementRef}>
      <SectionPopUpText>
        <span>
        {children}
        </span>
      </SectionPopUpText>
    </SectionPopUp>
  )
};