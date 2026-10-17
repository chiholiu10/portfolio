import { useEffect } from "react";
import type { HomeSections } from "@/lib/content-model";
import {
  BrandOrbit,
  NavbarComponent,
  NavbarInnerBlock,
  NavbarInnerComponent,
} from "@/components/organisms/Navbar/Navbar.styles";

type NavbarProps = { data: HomeSections["navbar"] };

const sectionHashes = new Set([
  "#banner",
  "#portfolio",
  "#how-i-work",
  "#contact",
]);

const useCleanSectionHash = () => {
  useEffect(() => {
    let frame = 0;

    const clearHash = () => {
      if (!sectionHashes.has(window.location.hash)) return;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const cleanUrl = `${window.location.pathname}${window.location.search}`;
        window.history.replaceState(window.history.state, "", cleanUrl);
      });
    };

    clearHash();
    window.addEventListener("hashchange", clearHash);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", clearHash);
    };
  }, []);
};

export const Navbar = ({ data }: NavbarProps) => {
  useCleanSectionHash();
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
