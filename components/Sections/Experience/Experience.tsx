import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ComponentSection } from "../../../styles/General.styles";
import { FadeUpWhenVisible } from "../../FramerMotions";
import {
  ExperienceBlockLeft,
  ExperienceBlockRight,
  ExperienceContent,
  ExperienceFigure,
  ExperienceImage,
  ExperienceInnerBlock,
} from "./Experience.styles";
import { QUERY } from "./ExperienceQuery";

export const Experience = () => {
  const { data, loading, error } = useQuery(QUERY, {
    variables: { id: "2c3zCPqbJcXzcaM2bYTp52" },
    fetchPolicy: "cache-and-network",
  });

  const [mobileQuery, setMobileQuery] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setMobileQuery(window.innerWidth > 767);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileQuery]);

  if (loading) {
    return <ComponentSection />;
  }

  if (error) {
    return null;
  }

  return (
    <ComponentSection id="experience" className="experienceComponent">
      <ExperienceInnerBlock>
        <ExperienceBlockLeft>
          <FadeUpWhenVisible>
            <ExperienceContent>{data.section.subtitle}</ExperienceContent>
          </FadeUpWhenVisible>
        </ExperienceBlockLeft>
        <ExperienceBlockRight>
          {!mobileQuery ? (
            <FadeUpWhenVisible>
              <ExperienceFigure>
                <ExperienceImage
                  src={data.section.image.url}
                  alt="alibaba-picture"
                />
              </ExperienceFigure>
            </FadeUpWhenVisible>
          ) : (
            <ExperienceFigure>
              <ExperienceImage
                src={data.section.image.url}
                alt="alibaba-picture"
              />
            </ExperienceFigure>
          )}
        </ExperienceBlockRight>
      </ExperienceInnerBlock>
    </ComponentSection>
  );
};
