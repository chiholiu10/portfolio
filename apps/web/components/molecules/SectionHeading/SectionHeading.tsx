import { breakpoint } from "@/styles/Breakpoint";
import styled from "styled-components";
import { Eyebrow } from "@/components/atoms/Eyebrow/Eyebrow";
import { Header, SubHeader } from "@/styles/General.styles";
import { FadeUp, WordReveal } from "@/components/atoms/Motion";

const HeadingBlock = styled.div.attrs({ className: "ui-div" })`
  box-sizing: border-box;
  width: calc(100% - 40px);
  margin: 0 auto;
  padding: 40px 0 36px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  > :where(.ui-h2) {
    margin: 0;
    padding: 0;
    text-align: left;
  }
  > :where(.ui-p):last-child:not(:first-child) {
    margin: 20px 0 0;
    padding: 0;
    width: auto;
    max-inline-size: 65ch;
    text-align: left;
  }
  ${breakpoint.md`
    padding-top: 56px;
    padding-bottom: 48px;
  `}
  ${breakpoint.xl`
    width: min(1120px, calc(100% - 64px));
  `}
`;

type SectionHeadingProps = {
  id: string;
  eyebrow?: string | null;
  title?: string | null;
  subtitle?: string | null;
};

export const SectionHeading = ({
  id,
  title,
  subtitle,
  eyebrow,
}: SectionHeadingProps) => (
  <FadeUp id={id}>
    <HeadingBlock>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Header>{title}</Header>
      {subtitle && (
        <SubHeader>
          <WordReveal text={subtitle} />
        </SubHeader>
      )}
    </HeadingBlock>
  </FadeUp>
);
