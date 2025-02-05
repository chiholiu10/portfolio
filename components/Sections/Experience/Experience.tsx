import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { ComponentSection } from "../../../styles/General.styles";
import {
  ExperienceInnerBlock,
  ExperienceBlockLeft,
  ExperienceBlockRight,
  ExperienceImage,
  ExperienceFigure,
  ExperienceContent,
} from "./Experience.styles";
import { FadeUpWhenVisible } from "../../FramerMotions";
import { QUERY } from "./ExperienceQuery";

export const Experience = () => {
  const { data, loading, error } = useQuery(QUERY);
  const [mobileQuery, setMobileQuery] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setMobileQuery(window.innerWidth > 767);
    };
    window.addEventListener("resize", handleResize);
  }, [mobileQuery]);

  if (loading) {
    return <ComponentSection></ComponentSection>;
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
