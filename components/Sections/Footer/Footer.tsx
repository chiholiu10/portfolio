import { useQuery } from "@apollo/client/react";
import { FooterComponent, FooterText } from "./Footer.styles";
import { QUERY } from "./FooterQuery";
import { z } from "zod";

const FooterSchema = z.object({
  section: z
    .object({
      subtitle: z.string(),
    })
    .nullable(),
});

export const Footer = () => {
  const { data, loading, error } = useQuery(QUERY, {
    variables: { id: "Veijh9SFm3OqyuVxBBy17" },
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return <FooterComponent />;
  }

  const result = FooterSchema.safeParse(data);

  if (!result.success) {
    console.error("Validation error:", result.error);
    return null;
  }

  const { section } = result.data;

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
