import type { HomeSections } from "@/lib/content-model";
import { useReducedMotion } from "motion/react";
import { type MouseEvent, useSyncExternalStore } from "react";
import { mediaQuery } from "@/styles/Breakpoint";
import {
  BrandOrbit,
  NavbarComponent,
  NavbarInnerBlock,
  NavbarInnerComponent,
} from "@/components/organisms/Navbar/Navbar.styles";

type NavbarProps = { data: HomeSections["navbar"] };

const desktopNavigationQuery = `${mediaQuery.xxl} and (hover: hover) and (pointer: fine)`;

function subscribeToDesktopNavigation(callback: () => void) {
  const query = window.matchMedia(desktopNavigationQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

const getDesktopNavigationSnapshot = () =>
  window.matchMedia(desktopNavigationQuery).matches;
const getDesktopNavigationServerSnapshot = () => false;

export const Navbar = ({ data }: NavbarProps) => {
  const reduceMotion = useReducedMotion();
  const useSmoothNavigation = useSyncExternalStore(
    subscribeToDesktopNavigation,
    getDesktopNavigationSnapshot,
    getDesktopNavigationServerSnapshot,
  );
  const { section } = data;

  if (!section) {
    return null;
  }

  const { initials, name, role, ariaHidden } = section.arrays;

  const navigateToSection = (event: MouseEvent<HTMLAnchorElement>) => {
    const hash = event.currentTarget.hash;
    const target = document.querySelector<HTMLElement>(hash);
    if (!target) return;

    event.preventDefault();
    window.history.pushState(null, "", hash);
    target.scrollIntoView({
      behavior: useSmoothNavigation && !reduceMotion ? "smooth" : "auto",
      block: "start",
    });
  };

  return (
    <NavbarComponent aria-label="Main navigation">
      <NavbarInnerComponent>
        <NavbarInnerBlock
          href="#banner"
          aria-label="Back to top"
          onClick={navigateToSection}
        >
          <BrandOrbit aria-hidden={ariaHidden}>{initials}</BrandOrbit>
          <span className="ui-span brand-copy">
            <span className="ui-span brand">{name}</span>
            <span className="ui-span role">{role}</span>
          </span>
        </NavbarInnerBlock>
        <div className="ui-div nav-links">
          <a className="ui-a" href="#portfolio" onClick={navigateToSection}>
            Work
          </a>
          <a className="ui-a" href="#how-i-work" onClick={navigateToSection}>
            Approach
          </a>
          <a className="ui-a" href="#contact" onClick={navigateToSection}>
            Let’s talk
          </a>
        </div>
      </NavbarInnerComponent>
    </NavbarComponent>
  );
};
