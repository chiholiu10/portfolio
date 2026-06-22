import { useQuery } from "@apollo/client/react";
import { z } from "zod";
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
import { QUERY } from "./IntroductionQuery";

const IntroItemSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const IntroductionSchema = z.object({
  section: z
    .object({
      title: z.string(),
      subtitle: z.string(),
      arrays: z.array(IntroItemSchema),
    })
    .nullable(),
});

type IntroItem = z.infer<typeof IntroItemSchema>;

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

export const Introduction = () => {
  const { data, loading } = useQuery(QUERY, {
    variables: { id: "4DIoyNagIFWzKfhGrtKUXB" },
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return <ComponentSection />;
  }

  const result = IntroductionSchema.safeParse(data);

  if (!result.success) {
    console.error("Validation error:", result.error);
    return (
      <ComponentSection>
        <div>Error loading data</div>
      </ComponentSection>
    );
  }

  const { section } = result.data;

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
