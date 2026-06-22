import { useQuery } from "@apollo/client/react";
import { ComponentSection } from "../../../styles/General.styles";
import { FadeUp, WordReveal } from "../../FramerMotions";
import {
  ExperienceBlockLeft,
  ExperienceBlockRight,
  ExperienceContent,
  ExperienceFigure,
  ExperienceImage,
  ExperienceInnerBlock,
} from "./Experience.styles";
import { QUERY } from "./ExperienceQuery";
import { z } from "zod";

const ExperienceSchema = z.object({
  section: z
    .object({
      subtitle: z.string(),
      image: z.object({
        url: z.string(),
      }),
    })
    .nullable(),
});

export const Experience = () => {
  const { data, loading, error } = useQuery(QUERY, {
    variables: {
      id: "2c3zCPqbJcXzcaM2bYTp52",
    },
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return <ComponentSection />;
  }

  const result = ExperienceSchema.safeParse(data);

  if (!result.success) {
    console.error("Validation error:", result.error);
    return <ComponentSection>Error loading data</ComponentSection>;
  }

  const { section } = result.data;

  if (!section) {
    return <ComponentSection>No data available</ComponentSection>;
  }

  const { subtitle, image } = section;

  return (
    <ComponentSection id="experience" className="experienceComponent">
      <ExperienceInnerBlock>
        <ExperienceBlockLeft>
          <FadeUp id="experience-section">
            <ExperienceContent>
              <WordReveal text={subtitle} />
            </ExperienceContent>
          </FadeUp>
        </ExperienceBlockLeft>

        <ExperienceBlockRight>
          <FadeUp id="experience-image">
            <ExperienceFigure>
              <ExperienceImage src={image.url} alt="experience-picture" />
            </ExperienceFigure>
          </FadeUp>
        </ExperienceBlockRight>
      </ExperienceInnerBlock>
    </ComponentSection>
  );
};
