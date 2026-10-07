import { z } from "zod";

const unsafeMarkup = /<\/?[a-z][^>]*>|javascript:|data:text\/html/i;

const safeText = (label: string, maxLength: number) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .max(maxLength, `${label} is too long.`)
    .refine((value) => !unsafeMarkup.test(value), `${label} contains unsafe markup.`);

export const contactRequestSchema = z.object({
  name: safeText("Name", 80),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  company: z
    .string()
    .trim()
    .max(120, "Company name is too long.")
    .refine(
      (value) => !unsafeMarkup.test(value),
      "Company contains unsafe markup.",
    )
    .optional()
    .default(""),
  subject: safeText("Subject", 140),
  message: safeText("Message", 2000).min(
    20,
    "Please provide at least 20 characters.",
  ),
  consent: z.literal(true),
  website: z.string().max(0).optional().default(""),
});

export type ContactRequest = z.infer<typeof contactRequestSchema>;

export const normalizeContactRequest = (input: ContactRequest) => ({
  ...input,
  name: input.name.replace(/\s+/g, " "),
  email: input.email.toLowerCase(),
  company: input.company.replace(/\s+/g, " "),
  subject: input.subject.replace(/\s+/g, " "),
  message: input.message.replace(/\r\n/g, "\n"),
});
