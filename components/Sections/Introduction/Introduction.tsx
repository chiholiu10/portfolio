import { useQuery } from "@apollo/client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  BackgroundImage,
  ComponentSection,
  DisplayFlex,
  Header,
  SubHeader,
} from "../../../styles/General.styles";
import { FadeUpIndividually, FadeUpWhenVisible } from "../../FramerMotions";
import {
  IntroBlock,
  IntroBlockCenter,
  IntroSubTitle,
  IntroTitle,
} from "./Introduction.styles";
import { QUERY } from "./IntroductionQuery";

export const Introduction = () => {
  const { data, loading, error } = useQuery(QUERY, {
    variables: { id: "4DIoyNagIFWzKfhGrtKUXB" },
    fetchPolicy: "cache-and-network",
  });
  const { scrollY } = useScroll();
  const y2 = useTransform(scrollY, [0, 7000], [1, -1000]);

  if (loading) {
    return <ComponentSection />;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <ComponentSection id="introduction">
      <motion.div initial={false} style={{ y: y2, x: 0 }}>
        <BackgroundImage left="60%">
          <Image
            className="effect"
            src={
              "https://res.cloudinary.com/dh7tnzzxm/image/upload/v1681643719/Gradient_4_w267pd.png"
            }
            width={625}
            height={700}
            layout="responsive"
            priority
            alt="background-image-effect"
          />
        </BackgroundImage>
      </motion.div>
      <FadeUpWhenVisible>
        <Header>{data.section.title}</Header>
        <SubHeader>{data.section.subtitle}</SubHeader>
      </FadeUpWhenVisible>
      <DisplayFlex>
        {data.section.arrays.map((item, index) => (
          <FadeUpIndividually time={index} key={index}>
            <IntroBlock>
              <IntroBlockCenter>
                <IntroTitle>{item.description} </IntroTitle>
                <IntroSubTitle>{item.title}</IntroSubTitle>
              </IntroBlockCenter>
            </IntroBlock>
          </FadeUpIndividually>
        ))}
      </DisplayFlex>
    </ComponentSection>
  );
};
