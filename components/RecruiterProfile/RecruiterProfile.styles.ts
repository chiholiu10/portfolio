import Link from "next/link";
import styled from "styled-components";

export const Page = styled.main`
  min-height: 100vh;
  padding: clamp(24px, 5vw, 64px) clamp(18px, 5vw, 64px) 96px;
  color: #dcebf5;
  background:
    radial-gradient(circle at 12% 8%, rgba(37, 191, 224, 0.18), transparent 34%),
    radial-gradient(circle at 88% 22%, rgba(61, 111, 246, 0.14), transparent 30%),
    #071327;
`;

export const Container = styled.div`
  width: min(1080px, 100%);
  margin: 0 auto;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: clamp(72px, 12vw, 140px);
`;

export const Brand = styled(Link)`
  color: #effaff;
  font-size: 14px;
  font-weight: 750;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
`;

export const ContactLink = styled(Link)`
  padding: 11px 15px;
  border: 1px solid rgba(109, 221, 247, 0.28);
  border-radius: 12px;
  color: #effaff;
  background: rgba(10, 31, 54, 0.72);
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
`;

export const Hero = styled.header`
  max-width: 900px;
  padding-bottom: clamp(72px, 11vw, 126px);
`;

export const Eyebrow = styled.p`
  margin: 0 0 18px;
  color: #6dddf7;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
`;

export const Title = styled.h1`
  margin: 0;
  color: #f4fbff;
  font-size: clamp(44px, 8vw, 88px);
  line-height: 0.98;
  letter-spacing: -0.055em;
  text-wrap: balance;
`;

export const Lead = styled.p`
  max-width: 760px;
  margin: 30px 0 0;
  color: #aec1d0;
  font-size: clamp(18px, 2.4vw, 24px);
  line-height: 1.6;
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 36px;
`;

export const PrimaryAction = styled(Link)`
  padding: 14px 18px;
  border-radius: 14px;
  color: #06121e;
  background: linear-gradient(135deg, #70ffe8, #54cbff);
  font-size: 14px;
  font-weight: 800;
  text-decoration: none;
`;

export const SecondaryAction = styled(Link)`
  padding: 13px 18px;
  border: 1px solid rgba(109, 221, 247, 0.28);
  border-radius: 14px;
  color: #edf9ff;
  font-size: 14px;
  font-weight: 750;
  text-decoration: none;
`;

export const Section = styled.section`
  padding: clamp(54px, 8vw, 92px) 0;
  border-top: 1px solid rgba(117, 202, 226, 0.14);

  h2 {
    max-width: 700px;
    margin: 0;
    color: #f2fbff;
    font-size: clamp(32px, 5vw, 54px);
    line-height: 1.05;
    letter-spacing: -0.045em;
  }

  > p {
    max-width: 760px;
    margin: 24px 0 0;
    color: #a9bdcd;
    font-size: 18px;
    line-height: 1.75;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 36px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.article`
  padding: 26px;
  border: 1px solid rgba(109, 221, 247, 0.15);
  border-radius: 20px;
  background: rgba(11, 32, 56, 0.72);

  strong {
    display: block;
    margin-bottom: 10px;
    color: #72e7fa;
    font-size: 22px;
  }

  h3 {
    margin: 0 0 12px;
    color: #effaff;
    font-size: 20px;
  }

  p {
    margin: 0;
    color: #9fb5c7;
    line-height: 1.65;
  }
`;

export const Skills = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 32px 0 0;
  padding: 0;
  list-style: none;

  li {
    padding: 9px 12px;
    border: 1px solid rgba(109, 221, 247, 0.18);
    border-radius: 999px;
    color: #c5dae7;
    background: rgba(13, 38, 65, 0.75);
    font-size: 13px;
  }
`;
