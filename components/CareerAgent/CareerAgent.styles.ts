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

const fullscreenPanelEnter = keyframes`
  0% {
    opacity: 0;
    filter: blur(10px) saturate(1.2);
    transform: translate3d(0, 20px, 0);
    clip-path: inset(0);
  }

  100% {
    opacity: 1;
    filter: blur(0) saturate(1);
    transform: translate3d(0, 0, 0);
    clip-path: inset(0);
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

const ambientDrift = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(-10px, 12px, 0) scale(1.08); }
`;

const signalFlow = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`;

export const AgentShell = styled.div`
  --career-agent-viewport-height: 100dvh;
  --career-agent-viewport-offset: 0px;

  position: fixed;
  z-index: 1000;
  right: 16px;
  bottom: 16px;

  @media (max-width: 767px), (pointer: coarse) {
    z-index: 2147483000;
  }

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
  color: #f4fbff;
  font: inherit;
  font-size: 13px;
  font-weight: 650;
  letter-spacing: -0.01em;
  cursor: pointer;
  border: 1px solid rgba(88, 239, 255, 0.62);
  border-radius: 18px;
  background:
    radial-gradient(
      circle at 28px 26px,
      rgba(141, 229, 255, 0.16),
      transparent 38px
    ),
    linear-gradient(115deg, rgba(4, 20, 40, 0.98), rgba(17, 34, 74, 0.96));
  box-shadow:
    0 16px 48px rgba(0, 0, 0, 0.48),
    0 0 32px rgba(0, 238, 255, 0.26),
    inset 0 1px 0 rgba(255, 255, 255, 0.09);
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
    border-color: rgba(124, 231, 255, 0.82);
    background: linear-gradient(115deg, #0a2945, #16375e);
    transform: translateY(-3px) scale(1.015);
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
  color: #f6feff;
  font-family: monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  border: 1px solid rgba(210, 250, 255, 0.5);
  border-radius: 50%;
  background: linear-gradient(145deg, #20f6dc 0%, #29bfff 42%, #725cff 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.52),
    0 8px 24px rgba(42, 188, 226, 0.3);

  &::before,
  &::after {
    position: absolute;
    inset: -4px;
    z-index: -1;
    content: "";
    border-radius: inherit;
    pointer-events: none;
  }

  &::before {
    border: 1px solid rgba(82, 237, 255, 0.32);
    opacity: 0.8;
  }

  &::after {
    border: 1px solid rgba(55, 230, 208, 0.3);
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
  width: min(424px, calc(100vw - 32px));
  height: min(680px, calc(100vh - 110px));
  overflow: hidden;
  border: 1px solid rgba(76, 233, 255, 0.58);
  border-radius: 24px;
  background:
    radial-gradient(
      circle at 100% 0%,
      rgba(0, 240, 255, 0.26),
      transparent 42%
    ),
    radial-gradient(
      circle at 18% 0%,
      rgba(112, 76, 255, 0.26),
      transparent 40%
    ),
    linear-gradient(155deg, rgba(8, 27, 53, 0.99), rgba(2, 11, 26, 0.995));
  box-shadow:
    0 38px 110px rgba(0, 0, 0, 0.72),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset,
    -10px 0 48px rgba(0, 238, 255, 0.12),
    12px 0 54px rgba(111, 73, 255, 0.13);
  backdrop-filter: blur(30px) saturate(1.25);
  transform-origin: bottom right;
  animation: ${panelEnter} 520ms cubic-bezier(0.16, 1, 0.3, 1) both;

  @media (max-width: 767px), (pointer: coarse) {
    position: fixed;
    top: var(--career-agent-viewport-offset);
    right: 0;
    bottom: auto;
    left: 0;
    z-index: 2;
    width: 100vw;
    max-width: none;
    height: var(--career-agent-viewport-height);
    max-height: none;
    border: 0;
    border-radius: 0;
    clip-path: inset(0);
    transform-origin: bottom center;
    animation: ${fullscreenPanelEnter} 320ms cubic-bezier(0.16, 1, 0.3, 1)
      both;
  }

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

  &::after {
    position: absolute;
    top: 88px;
    right: -76px;
    z-index: 0;
    width: 190px;
    height: 190px;
    pointer-events: none;
    content: "";
    border-radius: 50%;
    background: conic-gradient(
      from 110deg,
      rgba(0, 240, 255, 0.2),
      transparent 28%,
      rgba(112, 76, 255, 0.18),
      transparent 72%
    );
    filter: blur(8px);
    animation: ${ambientDrift} 7s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;

    &::before {
      animation: none;
      opacity: 0;
    }


    &::after {
      animation: none;
    }
  }
`;

export const AgentHeader = styled.header`
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 17px 18px 16px;
  border-bottom: 1px solid rgba(83, 229, 255, 0.2);
  background:
    linear-gradient(90deg, rgba(0, 239, 255, 0.08), transparent 42%),
    linear-gradient(180deg, rgba(24, 49, 86, 0.82), rgba(6, 22, 43, 0.42));
  backdrop-filter: blur(18px);

  @media (max-width: 767px), (pointer: coarse) {
    flex: 0 0 auto;
    padding-top: max(12px, env(safe-area-inset-top));
  }

  &::after {
    position: absolute;
    right: 18px;
    bottom: -1px;
    left: 18px;
    height: 2px;
    content: "";
    background: linear-gradient(
      90deg,
      transparent,
      #00f0ff 18%,
      #697aff 48%,
      #cf57ff 72%,
      transparent
    );
    background-size: 200% 100%;
    filter: drop-shadow(0 0 7px rgba(0, 240, 255, 0.65));
    animation: ${signalFlow} 4s linear infinite;
  }
`;

export const AgentIdentity = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  strong {
    display: block;
    margin-bottom: 4px;
    color: #f3f8fc;
    font-size: 15px;
    font-weight: 720;
    letter-spacing: -0.02em;

  }

  div > span {
    display: flex;
    align-items: center;
    gap: 7px;
    color: #91a9bb;
    font-size: 10px;
    letter-spacing: 0.04em;
  }
`;

export const StatusDot = styled.i`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #35ffe0;
  box-shadow: 0 0 10px rgba(53, 255, 224, 0.8);
  animation: ${pulse} 2.4s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const ClearButton = styled.button`
  min-height: 36px;
  padding: 0 9px;
  color: #71869a;
  font: inherit;
  font-size: 10px;
  cursor: pointer;
  border: 0;
  border-radius: 9px;
  background: transparent;

  &:hover {
    color: #dff6ff;
    background: rgba(255, 255, 255, 0.06);
  }

  &:focus-visible {
    outline: 2px solid #68d5f7;
    outline-offset: 2px;
  }
`;

export const CloseButton = styled.button`
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  color: #ffffff;
  font: inherit;
  font-size: 25px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
  border: 0;
  border: 1px solid rgba(116, 218, 255, 0.12);
  border-radius: 10px;
  background: rgba(9, 31, 56, 0.52);

  span {
    display: grid;
    width: 100%;
    height: 100%;
    place-items: center;
    line-height: 1;
    transform: translateY(-1px);
  }

  &:hover {
    color: #eaf7ff;
    background: rgba(255, 255, 255, 0.06);
  }
  &:focus-visible {
    outline: 2px solid #68d5f7;
    outline-offset: 2px;
  }
`;

export const MessageList = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
  overflow-y: auto;
  padding: 22px 18px;
  scroll-behavior: smooth;
  scrollbar-color: #24465b transparent;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
`;

export const ScrollToBottomButton = styled.button`
  position: absolute;
  right: 20px;
  bottom: 112px;
  z-index: 4;
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  color: #051421;
  cursor: pointer;
  border: 1px solid rgba(220, 255, 255, 0.62);
  border-radius: 12px;
  background:
    radial-gradient(
      circle at 35% 25%,
      rgba(104, 213, 247, 0.2),
      transparent 42%
    ),
    linear-gradient(145deg, #71f2e3, #62caff 56%, #7186ff);
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.42),
    0 0 22px rgba(55, 230, 208, 0.28);
  backdrop-filter: blur(12px);
  animation: ${panelEnter} 180ms ease-out both;

  svg {
    width: 19px;
    height: 19px;
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.9;
  }

  &:hover {
    color: #fff;
    border-color: rgba(104, 213, 247, 0.72);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid #68d5f7;
    outline-offset: 3px;
  }

  @media (max-width: 767px), (pointer: coarse) {
    right: max(16px, env(safe-area-inset-right));
    bottom: calc(108px + env(safe-area-inset-bottom));
    width: 42px;
    height: 42px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const MessageContent = styled.div`
  padding: 12px 14px;
  color: inherit;
  font-size: 13px;
  line-height: 1.6;
  overflow-wrap: anywhere;

  p {
    margin: 0;
  }

  p + p,
  p + ul,
  p + ol,
  ul + p,
  ol + p {
    margin-top: 10px;
  }

  ul,
  ol {
    display: grid;
    gap: 8px;
    margin: 10px 0 2px;
    padding: 0;
    list-style: none;
  }

  li {
    position: relative;
    min-height: 38px;
    padding: 9px 11px 9px 39px;
    color: var(--list-text);
    border: 1px solid var(--list-border);
    border-radius: 10px;
    background:
      linear-gradient(105deg, var(--list-glow), transparent 52%),
      var(--list-background);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.035),
      0 5px 14px rgba(2, 10, 22, 0.12);
  }

  ol {
    counter-reset: career-agent-list;
  }

  ol li {
    counter-increment: career-agent-list;
  }

  ol li::before {
    position: absolute;
    top: 9px;
    left: 9px;
    display: grid;
    width: 22px;
    height: 22px;
    place-items: center;
    color: var(--list-badge-text);
    font-size: 10px;
    font-weight: 800;
    line-height: 1;
    content: counter(career-agent-list);
    border: 1px solid var(--list-accent-border);
    border-radius: 7px;
    background: var(--list-accent);
    box-shadow: 0 4px 12px var(--list-accent-shadow);
  }

  ul li::before {
    position: absolute;
    top: 16px;
    left: 15px;
    width: 8px;
    height: 8px;
    content: "";
    border: 2px solid var(--list-accent-border);
    border-radius: 50%;
    background: var(--list-accent);
    box-shadow: 0 0 0 4px var(--list-accent-shadow);
  }

  strong {
    color: var(--list-strong);
    font-weight: 750;
  }

  @media (max-width: 420px) {
    li {
      padding-right: 9px;
    }
  }
`;

export const Message = styled.div<{ $role: "assistant" | "user" }>`
  align-self: ${(props) =>
    (props.$role === "user" ? "flex-end" : "flex-start")};
  width: fit-content;
  max-width: 90%;

  > span {
    display: block;
    margin: 0 8px 5px;
    color: #7e94a9;
    font-size: 9px;
    font-weight: 750;
    letter-spacing: 0.14em;
    text-align: ${(props) => (props.$role === "user" ? "right" : "left")};
    text-transform: uppercase;

    &::before {
      display: inline-block;
      width: 12px;
      height: 1px;
      margin-right: 6px;
      vertical-align: middle;
      content: "";
      background: linear-gradient(90deg, #00f0ff, #7c5cff);
      box-shadow: 0 0 6px rgba(0, 240, 255, 0.7);
    }
  }

  ${MessageContent} {
    --list-text: ${(props) => (props.$role === "user" ? "#092033" : "#cbdbe6")};
    --list-strong: ${(props) =>
      (props.$role === "user" ? "#06111f" : "#f1fbff")};
    --list-background: ${(props) =>
      (props.$role === "user"
        ? "rgba(255, 255, 255, 0.34)"
        : "rgba(8, 25, 45, 0.72)")};
    --list-border: ${(props) =>
      (props.$role === "user"
        ? "rgba(6, 17, 31, 0.14)"
        : "rgba(104, 213, 247, 0.14)")};
    --list-glow: ${(props) =>
      (props.$role === "user"
        ? "rgba(255, 255, 255, 0.18)"
        : "rgba(104, 213, 247, 0.07)")};
    --list-accent: ${(props) =>
      (props.$role === "user" ? "#0b2a3d" : "#68d5f7")};
    --list-accent-border: ${(props) =>
      (props.$role === "user"
        ? "rgba(6, 17, 31, 0.28)"
        : "rgba(160, 235, 255, 0.7)")};
    --list-accent-shadow: ${(props) =>
      (props.$role === "user"
        ? "rgba(6, 17, 31, 0.1)"
        : "rgba(56, 189, 248, 0.16)")};
    --list-badge-text: ${(props) =>
      (props.$role === "user" ? "#eaf9ff" : "#06111f")};
    color: ${(props) => (props.$role === "user" ? "#041521" : "#e4eef5")};
    border: 1px solid
      ${(props) =>
        (props.$role === "user"
          ? "rgba(207, 255, 250, 0.72)"
          : "rgba(151, 229, 255, 0.14)")};
    border-radius: ${(props) =>
      (props.$role === "user" ? "18px 5px 18px 18px" : "5px 18px 18px 18px")};
    background: ${(props) =>
      (props.$role === "user"
        ? "linear-gradient(135deg, #62ffe7 0%, #45c9ff 48%, #846cff 100%)"
        : "linear-gradient(145deg, rgba(23, 53, 88, 0.96), rgba(8, 27, 53, 0.94))")};
    box-shadow: ${(props) =>
      (props.$role === "user"
        ? "0 10px 28px rgba(53, 190, 218, 0.2), inset 0 1px 0 rgba(255,255,255,0.44)"
        : "0 10px 30px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255,255,255,0.05)")};
  }
`;

export const ContactActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(132px, 1fr));
  gap: 8px;
  margin-top: 9px;
`;

export const PortfolioSuggestionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  width: min(330px, 78vw);
  margin-top: 9px;
`;

export const ProjectQuestionList = styled.div`
  display: grid;
  gap: 7px;
  width: min(320px, 76vw);
  margin: 9px 8px 2px;
`;

export const ProjectQuestionButton = styled.button`
  position: relative;
  padding: 9px 32px 9px 11px;
  color: #b9d8e7;
  font: inherit;
  font-size: 10px;
  line-height: 1.4;
  text-align: left;
  cursor: pointer;
  border: 1px solid rgba(104, 213, 247, 0.18);
  border-radius: 10px;
  background:
    linear-gradient(90deg, rgba(56, 189, 248, 0.08), transparent 60%),
    rgba(13, 31, 54, 0.58);
  transition:
    color 160ms ease,
    border-color 160ms ease,
    background 160ms ease,
    transform 160ms ease;

  &::after {
    content: "→";
    position: absolute;
    top: 50%;
    right: 12px;
    color: #68d5f7;
    transform: translateY(-50%);
  }

  &:hover:not(:disabled) {
    color: #f3fbff;
    border-color: rgba(104, 213, 247, 0.48);
    background:
      linear-gradient(90deg, rgba(56, 189, 248, 0.15), transparent 70%),
      rgba(13, 31, 54, 0.82);
    transform: translateX(2px);
  }

  &:focus-visible {
    outline: 2px solid #68d5f7;
    outline-offset: 2px;
  }

  &:disabled {
    cursor: wait;
    opacity: 0.5;
  }
`;

export const PortfolioChatCard = styled.button<{ $isStatic?: boolean }>`
  display: grid;
  gap: 6px;
  min-width: 0;
  padding: 7px;
  overflow: hidden;
  color: #dff6ff;
  font: inherit;
  text-align: left;
  cursor: ${(props) => (props.$isStatic ? "default" : "pointer")};
  border: 1px solid rgba(104, 213, 247, 0.22);
  border-radius: 11px;
  background: rgba(8, 25, 45, 0.82);

  img {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: 7px;
  }

  strong {
    overflow: hidden;
    font-size: 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  small {
    color: #6f879a;
    font-size: 8px;
  }

  &:hover {
    border-color: rgba(104, 213, 247, 0.58);
    background: rgba(13, 36, 61, 0.94);
  }

  &:focus-visible {
    outline: 2px solid #68d5f7;
    outline-offset: 2px;
  }

  ${(props) =>
    (props.$isStatic
      ? `
        width: min(320px, 76vw);
        margin-top: 8px;
      `
      : "")}
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
    radial-gradient(
      circle at 20% 0%,
      rgba(104, 213, 247, 0.14),
      transparent 34%
    ),
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
      radial-gradient(
        circle at 20% 0%,
        rgba(104, 213, 247, 0.2),
        transparent 38%
      ),
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
  border: 1px solid
    ${(props) =>
      (props.$isActive
        ? "rgba(104, 213, 247, 0.72)"
        : "rgba(255, 255, 255, 0.08)")};
  border-radius: 9px;
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
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  padding: 0 18px 14px;

  @media (max-width: 390px) {
    grid-template-columns: 1fr;
  }
`;

export const StarterButton = styled.button`
  position: relative;
  min-width: 0;
  min-height: 46px;
  padding: 10px 12px;
  color: #b8cfdd;
  font: inherit;
  font-size: 10px;
  line-height: 1.35;
  text-align: left;
  cursor: pointer;
  border: 1px solid rgba(89, 223, 255, 0.26);
  border-radius: 14px;
  background:
    linear-gradient(90deg, rgba(0, 240, 255, 0.09), transparent 50%),
    linear-gradient(145deg, rgba(25, 54, 91, 0.84), rgba(7, 27, 53, 0.8));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);

  &:hover {
    color: #dff6ff;
    border-color: rgba(112, 240, 224, 0.55);
    background: linear-gradient(145deg, rgba(35, 71, 104, 0.9), rgba(15, 43, 72, 0.88));
    transform: translateY(-1px);
  }
  &:focus-visible {
    outline: 2px solid #68d5f7;
    outline-offset: 2px;
  }
`;

export const AgentFooter = styled.footer`
  position: relative;
  z-index: 3;
  flex: 0 0 auto;
  padding: 12px 14px 13px;
  border-top: 1px solid rgba(70, 229, 255, 0.2);
  background: linear-gradient(180deg, rgba(5, 17, 33, 0.6), rgba(5, 15, 28, 0.94));
  backdrop-filter: blur(20px);

  @media (max-width: 767px), (pointer: coarse) {
    padding-right: max(12px, env(safe-area-inset-right));
    padding-bottom: max(10px, env(safe-area-inset-bottom));
    padding-left: max(12px, env(safe-area-inset-left));
  }
`;

export const Composer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 7px 7px 7px 10px;
  border: 1px solid rgba(72, 234, 255, 0.46);
  border-radius: 16px;
  background: linear-gradient(145deg, rgba(24, 48, 75, 0.92), rgba(10, 28, 50, 0.94));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.055),
    0 12px 34px rgba(0, 0, 0, 0.18);

  &:focus-within {
    border-color: rgba(92, 235, 218, 0.7);
    box-shadow:
      0 0 0 3px rgba(0, 240, 255, 0.1),
      0 0 28px rgba(0, 240, 255, 0.12),
      0 14px 40px rgba(0, 0, 0, 0.22);
  }

  textarea {
    width: 100%;
    min-height: 38px;
    max-height: 110px;
    resize: vertical;
    padding: 9px 8px;
    color: #eaf7ff;
    font: inherit;
    font-size: 13px;
    line-height: 1.5;
    border: 0;
    outline: 0;
    background: transparent;

    @media (max-width: 767px), (pointer: coarse) {
      font-size: 14px;
      resize: none;
    }
  }

  textarea::placeholder {
    color: #63778a;
  }
  textarea:disabled {
    opacity: 0.65;
  }
`;

export const SendButton = styled.button`
  display: grid;
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  place-items: center;
  color: #ffffff;
  font-size: 18px;
  cursor: pointer;
  border: 0;
  border: 1px solid rgba(228, 255, 253, 0.52);
  border-radius: 12px;
  background: linear-gradient(145deg, #4fffe2 0%, #34c7ff 52%, #8068ff 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.5),
    0 8px 22px rgba(45, 190, 222, 0.3);
  transition:
    opacity 160ms ease,
    transform 160ms ease;

  svg {
    width: 19px;
    height: 19px;
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.8;
  }

  &:hover:not(:disabled) {
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.62),
      0 10px 28px rgba(55, 230, 208, 0.42);
    transform: translateY(-2px) scale(1.035);
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.32;
  }
  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 2px;
  }
`;

export const Disclaimer = styled.p`
  margin: 8px 3px 0;
  color: #526578;
  font-size: 10px;
  line-height: 1.45;
  text-align: center;
`;

export const RememberOption = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  margin-top: 7px;
  color: #64788b;
  font-size: 9px;
  line-height: 1.4;
  cursor: pointer;

  input {
    width: 14px;
    height: 14px;
    margin: 0;
    accent-color: #68d5f7;
  }

  &:has(input:focus-visible) {
    outline: 2px solid #68d5f7;
    outline-offset: 3px;
    border-radius: 4px;
  }
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

  a {
    color: #8de5ff;
  }
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
