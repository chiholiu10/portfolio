export type InputSafetyIssue = {
  code: "CONTACT_DETAILS" | "DANGEROUS_INPUT" | "SENSITIVE_INPUT";
  message: string;
};

const EMAIL_PATTERN = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const INTERNATIONAL_PHONE_PATTERN =
  /(?:\+|00)\d[\d\s().-]{7,}\d/;
const DUTCH_PHONE_PATTERN =
  /\b(?:0\d{1,3}[\s.-]?)\d(?:[\s.-]?\d){6,8}\b/;
const BSN_PATTERN = /\b\d{9}\b/;
const SECRET_PATTERN =
  /\b(?:api[_ -]?key|access[_ -]?token|secret|password|passwd|authorization)\s*[:=]\s*\S{6,}/i;
const PRIVATE_KEY_PATTERN = /-----BEGIN [A-Z ]*PRIVATE KEY-----/i;

const ACTIVE_MARKUP_PATTERN =
  /<\s*\/?\s*(?:script|iframe|object|embed|svg|link|meta|style)\b/i;
const EVENT_HANDLER_PATTERN = /\bon[a-z]+\s*=/i;
const SCRIPT_PROTOCOL_PATTERN =
  /\b(?:javascript|vbscript)\s*:|data\s*:\s*text\/html/i;
const PROMPT_INJECTION_PATTERN =
  /\b(?:ignore|disregard|override|forget)\b.{0,50}\b(?:previous|prior|system|developer|instructions?|prompt)\b|\b(?:reveal|show|print|repeat)\b.{0,40}\b(?:system|developer)\s+prompt\b|\bjailbreak\b/i;

export const getInputSafetyIssue = (
  message: string,
): InputSafetyIssue | null => {
  if (
    ACTIVE_MARKUP_PATTERN.test(message) ||
    EVENT_HANDLER_PATTERN.test(message) ||
    SCRIPT_PROTOCOL_PATTERN.test(message) ||
    PROMPT_INJECTION_PATTERN.test(message)
  ) {
    return {
      code: "DANGEROUS_INPUT",
      message:
        "This message contains unsafe code or instructions and was not sent.",
    };
  }

  if (
    BSN_PATTERN.test(message) ||
    SECRET_PATTERN.test(message) ||
    PRIVATE_KEY_PATTERN.test(message)
  ) {
    return {
      code: "SENSITIVE_INPUT",
      message:
        "Please remove email addresses, phone numbers, passwords, keys or other sensitive information before sending.",
    };
  }

  if (
    EMAIL_PATTERN.test(message) ||
    INTERNATIONAL_PHONE_PATTERN.test(message) ||
    DUTCH_PHONE_PATTERN.test(message)
  ) {
    return {
      code: "CONTACT_DETAILS",
      message:
        "For privacy, contact details are not sent through the AI chat. Please use email or WhatsApp instead.",
    };
  }

  return null;
};
