import { z } from "zod";

const graphqlResponse = z.object({
  data: z.unknown().optional(),
  errors: z.array(z.object({ message: z.string() })).optional(),
});

/** CMS payloads remain unknown until the section's Zod schema validates them. */
export async function fetchContentful(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<unknown> {
  const token = process.env.CONTENTFUL_ACCESS_TOKEN;
  const space = process.env.CONTENTFUL_SPACE_ID;
  const environment = process.env.CONTENTFUL_ENVIRONMENT || "master";
  if (!token || !space) {
    throw new Error(
      "Configure CONTENTFUL_ACCESS_TOKEN and CONTENTFUL_SPACE_ID before loading CMS content.",
    );
  }

  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${encodeURIComponent(space)}/environments/${encodeURIComponent(environment)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query, variables }),
      signal: AbortSignal.timeout(10_000),
    },
  );
  if (!response.ok) {
    throw new Error(`Contentful request failed (HTTP ${response.status}).`);
  }
  const result = graphqlResponse.parse(await response.json());
  if (result.errors?.length) {
    throw new Error("Contentful returned GraphQL errors.");
  }
  if (result.data == null) {
    throw new Error("Contentful returned no data.");
  }
  return result.data;
}
