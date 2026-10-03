import styled from "styled-components";

export const BlogShell = styled.main`
  min-height: 100vh;
  padding: clamp(28px, 6vw, 72px) clamp(18px, 5vw, 64px) 80px;
`;

export const BlogContainer = styled.div`
  width: min(1120px, 100%);
  margin: 0 auto;
`;

export const BlogNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: clamp(64px, 10vw, 120px);

  a {
    color: #eaf7ff;
    text-decoration: none;
  }
`;

export const Brand = styled.a`
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const BackLink = styled.a`
  padding: 10px 14px;
  border: 1px solid rgba(104, 213, 247, 0.22);
  border-radius: 12px;
  background: rgba(9, 27, 48, 0.62);
  font-size: 13px;
`;

export const BlogEyebrow = styled.p`
  margin: 0 0 16px;
  color: #68d5f7;
  font: 12px ui-monospace, SFMono-Regular, Menlo, monospace;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

export const BlogTitle = styled.h1`
  max-width: 900px;
  margin: 0;
  color: #f3fbff;
  font-size: clamp(42px, 8vw, 92px);
  line-height: 0.98;
  letter-spacing: -0.055em;
  text-wrap: balance;
`;

export const BlogIntro = styled.p`
  max-width: 680px;
  margin: 28px 0 0;
  color: #9fb3c7;
  font-size: clamp(17px, 2vw, 21px);
  line-height: 1.65;
`;

export const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: 22px;
  margin-top: clamp(52px, 8vw, 88px);
`;

export const BlogCard = styled.a`
  display: flex;
  min-height: 320px;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(104, 213, 247, 0.14);
  border-radius: 24px;
  color: inherit;
  background: linear-gradient(145deg, rgba(18, 43, 72, 0.82), rgba(7, 22, 40, 0.92));
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  transition: transform 180ms ease, border-color 180ms ease;

  &:hover,
  &:focus-visible {
    border-color: rgba(104, 213, 247, 0.48);
    transform: translateY(-5px);
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 210px;
  object-fit: cover;
`;

export const CardBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 24px;

  h2 {
    margin: 12px 0;
    color: #f3fbff;
    font-size: 25px;
    line-height: 1.15;
    letter-spacing: -0.03em;
  }

  p {
    margin: 0;
    color: #9fb3c7;
    line-height: 1.6;
  }
`;

export const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
  color: #68d5f7;
  font-size: 12px;
  letter-spacing: 0.04em;
`;

export const ReadMore = styled.span`
  margin-top: auto;
  padding-top: 28px;
  color: #eaf7ff;
  font-size: 14px;
  font-weight: 700;
`;

export const EmptyState = styled.div`
  margin-top: 56px;
  padding: clamp(28px, 5vw, 52px);
  border: 1px dashed rgba(104, 213, 247, 0.28);
  border-radius: 24px;
  color: #9fb3c7;
  background: rgba(9, 27, 48, 0.46);

  h2 { margin-top: 0; color: #f3fbff; }
  p { margin-bottom: 0; line-height: 1.65; }
`;

export const ArticleHeader = styled.header`
  width: min(900px, 100%);
  margin: 0 auto 52px;
`;

export const ArticleTitle = styled(BlogTitle)`
  font-size: clamp(38px, 7vw, 76px);
`;

export const ArticleCover = styled.img`
  display: block;
  width: min(1120px, 100%);
  max-height: 620px;
  margin: 0 auto 64px;
  border-radius: 28px;
  object-fit: cover;
`;

export const ArticleBody = styled.article`
  width: min(760px, 100%);
  margin: 0 auto;
  color: #c7d7e5;
  font-size: clamp(17px, 2vw, 19px);
  line-height: 1.8;

  h2, h3, h4 { color: #f3fbff; line-height: 1.15; letter-spacing: -0.03em; }
  h2 { margin: 64px 0 20px; font-size: clamp(30px, 4vw, 42px); }
  h3 { margin: 44px 0 16px; font-size: 27px; }
  h4 { margin: 36px 0 14px; font-size: 21px; }
  p { margin: 0 0 24px; }
  a { color: #68d5f7; text-underline-offset: 4px; }
  li { margin-bottom: 10px; }
  blockquote { margin: 40px 0; padding: 8px 0 8px 24px; border-left: 3px solid #68d5f7; color: #eaf7ff; }
  code { padding: 2px 6px; border-radius: 6px; background: rgba(104, 213, 247, 0.1); color: #9fe8ff; }
  hr { margin: 52px 0; border: 0; border-top: 1px solid rgba(104, 213, 247, 0.18); }
  img { width: 100%; height: auto; margin: 34px 0; border-radius: 20px; }
`;

export const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 48px 0 0;
  padding: 0;
  list-style: none;

  li {
    padding: 8px 11px;
    border: 1px solid rgba(104, 213, 247, 0.18);
    border-radius: 999px;
    color: #9fcfe0;
    background: rgba(9, 27, 48, 0.58);
    font-size: 12px;
  }
`;

export const ShareSection = styled.section`
  margin-top: 64px;
  padding: 28px;
  border: 1px solid rgba(104, 213, 247, 0.18);
  border-radius: 22px;
  background:
    radial-gradient(circle at 92% 10%, rgba(104, 213, 247, 0.12), transparent 38%),
    rgba(9, 27, 48, 0.68);

  h2 {
    margin: 0 0 8px;
    font-size: 24px;
  }

  > p {
    margin: 0;
    color: #91a8bb;
    font-size: 14px;
  }
`;

export const ShareActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 22px;

  a,
  button {
    min-height: 42px;
    padding: 0 14px;
    border: 1px solid rgba(104, 213, 247, 0.2);
    border-radius: 12px;
    color: #eaf7ff;
    background: rgba(15, 41, 69, 0.82);
    font: inherit;
    font-size: 13px;
    font-weight: 700;
    line-height: 42px;
    text-decoration: none;
    cursor: pointer;
    transition: border-color 160ms ease, background 160ms ease, transform 160ms ease;
  }

  a:hover,
  a:focus-visible,
  button:hover,
  button:focus-visible {
    border-color: rgba(104, 213, 247, 0.62);
    background: rgba(24, 61, 98, 0.96);
    transform: translateY(-2px);
  }

  .primary-share {
    border-color: rgba(104, 213, 247, 0.48);
    color: #06111f;
    background: linear-gradient(135deg, #62ffe7, #45c9ff);
  }
`;

export const ShareStatus = styled.p`
  min-height: 22px;
  margin-top: 14px !important;
  color: #68d5f7 !important;
`;
