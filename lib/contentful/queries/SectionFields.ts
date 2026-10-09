import { gql } from "@apollo/client";

export const SECTION_FIELDS = gql`
  fragment SectionFields on Section {
    eyebrow
    title
    subtitle
    showCareerAgentInProduction
    showCareerAgentInLocalhost
    arrays
    extraText
  }
`;
