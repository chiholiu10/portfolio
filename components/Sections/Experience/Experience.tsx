import { ComponentSection } from "../../../styles/General.styles";
import {
  ExperienceInnerBlock,
  ExperienceBlockLeft,
  ExperienceBlockRight,
  ExperienceImage,
  ExperienceFigure,
  ExperienceContent,
} from "./Experience.styles";
import { useEffect, useState } from "react";
import { FadeUpWhenVisible } from "../../FramerMotions";
import { useQuery } from "@apollo/client";
import { QUERY } from "./ExperienceQuery";

export const Experience = () => {
  const { data, loading, error } = useQuery(QUERY);
  const [mobileQuery, setMobileQuery] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setMobileQuery(window.innerWidth > 767 ? true : false);
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
          {!mobileQuery && (
            <FadeUpWhenVisible>
              <ExperienceFigure>
                <ExperienceImage src={data.section.image.url} alt="test" />
              </ExperienceFigure>
            </FadeUpWhenVisible>
          )}
          {mobileQuery && (
            <ExperienceFigure>
              <ExperienceImage src={data.section.image.url} alt="test" />
            </ExperienceFigure>
          )}
        </ExperienceBlockRight>
      </ExperienceInnerBlock>
    </ComponentSection>
  );
};
