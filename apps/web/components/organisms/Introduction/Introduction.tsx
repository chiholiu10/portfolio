import type { HomeSections } from "@/lib/content-model";
import { SectionHeading } from "@/components/molecules/SectionHeading/SectionHeading";
import { ComponentSection } from "@/styles/General.styles";
import { StaggerGroup, StaggerItem } from "@/components/atoms/Motion";
import {
  CardFoot,
  IntroBlock,
  IntroGrid,
  IntroBlockCenter,
  IntroSubTitle,
  IntroTitle,
  OrbitVisual,
} from "@/components/organisms/Introduction/Introduction.styles";

type IntroductionProps = { data: HomeSections["introduction"] };

export const Introduction = ({ data }: IntroductionProps) => {
  const { section } = data;

  if (!section) {
    return null;
  }

  const { title, subtitle, arrays } = section;

  return (
    <ComponentSection id="introduction">
      <SectionHeading
        id="introduction-section"
        title={title}
        subtitle={subtitle}
        eyebrow={section.eyebrow}
      />
      <StaggerGroup>
        <IntroGrid>
          {arrays?.map((item, index) => (
            <StaggerItem key={index}>
              <IntroBlock $index={index}>
                <OrbitVisual $index={index} aria-hidden="true" />
                <IntroBlockCenter>
                  <IntroSubTitle>{item.description}</IntroSubTitle>
                  <IntroTitle>{item.title}</IntroTitle>
                </IntroBlockCenter>
                <CardFoot aria-hidden="true" />
              </IntroBlock>
            </StaggerItem>
          ))}
        </IntroGrid>
      </StaggerGroup>
    </ComponentSection>
  );
};
