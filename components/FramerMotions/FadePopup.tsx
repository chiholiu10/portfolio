import { useRef } from "react";
import { SectionPopUp, SectionPopUpText } from "../../styles/General.styles";
import { useOnScreen } from "../../hooks/useIntersectionObserver";

export const FadePopup = ({ children }) => {
  const elementRef = useRef(null);
  const { isOnScreen, checkBottomElement } = useOnScreen(elementRef);

  return (
    <SectionPopUp
      isInView={isOnScreen}
      bottomElement={checkBottomElement}
      ref={elementRef}
    >
      <SectionPopUpText>
        <span>{children}</span>
      </SectionPopUpText>
    </SectionPopUp>
  );
};
