import { describe, expect, it } from "@jest/globals";
import {
  contactRequestSchema,
  normalizeContactRequest,
} from "./validation";

const validRequest = {
  name: "Chiho Liu",
  email: "Recruiter@example.com",
  company: "Example BV",
  subject: "Senior frontend opportunity",
  message: "I would like to discuss a suitable frontend position.",
  consent: true as const,
  website: "",
};

describe("contactRequestSchema", () => {
  it("accepts and normalizes a valid request", () => {
    const parsed = contactRequestSchema.parse(validRequest);
    expect(normalizeContactRequest(parsed).email).toBe("recruiter@example.com");
  });

  it("rejects the honeypot field", () => {
    expect(
      contactRequestSchema.safeParse({ ...validRequest, website: "spam.test" })
        .success,
    ).toBe(false);
  });

  it("rejects active markup", () => {
    expect(
      contactRequestSchema.safeParse({
        ...validRequest,
        message: "Please open <script>alert(1)</script> after reading this.",
      }).success,
    ).toBe(false);
  });

  it("requires explicit consent", () => {
    expect(
      contactRequestSchema.safeParse({ ...validRequest, consent: false }).success,
    ).toBe(false);
  });
});
