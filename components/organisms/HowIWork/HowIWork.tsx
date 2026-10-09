import type { HomeSections } from "@/lib/content-model";
import {
  HowIWorkIcon,
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
          <HowIWorkKicker>How I work</HowIWorkKicker>
          <HowIWorkTitle>{title}</HowIWorkTitle>
          <HowIWorkLead>{subtitle}</HowIWorkLead>
        </HowIWorkIntro>

        <HowIWorkSteps>
          {arrays?.map((item) => (
            <HowIWorkStep key={item.title}>
              <HowIWorkIcon aria-hidden="true">
                <span>{item.symbol || "·"}</span>
              </HowIWorkIcon>
              <HowIWorkStepCopy>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </HowIWorkStepCopy>
            </HowIWorkStep>
          ))}
        </HowIWorkSteps>

      </HowIWorkPanel>
    </HowIWorkSection>
  );
};
