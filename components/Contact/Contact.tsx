import { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import uniqid from 'uniqid';
import { ContactBlock, ContactContainer, ContactBlockAnchor } from "./Contact.styles";
import { ComponentSection, Header } from '../../styles/General.styles';
import { motion } from 'framer-motion';
import { ContactSvg } from '../ContactSvg/ContactSvg';
import { FadeUpIndividually } from './../FramerMotions';

const Contact: FC<ContactProps> = ({ currentComponent }) => {
  const component = currentComponent[0];

  return (
    <ComponentSection>
      <ContactContainer as={motion.div}>
        {component?.content.map((item, index) => (
          <FadeUpIndividually time={index} key={uniqid()}>
            <ContactBlock key={uniqid()} >
              <ContactBlockAnchor href={item.subtitle} target="_blank" rel="noopener noreferrer nofollow">
                < ContactSvg index={index} />
              </ContactBlockAnchor>
            </ContactBlock>
          </FadeUpIndividually>
        ))}

      </ContactContainer>
    </ComponentSection >
  );
};


const mapStateToProps = (state: any) => ({
  currentComponent: state.data.filter((item) => item.title.toLowerCase() === "contact")
});

const connector = connect(mapStateToProps);
type ContactProps = ConnectedProps<typeof connector>;
export default connector(Contact);

