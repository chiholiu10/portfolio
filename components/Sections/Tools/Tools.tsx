import { ComponentSection } from '../../../styles/General.styles';
import { ToolsBlock, ToolInnerBlock, ComponentRow, ToolsHeader } from "./Tools.styles";
import { Header, SubHeader } from '../../../styles/General.styles';
import { FadeUpIndividually, FadeUpWhenVisible } from '../../FramerMotions';
import uniqid from 'uniqid';
import { useQuery } from '@apollo/client';
import { QUERY } from './ToolsQuery';

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
                <img src={item.imageUrl} alt="test" />
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