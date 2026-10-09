import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { NavbarInnerComponent } from "@/components/organisms/Navbar/Navbar.styles";

export const ProjectNavigation = styled(NavbarInnerComponent)`
  box-sizing: border-box;
  > a { color: var(--text-heading); font-size: var(--font-small); font-weight: 650; text-decoration: none; }
`;

export const ProjectPage = styled.main`
  min-height: 100vh;
  color: var(--text-heading);
`;

export const ProjectContainer = styled.div`
  box-sizing: border-box;
  width: min(1320px, calc(100% - 64px));
  margin: 0 auto;
  padding: 156px 0 100px;
  @media (max-width: 850px) { width: calc(100% - 40px); padding-top: 124px; }
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-heading);
  font-size: var(--font-small);
  font-weight: 650;
  text-decoration: none;
  transition: color 280ms ease;
  &:hover { color: var(--accent); }
  &:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }
`;

export const ProjectHero = styled.header`
  max-width: 920px;
  h1 {
    margin: 0 0 28px;
    font-size: var(--font-hero);
    font-weight: 600;
    line-height: 1.12;
    letter-spacing: -0.035em;
  }
  > p { max-width: 58ch; margin: 0; color: var(--text-body); font-size: var(--font-body); line-height: 1.8; }
`;

export const ProjectMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 24px;
  margin-top: 24px;
  color: var(--text-muted);
  font-size: var(--font-small);
  font-weight: 600;
  &:empty { display: none; }
`;

export const ProjectVisual = styled.div`
  box-sizing: border-box;
  padding: 20px;
  overflow: hidden;
  width: 100%;
  max-width: 920px;
  margin: 48px 0;
  border: 1px solid rgba(var(--accent-rgb), 0.12);
  border-radius: 28px;
  background: var(--surface);
  box-shadow: 0 24px 60px rgba(23, 51, 65, 0.1);
  @media (max-width: 680px) { margin: 32px 0; border-radius: 20px; }
`;

export const ProjectImage = styled(Image)`
  border-radius: 10px;
  display: block;
  width: 100%;
  height: auto;
`;

export const ProjectSection = styled.section`
  display: grid;
  grid-template-columns: minmax(150px, 0.34fr) minmax(0, 1fr);
  gap: 34px;
  max-width: 920px;
  padding: 36px 0;
  border-bottom: 1px solid rgba(var(--accent-rgb), 0.12);
  h2, h3 { margin: 0; color: var(--text-heading); font-size: var(--font-subheading); font-weight: 650; line-height: 1.4; letter-spacing: -0.02em; }
  p { margin: 0; color: var(--text-body); font-size: var(--font-body); line-height: 1.8; max-width: 65ch; }
  @media (max-width: 680px) { grid-template-columns: 1fr; gap: 16px; padding: 28px 0; }
`;

export const TechnologyList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
  li { padding: 9px 13px; border: 1px solid rgba(var(--accent-rgb), 0.14); border-radius: 10px; color: var(--accent); background: rgba(var(--accent-rgb), 0.05); font-size: var(--font-small); font-weight: 600; }
`;

export const ProjectEvidence = styled.figure`
  box-sizing: border-box;
  padding: 20px;
  max-width: 920px;
  margin: 36px 0 0;
  overflow: hidden;
  border: 1px solid rgba(var(--accent-rgb), 0.12);
  border-radius: 24px;
  background: var(--surface);
  box-shadow: 0 16px 40px rgba(23, 51, 65, 0.07);
  figcaption { padding: 18px 0 0; color: var(--text-body); font-size: var(--font-small); line-height: 1.6; }
  @media (max-width: 680px) { border-radius: 18px; figcaption { padding: 16px 0 0; } }
`;

export const ImpactList = styled.ul`
  display: grid;
  gap: 24px;
  margin: 0;
  padding: 0;
  list-style: none;
  h3, h4 { margin: 0 0 8px; color: var(--text-heading); font-size: var(--font-body); font-weight: 650; line-height: 1.5; }
`;

export const AdditionalProject = styled.section`
  max-width: 920px;
  margin-top: 64px;
  padding-top: 40px;
  border-top: 2px solid rgba(var(--accent-rgb), 0.2);
  > h2 { margin: 0 0 20px; font-size: var(--font-section); font-weight: 600; line-height: 1.2; letter-spacing: -0.035em; }
  > p { max-width: 65ch; color: var(--text-body); font-size: var(--font-body); line-height: 1.8; }
`;

export const ProjectCopy = styled.div`
  min-width: 0;
  display: grid;
  gap: 18px;
`;
