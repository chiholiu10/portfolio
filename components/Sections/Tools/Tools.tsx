
import { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import uniqid from 'uniqid';
import { ComponentSection } from '../../../styles/General.styles';
import { ToolsBlock, ToolInnerBlock, ComponentRow } from "./Tools.styles";
import { Header } from '../../../styles/General.styles';
import { FadeUpIndividually } from '../../FramerMotions';

const Tools: FC<ToolsProps> = ({ currentComponent }) => {
  const component = currentComponent[0];

  return (
    <ComponentSection>
      <Header>{component?.title}</Header>
      <ComponentRow>
        {component?.content.map((item, index) => (
          <FadeUpIndividually time={index} key={uniqid()}>
            <ToolsBlock key={uniqid()}>
              <h2>{item.title}</h2>
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