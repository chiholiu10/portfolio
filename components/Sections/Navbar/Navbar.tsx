import Image from "next/image";
import { FadeRightToLeft } from "../../FramerMotions/FadeRightToLeft";
import {
  Logo,
  NavbarComponent,
  NavbarInnerBlock,
  NavbarInnerComponent,
} from "./Navbar.styles";

export const Navbar = () => (
  <NavbarComponent>
    <NavbarInnerComponent>
      <NavbarInnerBlock>
        <FadeRightToLeft>
          <span>Chiho Liu</span>
        </FadeRightToLeft>
      </NavbarInnerBlock>
      <Logo>
        <Image
          src="https://res.cloudinary.com/dh7tnzzxm/image/upload/v1681677951/Frame_1_1_mh4oma.png"
          alt="chiho-website-icon"
          width={100}
          height={100}
        />
      </Logo>
    </NavbarInnerComponent>
  </NavbarComponent>
);
