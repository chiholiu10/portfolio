import { describe, expect, it } from "@jest/globals";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import styled, { css, ServerStyleSheet } from "styled-components";
import {
  breakpoint,
  mediaQuery,
  responsiveImageSizes,
} from "@/styles/Breakpoint";
import {
  breakpointValues,
  themeBreakpoints,
  type BreakpointName,
} from "@/styles/breakpoint-values";

describe("shared mobile-first breakpoints", () => {
  it("exposes exactly eight ordered size names", () => {
    expect(Object.keys(breakpoint)).toEqual(Object.keys(breakpointValues));
    expect(Object.keys(mediaQuery)).toEqual(Object.keys(breakpointValues));
    expect(Object.keys(breakpointValues)).toEqual([
      "xxs",
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "xxl",
      "xxxl",
    ]);
    const widths = Object.values(breakpointValues);
    expect(widths).toEqual([...widths].sort((a, b) => a - b));
  });
  it("keeps CSS and theme queries tied to the same widths", () => {
    for (const [name, width] of Object.entries(breakpointValues)) {
      expect(mediaQuery[name as BreakpointName]).toBe(
        `(min-width: ${width}px)`,
      );
      expect(themeBreakpoints[name as BreakpointName]).toBe(`${width}px`);
    }
  });

  it("orders responsive image sizes from largest to smallest", () => {
    expect(
      responsiveImageSizes(
        { sm: "46vw", xxl: "30vw", xxxl: "358px" },
        "calc(100vw - 40px)",
      ),
    ).toBe(
      "(min-width: 1440px) 358px, (min-width: 1024px) 30vw, (min-width: 620px) 46vw, calc(100vw - 40px)",
    );
    expect(responsiveImageSizes({}, "100vw")).toBe("100vw");
  });

  it("resolves prop functions and nested CSS instead of stringifying them", () => {
    type Props = { $gap: number };
    const Example = styled.div<Props>`
      ${breakpoint.lg<Props>`
        gap: ${({ $gap }) => $gap}px;
        ${css<Props>`
          padding: ${({ $gap }) => $gap / 2}px;
        `}
      `}
    `;
    const sheet = new ServerStyleSheet();
    try {
      renderToStaticMarkup(
        sheet.collectStyles(createElement(Example, { $gap: 24 })),
      );
      const output = sheet.getStyleTags();
      expect(output).toContain("@media (min-width: 768px)");
      expect(output).toContain("gap:24px;");
      expect(output).toContain("padding:12px;");
      expect(output).not.toContain("[object Object]");
    } finally {
      sheet.seal();
    }
  });
});
