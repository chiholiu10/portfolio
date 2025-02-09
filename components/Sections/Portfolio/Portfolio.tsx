import { useQuery } from "@apollo/client";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  BackgroundImage,
  ComponentSection,
  DisplayFlex,
  Header,
  SubHeader,
} from "../../../styles/General.styles";
import { FadeUpIndividually, FadeUpWhenVisible } from "../../FramerMotions";
import { PortfolioBlock, PortfolioImage } from "./Portfolio.styles";
import { QUERY } from "./PortfolioQuery";

export const Portfolio = () => {
  const { data, loading, error } = useQuery(QUERY, {
    variables: { id: "2qFy05XNAe3Ho1CmJiAgbO" },
    fetchPolicy: "cache-and-network",
  });

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
