import { FadeUp, StaggerGroup, StaggerItem } from "../../FramerMotions";
import { SectionHeader } from "../../SectionHeader/SectionHeader";
import {
  FlowCard,
  FlowConnector,
  FlowGrid,
  FlowItem,
  FlowItemMarker,
  FlowList,
  FlowNumber,
  FlowOutcome,
  FlowSection,
} from "./ValueFlow.styles";

const steps = [
  {
    tag: "Begrijpen",
    title: "Van vraag naar het echte probleem",
    description:
      "Ik kijk verder dan het verzoek en breng de behoefte van gebruikers én de organisatie in kaart.",
    qualities: ["Probleemanalytisch", "Product- en UX-bewust"],
  },
  {
    tag: "Oplossen",
    title: "Van inzicht naar werkende techniek",
    description:
      "Ik vertaal het vraagstuk naar een haalbare front-endoplossing en neem verantwoordelijkheid voor de uitvoering.",
    qualities: ["Technisch oplossingsgericht", "Eigenaarschap"],
  },
  {
    tag: "Leveren",
    title: "Van oplevering naar blijvende waarde",
    description:
      "Ik lever resultaat dat vandaag impact maakt en ook morgen onderhoudbaar, schaalbaar en bruikbaar blijft.",
    qualities: ["Resultaatgericht", "Langetermijndenken"],
  },
];

export const ValueFlow = () => (
  <FlowSection id="werkwijze" aria-labelledby="value-flow-heading-title">
    <SectionHeader
      id="value-flow-heading"
      eyebrow="Hoe ik waarde lever"
      title="Niet alleen bouwen wat gevraagd wordt.| Oplossen wat echt nodig is."
      subtitle="Ik combineer bedrijfsinzicht, UX en front-end development om van complexe vraagstukken duurzame digitale oplossingen te maken."
    />

    <StaggerGroup>
      <FlowGrid>
        {steps.map((step, index) => (
          <StaggerItem key={step.tag}>
            <FlowCard>
              <FlowNumber>{String(index + 1).padStart(2, "0")}</FlowNumber>
              <span>{step.tag}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <FlowList>
                {step.qualities.map((quality) => (
                  <FlowItem key={quality}>
                    <FlowItemMarker aria-hidden="true" />
                    {quality}
                  </FlowItem>
                ))}
              </FlowList>
              {index < steps.length - 1 && <FlowConnector aria-hidden="true" />}
            </FlowCard>
          </StaggerItem>
        ))}
      </FlowGrid>
    </StaggerGroup>

    <FadeUp id="value-flow-outcome">
      <FlowOutcome>
        <span>Het resultaat</span>
        <strong>
          Gebruiksvriendelijke front-endoplossingen die bedrijfswaarde leveren.
        </strong>
      </FlowOutcome>
    </FadeUp>
  </FlowSection>
);
