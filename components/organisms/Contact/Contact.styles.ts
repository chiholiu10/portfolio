import styled, { keyframes } from "styled-components";
import { breakpoint } from "@/styles/Breakpoint";
import theme from "@/styles/Theme";
import { ContactSVG } from "@/components/atoms/ContactSvg/Contact.styles";
import { AIGlassMorph } from "@/styles/General.styles";

const float = keyframes`
  0% {
    transform: translateY(0);
     filter: brightness(1);
  }

  50% {
    transform: translateY(-14px);
    filter: brightness(1.02);
  }

  100% {
    transform: translateY(0);
    filter: brightness(1.08);
  }
`;

const hoverStyles = `
  @media (hover: hover) and (pointer: fine) {
    cursor: pointer;
  }
`;

const durations = [6.3, 7.8, 6.9, 8.6];
const delays = [-2.1, -5.7, -1.3, -4.4];

export const ContactBlock = styled.div`
  animation-name: ${float};
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation: ${float} ${({ $index }) => durations[$index % durations.length]}s
    ease-in-out ${({ $index }) => delays[$index % delays.length]}s infinite;
  will-change: transform;
  @media (max-width: 767px) {
    animation: none;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    &:hover {
      ${hoverStyles}
    }
  }
`;

export const ContactBlockAnchor = styled.a`
  color: var(--accent);
  font-size: 36px;
  display: flex;
  cursor: pointer;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  position: relative;
  align-items: center;
  justify-content: center;
  ${AIGlassMorph}
  ${breakpoint.md`
    width: 56px;
    height: 56px;
  `}
  box-shadow: 0 8px 24px rgba(23, 51, 65, 0.10);
  border: 1px solid rgba(23, 51, 65, 0.1);
  &::after {
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    content: "";
    box-sizing: content-box;
    box-shadow: 0 0 0 1px ${theme.colors.white};
    top: 0;
    left: 0;
    opacity: 0;
    transition: 300ms;
    ${breakpoint.md`
      box-shadow: 0 0 0 1px  ${theme.colors.white};
    `};
  }
  ${ContactSVG} {
    width: 32px;
    height: 32px;
    ${breakpoint.md`
      width: 42px;
      height: 42px;
    `}
  }
  &:hover {
    @media (hover: hover) and (pointer: fine) {
      color: #125667;
      box-shadow: 0 10px 28px rgba(23, 51, 65, 0.14);
      ${ContactSVG} {
      }
    }
  }
`;

export const ContactContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 32px 0 50px;
  margin: 20px;
  ${breakpoint.md`
    gap: 24px;
  `}
`;

export const ContactGrid = styled.div`
  display: grid;
  width: min(1120px, calc(100% - 64px));
  margin: 0 auto;
  padding-top: clamp(64px, 8vw, 96px);
  gap: clamp(28px, 4vw, 52px);

  @media (max-width: 850px) {
    width: calc(100% - 40px);
  }

  ${breakpoint.md`
    grid-template-columns: minmax(240px, 1fr) minmax(0, 520px);
    align-items: start;
  `}
`;

export const ContactHeader = styled.header`
  position: sticky;
  top: 100px;

  > span {
    color: var(--accent);
    font: 700 10px ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  h2 {
    margin: 16px 0 20px;
    color: var(--text-heading);
    font-size: var(--font-section);
    line-height: 1.12;
    letter-spacing: -0.065em;
  }

  @media (max-width: 767px) {
    position: static;
  }
`;

export const FormIntro = styled.p`
  max-width: 430px;
  margin: 0;
  color: var(--text-body);
  font-size: var(--font-body);
  line-height: 1.75;
`;

export const ContactForm = styled.form`
  position: relative;
  display: grid;
  box-sizing: border-box;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  width: 100%;
  max-width: 520px;
  justify-self: end;
  gap: 24px 24px;
  padding: clamp(28px, 3vw, 34px);
  border: 1px solid rgba(98, 215, 255, 0.18);
  border-radius: 20px;
  background:
    radial-gradient(circle at 100% 0, rgba(var(--accent-rgb), 0.12), transparent 34%),
    rgba(255, 255, 255, 0.94);
  box-shadow: 0 30px 90px rgba(23, 51, 65, 0.10);
  backdrop-filter: blur(20px);

  @media (max-width: 767px) {
    justify-self: center;
  }

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.div<{ $wide?: boolean }>`
  display: flex;
  min-width: 0;
  grid-column: ${({ $wide }) => ($wide ? "1 / -1" : "auto")};
  flex-direction: column;
  gap: 9px;

  label {
    color: #344b59;
    font-size: var(--font-label);
    font-weight: 700;
    letter-spacing: 0.04em;
  }

  label span {
    margin-left: 6px;
    color: var(--text-muted);
    font-size: 10px;
    font-weight: 500;
    text-transform: lowercase;
  }

  input,
  textarea {
    box-sizing: border-box;
    min-width: 0;
    width: 100%;
    border: 1px solid rgba(148, 180, 202, 0.2);
    border-radius: 12px;
    outline: 0;
    color: var(--text-heading) !important;
    background: #f4f7f8;
    font: inherit;
    transition: border-color 180ms ease, box-shadow 180ms ease;
  }

  input {
    min-height: 44px;
    padding: 0 16px;
  }

  textarea {
    min-height: 104px;
    padding: 14px 16px;
    resize: vertical;
  }

  input:focus,
  textarea:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(98, 215, 255, 0.12);
  }
`;

export const RequiredMark = styled.b`
  color: var(--accent);
  font-weight: 700;
`;
export const FieldHint = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 4px 12px;
  color: var(--text-body);
  font-size: var(--font-label);
  line-height: 1.5;
  font-variant-numeric: tabular-nums;
`;
export const HoneypotField = styled.div`
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

export const PrivacyCopy = styled.div`
  display: flex;
  grid-column: 1 / -1;
  align-items: flex-start;
  gap: 11px;
  color: var(--text-muted);
  font-size: var(--font-label);
  line-height: 1.55;
  label { cursor: pointer; display: grid; gap: 6px; }
  label > span { color: var(--text-body); }
  small { font: inherit; color: var(--text-muted); }

  input {
    appearance: none;
    position: relative;
    display: grid;
    place-items: center;
    flex: 0 0 auto;
    width: 22px;
    height: 22px;
    margin: 0;
    border: 1px solid #65788c;
    border-radius: 7px;
    background: rgba(255, 255, 255, 0.03);
    cursor: pointer;
    transition: background 240ms ease, border-color 240ms ease, box-shadow 240ms ease;
    &::before {
      content: "";
      width: 9px;
      height: 5px;
      border-left: 2px solid #fff;
      border-bottom: 2px solid #fff;
      opacity: 0;
      transform: translateY(-2px) rotate(-45deg) scale(0.5);
      transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease;
    }
    &:checked {
      background: var(--accent);
      border-color: var(--accent);
      box-shadow: 0 0 18px rgba(var(--accent-rgb), 0.15);
    }
    &:checked::before { opacity: 1; transform: translateY(-2px) rotate(-45deg) scale(1); }
    &:hover { border-color: var(--accent); }
    &:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }
    @media (prefers-reduced-motion: reduce) {
      &, &::before { transition: none; }
    }
    @media (forced-colors: active) { appearance: auto; &::before { display: none; } }
  }
`;

export const SubmitButton = styled.button`
  display: inline-flex;
  grid-column: 1 / -1;
  justify-self: end;
  align-self: end;
  align-items: center;
  justify-content: center;
  gap: 20px;
  min-width: 168px;
  min-height: 44px;
  padding: 0 18px;
  border: 1px solid var(--accent);
  border-radius: 12px;
  color: #fff;
  background: var(--accent);
  font-size: var(--font-small);
  font-weight: 800;
  cursor: pointer;
  transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1), background 280ms ease, opacity 220ms ease;
  &:hover:not(:disabled) { background: #125667; transform: translateY(-2px); }
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover:not(:disabled) { transform: none; }
  }

  .button-content {
    display: inline-flex;
    align-items: center;
    gap: 20px;
    font: inherit;
  }
  svg { flex-shrink: 0; }

  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(22, 105, 122, 0.18);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.64;
  }

`;

export const FormStatus = styled.p<{ $error?: boolean }>`
  grid-column: 1 / -1;
  &:empty { display: none; }
  margin: 0;
  color: ${({ $error }) => ($error ? "#a12626" : "#166044")};
  font-size: var(--font-small);

  a {
    color: inherit;
    font-weight: 700;
    text-underline-offset: 3px;
  }
`;

export const SocialLabel = styled.p`
  margin: 72px 0 0;
  color: var(--text-muted);
  font: 700 10px ui-monospace, SFMono-Regular, Menlo, monospace;
  letter-spacing: 0.15em;
  text-align: center;
  text-transform: uppercase;
`;
