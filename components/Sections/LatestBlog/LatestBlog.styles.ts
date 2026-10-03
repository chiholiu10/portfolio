import Image from "next/image";
import styled from "styled-components";

export const LatestBlogSection = styled.section`
  width: min(1180px, calc(100% - 32px));
  margin: clamp(72px, 12vw, 150px) auto;
`;

export const LatestBlogHeader = styled.header`
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 34px;

  @media (max-width: 639px) {
    align-items: start;
    flex-direction: column;
  }
`;

export const LatestBlogEyebrow = styled.p`
  margin: 0 0 12px;
  color: #68d5f7;
  font: 11px ui-monospace, SFMono-Regular, Menlo, monospace;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

export const LatestBlogTitle = styled.h2`
  max-width: 720px;
  margin: 0;
  color: #f3fbff;
  font-size: clamp(34px, 6vw, 64px);
  line-height: 1;
  letter-spacing: -0.05em;
  text-wrap: balance;
`;

export const AllPostsLink = styled.a`
  flex: none;
  padding: 12px 16px;
  border: 1px solid rgba(104, 213, 247, 0.22);
  border-radius: 12px;
  color: #eaf7ff;
  background: rgba(9, 27, 48, 0.62);
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;

  &:hover,
  &:focus-visible {
    border-color: rgba(104, 213, 247, 0.56);
  }
`;

export const LatestBlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const LatestBlogCard = styled.a`
  display: flex;
  min-height: 100%;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(104, 213, 247, 0.14);
  border-radius: 22px;
  color: inherit;
  background: linear-gradient(145deg, rgba(18, 43, 72, 0.78), rgba(7, 22, 40, 0.92));
  box-shadow: 0 22px 64px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  transition: transform 180ms ease, border-color 180ms ease;

  &:hover,
  &:focus-visible {
    border-color: rgba(104, 213, 247, 0.48);
    transform: translateY(-5px);
  }
`;

export const LatestBlogImage = styled(Image)`
  width: 100%;
  height: 190px;
  object-fit: cover;
`;

export const LatestBlogCardBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 22px;

  h3 {
    margin: 12px 0;
    color: #f3fbff;
    font-size: 24px;
    line-height: 1.14;
    letter-spacing: -0.035em;
  }

  p {
    display: -webkit-box;
    margin: 0;
    overflow: hidden;
    color: #9fb3c7;
    line-height: 1.6;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
`;

export const LatestBlogMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  color: #68d5f7;
  font-size: 11px;
`;

export const LatestBlogReadMore = styled.span`
  margin-top: auto;
  padding-top: 24px;
  color: #eaf7ff;
  font-size: 13px;
  font-weight: 700;
`;
