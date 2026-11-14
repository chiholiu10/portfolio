/** @jest-environment jsdom */

import { CareerAgent } from "@/components/organisms/CareerAgent/CareerAgent";
import { beforeAll, describe, expect, it, jest } from "@jest/globals";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { createElement } from "react";

jest.mock("@/components/organisms/CareerAgent/useChatPersistence", () => ({
  useChatPersistence: jest.fn(),
}));

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: (query: string): MediaQueryList => ({
      addListener: jest.fn(),
      addEventListener: jest.fn(),
      dispatchEvent: () => true,
      matches: query.includes("pointer: fine"),
      media: query,
      onchange: null,
      removeListener: jest.fn(),
      removeEventListener: jest.fn(),
    }),
  });
});

describe("CareerAgent accessibility", () => {
  it("connects its trigger to an accessible dialog without Axe violations", async () => {
    render(createElement(CareerAgent));
    await act(
      () =>
        new Promise<void>((resolve) => {
          requestAnimationFrame(() => resolve());
        }),
    );

    const trigger = screen.getByRole("button", {
      name: "Ask my career agent",
    });
    expect(trigger.getAttribute("aria-controls")).toBe("career-agent-panel");

    fireEvent.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "Career Assistant" });
    expect(dialog.id).toBe("career-agent-panel");
    expect(
      screen.getByRole("textbox", { name: "Ask the career assistant" }),
    ).not.toBeNull();

    const results = await axe(dialog);
    expect(results.violations).toEqual([]);
  });
});
