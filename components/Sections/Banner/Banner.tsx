import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import {
  ComponentSection,
  SubHeader,
  BackgroundImage,
} from "../../../styles/General.styles";
import { HeaderH1, ProfileCartoon } from "./Banner.styles";
import { QUERY } from "./BannerQuery";
import { BannerLogo } from "./BannerLogo";

export const Banner = () => {
  const { data, loading, error } = useQuery(QUERY);

  if (loading) {
    return <ComponentSection>Loading...</ComponentSection>;
  }

  if (error) {
    console.error(error);
    return <ComponentSection>Error loading data</ComponentSection>;
  }

  return (
    <ComponentSection id="banner" className="bannerComponent">
      <BackgroundImage
        src="https://res.cloudinary.com/dh7tnzzxm/image/upload/v1651443884/circle_effect_8ce52c0de3.png"
        left="-60%"
        alt="background-image-effect"
      />
      <ProfileCartoon>
        <BackgroundImage
          src="https://res.cloudinary.com/dh7tnzzxm/image/upload/v1681643719/Gradient_4_w267pd.png"
          left="60%"
          alt="background-image-effect"
        />
        <BannerLogo />
      </ProfileCartoon>

      <motion.div>
        {data && data.section ? (
          <>
            <HeaderH1>{data?.section.title}</HeaderH1>
            <SubHeader>{data?.section.subtitle}</SubHeader>
          </>
        ) : (
          "loading..."
        )}
      </motion.div>
    </ComponentSection>
  );
};
