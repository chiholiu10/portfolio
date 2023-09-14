import { useEffect, useState } from "react";
import {
  NavbarComponent,
  NavbarInnerBlock,
  NavbarInnerComponent,
  Logo,
} from "./Navbar.styles";
import { FadeRightToLeft } from "../../FramerMotions/FadeRightToLeft";

export const Navbar = () => {
  const [navEffect, setNavEffect] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoading = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const yValue = global?.window.scrollY;
      yValue < 10 ? setNavEffect(true) : setNavEffect(false);
    };
    window.addEventListener("load", handleLoading);
    document.addEventListener("scroll", handleScroll, false);
    handleScroll();
    
    return () => {
      document.removeEventListener("scroll", handleScroll, false);
      window.removeEventListener("load", handleLoading);
    };
  }, []);

  if (isLoading) {
    return (
      <NavbarComponent navEffect={navEffect}>
        <NavbarInnerComponent>
          <NavbarInnerBlock>
            <FadeRightToLeft>
            <span>Chiho Liu</span>
            </FadeRightToLeft>
          </NavbarInnerBlock>
          <Logo>
            <img
              src="https://res.cloudinary.com/dh7tnzzxm/image/upload/v1681677951/Frame_1_1_mh4oma.png"
              alt="chiho-website-icon"
            />
          </Logo>
        </NavbarInnerComponent>
      </NavbarComponent>
    );
  } else {
    return <NavbarComponent navEffect={navEffect}></NavbarComponent>;
  }
};
