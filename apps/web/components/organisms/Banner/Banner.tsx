import { Eyebrow } from "@/components/atoms/Eyebrow/Eyebrow";
import type { HomeSections } from "@/lib/content-model";
import { BannerLogo } from "@/components/atoms/Avatar/Avatar";
import {
  Hero,
  HeroCopy,
  HeroActions,
  HeroVisual,
  Approach,
} from "@/components/organisms/Banner/Banner.styles";

type BannerProps = { data: HomeSections["banner"] };

export const Banner = ({ data }: BannerProps) => {
  const { section } = data;
  if (!section) return null;
  const sentences =
    (section.subtitle || "").match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g) || [];
  const introduction = sentences.slice(0, 2).join("");
  const approach = sentences.slice(2).join("");
  return (
    <>
      <Hero id="banner" className="bannerComponent">
        <HeroCopy>
          {section.eyebrow && <Eyebrow>{section.eyebrow}</Eyebrow>}
          <h1 className="ui-h1">{section.title}</h1>
          <p className="ui-p hero-description">{introduction}</p>
          <HeroActions>
            <a className="ui-a" href="#portfolio">
              Explore my work
            </a>
            <a className="ui-a" href="#contact">
              Let’s talk
            </a>
          </HeroActions>
        </HeroCopy>
        <HeroVisual>
          <BannerLogo />
        </HeroVisual>
      </Hero>
      {approach && (
        <Approach id="approach" aria-labelledby="approach-title">
          <div className="ui-div approach-heading">
            {section.approachEyebrow && (
              <Eyebrow>{section.approachEyebrow}</Eyebrow>
            )}
            <h2 className="ui-h2" id="approach-title">
              My approach
            </h2>
          </div>
          <p className="ui-p">{approach}</p>
        </Approach>
      )}
    </>
  );
};
