import {
  HowIWorkIcon,
  HowIWorkIntro,
  HowIWorkKicker,
  HowIWorkLead,
  HowIWorkPanel,
  HowIWorkProof,
  HowIWorkSection,
  HowIWorkStep,
  HowIWorkStepCopy,
  HowIWorkSteps,
  HowIWorkTitle,
} from "./HowIWork.styles";

type WorkStep = {
  title: string;
  description: string;
  symbol?: string;
};

type HowIWorkProps = {
  data?: {
    section: {
      title?: string | null;
      subtitle?: string | null;
      extraText?: string | null;
      arrays?: WorkStep[] | null;
    } | null;
  };
};

export const HowIWork = ({ data }: HowIWorkProps) => {
  const section = data?.section;

  if (!section) return null;

  const { title, subtitle, extraText, arrays = [] } = section;

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
                {item.symbol || "·"}
              </HowIWorkIcon>
              <HowIWorkStepCopy>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </HowIWorkStepCopy>
            </HowIWorkStep>
          ))}
        </HowIWorkSteps>

        {extraText && <HowIWorkProof>{extraText}</HowIWorkProof>}
      </HowIWorkPanel>
    </HowIWorkSection>
  );
};
