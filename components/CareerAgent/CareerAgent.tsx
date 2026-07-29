import {
  FormEvent,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
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
  ContactActionCard,
  ContactActions,
  Disclaimer,
  ErrorMessage,
  FeedbackActions,
  FeedbackButton,
  Message,
  MessageContent,
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
  variant?: "contact";
  contactOptions?: Array<"email" | "whatsapp">;
  chatId?: string;
  messageId?: string;
  feedback?: "THUMBS_UP" | "THUMBS_DOWN";
  feedbackId?: string;
};

const starterPrompts = [
  "How does Chiho approach business problems?",
  "What is Chiho's front-end experience?",
  "Which technologies does Chiho work with?",
  "How can I contact Chiho?",
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

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";
const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(
  /\D/g,
  "",
);

const contactLinks = {
  email: contactEmail
    ? `mailto:${contactEmail}?subject=${encodeURIComponent(
        "Portfolio enquiry",
      )}`
    : "#contact",
  whatsapp: whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        "Hi Chiho, I found your portfolio and would like to get in touch.",
      )}`
    : "#contact",
};

const createSessionId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID().replace(/-/g, "_");
  }

  return `session_${Date.now()}_${Math.random().toString(36).slice(2)}`;
};

const renderInlineText = (text: string) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    (part.startsWith("**") && part.endsWith("**") ? (
      <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>
    ) : (
      part
    )),
  );

const renderMessageContent = (content: string) => {
  const lines = content.split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let index = 0;

  const flushParagraph = () => {
    const text = paragraph.join(" ").trim();
    if (text) {
      blocks.push(
        <p key={`paragraph-${blocks.length}`}>{renderInlineText(text)}</p>,
      );
    }
    paragraph = [];
  };

  while (index < lines.length) {
    const line = lines[index].trim();
    const orderedMatch = line.match(/^\d+[.)]\s+(.+)$/);
    const unorderedMatch = line.match(/^[-*]\s+(.+)$/);

    if (orderedMatch || unorderedMatch) {
      flushParagraph();
      const isOrdered = Boolean(orderedMatch);
      const items: string[] = [];

      while (index < lines.length) {
        const candidate = lines[index].trim();
        const match = isOrdered
          ? candidate.match(/^\d+[.)]\s+(.+)$/)
          : candidate.match(/^[-*]\s+(.+)$/);

        if (!match) break;
        items.push(match[1]);
        index += 1;
      }

      const listItems = items.map((item, itemIndex) => (
        <li key={`${item}-${itemIndex}`}>{renderInlineText(item)}</li>
      ));

      blocks.push(
        isOrdered ? (
          <ol key={`list-${blocks.length}`}>{listItems}</ol>
        ) : (
          <ul key={`list-${blocks.length}`}>{listItems}</ul>
        ),
      );
    } else {
      if (!line) {
        flushParagraph();
      } else {
        paragraph.push(line);
      }
      index += 1;
    }
  }

  flushParagraph();
  return blocks;
};

export const CareerAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isQuotaExhausted, setIsQuotaExhausted] = useState(false);
  const sessionId = useRef("");
  const requestInFlight = useRef(false);
  const lastSentAt = useRef(0);
  const messageListRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sessionId.current = createSessionId();
  }, []);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const shell = shellRef.current;
    const viewport = window.visualViewport;

    const updateViewport = () => {
      const height = viewport?.height ?? window.innerHeight;
      const offsetTop = viewport?.offsetTop ?? 0;

      shell?.style.setProperty(
        "--career-agent-viewport-height",
        `${Math.round(height)}px`,
      );
      shell?.style.setProperty(
        "--career-agent-viewport-offset",
        `${Math.round(offsetTop)}px`,
      );
    };

    const isMobileChat = window.matchMedia(
      "(max-width: 767px), (pointer: coarse)",
    ).matches;
    const previousOverflow = document.body.style.overflow;

    updateViewport();
    viewport?.addEventListener("resize", updateViewport);
    viewport?.addEventListener("scroll", updateViewport);
    window.addEventListener("resize", updateViewport);

    if (isMobileChat) document.body.style.overflow = "hidden";

    return () => {
      viewport?.removeEventListener("resize", updateViewport);
      viewport?.removeEventListener("scroll", updateViewport);
      window.removeEventListener("resize", updateViewport);
      document.body.style.overflow = previousOverflow;
    };
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
        chatId?: string;
        messageId?: string;
        contactOptions?: Array<"email" | "whatsapp">;
        error?: string;
        code?: string;
      };
      const { answer } = result;

      if (!response.ok || !answer) {
        if (result.code === "QUOTA_EXHAUSTED") {
          setIsQuotaExhausted(true);
        }
        throw new Error(result.error || "The assistant could not answer.");
      }

      const assistantMessage: ChatMessage = {
        id: `assistant_${Date.now()}`,
        role: "assistant",
        content: answer,
        variant: result.contactOptions?.length ? "contact" : undefined,
        contactOptions: result.contactOptions,
        chatId: result.chatId,
        messageId: result.messageId,
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

  const sendFeedback = async (
    message: ChatMessage,
    rating: "THUMBS_UP" | "THUMBS_DOWN",
  ) => {
    if (!message.chatId || !message.messageId) return;
    if (message.feedback === rating) return;

    setMessages((current) =>
      current.map((currentMessage) =>
        (currentMessage.id === message.id
          ? { ...currentMessage, feedback: rating }
          : currentMessage),
      ),
    );

    try {
      const response = await fetch("/api/career-agent-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          feedbackId: message.feedbackId,
          sessionId: sessionId.current,
          chatId: message.chatId,
          messageId: message.messageId,
          rating,
        }),
      });

      if (!response.ok) {
        throw new Error("Feedback could not be saved.");
      }

      const result = (await response.json()) as { feedbackId?: string };

      if (result.feedbackId) {
        setMessages((current) =>
          current.map((currentMessage) =>
            (currentMessage.id === message.id
              ? { ...currentMessage, feedbackId: result.feedbackId }
              : currentMessage),
          ),
        );
      }
    } catch {
      setError("Feedback could not be saved right now.");
      setMessages((current) =>
        current.map((currentMessage) =>
          (currentMessage.id === message.id
            ? { ...currentMessage, feedback: undefined }
            : currentMessage),
        ),
      );
    }
  };

  return (
    <AgentShell ref={shellRef}>
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
                <MessageContent>{renderMessageContent(message.content)}</MessageContent>
                {message.variant === "contact" && (
                  <ContactActions aria-label="Contact options">
                    {(message.contactOptions || ["email", "whatsapp"]).includes("email") && (
                      <ContactActionCard href={contactLinks.email}>
                        <strong>Email</strong>
                        <small>Send a direct email</small>
                      </ContactActionCard>
                    )}
                    {(message.contactOptions || ["email", "whatsapp"]).includes("whatsapp") && (
                      <ContactActionCard
                        href={contactLinks.whatsapp}
                        target={whatsappNumber ? "_blank" : undefined}
                        rel={whatsappNumber ? "noopener noreferrer" : undefined}
                      >
                        <strong>WhatsApp</strong>
                        <small>Start a WhatsApp message</small>
                      </ContactActionCard>
                    )}
                  </ContactActions>
                )}
                {message.role === "assistant" && message.messageId && (
                  <FeedbackActions aria-label="Rate this answer">
                    <FeedbackButton
                      type="button"
                      onClick={() => sendFeedback(message, "THUMBS_UP")}
                      aria-label="Mark answer as helpful"
                      aria-pressed={message.feedback === "THUMBS_UP"}
                      $isActive={message.feedback === "THUMBS_UP"}
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        focusable="false"
                      >
                        <path d="M7.5 21H5.25A2.25 2.25 0 0 1 3 18.75v-6A2.25 2.25 0 0 1 5.25 10.5H7.5m0 10.5h8.7a2.25 2.25 0 0 0 2.2-1.78l1.28-6A2.25 2.25 0 0 0 17.48 10.5H14.1l.54-3.2A3.08 3.08 0 0 0 11.6 3.7h-.35L7.5 10.5V21Z" />
                      </svg>
                    </FeedbackButton>
                    <FeedbackButton
                      type="button"
                      onClick={() => sendFeedback(message, "THUMBS_DOWN")}
                      aria-label="Mark answer as not helpful"
                      aria-pressed={message.feedback === "THUMBS_DOWN"}
                      $isActive={message.feedback === "THUMBS_DOWN"}
                    >
                      <svg
                        aria-hidden="true"
                        className="is-down"
                        viewBox="0 0 24 24"
                        focusable="false"
                      >
                        <path d="M7.5 21H5.25A2.25 2.25 0 0 1 3 18.75v-6A2.25 2.25 0 0 1 5.25 10.5H7.5m0 10.5h8.7a2.25 2.25 0 0 0 2.2-1.78l1.28-6A2.25 2.25 0 0 0 17.48 10.5H14.1l.54-3.2A3.08 3.08 0 0 0 11.6 3.7h-.35L7.5 10.5V21Z" />
                      </svg>
                    </FeedbackButton>
                  </FeedbackActions>
                )}
              </Message>
            ))}

            {isLoading && (
              <Message $role="assistant">
                <span>AI</span>
                <MessageContent>
                  <p>Thinking…</p>
                </MessageContent>
              </Message>
            )}

            {error && (
              <ErrorMessage role="alert">
                {error} <a href="#contact">Use direct contact instead.</a>
              </ErrorMessage>
            )}
          </MessageList>

          {messages.length === 1 && !isQuotaExhausted && (
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

          {!isQuotaExhausted && (
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
          )}
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
