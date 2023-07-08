import { useEffect, useState } from "react";
import {
  NavbarComponent,
  NavbarInnerBlock,
  NavbarInnerComponent,
  Logo,
} from "./Navbar.styles";

export const Navbar = () => {
  const [naveffect, setNavEffect] = useState(false);
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

    return () => {
      document.removeEventListener("scroll", handleScroll, false);
      window.removeEventListener("load", handleLoading);
    };
  }, []);

  if (isLoading) {
    return (
      <NavbarComponent naveffect={naveffect}>
        <NavbarInnerComponent>
          <NavbarInnerBlock>
            <span>Chiho Liu</span>
          </NavbarInnerBlock>
          <Logo>
            <img
              src="https://res.cloudinary.com/dh7tnzzxm/image/upload/v1681677951/Frame_1_1_mh4oma.png"
              alt=""
            />
          </Logo>
        </NavbarInnerComponent>
      </NavbarComponent>
    );
  } else {
    return <NavbarComponent naveffect={naveffect}></NavbarComponent>;
  }
};
