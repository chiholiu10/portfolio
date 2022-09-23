import { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import uniqid from 'uniqid';
import { ContactBlock, ContactContainer } from "./Contact.styles";
import { ComponentSection } from '../../styles/General.styles';
import { motion } from 'framer-motion';
import { ContactSvg } from '../ContactSvg/ContactSvg';

const Contact: FC<ContactProps> = ({ currentComponent }) => {
  const component = currentComponent[0];

  return (
    <ComponentSection>
      <ContactContainer as={motion.div}>
        {component?.content.map((item, index) => (
          <ContactBlock key={uniqid()}>
            <a href={item.anchor} target="_blank" rel="noopener noreferrer nofollow" >
              <h2>{item.title}</h2>
              <div>{item.subtitle}</div>
              < ContactSvg index={index} />

            </a>
          </ContactBlock>
        ))}
      </ContactContainer>
    </ComponentSection>
  );
};


const mapStateToProps = (state: any) => ({
  currentComponent: state.data.filter((item) => item.title.toLowerCase() === "contact")
});

const connector = connect(mapStateToProps);
type ContactProps = ConnectedProps<typeof connector>;
export default connector(Contact);

