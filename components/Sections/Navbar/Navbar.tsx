import Image from "next/image";
import {
  Logo,
  NavbarComponent,
  NavbarInnerBlock,
  NavbarInnerComponent,
} from "./Navbar.styles";
import { NavbarLogoAnimation } from "../../FramerMotions";

export const Navbar = () => (
  <NavbarComponent>
    <NavbarInnerComponent>
      <NavbarInnerBlock>
        <NavbarLogoAnimation>
          <span className="brand">Chiho Liu</span>
        </NavbarLogoAnimation>
      </NavbarInnerBlock>
      <Logo>
        <Image
          src="https://res.cloudinary.com/dh7tnzzxm/image/upload/v1681677951/Frame_1_1_mh4oma.png"
          alt="chiho-website-icon"
          width={44}
          height={44}
          priority
          sizes="44px"
        />
      </Logo>
    </NavbarInnerComponent>
  </NavbarComponent>
);
