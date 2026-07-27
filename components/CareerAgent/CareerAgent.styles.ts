import styled, { keyframes } from "styled-components";
import { breakpoint } from "../../styles/Breakpoint";

const panelEnter = keyframes`
  0% {
    opacity: 0;
    filter: blur(18px) saturate(1.55);
    transform: translate3d(18px, 42px, 0) scale(0.18);
    clip-path: inset(86% 0 0 86% round 32px);
  }

  48% {
    opacity: 1;
    filter: blur(4px) saturate(1.35);
    transform: translate3d(-4px, -8px, 0) scale(1.025);
    clip-path: inset(0 0 0 0 round 22px);
  }

  100% {
    opacity: 1;
    filter: blur(0) saturate(1);
    transform: translate3d(0, 0, 0) scale(1);
    clip-path: inset(0 0 0 0 round 20px);
  }
`;

const panelSweep = keyframes`
  0% { opacity: 0; transform: translateX(-135%) skewX(-16deg); }
  34% { opacity: 0.75; }
  100% { opacity: 0; transform: translateX(135%) skewX(-16deg); }
`;

const orbBreathe = keyframes`
  0%, 100% {
    box-shadow:
      0 16px 48px rgba(0, 0, 0, 0.48),
      0 0 24px rgba(14, 165, 233, 0.16),
      0 0 0 0 rgba(104, 213, 247, 0.22);
  }

  50% {
    box-shadow:
      0 18px 52px rgba(0, 0, 0, 0.5),
      0 0 38px rgba(14, 165, 233, 0.28),
      0 0 0 9px rgba(104, 213, 247, 0);
  }
`;

const orbOrbit = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const sensorPing = keyframes`
  0% {
    opacity: 0.58;
    transform: scale(0.86);
  }

  72%, 100% {
    opacity: 0;
    transform: scale(1.55);
  }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.7; box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.3); }
  50% { opacity: 1; box-shadow: 0 0 0 5px rgba(74, 222, 128, 0); }
`;

export const AgentShell = styled.div`
  position: fixed;
  z-index: 1000;
  right: 16px;
  bottom: 16px;

  ${breakpoint.md`
    right: 28px;
    bottom: 28px;
  `}
`;

export const AgentButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  width: 206px;
  min-height: 54px;
  overflow: visible;
  padding: 8px;
  color: #eaf7ff;
  font: inherit;
  font-size: 13px;
  font-weight: 650;
  letter-spacing: -0.01em;
  cursor: pointer;
  border: 1px solid rgba(104, 213, 247, 0.34);
  border-radius: 999px;
  background:
    radial-gradient(circle at 28px 26px, rgba(141, 229, 255, 0.16), transparent 38px),
    rgba(7, 20, 38, 0.94);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.48), 0 0 28px rgba(14, 165, 233, 0.14);
  backdrop-filter: blur(18px);
  isolation: isolate;
  animation: ${orbBreathe} 2.8s ease-in-out infinite;
  transition:
    width 280ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 180ms ease,
    transform 180ms ease,
    background 180ms ease;

  > span:not(:first-child) {
    position: relative;
    z-index: 1;
    display: inline-block;
    max-width: 145px;
    overflow: hidden;
    opacity: 1;
    white-space: nowrap;
    transform: translateX(0);
    transition:
      max-width 280ms cubic-bezier(0.16, 1, 0.3, 1),
      margin-left 280ms cubic-bezier(0.16, 1, 0.3, 1),
      opacity 160ms ease,
      transform 220ms ease;
  }

  &:hover {
    border-color: rgba(104, 213, 247, 0.68);
    background: rgba(7, 20, 38, 0.96);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid #68d5f7;
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: border-color 180ms ease;
  }
`;

export const AgentBadge = styled.span`
  position: relative;
  z-index: 1;
  display: grid;
  width: 38px;
  height: 38px;
  flex: 0 0 38px;
  place-items: center;
  color: #8de5ff;
  font-family: monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  border: 1px solid rgba(104, 213, 247, 0.32);
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #173e57, #081728 68%);
  box-shadow: inset 0 0 18px rgba(56, 189, 248, 0.12), 0 0 18px rgba(56, 189, 248, 0.1);

  &::before,
  &::after {
    position: absolute;
    inset: -5px;
    z-index: -1;
    content: "";
    border-radius: inherit;
    pointer-events: none;
  }

  &::before {
    background:
      conic-gradient(
        from 130deg,
        transparent 0deg,
        rgba(104, 213, 247, 0.9) 34deg,
        transparent 76deg,
        transparent 360deg
      );
    opacity: 0.72;
    animation: ${orbOrbit} 3.8s linear infinite;
  }

  &::after {
    border: 1px solid rgba(104, 213, 247, 0.22);
    animation: ${sensorPing} 2.2s ease-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before,
    &::after {
      animation: none;
    }
  }
`;

export const AgentPanel = styled.section.attrs({ id: "career-agent-panel" })`
  position: absolute;
  right: 0;
  bottom: 68px;
  display: flex;
  flex-direction: column;
  width: min(410px, calc(100vw - 32px));
  height: min(650px, calc(100vh - 110px));
  overflow: hidden;
  border: 1px solid rgba(104, 213, 247, 0.25);
  border-radius: 20px;
  background:
    radial-gradient(circle at 100% 0%, rgba(56, 189, 248, 0.13), transparent 34%),
    radial-gradient(circle at 18% 0%, rgba(129, 140, 248, 0.12), transparent 30%),
    rgba(5, 15, 29, 0.97);
  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.65), 0 0 44px rgba(14, 165, 233, 0.12);
  backdrop-filter: blur(24px);
  transform-origin: bottom right;
  animation: ${panelEnter} 520ms cubic-bezier(0.16, 1, 0.3, 1) both;

  &::before {
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    content: "";
    background: linear-gradient(
      105deg,
      transparent 20%,
      rgba(141, 229, 255, 0.2) 42%,
      rgba(255, 255, 255, 0.34) 50%,
      rgba(129, 140, 248, 0.18) 58%,
      transparent 80%
    );
    mix-blend-mode: screen;
    animation: ${panelSweep} 680ms ease-out 80ms both;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;

    &::before {
      animation: none;
      opacity: 0;
    }
  }
`;

export const AgentHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

export const AgentIdentity = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  strong {
    display: block;
    margin-bottom: 4px;
    color: #f3f8fc;
    font-size: 14px;
    font-weight: 650;
  }

  div > span {
    display: flex;
    align-items: center;
    gap: 7px;
    color: #71869a;
    font-size: 10px;
    letter-spacing: 0.04em;
  }
`;

export const StatusDot = styled.i`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #4ade80;
  animation: ${pulse} 2.4s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const CloseButton = styled.button`
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  color: #91a4b7;
  font: inherit;
  font-size: 25px;
  line-height: 1;
  cursor: pointer;
  border: 0;
  border-radius: 50%;
  background: transparent;

  &:hover { color: #eaf7ff; background: rgba(255, 255, 255, 0.06); }
  &:focus-visible { outline: 2px solid #68d5f7; outline-offset: 2px; }
`;

export const MessageList = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 14px;
  min-height: 0;
  overflow-y: auto;
  padding: 20px 16px;
  scroll-behavior: smooth;
  scrollbar-color: #24465b transparent;
`;

export const Message = styled.div<{ $role: "assistant" | "user" }>`
  align-self: ${(props) =>
    (props.$role === "user" ? "flex-end" : "flex-start")};
  width: fit-content;
  max-width: 88%;

  > span {
    display: block;
    margin: 0 8px 5px;
    color: #607084;
    font-size: 8px;
    font-weight: 750;
    letter-spacing: 0.14em;
    text-align: ${(props) => (props.$role === "user" ? "right" : "left")};
    text-transform: uppercase;
  }

  p {
    margin: 0;
    padding: 12px 14px;
    color: ${(props) =>
      (props.$role === "user" ? "#06111f" : "#c9d7e1")};
    font-size: 13px;
    line-height: 1.6;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    border: 1px solid ${(props) =>
      (props.$role === "user"
        ? "rgba(104, 213, 247, 0.6)"
        : "rgba(255, 255, 255, 0.08)")};
    border-radius: ${(props) =>
      (props.$role === "user"
        ? "14px 4px 14px 14px"
        : "4px 14px 14px 14px")};
    background: ${(props) =>
      (props.$role === "user"
        ? "linear-gradient(135deg, #68d5f7, #38bdf8)"
        : "rgba(13, 31, 54, 0.82)")};
  }
`;

export const ContactActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(132px, 1fr));
  gap: 8px;
  margin-top: 9px;
`;

export const ContactActionCard = styled.a`
  display: grid;
  gap: 4px;
  min-width: 0;
  padding: 11px 12px;
  color: #dff6ff;
  text-decoration: none;
  border: 1px solid rgba(104, 213, 247, 0.22);
  border-radius: 12px;
  background:
    radial-gradient(circle at 20% 0%, rgba(104, 213, 247, 0.14), transparent 34%),
    rgba(13, 31, 54, 0.72);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  transition:
    border-color 160ms ease,
    background 160ms ease,
    transform 160ms ease;

  strong {
    color: #f3fbff;
    font-size: 12px;
    font-weight: 750;
  }

  small {
    color: #7f94a8;
    font-size: 9px;
    line-height: 1.35;
  }

  &:hover {
    border-color: rgba(104, 213, 247, 0.52);
    background:
      radial-gradient(circle at 20% 0%, rgba(104, 213, 247, 0.2), transparent 38%),
      rgba(13, 31, 54, 0.9);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid #68d5f7;
    outline-offset: 2px;
  }
`;

export const FeedbackActions = styled.div`
  display: flex;
  gap: 6px;
  margin: 7px 8px 0;
`;

export const FeedbackButton = styled.button<{ $isActive: boolean }>`
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  cursor: pointer;
  border: 1px solid ${(props) =>
    (props.$isActive
      ? "rgba(104, 213, 247, 0.72)"
      : "rgba(255, 255, 255, 0.08)")};
  border-radius: 999px;
  color: ${(props) => (props.$isActive ? "#68d5f7" : "#7f94a8")};
  background: ${(props) =>
    (props.$isActive
      ? "linear-gradient(135deg, rgba(56, 189, 248, 0.18), rgba(37, 99, 235, 0.12))"
      : "rgba(13, 31, 54, 0.54)")};
  box-shadow: ${(props) =>
    (props.$isActive
      ? "0 0 0 3px rgba(56, 189, 248, 0.08), 0 0 18px rgba(56, 189, 248, 0.16)"
      : "none")};
  transition:
    border-color 160ms ease,
    color 160ms ease,
    background 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;

  svg {
    display: block;
    width: 15px;
    height: 15px;
    overflow: visible;
    fill: ${(props) => (props.$isActive ? "currentColor" : "transparent")};
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.8;
    transition:
      fill 160ms ease,
      stroke 160ms ease,
      transform 160ms ease;
  }

  svg.is-down {
    transform: rotate(180deg);
  }

  &:hover {
    border-color: rgba(104, 213, 247, 0.38);
    color: #b8efff;
    background: rgba(13, 31, 54, 0.82);
    transform: translateY(-1px);
  }

  &:hover svg.is-down {
    transform: rotate(180deg) translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid #68d5f7;
    outline-offset: 2px;
  }
`;

export const StarterPrompts = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 0 16px 12px;
  scrollbar-width: none;

  &::-webkit-scrollbar { display: none; }
`;

export const StarterButton = styled.button`
  flex: 0 0 auto;
  max-width: 210px;
  padding: 8px 11px;
  color: #8fa6b8;
  font: inherit;
  font-size: 10px;
  line-height: 1.35;
  text-align: left;
  cursor: pointer;
  border: 1px solid rgba(104, 213, 247, 0.16);
  border-radius: 9px;
  background: rgba(13, 31, 54, 0.52);

  &:hover { color: #dff6ff; border-color: rgba(104, 213, 247, 0.4); }
  &:focus-visible { outline: 2px solid #68d5f7; outline-offset: 2px; }
`;

export const AgentFooter = styled.footer`
  padding: 12px 14px 13px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(4, 13, 25, 0.72);
`;

export const Composer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 7px;
  border: 1px solid rgba(104, 213, 247, 0.2);
  border-radius: 13px;
  background: rgba(10, 26, 46, 0.84);

  &:focus-within {
    border-color: rgba(104, 213, 247, 0.55);
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.08);
  }

  textarea {
    width: 100%;
    min-height: 38px;
    max-height: 110px;
    resize: vertical;
    padding: 9px 8px;
    color: #eaf7ff;
    font: inherit;
    font-size: 12px;
    line-height: 1.5;
    border: 0;
    outline: 0;
    background: transparent;
  }

  textarea::placeholder { color: #63778a; }
  textarea:disabled { opacity: 0.65; }
`;

export const SendButton = styled.button`
  display: grid;
  width: 38px;
  height: 38px;
  flex: 0 0 38px;
  place-items: center;
  color: #06111f;
  font-size: 18px;
  cursor: pointer;
  border: 0;
  border-radius: 10px;
  background: #68d5f7;
  transition: opacity 160ms ease, transform 160ms ease;

  &:hover:not(:disabled) { transform: translateY(-1px); }
  &:disabled { cursor: not-allowed; opacity: 0.32; }
  &:focus-visible { outline: 2px solid #ffffff; outline-offset: 2px; }
`;

export const Disclaimer = styled.p`
  margin: 8px 3px 0;
  color: #526578;
  font-size: 8px;
  line-height: 1.45;
  text-align: center;
`;

export const ErrorMessage = styled.p`
  margin: 0;
  padding: 10px 12px;
  color: #fecaca;
  font-size: 11px;
  line-height: 1.5;
  border: 1px solid rgba(248, 113, 113, 0.2);
  border-radius: 9px;
  background: rgba(127, 29, 29, 0.18);

  a { color: #8de5ff; }
`;

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
`;
