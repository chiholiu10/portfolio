import type { HomeSections } from "../../../lib/content-model";
import { SectionHeading } from "../../molecules/SectionHeading/SectionHeading";
import {
  ComponentSection,
  DisplayFlex,
} from "../../../styles/General.styles";
import {
  StaggerGroup,
  StaggerItem,
} from "../../atoms/Motion";
import {
  CardFoot,
  IntroBlock,
  IntroBlockCenter,
  IntroSubTitle,
  IntroTitle,
  OrbitVisual,
} from "./Introduction.styles";

type IntroductionProps = { data: HomeSections["introduction"] };

export const Introduction = ({ data }: IntroductionProps) => {
  const { section } = data;

  if (!section) {
    return null;
  }

  const { title, subtitle, arrays } = section;

  return (
    <ComponentSection id="introduction">
      <SectionHeading id="introduction-section" title={title} subtitle={subtitle} />
      <StaggerGroup>
        <DisplayFlex>
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
        </DisplayFlex>
      </StaggerGroup>
    </ComponentSection>
  );
};
