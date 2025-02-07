import { useQuery } from "@apollo/client";
import { motion, useTransform, useScroll } from "framer-motion";
import { PortfolioImage, PortfolioBlock } from "./Portfolio.styles";
import {
  ComponentSection,
  Header,
  SubHeader,
  BackgroundImage,
  DisplayFlex,
} from "../../../styles/General.styles";
import { FadeUpWhenVisible, FadeUpIndividually } from "../../FramerMotions";
import { QUERY } from "./PortfolioQuery";

export const Portfolio = () => {
  const { data, loading, error } = useQuery(QUERY);
  const { scrollY } = useScroll();
  const y2 = useTransform(scrollY, [0, 7000], [1, -1000]);

  if (loading) {
    return <ComponentSection></ComponentSection>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <ComponentSection className="portfolioComponent">
      <motion.div style={{ y: y2, x: 0 }}>
        <BackgroundImage
          src={
            "https://res.cloudinary.com/dh7tnzzxm/image/upload/v1651443884/circle_effect_8ce52c0de3.png"
          }
          left="60%"
          alt="background-image-effect"
        />
      </motion.div>
      <FadeUpWhenVisible>
        <Header>{data.section.title}</Header>
        <SubHeader>{data.section.subtitle}</SubHeader>
      </FadeUpWhenVisible>
      <DisplayFlex>
        {data.section.array.map((item, index) => (
          <PortfolioBlock key={index}>
            <FadeUpIndividually time={index} key={index}>
              <PortfolioImage src={item.secure_url} alt="portfolio-website/" />
            </FadeUpIndividually>
          </PortfolioBlock>
        ))}
      </DisplayFlex>
    </ComponentSection>
  );
};
