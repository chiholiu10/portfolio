import { ComponentSection } from '../../../styles/General.styles';
import { ExperienceInnerBlock, ExperienceBlockLeft, ExperienceBlockRight, ExperienceImage, ExperienceFigure, ExperienceContent } from './Experience.styles';
import { motion, useTransform, useScroll } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { FadeUpWhenVisible } from "../../FramerMotions";

const Experience: FC<IntroductionProps> = ({ currentComponent }) => {
  const [mobileQuery, setMobileQuery] = useState(true);
  const component = currentComponent[0];
  const { scrollY } = useScroll();
  const yMobile = useTransform(scrollY, [1, 700], [1, 200]);
  const yDesktop = useTransform(scrollY, [1, 7000], [1, 400]);

  const handleResize = () => {
    setMobileQuery(window.innerWidth < 768 ? true : false);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, [mobileQuery]);
  console.log(mobileQuery);

  return (
    <ComponentSection>
      <FadeUpWhenVisible>
        <motion.div
          style={{ y: 0, x: 0 }}
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