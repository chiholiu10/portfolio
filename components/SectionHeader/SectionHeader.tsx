import { FadeUp, WordReveal } from "../FramerMotions";
import {
  SectionEyebrow,
  SectionHeading,
  SectionHeadingWrap,
  SectionIntro,
} from "./SectionHeader.styles";

type SectionHeaderProps = {
  eyebrow?: string | null;
  title?: string | null;
  subtitle?: string | null;
  id: string;
};

export const SectionHeader = ({
  eyebrow,
  title,
  subtitle,
  id,
}: SectionHeaderProps) => {
  const [heading, ...highlightParts] = (title || "").split("|");
  const highlight = highlightParts.join("|");

  if (!eyebrow && !title && !subtitle) return null;

  return (
    <FadeUp id={id}>
      <SectionHeadingWrap>
        {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
        {title && (
          <SectionHeading id={`${id}-title`}>
            {heading}
            {highlight && <span>{highlight}</span>}
          </SectionHeading>
        )}
        {subtitle && (
          <SectionIntro>
            <WordReveal text={subtitle} />
          </SectionIntro>
        )}
      </SectionHeadingWrap>
    </FadeUp>
  );
};
