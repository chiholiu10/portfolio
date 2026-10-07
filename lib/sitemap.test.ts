import { describe, expect, it } from "@jest/globals";
import { createSitemap } from "./sitemap";

describe("createSitemap", () => {
  it("includes valid portfolio routes", () => {
    const sitemap = createSitemap([
      {
        path: "/",
      },
      {
        path: "/project/gemeente-amsterdam-vue",
        lastModified: "2026-09-12T08:30:00.000Z",
      },
    ]);

    expect(sitemap).toContain("<loc>https://www.chiholiu.com/</loc>");
    expect(sitemap).toContain(
      "<loc>https://www.chiholiu.com/project/gemeente-amsterdam-vue</loc>",
    );
    expect(sitemap).toContain(
      "<lastmod>2026-09-12T08:30:00.000Z</lastmod>",
    );
  });

  it("encodes paths and omits invalid entries and dates", () => {
    const sitemap = createSitemap([
      { path: "/design & code", lastModified: "not-a-date" },
      { path: "external", lastModified: "2026-01-01" },
    ]);

    expect(sitemap).toContain("/design%20&amp;%20code");
    expect(sitemap).not.toContain("external");
    expect(sitemap).not.toContain("<lastmod>");
  });
});
