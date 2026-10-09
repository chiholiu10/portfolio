import { css, type Interpolation, type RuleSet } from "styled-components";
import {
  breakpointValues,
  type BreakpointName,
} from "@/styles/breakpoint-values";

const widthQueries = Object.fromEntries(
  Object.entries(breakpointValues).map(([name, width]) => [
    name,
    `(min-width: ${width}px)`,
  ]),
) as Record<BreakpointName, string>;

/** Share these queries between CSS, matchMedia and responsive images. */
export const mediaQuery = widthQueries;

type Styles<Props extends object> = Parameters<typeof css<Props>>[0];

type MediaMixin = <Props extends object = object>(
  styles: Styles<Props>,
  ...interpolations: Interpolation<Props>[]
) => RuleSet<Props>;

function createMediaMixin(query: string): MediaMixin {
  return <Props extends object = object>(
    styles: Styles<Props>,
    ...interpolations: Interpolation<Props>[]
  ) => css<Props>`
    @media ${query} {
      ${css<Props>(styles, ...interpolations)}
    }
  `;
}

/** Typed keys and native CSS interpolation support, including component props. */
export const breakpoint = Object.fromEntries(
  Object.entries(mediaQuery).map(([name, query]) => [
    name,
    createMediaMixin(query),
  ]),
) as Record<BreakpointName, MediaMixin>;

/** HTML uses the first matching size, so larger breakpoints must come first. */
export function responsiveImageSizes(
  sizes: Partial<Record<BreakpointName, string>>,
  fallback: string,
): string {
  const entries = Object.entries(sizes) as [BreakpointName, string][];
  return [
    ...entries
      .sort(
        ([left], [right]) => breakpointValues[right] - breakpointValues[left],
      )
      .map(([name, size]) => `${mediaQuery[name]} ${size}`),
    fallback,
  ].join(", ");
}
