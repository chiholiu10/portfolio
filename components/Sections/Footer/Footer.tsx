import { useQuery } from "@apollo/client";
import { FooterComponent, FooterText } from "./Footer.styles";
import { QUERY } from "./FooterQuery";

export const Footer = () => {
  const { data, loading, error } = useQuery(QUERY, {
    variables: { id: "Veijh9SFm3OqyuVxBBy17" },
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return <FooterComponent />;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <FooterComponent id="footer">
      <FooterText>{data.section.subtitle}</FooterText>
    </FooterComponent>
  );
};
