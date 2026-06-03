import { useQuery } from "@apollo/client";
import { z } from "zod";
import { memo } from "react";
import {
  ComponentSection,
  DisplayFlex,
  Header,
  SubHeader,
} from "../../../styles/General.styles";
import { FadeUpIndividually, FadeUpWhenVisible } from "../../FramerMotions";
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

const SectionSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  arrays: z.array(IntroItemSchema),
});

type IntroItem = z.infer<typeof IntroItemSchema>;

const IntroItem = memo(
  ({ item, index }: { item: IntroItem; index: number }) => (
    <FadeUpIndividually time={index * 0.1}>
      <IntroBlock>
        <IntroBlockCenter>
          <IntroTitle>{item.description}</IntroTitle>
          <IntroSubTitle>{item.title}</IntroSubTitle>
        </IntroBlockCenter>
      </IntroBlock>
    </FadeUpIndividually>
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

  const { section } = data || {};
  if (!section) return null;

  const validationResult = SectionSchema.safeParse(section);

  if (!validationResult.success) {
    console.error("Invalid section data:", validationResult.error);
    return (
      <ComponentSection>
        <div>Error: Invalid data structure</div>
      </ComponentSection>
    );
  }

  const { title, subtitle, arrays } = validationResult.data;

  return (
    <ComponentSection id="introduction">
      <FadeUpWhenVisible>
        <Header>{title}</Header>
        <SubHeader>{subtitle}</SubHeader>
      </FadeUpWhenVisible>
      <DisplayFlex>
        {arrays?.map((item, index) => (
          <FadeUpIndividually time={index} key={index}>
            <IntroBlock>
              <IntroBlockCenter>
                <IntroTitle>{item.description} </IntroTitle>
                <IntroSubTitle>{item.title}</IntroSubTitle>
              </IntroBlockCenter>
            </IntroBlock>
          </FadeUpIndividually>
        ))}
      </DisplayFlex>
    </ComponentSection>
  );
};

IntroItem.displayName = "IntroItem";
