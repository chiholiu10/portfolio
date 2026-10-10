import { useScrollReveal } from "@/components/atoms/Motion/useScrollReveal";
import type { HomeSections } from "@/lib/content-model";
import { ProcessIcon } from "@/components/organisms/HowIWork/ProcessIcon";
import {
  HowIWorkIcon,
  HowIWorkConnector,
  HowIWorkIntro,
  HowIWorkKicker,
  HowIWorkLead,
  HowIWorkPanel,
  HowIWorkSection,
  HowIWorkStep,
  HowIWorkStepCopy,
  HowIWorkSteps,
  HowIWorkTitle,
} from "@/components/organisms/HowIWork/HowIWork.styles";

type HowIWorkProps = { data: HomeSections["howIWork"] };

export const HowIWork = ({ data }: HowIWorkProps) => {
  const section = data?.section;

  if (!section) return null;

  const { title, subtitle, arrays = [] } = section;

  return (
    <HowIWorkSection id="how-i-work">
      <HowIWorkPanel>
        <HowIWorkIntro id="how-i-work-intro">
          {section.eyebrow && (
            <HowIWorkKicker>{section.eyebrow}</HowIWorkKicker>
          )}
          <HowIWorkTitle>{title}</HowIWorkTitle>
          <HowIWorkLead>{subtitle}</HowIWorkLead>
        </HowIWorkIntro>

        <HowIWorkSteps>
          {arrays?.map((item, index) => (
            <ScrollStep
              key={item.title}
              item={item}
              index={index}
              last={index === arrays.length - 1}
            />
          ))}
        </HowIWorkSteps>
      </HowIWorkPanel>
    </HowIWorkSection>
  );
};

function ScrollStep({
  item,
  index,
  last,
}: {
  item: { title: string; description: string };
  index: number;
  last: boolean;
}) {
  const { ref, style } = useScrollReveal<HTMLLIElement>();
  return (
    <HowIWorkStep ref={ref} style={style}>
      {!last && (
        <HowIWorkConnector aria-hidden="true" style={{ opacity: 0.45 }} />
      )}
      <HowIWorkIcon className="step-icon" aria-hidden="true">
        <ProcessIcon index={index} />
      </HowIWorkIcon>
      <HowIWorkStepCopy className="step-copy">
        <h3 className="ui-h3">{item.title}</h3>
        <p className="ui-p">{item.description}</p>
      </HowIWorkStepCopy>
    </HowIWorkStep>
  );
}
