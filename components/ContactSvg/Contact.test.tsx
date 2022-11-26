import { render, screen } from "@testing-library/react";
import { ContactSvg } from "./ContactSvg";
import "@testing-library/jest-dom/extend-expect";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";

test("The Contact component test when no probs is available", () => {
  render(<ContactSvg index={undefined} />);
  const testContactSvg = screen.getByTestId("noContactSvg") as HTMLElement;
  expect(testContactSvg).toBeInTheDocument();
});

test("The Contact component test if first index is available in DOM tree", () => {
  const currentIndex = 0;
  render(<ContactSvg index={currentIndex} />);
  mockAllIsIntersecting(true);
  const testContactSvg = screen.getByTestId("contactTest") as HTMLElement;
  expect(testContactSvg).toBeInTheDocument();
});
