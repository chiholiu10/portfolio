const SITE_URL = "https://www.chiholiu.com";

export type SitemapEntry = {
  path: string;
  lastModified?: string;
};

const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, (character) => {
    const entities = new Map([
      ["<", "&lt;"],
      [">", "&gt;"],
      ["&", "&amp;"],
      ["'", "&apos;"],
      [String.fromCharCode(34), "&quot;"],
    ]);
    return entities.get(character) || character;
  });

const asDate = (value?: string) => {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
};

const entry = (location: string, lastModified?: string) => {
  const lastmod = asDate(lastModified);
  return [
    "  <url>",
    `    <loc>${escapeXml(location)}</loc>`,
    ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
    "  </url>",
  ].join("\n");
};

export const createSitemap = (entries: SitemapEntry[]) => {
  const urls = entries
    .filter(({ path }) => path.startsWith("/"))
    .map(({ path, lastModified }) =>
      entry(`${SITE_URL}${encodeURI(path)}`, lastModified),
    );

  return [
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
    "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
    ...urls,
    "</urlset>",
  ].join("\n");
};
