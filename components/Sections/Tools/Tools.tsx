import { useQuery } from "@apollo/client";
import Image from "next/image";
import {
  BackgroundImage,
  ComponentRow,
  ComponentSection,
  Header,
  SubHeader,
} from "../../../styles/General.styles";
import { FadeUpIndividually, FadeUpWhenVisible } from "../../FramerMotions";
import { ToolInnerBlock, ToolsBlock, ToolsHeader } from "./Tools.styles";
import { QUERY } from "./ToolsQuery";

export const Tools = () => {
  const { data, loading, error } = useQuery(QUERY, {
    variables: { id: "2FzwztBT4JTZm5icaV1tlb" },
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return <ComponentSection></ComponentSection>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <ComponentSection>
      <FadeUpWhenVisible>
        <Header>{data.section?.title}</Header>
        <SubHeader>{data.section?.subtitle}</SubHeader>
        <BackgroundImage
          className="effect"
          src={
            "https://res.cloudinary.com/dh7tnzzxm/image/upload/v1681643719/Gradient_4_w267pd.png"
          }
          left="60%"
          alt="background-image-effect"
        />
      </FadeUpWhenVisible>
      <ComponentRow>
        {data.section?.arrayBlockCollection?.items.map((item, index) => (
          <FadeUpIndividually time={index} key={index}>
            <ToolsBlock>
              <ToolInnerBlock>
                <Image
                  src={item.url}
                  alt={`image of ${item.title}`}
                  width={100}
                  height={100}
                  loading="lazy"
                />
              </ToolInnerBlock>
              <ToolsHeader>
                <h2>{item.title}</h2>
              </ToolsHeader>
            </ToolsBlock>
          </FadeUpIndividually>
        ))}
      </ComponentRow>
    </ComponentSection>
  );
};
