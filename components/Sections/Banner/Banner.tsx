import { ComponentSection, Header, SubHeader, BackgroundImage } from '../../../styles/General.styles';
import { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { FadeUpWhenVisible } from "../../FramerMotions";
import { motion, useTransform, useViewportScroll } from 'framer-motion';

const Banner: FC<PortfolioWebsiteProps> = ({ currentComponent }) => {
  const component = currentComponent[0];
  const { scrollY } = useViewportScroll();
  const y2 = useTransform(scrollY, [0, 7000], [1, -2000]);
  return (
    <ComponentSection>
      <FadeUpWhenVisible>
        <motion.div
          style={{ y: y2, x: 50 }}
        >
          <BackgroundImage src={"https://res.cloudinary.com/dh7tnzzxm/image/upload/v1651443884/circle_effect_8ce52c0de3.png"} left="-60%" width="100%" />
        </motion.div>
        <Header>{component?.title}</Header>
        <SubHeader>{component?.context}</SubHeader>
      </FadeUpWhenVisible>
    </ComponentSection >
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentComponent: state.data.filter((item) => item.title === "Portfolio website")
  };
};

const connector = connect(mapStateToProps);
type PortfolioWebsiteProps = ConnectedProps<typeof connector>;
export default connector(Banner);