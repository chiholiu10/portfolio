import styled from "styled-components";
import { breakpoint } from "../../../styles/Breakpoint";
import { ComponentSection } from "../../../styles/General.styles";

export const FlowSection = styled(ComponentSection)`
  min-height: auto;
  padding: 40px 20px 150px;
`;

export const FlowGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 18px;
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;

  ${breakpoint.lg`
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
  `}
`;

export const FlowCard = styled.article`
  position: relative;
  height: 100%;
  min-height: 390px;
  overflow: visible;
  padding: 28px;
  border: 1px solid rgba(111, 211, 247, 0.16);
  border-radius: 18px;
  background:
    radial-gradient(circle at 100% 0%, rgba(56, 189, 248, 0.12), transparent 36%),
    rgba(8, 20, 40, 0.66);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.22);
  transition: border-color 220ms ease, transform 220ms ease;

  &:hover {
    border-color: rgba(111, 211, 247, 0.38);
    transform: translateY(-5px);
  }

  > span {
    display: block;
    margin-top: 54px;
    color: #68d5f7;
    font-size: 10px;
    font-weight: 750;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  h3 {
    max-width: 300px;
    margin: 10px 0 14px;
    color: #f3f8fc;
    font-size: clamp(20px, 2vw, 25px);
    font-weight: 650;
    letter-spacing: -0.035em;
    line-height: 1.2;
  }

  > p {
    color: #91a4b7;
    font-size: 14px;
    line-height: 1.7;
  }
`;

export const FlowNumber = styled.b`
  position: absolute;
  top: 24px;
  left: 28px;
  color: rgba(174, 226, 245, 0.42);
  font-family: monospace;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.12em;
`;

export const FlowList = styled.ul`
  display: grid;
  gap: 10px;
  margin: 25px 0 0;
  padding: 20px 0 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  list-style: none;
`;

export const FlowItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #c5d3dd;
  font-size: 13px;
  font-weight: 550;
`;

export const FlowItemMarker = styled.i`
  width: 6px;
  height: 6px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #68d5f7;
  box-shadow: 0 0 14px rgba(104, 213, 247, 0.75);
`;

export const FlowConnector = styled.i`
  display: none;

  ${breakpoint.lg`
    position: absolute;
    z-index: 5;
    top: 50%;
    right: -33px;
    display: block;
    width: 40px;
    height: 1px;
    background: linear-gradient(90deg, #24465b, #68d5f7);

    &::after {
      position: absolute;
      top: -3px;
      right: 0;
      width: 7px;
      height: 7px;
      border-top: 1px solid #68d5f7;
      border-right: 1px solid #68d5f7;
      content: "";
      transform: rotate(45deg);
    }
  `}
`;

export const FlowOutcome = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 780px;
  margin: 30px auto 0;
  padding: 22px 28px;
  border: 1px solid rgba(104, 213, 247, 0.2);
  border-radius: 14px;
  background: linear-gradient(90deg, rgba(14, 165, 233, 0.12), rgba(8, 20, 40, 0.5));
  text-align: center;

  span {
    color: #68d5f7;
    font-size: 9px;
    font-weight: 750;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  strong {
    color: #eef8ff;
    font-size: clamp(15px, 2vw, 18px);
    font-weight: 600;
    line-height: 1.45;
  }
`;
