import { css } from 'styled-components';
import theme from './Theme';

export const breakpoint: any = Object.keys(theme.breakpoints).reduce(
  (accumulator: any, label: any) => {
    accumulator[label] = (strings: any, ...args: any) => css`
      @media (min-width: ${(theme.breakpoints)[label]}) {
        ${css(strings, ...args)};
      }
    `;
    return accumulator;
  },
  {}
);