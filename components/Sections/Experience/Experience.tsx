import { ComponentSection } from '../../../styles/General.styles';
import { ExperienceInnerBlock, ExperienceBlockLeft, ExperienceBlockRight, ExperienceImage, ExperienceFigure, ExperienceContent } from './Experience.styles';
import { motion, useTransform, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FadeUpWhenVisible } from "../../FramerMotions";
import { useQuery } from '@apollo/client';
import { QUERY } from './ExperienceQuery';

export const Experience = () => {
  const { data, loading, error } = useQuery(QUERY);
  const [mobileQuery, setMobileQuery] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 7000], [1, 400]);
  console.log(data);
  useEffect(() => {
    const handleResize = () => {
      setMobileQuery(window.innerWidth <= 767 ? true : false);
    };
    window.addEventListener('resize', handleResize);
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
      <FadeUpWhenVisible>
        <motion.div
          style={{ y: y, x: 0 }}
        >
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
        </motion.div>
      </FadeUpWhenVisible>
    </ComponentSection >
  );
};
