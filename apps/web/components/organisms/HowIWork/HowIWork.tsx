import { useSkipEntrance } from "@/components/atoms/Motion/RevealSession";
import { useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
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
  const prefersReducedMotion = useReducedMotion();
  const skip = useSkipEntrance();
  const reduceMotion = prefersReducedMotion || skip;
  const timelineRef = useRef<HTMLOListElement>(null);
  const revealed = useInView(timelineRef, { once: true, amount: 0.1 });
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

        <HowIWorkSteps
          ref={timelineRef}
          initial={reduceMotion ? false : "hidden"}
          animate={revealed || reduceMotion ? "visible" : "hidden"}
        >
          {arrays?.map((item, index) => (
            <HowIWorkStep key={item.title}>
              {index < arrays.length - 1 && (
                <HowIWorkConnector
                  aria-hidden="true"
                  variants={{
                    hidden: { scaleY: 0, opacity: 0 },
                    visible: { scaleY: 1, opacity: 0.45 },
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.45,
                    delay: reduceMotion ? 0 : index * 1.1 + 0.65,
                    ease: "easeInOut",
                  }}
                />
              )}
              <HowIWorkIcon
                className="step-icon"
                aria-hidden="true"
                variants={{
                  hidden: { opacity: 0, scale: 0.75 },
                  visible: { opacity: 1, scale: 1 },
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.4,
                  delay: reduceMotion ? 0 : index * 1.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ProcessIcon index={index} />
              </HowIWorkIcon>
              <HowIWorkStepCopy
                className="step-copy"
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.55,
                  delay: reduceMotion ? 0 : index * 1.1 + 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <h3 className="ui-h3">{item.title}</h3>
                <p className="ui-p">{item.description}</p>
              </HowIWorkStepCopy>
            </HowIWorkStep>
          ))}
        </HowIWorkSteps>
      </HowIWorkPanel>
    </HowIWorkSection>
  );
};
