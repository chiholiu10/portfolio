import styled, { keyframes } from "styled-components";
import { breakpoint } from "../../../styles/Breakpoint";
import { HeaderGeneral } from "../../../styles/General.styles";

const rotate = keyframes`to { transform: rotate(360deg); }`;

export const Eyebrow = styled.p`
  margin-bottom: 24px;
  color: #38bdf8;
  font:
    11px ui-monospace,
    SFMono-Regular,
    Menlo,
    monospace;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

export const HeaderH1 = styled.h1`
  ${HeaderGeneral};
  ${breakpoint.sm`
    font-size: 40px;
    font-weight: 600;
    margin-top: 100px;
    padding: 20px;
  `}
  ${breakpoint.md`
    font-size: 46px;
  `}
  ${breakpoint.xl`
    font-size: 54px;
    padding: 80px 0 0;
  `}
`;

export const ProfileCartoon = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  width: min(360px, 68vw);
  aspect-ratio: 1;
  margin: 0 auto 110px;
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: 50%;
  background:
    radial-gradient(circle, rgba(56, 189, 248, 0.16), transparent 45%),
    rgba(255, 255, 255, 0.02);
  box-shadow: 0 0 90px rgba(14, 165, 233, 0.08);
  .profile-avatar {
    z-index: 2;
    filter: drop-shadow(0 28px 48px rgba(0, 0, 0, 0.48));
  }
  @media (max-width: 639px) {
    width: min(300px, 62vw);
    margin-bottom: 90px;
    margin-top: 50px;
  }
`;

export const OrbitRing = styled.span<{ $level: 1 | 2 | 3 }>`
  position: absolute;
  z-index: 1;
  width: ${(props) => ["", "110%", "127%", "144%"][props.$level]};
  aspect-ratio: 1;
  border: ${(props) =>
    `${props.$level === 1 ? "1px" : "0.5px"} ${
      props.$level === 2 ? "dashed" : "solid"
    } ${props.$level === 3 ? "rgba(255,255,255,.07)" : "rgba(56,189,248,.18)"}`};
  border-radius: 50%;
  transform: rotate(${(props) => (props.$level === 2 ? "61deg" : "-18deg")});
  animation: ${rotate} ${(props) => ["", "26s", "44s", "68s"][props.$level]}
    linear infinite ${(props) => (props.$level === 2 ? "reverse" : "normal")};

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: -4px;
    width: ${(props) => (props.$level === 1 ? "9px" : "7px")};
    height: ${(props) => (props.$level === 1 ? "9px" : "7px")};
    border: 2px solid #07111c;
    border-radius: 50%;
    background: ${(props) => (props.$level === 3 ? "#fff" : "#38bdf8")};
    box-shadow: 0 0 12px rgba(56, 189, 248, 0.65);
  }

  &::after {
    content: "";
    position: absolute;
    right: 12%;
    bottom: 12%;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.7);
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const OrbitNode = styled.span<{
  $position: "top" | "middle" | "bottom";
}>`
  position: absolute;
  ${(props) => {
    switch (props.$position) {
      case "top":
        return "top: -14%; right: 4%;";
      case "middle":
        return "top: 45%; left: -25%; transform: translateY(-50%);";
      case "bottom":
        return "bottom: -14%; left: 1%;";
      default:
        return "";
    }
  }}
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #687687;
  font:
    8px ui-monospace,
    SFMono-Regular,
    Menlo,
    monospace;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  &::before {
    content: "";
    width: 24px;
    height: 1px;
    background: rgba(56, 189, 248, 0.5);
  }
  @media (max-width: 639px) {
    display: none;
  }
`;

export const CodeCard = styled.div`
  position: absolute;
  top: 10%;
  left: -16px;
  z-index: 3;
  width: 145px;
  padding: 12px;
  border: 1px solid rgba(56, 189, 248, 0.24);
  border-radius: 12px;
  background: rgba(8, 19, 32, 0.84);
  backdrop-filter: blur(14px);
  transform: rotate(-5deg);
  i {
    display: block;
    width: 80%;
    height: 4px;
    margin: 7px 0;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.13);
  }
  i:first-child {
    width: 38%;
    background: #38bdf8;
  }
  i:last-child {
    width: 58%;
  }
  @media (max-width: 639px) {
    top: 3%;
    left: -20px;
    width: 112px;
    padding: 10px;
  }
`;

export const VisualLabel = styled.span`
  position: absolute;
  right: -10px;
  bottom: 14%;
  z-index: 3;
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  background: #0b1522;
  color: #38bdf8;
  font:
    9px ui-monospace,
    SFMono-Regular,
    Menlo,
    monospace;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  @media (max-width: 639px) {
    right: -24px;
    font-size: 8px;
  }
`;
