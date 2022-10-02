import { motion, useTransform, useViewportScroll } from 'framer-motion';
import { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import uniqid from 'uniqid';
import { ComponentSection, Header, SubHeader, BackgroundImage } from '../../../styles/General.styles';
import { FadeUpWhenVisible, FadeUpIndividually } from '../../FramerMotions';
import { DisplayFlex, IntroBlock, IntroTitle, IntroBlockCenter, IntroSubTitle } from "./Introduction.styles";

const Introduction: FC<IntroductionProps> = ({ currentComponent }) => {
  const component = currentComponent[0];
  const { scrollY } = useViewportScroll();

  const y2 = useTransform(scrollY, [0, 7000], [1, -1000]);

  return (
    <ComponentSection>
      <div key={uniqid()}>
        <motion.div
          style={{ y: y2, x: 0 }}
        >
          <BackgroundImage src={"https://res.cloudinary.com/dh7tnzzxm/image/upload/v1651443884/circle_effect_8ce52c0de3.png"} left="60%" width="300px" height="auto" />
        </motion.div>
        <FadeUpWhenVisible>
          <Header>{component?.title}</Header>
          <SubHeader>{component?.subtitle}</SubHeader>
          <div>{component?.context}</div>
        </FadeUpWhenVisible>
        <DisplayFlex>
          {component?.content.map((item, index) => (
            <FadeUpIndividually time={index} key={uniqid()}>
              <IntroBlock>
                <IntroBlockCenter>
                  <IntroTitle>{item.title}</IntroTitle>
                  <IntroSubTitle>{item.subtitle}</IntroSubTitle>
                </IntroBlockCenter>
              </IntroBlock>
            </FadeUpIndividually>
          ))}
        </DisplayFlex>
      </div>
    </ComponentSection>
  );
};

const mapStateToProps = (state: any) => ({
  currentComponent: state.data.filter((item) => item.title.toLowerCase() === "introduction")
});

const connector = connect(mapStateToProps);
type IntroductionProps = ConnectedProps<typeof connector>;
export default connector(Introduction);