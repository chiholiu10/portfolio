import styled, { keyframes } from "styled-components";

const orbit = keyframes`to { transform: rotate(360deg); }`;

export const OrbitSurface = styled.article<{ $index: number }>`
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 26px;
  background:
    radial-gradient(
      circle at 88% 12%,
      rgba(56, 189, 248, ${(props) => 0.09 + (props.$index % 3) * 0.018}),
      transparent 38%
    ),
    linear-gradient(145deg, rgba(255, 255, 255, 0.035), transparent 48%),
    rgba(7, 16, 28, 0.72);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    0 22px 55px rgba(0, 0, 0, 0.18);
  transition:
    transform 260ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 220ms ease;
`;

export const OrbitArtwork = styled.div<{ $index: number }>`
  position: absolute;
  top: -56px;
  right: -46px;
  width: 176px;
  height: 176px;
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 50%;
  transform: rotate(${(props) => props.$index * 23}deg);

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
  }

  &::before {
    inset: 19px;
    border: 1px dashed rgba(56, 189, 248, 0.16);
  }

  &::after {
    inset: 48px;
    border: 1px solid rgba(255, 255, 255, 0.09);
    background: radial-gradient(
      circle,
      rgba(56, 189, 248, 0.12),
      transparent 68%
    );
  }
`;

export const OrbitingPlanet = styled.span<{ $index: number }>`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  animation: ${orbit} ${(props) => 22 + props.$index * 5}s linear infinite;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: -4px;
    width: 8px;
    height: 8px;
    border: 2px solid #07101c;
    border-radius: 50%;
    background: #38bdf8;
    box-shadow: 0 0 15px rgba(56, 189, 248, 0.7);
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const OrbitCardNumber = styled.span`
  position: relative;
  z-index: 3;
  color: rgba(255, 255, 255, 0.34);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
`;

export const OrbitCardAccent = styled.span`
  position: absolute;
  right: 22px;
  bottom: 20px;
  z-index: 3;
  width: 26px;
  height: 1px;
  background: linear-gradient(90deg, rgba(56, 189, 248, 0.65), transparent);
`;
