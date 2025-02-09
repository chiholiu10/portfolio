import { gql } from "@apollo/client";

export const SECTION_FIELDS = gql`
  fragment SectionFields on Section {
    title
    subtitle
    array
    arrays
    subtitle
  }
`;

export const SUBTITLE = gql`
  fragment SectionFields on Section {
    subtitle
  }
`;
