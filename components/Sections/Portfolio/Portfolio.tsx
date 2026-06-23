import { useQuery } from "@apollo/client/react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  BackgroundImage,
  ComponentSection,
  DisplayFlex,
  Header,
  SubHeader,
} from "../../../styles/General.styles";
import {
  FadeUp,
  StaggerItem,
  StaggerGroup,
  WordReveal,
} from "../../FramerMotions";
import { PortfolioBlock, PortfolioImage } from "./Portfolio.styles";
import { QUERY } from "./PortfolioQuery";
import { z } from "zod";

const PortfolioSchema = z.object({
  section: z
    .object({
      title: z.string(),
      subtitle: z.string(),
      array: z.array(
        z.object({
          secure_url: z.string(),
        }),
      ),
    })
    .nullable(),
});

export const Portfolio = () => {
  const { data, loading, error } = useQuery(QUERY, {
    variables: { id: "2qFy05XNAe3Ho1CmJiAgbO" },
    fetchPolicy: "cache-and-network",
  });

  const { scrollY } = useScroll();
  const y2 = useTransform(scrollY, [0, 7000], [1, -1000]);

  if (loading) {
    return <ComponentSection />;
  }

  const result = PortfolioSchema.safeParse(data);

  if (!result.success) {
    console.error("Validation error:", result.error);
    return <ComponentSection>Error loading data</ComponentSection>;
  }

  const { section } = result.data;

  if (!section) {
    return <ComponentSection>No data available</ComponentSection>;
  }

  const { title, subtitle, array } = section;

  return (
    <ComponentSection className="portfolioComponent">
      <motion.div style={{ y: y2, x: 0 }}>
        <BackgroundImage left="60%">
          <Image
            src={
              "https://res.cloudinary.com/dh7tnzzxm/image/upload/v1651443884/circle_effect_8ce52c0de3.png"
            }
            width={612}
            height={612}
            layout="responsive"
            priority
            alt="background-image-effect"
          />
        </BackgroundImage>
      </motion.div>
      <FadeUp id="portfolio-section">
        <Header>{title}</Header>
        <SubHeader>
          <WordReveal text={subtitle} />
        </SubHeader>
      </FadeUp>
      <StaggerGroup>
        <DisplayFlex>
          {array.map((item, index) => (
            <StaggerItem key={index}>
              <PortfolioBlock>
                <PortfolioImage
                  src={item.secure_url}
                  alt="portfolio-website/"
                />
              </PortfolioBlock>
            </StaggerItem>
          ))}
        </DisplayFlex>
      </StaggerGroup>
    </ComponentSection>
  );
};
