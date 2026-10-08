import type { HomeSections } from "../../../lib/content-model";
import { BannerLogo } from "../../atoms/Avatar/Avatar";
import { Hero, HeroCopy, HeroActions, HeroVisual, VisualCaption, Approach } from "./Banner.styles";

type BannerProps = { data: HomeSections["banner"] };

export const Banner = ({ data }: BannerProps) => {
  const { section } = data;
  if (!section) return null;
  const sentences = (section.subtitle || "").match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g) || [];
  const introduction = sentences.slice(0, 2).join("");
  const approach = sentences.slice(2).join("");
  return (
    <>
    <Hero id="banner" className="bannerComponent">
      <HeroCopy>
        <p>{section.extraText || "Design × Engineering"}</p>
        <h1>{section.title}</h1>
        <p className="hero-description">{introduction}</p>
        <HeroActions>
          <a href="#portfolio">Explore my work</a>
          <a href="#contact">Let’s talk</a>
        </HeroActions>
      </HeroCopy>
      <HeroVisual>
        <BannerLogo />
        <VisualCaption><span>Chiho Liu</span><span>Frontend · UX · AI</span></VisualCaption>
      </HeroVisual>
    </Hero>
    {approach && (
      <Approach id="approach" aria-labelledby="approach-title">
        <h2 id="approach-title">My approach</h2>
        <p>{approach}</p>
      </Approach>
    )}
    </>
  );
};
