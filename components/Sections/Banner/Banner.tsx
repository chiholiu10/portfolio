import {
  ComponentSection,
  SubHeader,
  BackgroundImage,
} from "../../../styles/General.styles";
import { HeaderH1 } from "./Banner.styles";
import { useQuery } from "@apollo/client";
import { FadeUpWhenVisible } from "../../FramerMotions";
import { motion, useTransform, useScroll } from "framer-motion";
import { QUERY } from "./BannerQuery";

export const Banner = () => {
  const { data, loading, error } = useQuery(QUERY);
  const { scrollY } = useScroll();
  const y2 = useTransform(scrollY, [0, 7000], [1, -2000]);

  if (loading) {
    return <></>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <ComponentSection id="banner">
      <FadeUpWhenVisible>
        <motion.div style={{ y: y2, x: 50 }}>
          <BackgroundImage
            src={
              "https://res.cloudinary.com/dh7tnzzxm/image/upload/v1651443884/circle_effect_8ce52c0de3.png"
            }
            left="-60%"
            width="100%"
            alt="background-image-effect"
          />
        </motion.div>
        <HeaderH1>{data.section.title}</HeaderH1>
        <SubHeader>{data.section.subtitle}</SubHeader>
      </FadeUpWhenVisible>
    </ComponentSection>
  );
};
