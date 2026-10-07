import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export const ProjectPage = styled.main`
  min-height: 100vh;
  color: #edf5fa;
  background:
    radial-gradient(circle at 70% 5%, rgba(56, 189, 248, 0.1), transparent 30%),
    #080d12;
`;

export const ProjectContainer = styled.div`
  box-sizing: border-box;
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 34px 0 110px;
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  margin-bottom: clamp(70px, 10vw, 130px);
  color: #85dfff;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
`;

export const ProjectHero = styled.header`
  max-width: 920px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);

  h1 {
    max-width: 900px;
    margin: 0 0 20px;
    font-size: clamp(40px, 7vw, 78px);
    line-height: 0.98;
    letter-spacing: -0.055em;
  }

  > p {
    max-width: 760px;
    margin: 0;
    color: #a2b3c3;
    font-size: clamp(17px, 2vw, 21px);
    line-height: 1.65;
  }
`;

export const ProjectMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 24px;
  margin-top: 28px;
  color: #74879a;
  font: 650 12px ui-monospace, SFMono-Regular, Menlo, monospace;
`;

export const ProjectVisual = styled.div`
  overflow: hidden;
  width: 100%;
  max-width: 780px;
  margin: 56px auto;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 22px;
  background: #08131f;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
`;

export const ProjectImage = styled(Image)`
  display: block;
  width: 100%;
  height: auto;
`;

export const ProjectSection = styled.section`
  display: grid;
  grid-template-columns: minmax(150px, 0.34fr) minmax(0, 1fr);
  gap: 34px;
  max-width: 920px;
  padding: 42px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  h2 {
    margin: 0;
    color: #62d7ff;
    font: 750 13px ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  p {
    margin: 0;
    color: #b1bfcb;
    font-size: 17px;
    line-height: 1.8;
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

export const TechnologyList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    padding: 8px 11px;
    border: 1px solid rgba(98, 215, 255, 0.18);
    border-radius: 9px;
    color: #a8dff1;
    background: rgba(56, 189, 248, 0.06);
    font-size: 12px;
    font-weight: 700;
  }
`;
