
import { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ComponentSection } from '../../../styles/General.styles';
import { ToolsBlock, ToolInnerBlock, ComponentRow, ToolsHeader } from "./Tools.styles";
import { Header, SubHeader } from '../../../styles/General.styles';
import { FadeUpIndividually, FadeUpWhenVisible } from '../../FramerMotions';
import uniqid from 'uniqid';

const Tools: FC<ToolsProps> = ({ currentComponent }) => {
  const component = currentComponent[0];

  return (
    <ComponentSection>
      <FadeUpWhenVisible>
        <Header>{component?.title}</Header>
        <SubHeader>{component?.subtitle}</SubHeader>
      </FadeUpWhenVisible>
      <ComponentRow>
        {component?.content.map((item, index) => (
          <FadeUpIndividually time={index} key={uniqid()}>
            <ToolsBlock key={uniqid()}>
              <ToolsHeader>
                <h2>{item.title}</h2>
                <p>{item?.subtitle}</p>
              </ToolsHeader>
              <ToolInnerBlock>
                <img src={item.image} alt="test" />
              </ToolInnerBlock>
            </ToolsBlock>
          </FadeUpIndividually>
        ))}
      </ComponentRow>
    </ComponentSection>
  );
};


const mapStateToProps = (state: any) => ({
  currentComponent: state.data.filter((item) => item.title.toLowerCase() === "tools")
});

const connector = connect(mapStateToProps);
type ToolsProps = ConnectedProps<typeof connector>;
export default connector(Tools);