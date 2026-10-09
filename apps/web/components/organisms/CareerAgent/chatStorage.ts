import type { ChatMessage } from "@/components/organisms/CareerAgent/types";
import { maskSensitiveContent } from "@/lib/career-agent/privacy";

export const MAX_RENDERED_MESSAGES = 42;
export const CHAT_STORAGE_KEY = "career-agent-chat";
export const createSessionId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID().replace(/-/g, "_");
  }

  return `session_${Date.now()}_${Math.random().toString(36).slice(2)}`;
};

const isStoredMessage = (value: unknown): value is ChatMessage => {
  if (!value || typeof value !== "object") return false;

  const message = value as Partial<ChatMessage>;
  return (
    typeof message.id === "string" &&
    message.id.length <= 160 &&
    (message.role === "assistant" || message.role === "user") &&
    typeof message.content === "string" &&
    message.content.length <= 6000
  );
};

export const sanitizeStoredMessage = (message: ChatMessage): ChatMessage => ({
  id: message.id,
  role: message.role,
  content:
    message.role === "user"
      ? maskSensitiveContent(message.content)
      : message.content.slice(0, 6000),
  ...(message.variant === "contact" ? { variant: "contact" as const } : {}),
  ...(message.contactOptions?.length
    ? {
        contactOptions: message.contactOptions.filter(
          (option) => option === "email" || option === "whatsapp",
        ),
      }
    : {}),
});

export const restoreStoredChat = () => {
  try {
    const storage = window.sessionStorage;
    const storedValue = storage.getItem(CHAT_STORAGE_KEY);
    if (!storedValue) return null;

    const storedChat = JSON.parse(storedValue) as {
      sessionId?: unknown;
      messages?: unknown;
    };

    const hasValidSession =
      typeof storedChat.sessionId === "string" &&
      /^[a-zA-Z0-9_]{10,160}$/.test(storedChat.sessionId);
    const storedMessages = Array.isArray(storedChat.messages)
      ? storedChat.messages
          .filter(isStoredMessage)
          .slice(-MAX_RENDERED_MESSAGES)
      : [];

    if (!hasValidSession || !storedMessages.length) {
      storage.removeItem(CHAT_STORAGE_KEY);
      return null;
    }

    return {
      sessionId: storedChat.sessionId as string,
      messages: storedMessages.map(sanitizeStoredMessage),
    };
  } catch {
    try {
      window.sessionStorage.removeItem(CHAT_STORAGE_KEY);
    } catch {
      // Browser storage can be unavailable in strict privacy modes.
    }
    return null;
  }
};
