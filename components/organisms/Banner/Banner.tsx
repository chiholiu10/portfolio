import type { HomeSections } from "../../../lib/content-model";
import { m } from "motion/react";
import Image from "next/image";
import {
  BackgroundImage,
  ComponentSection,
  SubHeader,
} from "../../../styles/General.styles";
import {
  CodeCard,
  HeaderH1,
  OrbitNode,
  OrbitRing,
  ProfileCartoon,
  VisualLabel,
} from "./Banner.styles";
import { BannerLogo } from "../../atoms/Avatar/Avatar";
import { WordReveal } from "../../atoms/Motion";

type BannerProps = { data: HomeSections["banner"] };

export const Banner = ({ data }: BannerProps) => {
  const { section } = data;

  if (!section) return null;

  return (
    <ComponentSection id="banner" className="bannerComponent">
      <BackgroundImage $left="-60%">
        <Image
          src="https://res.cloudinary.com/dh7tnzzxm/image/upload/v1651443884/circle_effect_8ce52c0de3.png"
          width={734}
          height={733}
          sizes="(min-width: 768px) 50vw, 1px"
          style={{ width: "100%", height: "auto" }}
          loading="lazy"
          alt="background-image-effect"
        />
      </BackgroundImage>
      <ProfileCartoon>
        <BackgroundImage $left="60%">
          <Image
            src="https://res.cloudinary.com/dh7tnzzxm/image/upload/v1681643719/Gradient_4_w267pd.png"
            width={934}
            height={1092}
            sizes="(min-width: 768px) 50vw, 1px"
            style={{ width: "100%", height: "auto" }}
            loading="lazy"
            alt="background-image-effect"
          />
        </BackgroundImage>

        <OrbitRing $level={1} aria-hidden="true" />
        <OrbitRing $level={2} aria-hidden="true" />
        <OrbitRing $level={3} aria-hidden="true" />
        {section.arrays?.map((node, index) => (
          <OrbitNode key={index} $position={node.position}>
            {node.text}
          </OrbitNode>
        ))}
        <CodeCard aria-hidden="true">
          <i />
          <i />
          <i />
        </CodeCard>
        <BannerLogo />
        <VisualLabel>{section.extraText}</VisualLabel>
      </ProfileCartoon>

      <m.div>
        <HeaderH1>{section.title}</HeaderH1>
        <SubHeader>
          <WordReveal text={section.subtitle} />
        </SubHeader>
      </m.div>
    </ComponentSection>
  );
};
