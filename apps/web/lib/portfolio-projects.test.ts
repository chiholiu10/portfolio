import { describe, it, expect } from "@jest/globals";
import {
  createPortfolioProjects,
  recommendPortfolioProjectIds,
} from "@/lib/portfolio-projects";

const first = {
  id: "first",
  title: "First",
  imageMatch: "First",
  keywords: ["React"],
};
const second = {
  id: "second",
  title: "Second",
  imageMatch: "Second",
  keywords: ["React"],
  archived: true,
};
const content = {
  projects: [first, second],
  favoriteProjectIds: ["second", "first"],
};
const firstImage = {
  secure_url: "https://res.cloudinary.com/example/First.png",
};

describe("portfolio identity", () => {
  it("preserves the project URL when images are reordered and excludes archived projects", () => {
    const archivedImage = {
      secure_url: "https://res.cloudinary.com/example/Second.png",
    };
    expect(
      createPortfolioProjects([archivedImage, firstImage], content).map(
        ({ id }) => id,
      ),
    ).toEqual(["first"]);
    expect(
      createPortfolioProjects([firstImage, archivedImage], content).map(
        ({ id }) => id,
      ),
    ).toEqual(["first"]);
  });

  it("rejects unknown images rather than generating an unstable URL", () => {
    expect(() =>
      createPortfolioProjects(
        [{ secure_url: "https://res.cloudinary.com/example/Unknown.png" }],
        content,
      ),
    ).toThrow();
  });

  it("rejects ambiguous image mappings", () => {
    expect(() =>
      createPortfolioProjects([firstImage], {
        projects: [first, { ...second, imageMatch: "irst" }],
      }),
    ).toThrow();
  });

  it("matches keywords regardless of their casing and excludes archived recommendations", () => {
    expect(
      recommendPortfolioProjectIds("Show React experience", content),
    ).toEqual(["first"]);
    expect(recommendPortfolioProjectIds("favorite project", content)).toEqual([
      "first",
    ]);
  });
});
