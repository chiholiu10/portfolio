import { useRef } from "react";
import { useOnScreen } from "../../hooks/useIntersectionObserver";
import { SectionPopUp, SectionPopUpText } from "../../styles/General.styles";

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
