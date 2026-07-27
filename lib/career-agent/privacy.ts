const EMAIL_PATTERN = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
const PHONE_PATTERN =
  /(?:\+|00)?\d[\d\s().-]{7,}\d/g;

export const maskSensitiveContent = (content: string) =>
  content
    .replace(EMAIL_PATTERN, "[email]")
    .replace(PHONE_PATTERN, "[phone]")
    .slice(0, 6000);

export const hashValue = async (value: string) => {
  if (!value || typeof crypto === "undefined" || !crypto.subtle) return null;

  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};
