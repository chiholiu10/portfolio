import { FooterComponent, FooterText } from "./Footer.styles";

type FooterProps = { data: { section: { subtitle: string } | null } };

export const Footer = ({ data }: FooterProps) => {
  const { section } = data;

  if (!section) {
    return <FooterComponent>No data available</FooterComponent>;
  }

  const { subtitle } = section;

  return (
    <FooterComponent id="footer">
      <FooterText>{subtitle}</FooterText>
    </FooterComponent>
  );
};
