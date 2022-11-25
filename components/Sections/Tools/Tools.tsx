import { ComponentSection } from '../../../styles/General.styles';
import { ToolsBlock, ToolInnerBlock, ComponentRow, ToolsHeader } from "./Tools.styles";
import { Header, SubHeader } from '../../../styles/General.styles';
import { FadeUpIndividually, FadeUpWhenVisible } from '../../FramerMotions';
import { useQuery } from '@apollo/client';
import { QUERY } from './ToolsQuery';
import Image from 'next/image';
import uniqid from 'uniqid';

export const Tools = () => {
  const { data, loading, error } = useQuery(QUERY);

  if (loading) {
    return <></>;
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
      </FadeUpWhenVisible>
      <ComponentRow>
        {data.section?.array.map((item, index) => (
          <FadeUpIndividually time={index} key={uniqid()}>
            <ToolsBlock key={uniqid()}>
              <ToolInnerBlock>
                <Image src={item.imageUrl} alt="test" />
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