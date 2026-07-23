import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import {
  AgentBadge,
  AgentButton,
  AgentFooter,
  AgentHeader,
  AgentIdentity,
  AgentPanel,
  AgentShell,
  CloseButton,
  Composer,
  Disclaimer,
  ErrorMessage,
  Message,
  MessageList,
  SendButton,
  StarterButton,
  StarterPrompts,
  StatusDot,
  VisuallyHidden,
} from "./CareerAgent.styles";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

const starterPrompts = [
  "How does Chiho approach business problems?",
  "What is Chiho's front-end experience?",
  "Which technologies does Chiho work with?",
  "I would like to discuss a position.",
];

const MIN_SEND_INTERVAL_MS = 1200;
const MAX_USER_MESSAGES_PER_SESSION = 20;
const MAX_RENDERED_MESSAGES = 42;

const welcomeMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi, I'm Chiho's AI portfolio assistant. Ask me about his experience, approach or technical capabilities.",
};

const createSessionId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID().replace(/-/g, "_");
  }

  return `session_${Date.now()}_${Math.random().toString(36).slice(2)}`;
};

export const CareerAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const sessionId = useRef("");
  const requestInFlight = useRef(false);
  const lastSentAt = useRef(0);
  const messageListRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    sessionId.current = createSessionId();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const list = messageListRef.current;
    if (!list) return;

    list.scrollTop = list.scrollHeight;
  }, [messages, isLoading]);

  const closeAgent = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const sendMessage = async (message: string) => {
    const cleanMessage = message.trim();
    if (!cleanMessage || isLoading || requestInFlight.current) return;

    const userMessageCount = messages.filter(
      (currentMessage) => currentMessage.role === "user",
    ).length;

    if (userMessageCount >= MAX_USER_MESSAGES_PER_SESSION) {
      setError(
        "This chat session has reached its message limit. Refresh the page to start a new session.",
      );
      return;
    }

    const now = Date.now();
    if (now - lastSentAt.current < MIN_SEND_INTERVAL_MS) {
      setError("Please wait a moment before sending another message.");
      return;
    }

    if (!sessionId.current) sessionId.current = createSessionId();
    requestInFlight.current = true;
    lastSentAt.current = now;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: "user",
      content: cleanMessage,
    };

    setMessages((current) =>
      [...current, userMessage].slice(-MAX_RENDERED_MESSAGES),
    );
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/career-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          message: cleanMessage,
          sessionId: sessionId.current,
        }),
      });

      const result = (await response.json()) as {
        answer?: string;
        error?: string;
      };
      const { answer } = result;

      if (!response.ok || !answer) {
        throw new Error(result.error || "The assistant could not answer.");
      }

      const assistantMessage: ChatMessage = {
        id: `assistant_${Date.now()}`,
        role: "assistant",
        content: answer,
      };

      setMessages((current) =>
        [...current, assistantMessage].slice(-MAX_RENDERED_MESSAGES),
      );
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "The career assistant is currently unavailable.",
      );
    } finally {
      requestInFlight.current = false;
      setIsLoading(false);
    }
  };

  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <AgentShell>
      {isOpen && (
        <AgentPanel
          role="dialog"
          aria-modal="false"
          aria-labelledby="career-agent-title"
          aria-describedby="career-agent-disclaimer"
        >
          <AgentHeader>
            <AgentIdentity>
              <AgentBadge aria-hidden="true">AI</AgentBadge>
              <div>
                <strong id="career-agent-title">Career Assistant</strong>
                <span>
                  <StatusDot aria-hidden="true" /> Portfolio knowledge
                </span>
              </div>
            </AgentIdentity>
            <CloseButton type="button" onClick={closeAgent} aria-label="Close assistant">
              <span aria-hidden="true">×</span>
            </CloseButton>
          </AgentHeader>

          <MessageList ref={messageListRef} aria-live="polite" aria-busy={isLoading}>
            {messages.map((message) => (
              <Message key={message.id} $role={message.role}>
                <span>{message.role === "assistant" ? "AI" : "You"}</span>
                <p>{message.content}</p>
              </Message>
            ))}

            {isLoading && (
              <Message $role="assistant">
                <span>AI</span>
                <p>Thinking…</p>
              </Message>
            )}

            {error && (
              <ErrorMessage role="alert">
                {error} <a href="#contact">Use direct contact instead.</a>
              </ErrorMessage>
            )}
          </MessageList>

          {messages.length === 1 && (
            <StarterPrompts aria-label="Suggested questions">
              {starterPrompts.map((prompt) => (
                <StarterButton
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                >
                  {prompt}
                </StarterButton>
              ))}
            </StarterPrompts>
          )}

          <AgentFooter>
            <Composer onSubmit={submitMessage}>
              <label htmlFor="career-agent-message">
                <VisuallyHidden>Ask the career assistant</VisuallyHidden>
              </label>
              <textarea
                ref={inputRef}
                id="career-agent-message"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about experience, skills or approach…"
                maxLength={1000}
                rows={1}
                disabled={isLoading}
              />
              <SendButton
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
              >
                <span aria-hidden="true">↗</span>
              </SendButton>
            </Composer>
            <Disclaimer id="career-agent-disclaimer">
              AI-generated answers from curated portfolio information. Do not share
              sensitive data.
            </Disclaimer>
          </AgentFooter>
        </AgentPanel>
      )}

      <AgentButton
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls="career-agent-panel"
      >
        <AgentBadge aria-hidden="true">AI</AgentBadge>
        <span>Ask my career agent</span>
      </AgentButton>
    </AgentShell>
  );
};
