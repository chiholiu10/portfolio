import { describe, it, expect } from "@jest/globals";
import { parseHomeSection, portfolioContentSchema } from "@/lib/content-model";

const project = { id: "sample-project", title: "Sample", imageMatch: "Sample", keywords: [] };

describe("CMS content contracts", () => {
  it("allows an explicitly absent section", () => {
    expect(parseHomeSection("footer", { section: null })).toEqual({ section: null });
  });

  it("rejects invalid content with a useful field path, without logging content values", () => {
    expect(() => parseHomeSection("inspiration", { section: { subtitle: "Private content", image: null } }))
      .toThrow("Invalid Contentful inspiration section: section.image");
  });

  it("rejects duplicate project IDs and image matches", () => {
    expect(portfolioContentSchema.safeParse({ projects: [project, project] }).success).toBe(false);
  });

  it("rejects unsafe social links", () => {
    expect(() => parseHomeSection("contact", { section: { arrays: [{ name: "Unsafe", anchor: ["javascript", "alert(1)"].join(":") }] } })).toThrow();
  });

  it("rejects images outside the configured hosts", () => {
    expect(() => parseHomeSection("inspiration", { section: { subtitle: "Work", image: { url: "https://example.com/image.png" } } })).toThrow();
  });
});
