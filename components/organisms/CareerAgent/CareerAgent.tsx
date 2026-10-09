import {
  FormEvent,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  AgentBadge,
  AgentButton,
  AgentFooter,
  AgentHeader,
  AgentIdentity,
  AgentPanel,
  AgentShell,
  ClearButton,
  CloseButton,
  Composer,
  ContactActionCard,
  ContactActions,
  Disclaimer,
  ErrorMessage,
  FeedbackActions,
  FeedbackButton,
  HeaderActions,
  Message,
  MessageContent,
  MessageList,
  PortfolioChatCard,
  ProjectQuestionButton,
  ProjectQuestionList,
  PortfolioSuggestionGrid,
  ScrollToBottomButton,
  SendButton,
  StarterButton,
  StarterPrompts,
  StatusDot,
  VisuallyHidden,
} from "@/components/organisms/CareerAgent/CareerAgent.styles";
import { getInputSafetyIssue } from "@/lib/career-agent/input-safety";
import { maskSensitiveContent } from "@/lib/career-agent/privacy";
import { PortfolioProject } from "@/lib/portfolio-projects";

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
  project?: PortfolioProject;
  projectSuggestions?: PortfolioProject[];
  suggestedQuestions?: string[];
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
const CHAT_STORAGE_KEY = "career-agent-chat";

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

const sanitizeStoredMessage = (message: ChatMessage): ChatMessage => ({
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

const restoreStoredChat = () => {
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

const renderInlineText = (text: string) =>
  text
    .split(/(\*\*[^*]+\*\*)/g)
    .map((part, index) =>
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

type CareerAgentProps = {
  portfolioProjects?: PortfolioProject[];
};

type SendMessage = (
  message: string,
  project?: PortfolioProject,
) => Promise<void>;

export const CareerAgent = ({ portfolioProjects = [] }: CareerAgentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isQuotaExhausted, setIsQuotaExhausted] = useState(false);
  const [isChatHydrated, setIsChatHydrated] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const sessionId = useRef("");
  const requestInFlight = useRef(false);
  const lastSentAt = useRef(0);
  const messageListRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const sendMessageRef = useRef<SendMessage>(async () => undefined);
  const shouldStickToBottom = useRef(true);

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
  }, []);

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
  }, [isChatHydrated, messages]);

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
    if (!list || !shouldStickToBottom.current) return;

    window.requestAnimationFrame(() => {
      list.scrollTop = list.scrollHeight;
    });
  }, [messages, isLoading]);

  const handleMessageListScroll = () => {
    const list = messageListRef.current;
    if (!list) return;

    const distanceFromBottom =
      list.scrollHeight - list.scrollTop - list.clientHeight;
    const isNearBottom = distanceFromBottom <= 56;

    shouldStickToBottom.current = isNearBottom;
    setShowScrollToBottom(!isNearBottom);
  };

  const scrollToLatestMessage = () => {
    const list = messageListRef.current;
    if (!list) return;

    shouldStickToBottom.current = true;
    setShowScrollToBottom(false);
    list.scrollTo({
      top: list.scrollHeight,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  const closeAgent = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const clearChat = () => {
    sessionId.current = createSessionId();
    requestInFlight.current = false;
    setMessages([welcomeMessage]);
    setInput("");
    setError("");
    setIsLoading(false);
    setIsQuotaExhausted(false);
    shouldStickToBottom.current = true;
    setShowScrollToBottom(false);

    try {
      window.localStorage.removeItem(CHAT_STORAGE_KEY);
      window.sessionStorage.removeItem(CHAT_STORAGE_KEY);
    } catch {
      // Browser storage can be unavailable in strict privacy modes.
    }
  };

  const sendMessage = async (message: string, project?: PortfolioProject) => {
    const cleanMessage = message.trim();
    if (!cleanMessage || isLoading || requestInFlight.current) return;

    const inputSafetyIssue = getInputSafetyIssue(cleanMessage);

    if (inputSafetyIssue) {
      if (inputSafetyIssue.code === "CONTACT_DETAILS") {
        const contactMessage: ChatMessage = {
          id: `contact_${Date.now()}`,
          role: "assistant",
          content: inputSafetyIssue.message,
          variant: "contact",
          contactOptions: ["email", "whatsapp"],
        };

        setMessages((current) =>
          [...current, contactMessage].slice(-MAX_RENDERED_MESSAGES),
        );
        setInput("");
        setError("");
      } else {
        setError(inputSafetyIssue.message);
      }
      return;
    }

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
    shouldStickToBottom.current = true;
    setShowScrollToBottom(false);

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: "user",
      content: cleanMessage,
      project,
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
          history: messages
            .filter((messageItem) => messageItem.id !== "welcome")
            .slice(-6)
            .map((messageItem) => ({
              role: messageItem.role,
              content: maskSensitiveContent(messageItem.content),
            })),
        }),
      });

      const result = (await response.json()) as {
        answer?: string;
        chatId?: string;
        messageId?: string;
        contactOptions?: Array<"email" | "whatsapp">;
        portfolioProjectIds?: string[];
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
        projectSuggestions: result.portfolioProjectIds
          ?.map((projectId) =>
            portfolioProjects.find(
              (portfolioProject) => portfolioProject.id === projectId,
            ),
          )
          .filter((portfolioProject): portfolioProject is PortfolioProject =>
            Boolean(portfolioProject),
          ),
      };

      if (result.portfolioProjectIds?.length) {
        window.dispatchEvent(
          new CustomEvent("career-agent:projects-highlight", {
            detail: { projectIds: result.portfolioProjectIds },
          }),
        );
      }

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
  useEffect(() => {
    sendMessageRef.current = sendMessage;
  });

  useEffect(() => {
    const selectPortfolioProject = (event: Event) => {
      const { projectId } =
        (event as CustomEvent<{ projectId?: string }>).detail || {};
      const project = portfolioProjects.find(
        (portfolioProject) => portfolioProject.id === projectId,
      );

      if (!project) return;

      setIsOpen(true);
      shouldStickToBottom.current = true;
      setShowScrollToBottom(false);
      const questions = project.suggestedQuestions || [];

      if (!questions.length) {
        sendMessageRef.current(
          `Vertel wat Chiho heeft gedaan voor het project ${project.title}.`,
          project,
        );
        return;
      }

      setMessages((current) =>
        [
          ...current,
          {
            id: `project_${project.id}_${Date.now()}`,
            role: "assistant" as const,
            content: `Waar wil je meer over weten over ${project.title}?`,
            project,
            suggestedQuestions: questions,
          },
        ].slice(-MAX_RENDERED_MESSAGES),
      );
    };

    window.addEventListener(
      "career-agent:project-selected",
      selectPortfolioProject,
    );
    return () =>
      window.removeEventListener(
        "career-agent:project-selected",
        selectPortfolioProject,
      );
  }, [portfolioProjects]);

  const showProjectInPortfolio = (project: PortfolioProject) => {
    window.dispatchEvent(
      new CustomEvent("career-agent:projects-highlight", {
        detail: { projectIds: [project.id] },
      }),
    );
    setIsOpen(false);
    document
      .getElementById("portfolio-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
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
            <HeaderActions>
              {messages.length > 1 && (
                <ClearButton type="button" onClick={clearChat}>
                  Clear on device
                </ClearButton>
              )}
              <CloseButton
                type="button"
                onClick={closeAgent}
                aria-label="Close assistant"
              >
                <span aria-hidden="true">×</span>
              </CloseButton>
            </HeaderActions>
          </AgentHeader>

          <MessageList
            ref={messageListRef}
            aria-live="polite"
            aria-busy={isLoading}
            onScroll={handleMessageListScroll}
          >
            {messages.map((message) => (
              <Message key={message.id} $role={message.role}>
                <span>{message.role === "assistant" ? "AI" : "You"}</span>
                <MessageContent>
                  {renderMessageContent(message.content)}
                </MessageContent>
                {message.project && (
                  <PortfolioChatCard as="div" $isStatic>
                    <Image
                      src={message.project.imageUrl}
                      alt={`${message.project.title} portfolio project`}
                      width={320}
                      height={180}
                      sizes="(max-width: 767px) 78vw, 300px"
                    />
                    <strong>{message.project.title}</strong>
                  </PortfolioChatCard>
                )}
                {message.suggestedQuestions?.length && message.project ? (
                  <ProjectQuestionList
                    aria-label={`Suggested questions about ${message.project.title}`}
                  >
                    {message.suggestedQuestions.map((question) => (
                      <ProjectQuestionButton
                        key={question}
                        type="button"
                        disabled={isLoading}
                        onClick={() => sendMessage(question, message.project)}
                      >
                        {question}
                      </ProjectQuestionButton>
                    ))}
                  </ProjectQuestionList>
                ) : null}
                {message.projectSuggestions?.length ? (
                  <PortfolioSuggestionGrid aria-label="Recommended portfolio projects">
                    {message.projectSuggestions.map((project) => (
                      <PortfolioChatCard
                        key={project.id}
                        type="button"
                        onClick={() => showProjectInPortfolio(project)}
                      >
                        <Image
                          src={project.imageUrl}
                          alt={`${project.title} portfolio project`}
                          width={220}
                          height={124}
                          sizes="(max-width: 767px) 42vw, 145px"
                        />
                        <strong>{project.title}</strong>
                        <small>Show in portfolio</small>
                      </PortfolioChatCard>
                    ))}
                  </PortfolioSuggestionGrid>
                ) : null}
                {message.variant === "contact" && (
                  <ContactActions aria-label="Contact options">
                    {(message.contactOptions || ["email", "whatsapp"]).includes(
                      "email",
                    ) && (
                      <ContactActionCard href={contactLinks.email}>
                        <strong>Email</strong>
                        <small>Send a direct email</small>
                      </ContactActionCard>
                    )}
                    {(message.contactOptions || ["email", "whatsapp"]).includes(
                      "whatsapp",
                    ) && (
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

          {showScrollToBottom && (
            <ScrollToBottomButton
              type="button"
              onClick={scrollToLatestMessage}
              aria-label="Scroll to the latest message"
              title="Latest message"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </ScrollToBottomButton>
          )}

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
                  <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
                    <path d="M21 3 10.6 13.4" />
                    <path d="m21 3-6.7 18-3.7-7.6L3 9.7 21 3Z" />
                  </svg>
                </SendButton>
              </Composer>
              <Disclaimer id="career-agent-disclaimer">
                AI-generated answers from curated portfolio information. Do not
                share sensitive data.
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
