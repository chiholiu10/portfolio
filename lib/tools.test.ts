import { describe, it, expect } from "@jest/globals";
import { groupTools } from "./tools";

describe("tool grouping", () => {
  const items = [{ title: "React", url: "/react.svg" }, { title: "Node", url: "/node.svg" }];
  it("handles missing categories without crashing", () => {
    expect(groupTools(items, [])).toEqual([]);
  });
  it("uses the first category when a second category is absent", () => {
    const categories = [{ title: "Core", description: "", tools: ["React"] }];
    expect(groupTools(items, categories)[0].tools).toEqual(items);
    expect(categories[0].tools).toEqual(["React"]);
  });
});
