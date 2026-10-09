import type { HomeSections } from "@/lib/content-model";
import {
  FooterComponent,
  FooterText,
} from "@/components/organisms/Footer/Footer.styles";

type FooterProps = { data: HomeSections["footer"] };

export const Footer = ({ data }: FooterProps) => {
  const { section } = data;
  if (!section) return null;
  return (
    <FooterComponent id="footer">
      <FooterText>{section.subtitle}</FooterText>
    </FooterComponent>
  );
};
