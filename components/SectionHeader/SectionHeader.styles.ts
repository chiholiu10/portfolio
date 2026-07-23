import styled from "styled-components";
import { breakpoint } from "../../styles/Breakpoint";

export const SectionHeadingWrap = styled.header`
  max-width: 820px;
  margin: 0 auto 68px;
  padding: 20px 20px 0;
  text-align: center;

  ${breakpoint.sm`padding-top: 100px;`}
  ${breakpoint.xl`padding-top: 80px;`}
`;

export const SectionEyebrow = styled.span`
  color: #68d5f7;
  font-size: 11px;
  font-weight: 750;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

export const SectionHeading = styled.h2`
  margin: 18px 0 22px;
  color: #eef8ff;
  font-size: clamp(30px, 5vw, 56px);
  font-weight: 600;
  letter-spacing: -0.05em;
  line-height: 1.06;
  text-wrap: balance;
  text-shadow: 0 0 36px rgba(56, 189, 248, 0.07);

  span {
    color: #68d5f7;
  }
`;

export const SectionIntro = styled.p`
  max-width: 700px;
  margin: 0 auto;
  color: #91a4b7;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.008em;
  line-height: 1.75;
  text-wrap: pretty;

  ${breakpoint.md`font-size: 18px;`}
`;
