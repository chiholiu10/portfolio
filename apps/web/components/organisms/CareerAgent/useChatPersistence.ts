import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
  type RefObject,
} from "react";
import type { ChatMessage } from "@/components/organisms/CareerAgent/types";
import {
  createSessionId,
  restoreStoredChat,
  sanitizeStoredMessage,
  MAX_RENDERED_MESSAGES,
  CHAT_STORAGE_KEY,
} from "@/components/organisms/CareerAgent/chatStorage";

export function useChatPersistence(
  messages: ChatMessage[],
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>,
  sessionId: RefObject<string>,
) {
  const [isChatHydrated, setIsChatHydrated] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const storedChat = restoreStoredChat();

      if (storedChat) {
        sessionId.current = storedChat.sessionId;
        setMessages(storedChat.messages);
      } else {
        sessionId.current = createSessionId();
      }

      // Remove data created by the retired 24-hour persistence option.
      try {
        window.localStorage.removeItem(CHAT_STORAGE_KEY);
      } catch {
        // Browser storage can be unavailable in strict privacy modes.
      }

      setIsChatHydrated(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [sessionId, setMessages]);

  useEffect(() => {
    if (!isChatHydrated || !sessionId.current) return;

    try {
      const serializedChat = JSON.stringify({
        sessionId: sessionId.current,
        messages: messages
          .slice(-MAX_RENDERED_MESSAGES)
          .map(sanitizeStoredMessage),
      });

      window.sessionStorage.setItem(CHAT_STORAGE_KEY, serializedChat);
    } catch {
      // The chat remains usable when browser storage is disabled or full.
    }
  }, [isChatHydrated, messages, sessionId]);

  return isChatHydrated;
}
