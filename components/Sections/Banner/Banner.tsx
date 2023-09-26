import {
  ComponentSection,
  SubHeader,
  BackgroundImage,
} from "../../../styles/General.styles";
import { HeaderH1, ProfileCartoon } from "./Banner.styles";
import { useQuery } from "@apollo/client";
import { motion, useTransform, useScroll } from "framer-motion";
import { QUERY } from "./BannerQuery";
import { BannerLogo } from "./BannerLogo";

export const Banner = () => {
  const { data, loading, error } = useQuery(QUERY);
  const { scrollY } = useScroll();
  const y2 = useTransform(scrollY, [0, 7000], [1, -2000]);

  if (loading) {
    return <ComponentSection></ComponentSection>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <ComponentSection id="banner" className="bannerComponent">
      <BackgroundImage
        src={
          "https://res.cloudinary.com/dh7tnzzxm/image/upload/v1651443884/circle_effect_8ce52c0de3.png"
        }
        left="-60%"
        width="100%"
        alt="background-image-effect"
      />
      <ProfileCartoon>
        <BackgroundImage
          src={
            "https://res.cloudinary.com/dh7tnzzxm/image/upload/v1681643719/Gradient_4_w267pd.png"
          }
          left="60%"
          width="300px"
          height="auto"
          alt="background-image-effect"
        />
        <BannerLogo/>
      </ProfileCartoon>

      <motion.div style={{ y: y2 }}>
        <HeaderH1>{data.section.title}</HeaderH1>
        <SubHeader>{data.section.subtitle}</SubHeader>
      </motion.div>
    </ComponentSection>
  );
};
