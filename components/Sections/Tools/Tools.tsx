import Image from "next/image";
import {
  ComponentRow,
  ComponentSection,
  Header,
  SubHeader,
} from "../../../styles/General.styles";
import { FadeUp, StaggerItem, WordReveal } from "../../FramerMotions";
import { ToolInnerBlock, ToolsBlock, ToolsHeader } from "./Tools.styles";
import { StaggerGroup } from "../../FramerMotions/StaggerGroup";

type ToolsProps = {
  data: {
    section: {
      title?: string | null;
      subtitle?: string | null;
      arrayBlockCollection?: {
        items: { url: string; title?: string | null }[];
      } | null;
    } | null;
  };
};

export const Tools = ({ data }: ToolsProps) => {
  const { section } = data;

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
