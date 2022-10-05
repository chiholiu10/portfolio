import { ComponentSection } from '../../../styles/General.styles';
import { ExperienceInnerBlock, ExperienceBlockLeft, ExperienceBlockRight, ExperienceImage, ExperienceFigure, ExperienceContent } from './Experience.styles';
import { motion, useTransform, useScroll } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { FadeUpWhenVisible } from "../../FramerMotions";

const Experience: FC<IntroductionProps> = ({ currentComponent }) => {
  const [mobileQuery, setMobileQuery] = useState(false);
  const component = currentComponent[0];
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 7000], [1, 400]);

  useEffect(() => {
    const handleResize = () => {
      setMobileQuery(window.innerWidth <= 767 ? true : false);
    };
    window.addEventListener('resize', handleResize);
  }, [mobileQuery]);


  return (
    <ComponentSection>
      <FadeUpWhenVisible>
        <motion.div
          style={mobileQuery ? { y: 0, x: 0 } : { y: y, x: 0 }}
        >
          <ExperienceInnerBlock>

            <ExperienceBlockLeft>
              <ExperienceContent>{component?.context}</ExperienceContent>
            </ExperienceBlockLeft>
            <ExperienceBlockRight>


              <ExperienceFigure>
                <ExperienceImage src={component?.content[0].image} alt="test" />
              </ExperienceFigure>

            </ExperienceBlockRight>

          </ExperienceInnerBlock>
        </motion.div>
      </FadeUpWhenVisible>
    </ComponentSection >
  );
};

const mapStateToProps = (state: any) => ({
  currentComponent: state.data.filter((item) => item.title.toLowerCase() === "experience")
});

const connector = connect(mapStateToProps);
type IntroductionProps = ConnectedProps<typeof connector>;
export default connector(Experience);