import styled from "styled-components";
import Image from "next/image";

export const PortfolioImage = styled(Image)`
  max-width: 100%;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  aspect-ratio: 16 / 9;
`;

export const PortfolioBlock = styled.div`
  max-width: 100%;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  margin: 0;
  aspect-ratio: 16 / 9;
`;

export const PortfolioCard = styled.article`
  box-sizing: border-box;
  overflow: hidden;
  width: min(390px, calc(100vw - 40px));
  margin: 10px;
`;

export const PortfolioCardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 16px 0;

  h3 {
    min-width: 0;
    user-select: text;
    cursor: text;
    margin: 0;
    color: #eef6fb;
    font-size: 15px;
    font-weight: 650;
    line-height: 1.3;
  }
`;
