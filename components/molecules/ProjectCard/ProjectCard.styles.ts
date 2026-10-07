import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

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
  filter: drop-shadow(0 12px 18px rgba(0, 0, 0, 0.3));
  aspect-ratio: 16 / 9;
`;

export const PortfolioCard = styled.article`
  box-sizing: border-box;
  overflow: hidden;
  width: min(390px, calc(100vw - 40px));
  margin: 10px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 18px;
  background: rgba(8, 18, 31, 0.78);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.24);
`;

export const PortfolioCardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 16px 18px 18px;

  h3 {
    min-width: 0;
    margin: 0;
    color: #eef6fb;
    font-size: 15px;
    font-weight: 650;
    line-height: 1.3;
  }
`;

export const PortfolioLink = styled(Link)`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 8px;
  min-height: 38px;
  padding: 0 13px;
  border: 1px solid rgba(98, 215, 255, 0.34);
  border-radius: 10px;
  color: #9be7ff;
  font-size: 12px;
  font-weight: 750;
  text-decoration: none;
  transition: background 180ms ease, border-color 180ms ease, transform 180ms ease;

  &:hover,
  &:focus-visible {
    border-color: #62d7ff;
    background: rgba(56, 189, 248, 0.1);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 3px;
  }
`;
