import { useQuery } from "@apollo/client/react";
import Image from "next/image";
import {
  ComponentRow,
  ComponentSection,
  Header,
  SubHeader,
} from "../../../styles/General.styles";
import { FadeUp, StaggerItem, WordReveal } from "../../FramerMotions";
import { ToolInnerBlock, ToolsBlock, ToolsHeader } from "./Tools.styles";
import { QUERY } from "./ToolsQuery";
import { StaggerGroup } from "../../FramerMotions/StaggerGroup";
import { z } from "zod";

const ToolsSchema = z.object({
  section: z
    .object({
      title: z.string().optional().nullable(),
      subtitle: z.string().optional().nullable(),
      arrayBlockCollection: z
        .object({
          items: z.array(
            z.object({
              url: z.string(),
              title: z.string().optional().nullable(),
            }),
          ),
        })
        .optional()
        .nullable(),
    })
    .nullable(),
});

export const Tools = () => {
  const { data, loading, error } = useQuery(QUERY, {
    variables: { id: "2FzwztBT4JTZm5icaV1tlb" },
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return <ComponentSection />;
  }

  const result = ToolsSchema.safeParse(data);

  if (!result.success) {
    console.error("Validation error:", result.error);
    return <ComponentSection>Error loading data</ComponentSection>;
  }

  const { section } = result.data;

  if (!section) {
    return <ComponentSection>No data available</ComponentSection>;
  }

  const { title, subtitle, arrayBlockCollection } = section;
  const items = arrayBlockCollection?.items || [];

  return (
    <ComponentSection>
      <FadeUp id="tools-section">
        <Header>{title}</Header>
        <SubHeader>
          <WordReveal text={subtitle} />
        </SubHeader>
      </FadeUp>
      <StaggerGroup>
        <ComponentRow>
          {items?.length > 0 &&
            items.map((item, index) => (
              <StaggerItem key={index}>
                <ToolsBlock>
                  <ToolInnerBlock>
                    <Image
                      src={item.url}
                      alt={
                        item.title ? `${item.title}` : `tool image ${index + 1}`
                      }
                      width={40}
                      height={40}
                      loading="lazy"
                    />
                  </ToolInnerBlock>
                  <ToolsHeader>
                    <h2>{item.title}</h2>
                  </ToolsHeader>
                </ToolsBlock>
              </StaggerItem>
            ))}
        </ComponentRow>
      </StaggerGroup>
    </ComponentSection>
  );
};
