import uniqid from "uniqid";
import {
  ContactBlock,
  ContactContainer,
  ContactBlockAnchor,
} from "./Contact.styles";
import { ComponentSection } from "../../styles/General.styles";
import { motion } from "framer-motion";
import { ContactSvg } from "../ContactSvg/ContactSvg";
import { FadeUpIndividually } from "./../FramerMotions";
import { QUERY } from "./ContactQuery";
import { useQuery } from "@apollo/client";

export const Contact = () => {
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
      <ContactContainer as={motion.div}>
        {data.section.arrays?.map((item, index) => (
          <FadeUpIndividually time={index} key={uniqid()}>
            <ContactBlock key={uniqid()}>
              <ContactBlockAnchor
                href={item.anchor}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <ContactSvg index={index} />
              </ContactBlockAnchor>
            </ContactBlock>
          </FadeUpIndividually>
        ))}
      </ContactContainer>
    </ComponentSection>
  );
};
