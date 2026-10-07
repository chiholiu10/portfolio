import { Header, SubHeader } from "../../../styles/General.styles";
import { FadeUp, WordReveal } from "../../atoms/Motion";

type SectionHeadingProps = {
  id: string;
  title?: string | null;
  subtitle?: string | null;
};

export const SectionHeading = ({ id, title, subtitle }: SectionHeadingProps) => (
  <FadeUp id={id}>
    <Header>{title}</Header>
    <SubHeader><WordReveal text={subtitle} /></SubHeader>
  </FadeUp>
);
