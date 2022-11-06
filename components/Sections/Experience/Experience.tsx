import { ComponentSection } from '../../../styles/General.styles';
import { ExperienceInnerBlock, ExperienceBlockLeft, ExperienceBlockRight, ExperienceImage, ExperienceFigure, ExperienceContent } from './Experience.styles';
import { motion, useTransform, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FadeUpWhenVisible } from "../../FramerMotions";
import { useQuery } from '@apollo/client';
import { QUERY } from './ExperienceQuery';

export const Experience = () => {
  const { data, loading, error } = useQuery(QUERY);
  const [mobileQuery, setMobileQuery] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setMobileQuery(window.innerWidth <= 767 ? true : false);
    };
    window.addEventListener('resize', handleResize);
    console.log(mobileQuery);
  }, [mobileQuery]);


  if (loading) {
    return <></>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <ComponentSection>
      {mobileQuery && (
        <ExperienceInnerBlock>
          <ExperienceBlockLeft>
            < FadeUpWhenVisible >
              <ExperienceContent>{data.section.subtitle}</ExperienceContent>
            </FadeUpWhenVisible>
          </ExperienceBlockLeft>
          <ExperienceBlockRight>
            <FadeUpWhenVisible >
              <ExperienceFigure>
                <ExperienceImage src={data.section.image.url} alt="test" />
              </ExperienceFigure>
            </FadeUpWhenVisible>
          </ExperienceBlockRight>
        </ExperienceInnerBlock>
      )}

      {!mobileQuery && (
        < FadeUpWhenVisible>
          <ExperienceInnerBlock>
            <ExperienceBlockLeft>
              <ExperienceContent>{data.section.subtitle}</ExperienceContent>
            </ExperienceBlockLeft>
            <ExperienceBlockRight>
              <ExperienceFigure>
                <ExperienceImage src={data.section.image.url} alt="test" />
              </ExperienceFigure>
            </ExperienceBlockRight>
          </ExperienceInnerBlock>
        </FadeUpWhenVisible>
      )}
    </ComponentSection >
  );
};
