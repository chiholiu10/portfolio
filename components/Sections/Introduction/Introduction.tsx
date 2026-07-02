import { memo } from "react";
import {
  ComponentSection,
  DisplayFlex,
  Header,
  SubHeader,
} from "../../../styles/General.styles";
import {
  StaggerGroup,
  FadeUp,
  WordReveal,
  StaggerItem,
} from "../../FramerMotions";
import {
  IntroBlock,
  IntroBlockCenter,
  IntroSubTitle,
  IntroTitle,
} from "./Introduction.styles";

type IntroItem = {
  title: string;
  description: string;
};

type IntroductionProps = {
  data: {
    section: {
      title: string;
      subtitle: string;
      arrays: IntroItem[];
    } | null;
  };
};

const IntroItem = memo(
  ({ item, index }: { item: IntroItem; index: number }) => (
    <StaggerGroup>
      <IntroBlock>
        <IntroBlockCenter>
          <IntroTitle>{item.description}</IntroTitle>
          <IntroSubTitle>{item.title}</IntroSubTitle>
        </IntroBlockCenter>
      </IntroBlock>
    </StaggerGroup>
  ),
);

export const Introduction = ({ data }: IntroductionProps) => {
  const { section } = data;

  if (!section) {
    return (
      <ComponentSection>
        <div>No data available</div>
      </ComponentSection>
    );
  }

  const { title, subtitle, arrays } = section;

  return (
    <ComponentSection id="introduction">
      <FadeUp id="introduction-section">
        <Header>{title}</Header>
        <SubHeader>
          <WordReveal text={subtitle} />
        </SubHeader>
      </FadeUp>
      <StaggerGroup>
        <DisplayFlex>
          {arrays?.map((item, index) => (
            <StaggerItem key={index}>
              <IntroBlock>
                <IntroBlockCenter>
                  <IntroTitle>{item.description} </IntroTitle>
                  <IntroSubTitle>{item.title}</IntroSubTitle>
                </IntroBlockCenter>
              </IntroBlock>
            </StaggerItem>
          ))}
        </DisplayFlex>
      </StaggerGroup>
    </ComponentSection>
  );
};

IntroItem.displayName = "IntroItem";
