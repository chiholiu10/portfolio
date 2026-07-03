import {
  BrandOrbit,
  NavbarComponent,
  NavbarInnerBlock,
  NavbarInnerComponent,
} from "./Navbar.styles";

interface NavbarData {
  section: {
    arrays: {
      initials: string;
      name: string;
      role: string;
      ariaHidden: boolean;
    };
  };
}

interface NavbarProps {
  data: NavbarData;
}

export const Navbar = ({ data }: NavbarProps) => {
  const { section } = data;
  const { initials, name, role, ariaHidden } = section.arrays;

  if (!section) {
    return <NavbarComponent>No data available</NavbarComponent>;
  }

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
      </NavbarInnerComponent>
    </NavbarComponent>
  );
};
