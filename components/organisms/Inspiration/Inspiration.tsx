import { SectionHeading } from "@/components/molecules/SectionHeading/SectionHeading";
import type { HomeSections } from "@/lib/content-model";
import { ComponentSection } from "@/styles/General.styles";
import { FadeUp, WordReveal } from "@/components/atoms/Motion";
import {
  InspirationBlockLeft,
  InspirationBlockRight,
  InspirationContent,
  InspirationFigure,
  InspirationImage,
  InspirationInnerBlock,
} from "@/components/organisms/Inspiration/Inspiration.styles";

type InspirationProps = { data: HomeSections["inspiration"] };

export const Inspiration = ({ data }: InspirationProps) => {
  const { section } = data;

  if (!section) {
    return null;
  }

  const { subtitle, image } = section;

  return (
    <ComponentSection id="inspiration" className="inspirationComponent">
      <SectionHeading id="inspiration-heading" title={section.title} eyebrow={section.eyebrow} />
      <InspirationInnerBlock>
        <InspirationBlockLeft>
          <FadeUp id="inspiration-section">
            <InspirationContent>
              <WordReveal text={subtitle} />
            </InspirationContent>
          </FadeUp>
        </InspirationBlockLeft>

        <InspirationBlockRight>
          <FadeUp id="inspiration-image">
            <InspirationFigure>
              <InspirationImage
                src={image.url}
                alt="Chi Ho Liu working as a front-end developer"
                width={810}
                height={540}
                sizes="(max-width: 767px) calc(100vw - 40px), 500px"
                quality={70}
                loading="lazy"
              />
            </InspirationFigure>
          </FadeUp>
        </InspirationBlockRight>
      </InspirationInnerBlock>
    </ComponentSection>
  );
};
