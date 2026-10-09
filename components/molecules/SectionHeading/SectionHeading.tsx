import styled from "styled-components";
import { Eyebrow } from "@/components/atoms/Eyebrow/Eyebrow";
import { Header, SubHeader } from "@/styles/General.styles";
import { FadeUp, WordReveal } from "@/components/atoms/Motion";

const HeadingBlock = styled.div`
  box-sizing: border-box;
  width: min(1120px, calc(100% - 64px));
  margin: 0 auto;
  padding: 56px 0 48px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  > h2 { margin: 0; padding: 0; text-align: left; }
  > p:last-child:not(:first-child) { margin: 20px 0 0; padding: 0; width: auto; max-width: 65ch; text-align: left; }
  @media (max-width: 850px) { width: calc(100% - 40px); }
  @media (max-width: 700px) { padding: 40px 0 36px; }
`;

type SectionHeadingProps = {
  id: string;
  eyebrow?: string | null;
  title?: string | null;
  subtitle?: string | null;
};

export const SectionHeading = ({ id, title, subtitle, eyebrow }: SectionHeadingProps) => (
  <FadeUp id={id}>
    <HeadingBlock>
    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
    <Header>{title}</Header>
    {subtitle && <SubHeader><WordReveal text={subtitle} /></SubHeader>}
    </HeadingBlock>
  </FadeUp>
);
