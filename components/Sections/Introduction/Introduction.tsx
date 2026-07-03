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
  CardFoot,
  CardNumber,
  IntroBlock,
  IntroBlockCenter,
  IntroSubTitle,
  IntroTitle,
  OrbitPlanet,
  OrbitVisual,
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
              <IntroBlock $index={index}>
                <CardNumber>{String(index + 1).padStart(2, "0")}</CardNumber>
                <OrbitVisual $index={index} aria-hidden="true">
                  <OrbitPlanet $index={index} />
                </OrbitVisual>
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
