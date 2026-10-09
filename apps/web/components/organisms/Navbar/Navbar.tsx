import type { HomeSections } from "@/lib/content-model";
import {
  BrandOrbit,
  NavbarComponent,
  NavbarInnerBlock,
  NavbarInnerComponent,
} from "@/components/organisms/Navbar/Navbar.styles";

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
          <span className="ui-span brand-copy">
            <span className="ui-span brand">{name}</span>
            <span className="ui-span role">{role}</span>
          </span>
        </NavbarInnerBlock>
        <div className="ui-div nav-links">
          <a className="ui-a" href="#portfolio">
            Work
          </a>
          <a className="ui-a" href="#how-i-work">
            Approach
          </a>
          <a className="ui-a" href="#contact">
            Let’s talk
          </a>
        </div>
      </NavbarInnerComponent>
    </NavbarComponent>
  );
};
