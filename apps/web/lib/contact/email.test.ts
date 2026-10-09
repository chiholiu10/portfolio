import { beforeEach, afterEach, it, expect, jest } from "@jest/globals";
import { sendContactEmails } from "@/lib/contact/email";

const submission = {
  name: "Chi & Co",
  email: "visitor@example.com",
  company: "",
  subject: "Let's talk",
  message: "A message about working together.",
  consent: true as const,
  website: "",
};

const originalEnv = { ...process.env };
const originalFetch = global.fetch;

beforeEach(() => {
  process.env.RESEND_API_KEY = "test-key";
  process.env.CONTACT_NOTIFICATION_EMAIL = "owner@example.com";
  process.env.CONTACT_FROM_EMAIL = "contact@example.com";
  global.fetch = jest
    .fn<typeof fetch>()
    .mockResolvedValue({ ok: true } as Response);
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  process.env = { ...originalEnv };
  global.fetch = originalFetch;
  jest.restoreAllMocks();
});

it("sends separate owner and visitor emails with reply addresses and escaped content", async () => {
  await sendContactEmails(submission, "request-123");
  const { calls } = (global.fetch as jest.MockedFunction<typeof fetch>).mock;
  expect(calls).toHaveLength(2);
  const notification = JSON.parse(String(calls[0][1]?.body));
  const confirmation = JSON.parse(String(calls[1][1]?.body));
  expect(notification.to).toEqual(["owner@example.com"]);
  expect(notification.reply_to).toBe(submission.email);
  expect(confirmation.to).toEqual([submission.email]);
  expect(confirmation.reply_to).toBe("owner@example.com");
  expect(confirmation.html).toContain("Chi &amp; Co");
  expect(confirmation.text).toContain("I have received your message");
  expect(confirmation.html).not.toContain(submission.message);
  expect(notification.text).toContain(submission.message);
});

it("reports a failure when the owner notification fails", async () => {
  (global.fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(
    new Error("network failed"),
  );
  await expect(sendContactEmails(submission, "request-123")).rejects.toThrow(
    "Contact notification could not be delivered",
  );
  expect(global.fetch).toHaveBeenCalledTimes(2);
  expect(console.error).toHaveBeenCalledWith("Contact email delivery failed", {
    requestId: "request-123",
    kind: "notification",
    reason: "network failed",
  });
});

it("preserves submission success when confirmation is rejected", async () => {
  (global.fetch as jest.MockedFunction<typeof fetch>)
    .mockResolvedValueOnce({ ok: true } as Response)
    .mockResolvedValueOnce({ ok: false, status: 403 } as Response);
  await expect(
    sendContactEmails(submission, "request-123"),
  ).resolves.toBeUndefined();
  expect(console.error).toHaveBeenCalledWith("Contact email delivery failed", {
    requestId: "request-123",
    kind: "confirmation",
    reason: "Resend HTTP 403",
  });
});

it("does not send with incomplete configuration", async () => {
  delete process.env.RESEND_API_KEY;
  await expect(sendContactEmails(submission, "request-123")).rejects.toThrow(
    "Contact email is not configured",
  );
  expect(global.fetch).not.toHaveBeenCalled();
});
