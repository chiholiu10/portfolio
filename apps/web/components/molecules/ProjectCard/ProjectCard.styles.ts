import styled from "styled-components";
import Image from "next/image";

export const PortfolioImage = styled(Image).attrs({ className: "ui-img" })`
  max-inline-size: 100%;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  aspect-ratio: 16 / 9;
`;

export const PortfolioBlock = styled.div.attrs({ className: "ui-div" })`
  max-inline-size: 100%;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  margin: 0;
  aspect-ratio: 16 / 9;
`;

export const PortfolioCard = styled.article.attrs({ className: "ui-article" })`
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
  margin: 0;
`;

export const PortfolioCardFooter = styled.div.attrs({ className: "ui-div" })`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 16px 0;
  :where(.ui-h3) {
    min-width: 0;
    user-select: text;
    cursor: text;
    margin: 0;
    color: var(--text-heading);
    font-size: 15px;
    font-weight: 650;
    line-height: 1.3;
  }
`;
