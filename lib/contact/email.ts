import type { normalizeContactRequest } from "@/lib/contact/validation";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export const sendContactEmails = async (
  submission: ReturnType<typeof normalizeContactRequest>,
  requestId: string,
) => {
  const apiKey = process.env.RESEND_API_KEY;
  const owner = process.env.CONTACT_NOTIFICATION_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !owner || !from) {
    console.error("Contact email is not configured", { requestId });
    throw new Error("Contact email is not configured");
  }

  const emails = [
    {
      to: [owner],
      reply_to: submission.email,
      subject: `Portfolio contact: ${submission.subject}`,
      text: `New portfolio contact\nName: ${submission.name}\nEmail: ${submission.email}\nCompany: ${submission.company || "Not provided"}\nRequest ID: ${requestId}\n\n${submission.message}`,
      html: `<h1>New portfolio contact</h1><p><strong>Name:</strong> ${escapeHtml(submission.name)}</p><p><strong>Email:</strong> ${escapeHtml(submission.email)}</p><p><strong>Company:</strong> ${escapeHtml(submission.company || "Not provided")}</p><p><strong>Request ID:</strong> ${escapeHtml(requestId)}</p><p>${escapeHtml(submission.message).replace(/\n/g, "<br>")}</p>`,
    },
    {
      to: [submission.email],
      reply_to: owner,
      subject: "Thanks for reaching out — Chiho Liu",
      text: `Hi ${submission.name},\n\nThanks for reaching out. I have received your message and will get back to you as soon as possible.\n\nBest,\nChiho Liu`,
      html: `<p>Hi ${escapeHtml(submission.name)},</p><p>Thanks for reaching out. I have received your message and will get back to you as soon as possible.</p><p>Best,<br>Chiho Liu</p>`,
    },
  ];

  const results = await Promise.allSettled(
    emails.map(async (email) => {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from, ...email }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) {
        throw new Error(`Resend HTTP ${response.status}`);
      }
    }),
  );

  results.forEach((result, index) => {
    if (result.status === "rejected") {
      // The message is already saved; do not prompt duplicate submissions.
      console.error("Contact email delivery failed", {
        requestId,
        kind: index === 0 ? "notification" : "confirmation",
        reason: result.reason instanceof Error ? result.reason.message : "Unknown delivery error",
      });
    }
  });

  const notificationResult = results[0];
  if (notificationResult.status === "rejected") {
    throw new Error("Contact notification could not be delivered");
  }
};
