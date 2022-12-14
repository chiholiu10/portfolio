import { useQuery } from "@apollo/client";
import { motion, useTransform, useScroll } from "framer-motion";
import {
  ComponentSection,
  Header,
  SubHeader,
  BackgroundImage,
  DisplayFlex,
} from "../../../styles/General.styles";
import { FadeUpWhenVisible, FadeUpIndividually } from "../../FramerMotions";
import {
  IntroBlock,
  IntroTitle,
  IntroBlockCenter,
  IntroSubTitle,
} from "./Introduction.styles";
import { QUERY } from "./IntroductionQuery";
import uniqid from "uniqid";

export const Introduction = () => {
  const { data, loading, error } = useQuery(QUERY);
  const { scrollY } = useScroll();
  const y2 = useTransform(scrollY, [0, 7000], [1, -1000]);

  if (loading) {
    return <></>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <ComponentSection id="introduction">
      <div key={uniqid()}>
        <motion.div style={{ y: y2, x: 0 }}>
          <BackgroundImage
            src={
              "https://res.cloudinary.com/dh7tnzzxm/image/upload/v1651443884/circle_effect_8ce52c0de3.png"
            }
            left="60%"
            width="300px"
            height="auto"
            alt="background-image-effect"
          />
        </motion.div>
        <FadeUpWhenVisible>
          <Header>{data.section.title}</Header>
          <SubHeader>{data.section.subtitle}</SubHeader>
        </FadeUpWhenVisible>
        <DisplayFlex>
          {data.section.array.map((item, index) => (
            <FadeUpIndividually time={index} key={uniqid()}>
              <IntroBlock>
                <IntroBlockCenter>
                  <IntroTitle>{item.description} </IntroTitle>
                  <IntroSubTitle>{item.title}</IntroSubTitle>
                </IntroBlockCenter>
              </IntroBlock>
            </FadeUpIndividually>
          ))}
        </DisplayFlex>
      </div>
    </ComponentSection>
  );
};
