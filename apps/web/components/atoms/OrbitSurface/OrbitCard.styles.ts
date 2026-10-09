import styled from "styled-components";

export const OrbitSurface = styled.article.attrs({ className: "ui-article" })<{
  $index: number;
}>`
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(91, 128, 144, 0.18);
  border-radius: 26px;
  background: linear-gradient(160deg, #fff 35%, #f1f7f9);
  box-shadow:
    0 12px 32px rgba(23, 51, 65, 0.08),
    inset 0 1px 0 #fff;
  transition:
    transform 260ms ease,
    border-color 260ms ease;
`;

export const OrbitArtwork = styled.div.attrs({ className: "ui-div" })<{
  $index: number;
}>`
  position: absolute;
  inset: 0 0 auto;
  height: 120px;
  overflow: hidden;
  pointer-events: none;
  background-image:
    radial-gradient(
      circle at 20% 30%,
      rgba(22, 103, 120, 0.25) 0 1px,
      transparent 2px
    ),
    radial-gradient(
      circle at 75% 45%,
      rgba(22, 103, 120, 0.2) 0 1px,
      transparent 2px
    );
  background-size: cover;
  background-position: ${({ $index }) => `${$index * 12}% top`};
  mask-image: linear-gradient(#000 35%, transparent);
`;

export const OrbitingPlanet = styled.span.attrs({ className: "ui-span" })<{
  $index: number;
}>`
  display: none;
`;

export const OrbitCardAccent = styled.span.attrs({ className: "ui-span" })`
  display: none;
`;
