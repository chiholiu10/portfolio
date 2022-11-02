import { useQuery } from '@apollo/client';
import { FooterComponent, FooterText } from './Footer.styles';
import { QUERY } from './FooterQuery';

export const Footer = () => {
  const { data, loading, error } = useQuery(QUERY);

  if (loading) {
    return <></>;
  }

  if (error) {
    console.error(error);
    return null;
  }
  return (
    <FooterComponent>
      <FooterText>{data.section.subtitle}</FooterText>
    </FooterComponent>
  );
};