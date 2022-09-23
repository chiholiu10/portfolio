import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoint';
import theme from '../../styles/Theme';

export const ContactBlock = styled.div`
  border: 1px solid ${theme.colors.white};
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  width: 120px;
  height: 120px;
  ${breakpoint.md`
    width: 140px;
    height: 140px;
  `}
  h2 {
    line-height: 2.2;
  }
  a {
    display: block;
    &:hover {
      cursor: pointer;
    }
  } 
`;

export const ContactContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 150px 0 50px;
  margin: 20px;
  ${breakpoint.md`
    height: 400px;
    gap: 30px;
  `}
`;

export const ContactSVG = styled.div`
  width: 100px;
  margin-left: auto;
  margin-right: auto;
  svg {
    fill: ${theme.colors.white};
  }
`;