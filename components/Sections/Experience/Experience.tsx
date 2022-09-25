import { ComponentSection } from '../../../styles/General.styles';
import { ExperienceInnerBlock, ExperienceBlockLeft, ExperienceBlockRight, ExperienceImage, ExperienceFigure, ExperienceContent, ExperienceImageLayer } from './Experience.styles';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

const Experience: FC<IntroductionProps> = ({ currentComponent }) => {
  const [mobileQuery, setMobileQuery] = useState(false);
  const component = currentComponent[0];
  const { scrollY } = useViewportScroll();

  const y1 = useTransform(scrollY, [0, 1000], [0, 100]);
  const y2 = useTransform(scrollY, [0, 1100], [0, -200]);

  useEffect(() => {
    const handleResize = () => {
      setMobileQuery(window.innerWidth <= 767 ? true : false);
    };
    window.addEventListener('resize', handleResize);
  }, [mobileQuery]);

  return (
    <ComponentSection>
      <ExperienceInnerBlock>
        <ExperienceBlockLeft>
          <motion.div
            style={mobileQuery ? { y: 0, x: 0 } : { y: y1, x: 50 }}
          >
            <ExperienceContent>{component?.context}</ExperienceContent>
          </motion.div>
        </ExperienceBlockLeft>
        <ExperienceBlockRight>
          <motion.div
            style={mobileQuery ? { y: 0, x: 0 } : { y: y2, x: 0 }} transition={{ ease: "easeOut", duration: 2 }}
          >
            <ExperienceFigure>
              <ExperienceImage src={component?.content[0].image} alt="test"
              />
              <ExperienceImageLayer />
            </ExperienceFigure>
          </motion.div>
        </ExperienceBlockRight>
      </ExperienceInnerBlock>
    </ComponentSection >
  );
};

const mapStateToProps = (state: any) => ({
  currentComponent: state.data.filter((item) => item.title.toLowerCase() === "experience")
});

const connector = connect(mapStateToProps);
type IntroductionProps = ConnectedProps<typeof connector>;
export default connector(Experience);