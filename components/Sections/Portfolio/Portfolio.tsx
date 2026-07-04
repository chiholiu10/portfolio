import { m, useScroll, useTransform } from "motion/react";
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

type PortfolioProps = {
  data: {
    section: {
      title: string;
      subtitle: string;
      array: { secure_url: string }[];
    } | null;
  };
};

export const Portfolio = ({ data }: PortfolioProps) => {
  const { scrollY } = useScroll();
  const y2 = useTransform(scrollY, [0, 7000], [1, -1000]);

  const { section } = data;

  if (!section) {
    return <ComponentSection>No data available</ComponentSection>;
  }

  const { title, subtitle, array } = section;

  return (
    <ComponentSection className="portfolioComponent">
      <m.div style={{ y: y2, x: 0 }}>
        <BackgroundImage $left="60%">
          <Image
            src={
              "https://res.cloudinary.com/dh7tnzzxm/image/upload/v1651443884/circle_effect_8ce52c0de3.png"
            }
            width={612}
            height={612}
            sizes="(min-width: 768px) 40vw, 1px"
            style={{ width: "100%", height: "auto" }}
            loading="lazy"
            alt="background-image-effect"
          />
        </BackgroundImage>
      </m.div>
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
                  alt={`Portfolio project ${index + 1}`}
                  width={700}
                  height={394}
                  sizes="(max-width: 767px) calc(100vw - 40px), 390px"
                  quality={65}
                  loading="lazy"
                />
              </PortfolioBlock>
            </StaggerItem>
          ))}
        </DisplayFlex>
      </StaggerGroup>
    </ComponentSection>
  );
};
