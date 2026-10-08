import type { HomeSections } from "../../../lib/content-model";
import {
  BrandOrbit,
  NavbarComponent,
  NavbarInnerBlock,
  NavbarInnerComponent,
} from "./Navbar.styles";

type NavbarProps = { data: HomeSections["navbar"] };

export const Navbar = ({ data }: NavbarProps) => {
  const { section } = data;

  if (!section) {
    return null;
  }

  const { initials, name, role, ariaHidden } = section.arrays;

  return (
    <NavbarComponent aria-label="Main navigation">
      <NavbarInnerComponent>
        <NavbarInnerBlock href="#banner" aria-label="Back to top">
          <BrandOrbit aria-hidden={ariaHidden}>{initials}</BrandOrbit>
          <span className="brand-copy">
            <span className="brand">{name}</span>
            <span className="role">{role}</span>
          </span>
        </NavbarInnerBlock>
        <div className="nav-links">
          <a href="#portfolio">Work</a>
          <a href="#how-i-work">Approach</a>
          <a href="#contact">Let’s talk</a>
        </div>
      </NavbarInnerComponent>
    </NavbarComponent>
  );
};
