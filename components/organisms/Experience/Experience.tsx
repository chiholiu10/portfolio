import type { HomeSections } from "@/lib/content-model";
import { ComponentSection } from "@/styles/General.styles";
import { FadeUp, WordReveal } from "@/components/atoms/Motion";
import {
  ExperienceBlockLeft,
  ExperienceBlockRight,
  ExperienceContent,
  ExperienceFigure,
  ExperienceImage,
  ExperienceInnerBlock,
} from "@/components/organisms/Experience/Experience.styles";

type ExperienceProps = { data: HomeSections["experience"] };

export const Experience = ({ data }: ExperienceProps) => {
  const { section } = data;

  if (!section) {
    return null;
  }

  const { subtitle, image } = section;

  return (
    <ComponentSection id="experience" className="experienceComponent">
      <ExperienceInnerBlock>
        <ExperienceBlockLeft>
          <FadeUp id="experience-section">
            <ExperienceContent>
              <WordReveal text={subtitle} />
            </ExperienceContent>
          </FadeUp>
        </ExperienceBlockLeft>

        <ExperienceBlockRight>
          <FadeUp id="experience-image">
            <ExperienceFigure>
              <ExperienceImage
                src={image.url}
                alt="Chi Ho Liu working as a front-end developer"
                width={810}
                height={540}
                sizes="(max-width: 767px) calc(100vw - 40px), 500px"
                quality={70}
                loading="lazy"
              />
            </ExperienceFigure>
          </FadeUp>
        </ExperienceBlockRight>
      </ExperienceInnerBlock>
    </ComponentSection>
  );
};
