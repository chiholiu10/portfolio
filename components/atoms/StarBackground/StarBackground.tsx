import styled, { keyframes } from "styled-components";

const twinkle = keyframes`
  0%, 100% { opacity: .2; }
  50% { opacity: .65; }
`;
const Sky = styled.svg`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100dvh;
  z-index: -1;
  pointer-events: none;
  fill: #29798a;
  circle { animation: ${twinkle} 7s ease-in-out infinite; }
  @media (prefers-reduced-motion: reduce) {
    circle { animation: none; opacity: .4; }
  }
`;

export function StarBackground() {
  return <Sky aria-hidden="true" viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
    {Array.from({ length: 65 }, (_, index) => (
      <circle key={index} cx={(index * 137 + 41) % 1440} cy={(index * 193 + 73) % 1000}
        r={index % 5 === 0 ? 1.4 : 0.8}
        style={{ animationDuration: `${6 + (index % 5)}s`, animationDelay: `${-(index % 9)}s` }} />
    ))}
  </Sky>;
}
