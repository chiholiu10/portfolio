import { breakpoint } from "@/styles/Breakpoint";
import styled from "styled-components";
import Image from "next/image";
import { NavbarInnerComponent } from "@/components/organisms/Navbar/Navbar.styles";

export const ProjectNavigation = styled(NavbarInnerComponent)`
  box-sizing: border-box;
  > :where(.ui-a) {
    color: var(--text-heading);
    font-size: var(--font-small);
    font-weight: 650;
    text-decoration: none;
  }
`;

export const ProjectPage = styled.main.attrs({ className: "ui-main" })`
  min-height: 100vh;
  color: var(--text-heading);
`;

export const ProjectContainer = styled.div.attrs({ className: "ui-div" })`
  box-sizing: border-box;
  width: calc(100% - 40px);
  margin: 0 auto;
  padding: 124px 0 100px;
  ${breakpoint.xl`
    width: min(1320px, calc(100% - 64px));
    padding-top: 156px;
  `}
`;

export const ProjectHero = styled.header.attrs({ className: "ui-header" })`
  max-inline-size: 920px;
  :where(.ui-h1) {
    margin: 0 0 28px;
    font-size: var(--font-hero);
    font-weight: 600;
    line-height: 1.12;
    letter-spacing: -0.035em;
  }
  > :where(.ui-p) {
    max-inline-size: 58ch;
    margin: 0;
    color: var(--text-body);
    font-size: var(--font-body);
    line-height: 1.8;
  }
`;

export const ProjectMeta = styled.div.attrs({ className: "ui-div" })`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 24px;
  margin-top: 24px;
  color: var(--text-muted);
  font-size: var(--font-small);
  font-weight: 600;
  &:empty {
    display: none;
  }
`;

export const ProjectVisual = styled.div.attrs({ className: "ui-div" })`
  box-sizing: border-box;
  padding: 20px;
  overflow: hidden;
  width: min(100%, 920px);
  margin: 32px 0;
  border: 1px solid rgba(var(--accent-rgb), 0.12);
  border-radius: 20px;
  background: var(--surface);
  box-shadow: 0 24px 60px rgba(23, 51, 65, 0.1);
  ${breakpoint.md`
    margin-top: 48px;
    margin-bottom: 48px;
    border-radius: 28px;
  `}
`;

export const ProjectImage = styled(Image).attrs({ className: "ui-img" })`
  border-radius: 10px;
  display: block;
  width: 100%;
  height: auto;
`;

export const ProjectSection = styled.section.attrs({ className: "ui-section" })`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  max-inline-size: 920px;
  padding: 28px 0;
  border-bottom: 1px solid rgba(var(--accent-rgb), 0.12);
  :where(.ui-h2),
  :where(.ui-h3) {
    margin: 0;
    color: var(--text-heading);
    font-size: var(--font-subheading);
    font-weight: 650;
    line-height: 1.4;
    letter-spacing: -0.02em;
  }
  :where(.ui-p) {
    margin: 0;
    color: var(--text-body);
    font-size: var(--font-body);
    line-height: 1.8;
    max-inline-size: 65ch;
  }
  ${breakpoint.md`
    grid-template-columns: minmax(150px, 0.34fr) minmax(0, 1fr);
    gap: 34px;
    padding-top: 36px;
    padding-bottom: 36px;
  `}
`;

export const TechnologyList = styled.ul.attrs({ className: "ui-ul" })`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
  :where(.ui-li) {
    padding: 9px 13px;
    border: 1px solid rgba(var(--accent-rgb), 0.14);
    border-radius: 10px;
    color: var(--accent);
    background: rgba(var(--accent-rgb), 0.05);
    font-size: var(--font-small);
    font-weight: 600;
  }
`;

export const ProjectEvidence = styled.figure.attrs({ className: "ui-figure" })`
  box-sizing: border-box;
  padding: 20px;
  max-inline-size: 920px;
  margin: 36px 0 0;
  overflow: hidden;
  border: 1px solid rgba(var(--accent-rgb), 0.12);
  border-radius: 18px;
  background: var(--surface);
  box-shadow: 0 16px 40px rgba(23, 51, 65, 0.07);
  :where(.ui-figcaption) {
    padding: 16px 0 0;
    color: var(--text-body);
    font-size: var(--font-small);
    line-height: 1.6;
  }
  ${breakpoint.md`
    border-radius: 24px;
    :where(.ui-figcaption) {
      padding-top: 18px;
    }
  `}
`;

export const ImpactList = styled.ul.attrs({ className: "ui-ul" })`
  display: grid;
  gap: 24px;
  margin: 0;
  padding: 0;
  list-style: none;
  :where(.ui-h3),
  :where(.ui-h4) {
    margin: 0 0 8px;
    color: var(--text-heading);
    font-size: var(--font-body);
    font-weight: 650;
    line-height: 1.5;
  }
`;

export const AdditionalProject = styled.section.attrs({
  className: "ui-section",
})`
  max-inline-size: 920px;
  margin-top: 64px;
  padding-top: 40px;
  border-top: 2px solid rgba(var(--accent-rgb), 0.2);
  > :where(.ui-h2) {
    margin: 0 0 20px;
    font-size: var(--font-section);
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.035em;
  }
  > :where(.ui-p) {
    max-inline-size: 65ch;
    color: var(--text-body);
    font-size: var(--font-body);
    line-height: 1.8;
  }
`;

export const ProjectCopy = styled.div.attrs({ className: "ui-div" })`
  min-width: 0;
  display: grid;
  gap: 18px;
`;
