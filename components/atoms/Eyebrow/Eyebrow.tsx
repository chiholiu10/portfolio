import styled from "styled-components";

export const Eyebrow = styled.p<{ $align?: "left" | "center" }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $align }) => ($align === "center" ? "center" : "flex-start")};
  gap: 10px;
  margin: 0 0 10px;
  color: var(--accent);
  font-size: var(--font-label);
  font-weight: 650;
  letter-spacing: 0.06em;
  line-height: 1.5;
  text-transform: uppercase;
  text-align: ${({ $align }) => $align || "left"};
`;
