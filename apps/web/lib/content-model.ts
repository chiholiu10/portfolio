import { z } from "zod";

const optionalText = z.string().nullish();
const imageUrl = z.url().refine((value) => {
  const url = new URL(value);
  return (
    url.protocol === "https:" &&
    ["res.cloudinary.com", "images.ctfassets.net"].includes(url.hostname)
  );
}, "Use an HTTPS image URL from an approved image host.");

export const projectCaseStudySchema = z.object({
  workScope: z.string().optional(),
  plannedWork: z.string().optional(),
  additionalProjects: z
    .array(
      z.object({
        title: z.string().min(1),
        overview: z.string().min(1),
        contribution: z.string().min(1),
        technologies: z.array(z.string()),
        impact: z.array(
          z.object({
            title: z.string().min(1),
            description: z.string().min(1),
          }),
        ),
      }),
    )
    .optional(),
  impact: z
    .array(
      z.object({ title: z.string().min(1), description: z.string().min(1) }),
    )
    .optional(),
  evidence: z
    .array(
      z.object({
        imageUrl,
        assetId: z.string().optional(),
        alt: z.string().min(1),
        caption: z.string().min(1),
        width: z.number().int().positive(),
        height: z.number().int().positive(),
      }),
    )
    .optional(),
  summary: z.string().optional(),
  role: z.string().optional(),
  period: z.string().optional(),
  overview: z.string().optional(),
  problem: z.string().optional(),
  contribution: z.string().optional(),
  technologies: z.array(z.string()).optional(),
  result: z.string().optional(),
});

export const portfolioContentSchema = z.object({
  projects: z
    .array(
      z.object({
        id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
        title: z.string().min(1),
        imageMatch: z.string().min(1),
        keywords: z.array(z.string().min(1)),
        suggestedQuestions: z.array(z.string()).optional(),
        archived: z.boolean().optional(),
        caseStudy: projectCaseStudySchema.nullish(),
      }),
    )
    .superRefine((projects, ctx) => {
      const ids = new Set<string>();
      const matches = new Set<string>();
      projects.forEach((project, index) => {
        if (ids.has(project.id))
          ctx.addIssue({
            code: "custom",
            path: [index, "id"],
            message: "Project IDs must be unique.",
          });
        if (matches.has(project.imageMatch))
          ctx.addIssue({
            code: "custom",
            path: [index, "imageMatch"],
            message: "Image matches must be unique.",
          });
        ids.add(project.id);
        matches.add(project.imageMatch);
      });
    }),
  favoriteProjectIds: z.array(z.string()).optional(),
});

export const portfolioSectionSchema = z.object({
  eyebrow: optionalText,
  title: z.string(),
  subtitle: z.string(),
  extraText: optionalText,
  array: z.array(z.object({ secure_url: imageUrl })),
  arrays: portfolioContentSchema,
});

const toolItemSchema = z.object({ url: imageUrl, title: optionalText });
export const toolCategorySchema = z.object({
  title: z.string(),
  description: z.string(),
  tools: z.array(z.string()),
});
const socialUrl = z
  .url()
  .refine(
    (value) => ["https:", "mailto:", "tel:"].includes(new URL(value).protocol),
    "Use a safe link protocol.",
  );

export const homeSectionSchemas = {
  navbar: z.object({
    arrays: z.object({
      initials: z.string(),
      name: z.string(),
      role: z.string(),
      ariaHidden: z.boolean(),
    }),
  }),
  banner: z.object({
    eyebrow: optionalText,
    approachEyebrow: optionalText,
    title: z.string(),
    subtitle: optionalText,
    extraText: optionalText,
    tool: optionalText,
    arrays: z
      .array(
        z.object({
          position: z.enum(["top", "middle", "bottom"]),
          text: z.string(),
        }),
      )
      .nullish(),
  }),
  introduction: z.object({
    eyebrow: optionalText,
    title: z.string(),
    subtitle: z.string(),
    arrays: z.array(z.object({ title: z.string(), description: z.string() })),
  }),
  howIWork: z.object({
    eyebrow: optionalText,
    title: optionalText,
    subtitle: optionalText,
    extraText: optionalText,
    arrays: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          symbol: optionalText,
        }),
      )
      .nullish(),
  }),
  inspiration: z.object({
    eyebrow: optionalText,
    title: optionalText,
    subtitle: z.string(),
    image: z.object({ url: imageUrl }),
  }),
  portfolio: portfolioSectionSchema,
  tools: z.object({
    eyebrow: optionalText,
    title: optionalText,
    subtitle: optionalText,
    extraText: optionalText,
    arrays: z.array(toolCategorySchema).nullish(),
    arrayBlockCollection: z
      .object({ items: z.array(toolItemSchema) })
      .nullish(),
  }),
  contact: z.object({
    eyebrow: optionalText,
    title: optionalText,
    subtitle: optionalText,
    extraText: optionalText,
    arrays: z.array(z.object({ anchor: socialUrl, name: z.string() })),
    showCareerAgentInProduction: z.boolean().nullish(),
    showCareerAgentInLocalhost: z.boolean().nullish(),
  }),
  footer: z.object({ subtitle: z.string() }),
};

export type HomeSections = {
  [Key in keyof typeof homeSectionSchemas]: {
    section: z.infer<(typeof homeSectionSchemas)[Key]> | null;
  };
};
export type PortfolioContent = z.infer<typeof portfolioContentSchema>;
export type ProjectCaseStudy = z.infer<typeof projectCaseStudySchema>;
export type ToolCategory = z.infer<typeof toolCategorySchema>;
export type ToolItem = { url: string; title?: string | null };

export const parseHomeSection = <Key extends keyof HomeSections>(
  name: Key,
  input: unknown,
): HomeSections[Key] => {
  const parsed = z
    .object({ section: homeSectionSchemas[name].nullable() })
    .safeParse(input);
  if (!parsed.success) {
    const paths = parsed.error.issues
      .map((issue) => issue.path.join("."))
      .join(", ");
    throw new Error(`Invalid Contentful ${name} section: ${paths}`);
  }
  return parsed.data as HomeSections[Key];
};
