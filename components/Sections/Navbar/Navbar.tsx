import { useEffect, useState } from "react";
import {
  NavbarComponent,
  NavbarInnerBlock,
  NavbarInnerComponent,
  Logo,
} from "./Navbar.styles";

export const Navbar = () => {
  const [navEffect, setNavEffect] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const yValue = global?.window.scrollY;
      yValue < 10 ? setNavEffect(true) : setNavEffect(false);
    };
    document.addEventListener("scroll", handleScroll, false);

    return () => {
      document.removeEventListener("scroll", handleScroll, false);
    };
  }, []);
  return (
    <NavbarComponent navEffect={navEffect}>
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
};
