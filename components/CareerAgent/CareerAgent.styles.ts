import styled, { keyframes } from "styled-components";
import { breakpoint } from "../../styles/Breakpoint";

const panelEnter = keyframes`
  from { opacity: 0; transform: translateY(14px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
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
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 54px;
  padding: 8px 18px 8px 8px;
  color: #eaf7ff;
  font: inherit;
  font-size: 13px;
  font-weight: 650;
  letter-spacing: -0.01em;
  cursor: pointer;
  border: 1px solid rgba(104, 213, 247, 0.34);
  border-radius: 999px;
  background: rgba(7, 20, 38, 0.9);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.48), 0 0 28px rgba(14, 165, 233, 0.14);
  backdrop-filter: blur(18px);
  transition: border-color 180ms ease, transform 180ms ease;

  &:hover {
    border-color: rgba(104, 213, 247, 0.68);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid #68d5f7;
    outline-offset: 3px;
  }
`;

export const AgentBadge = styled.span`
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
    rgba(5, 15, 29, 0.97);
  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.65), 0 0 44px rgba(14, 165, 233, 0.12);
  backdrop-filter: blur(24px);
  transform-origin: bottom right;
  animation: ${panelEnter} 220ms ease-out both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
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
