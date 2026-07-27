import { hashValue, maskSensitiveContent } from "./privacy";

type ChatRole = "user" | "assistant";
type FeedbackRating = "THUMBS_UP" | "THUMBS_DOWN";

type LogMessageInput = {
  sessionId: string;
  role: ChatRole;
  content: string;
  flowiseChatId?: string;
  flowiseMessageId?: string;
  provider?: string;
  model?: string;
  contactOptions?: Array<"email" | "whatsapp">;
  clientAddress?: string;
};

type LogFeedbackInput = {
  sessionId?: string;
  flowiseChatId: string;
  flowiseMessageId: string;
  flowiseFeedbackId?: string;
  rating: FeedbackRating;
};

const isEnabled = () =>
  process.env.CAREER_AGENT_HISTORY_ENABLED === "true" &&
  Boolean(process.env.SUPABASE_URL) &&
  Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

const getSupabaseHeaders = () => ({
  apikey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY || ""}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
});

const insertSupabaseRow = async <TRecord extends Record<string, unknown>>(
  table: string,
  record: TRecord,
) => {
  if (!isEnabled()) return null;

  const response = await fetch(
    `${process.env.SUPABASE_URL?.replace(/\/$/, "")}/rest/v1/${table}`,
    {
      method: "POST",
      headers: getSupabaseHeaders(),
      body: JSON.stringify(record),
    },
  );

  if (!response.ok) {
    throw new Error(`Supabase insert failed for ${table}.`);
  }

  const payload = (await response.json().catch(() => null)) as
    | Array<{ id?: string }>
    | null;

  return payload?.[0]?.id || null;
};

const patchSupabaseRows = async <TRecord extends Record<string, unknown>>(
  table: string,
  query: string,
  record: TRecord,
) => {
  if (!isEnabled()) return;

  const response = await fetch(
    `${process.env.SUPABASE_URL?.replace(/\/$/, "")}/rest/v1/${table}?${query}`,
    {
      method: "PATCH",
      headers: getSupabaseHeaders(),
      body: JSON.stringify(record),
    },
  );

  if (!response.ok) {
    throw new Error(`Supabase update failed for ${table}.`);
  }
};

export const logCareerAgentMessage = async (input: LogMessageInput) => {
  try {
    const clientAddressHash = input.clientAddress
      ? await hashValue(input.clientAddress)
      : null;

    return await insertSupabaseRow("career_agent_messages", {
      session_id: input.sessionId,
      role: input.role,
      content: maskSensitiveContent(input.content),
      flowise_chat_id: input.flowiseChatId || null,
      flowise_message_id: input.flowiseMessageId || null,
      provider: input.provider || "flowise",
      model: input.model || null,
      contact_options: input.contactOptions || null,
      client_address_hash: clientAddressHash,
    });
  } catch (error) {
    console.error("Career agent message logging failed.", error);
    return null;
  }
};

export const logCareerAgentFeedback = async (input: LogFeedbackInput) => {
  try {
    const feedbackId = await insertSupabaseRow("career_agent_feedback", {
      session_id: input.sessionId || null,
      flowise_chat_id: input.flowiseChatId,
      flowise_message_id: input.flowiseMessageId,
      flowise_feedback_id: input.flowiseFeedbackId || null,
      rating: input.rating,
    });

    await patchSupabaseRows(
      "career_agent_messages",
      `flowise_message_id=eq.${encodeURIComponent(input.flowiseMessageId)}`,
      {
        feedback: input.rating,
        flowise_feedback_id: input.flowiseFeedbackId || null,
      },
    );
    return feedbackId;
  } catch (error) {
    console.error("Career agent feedback logging failed.", error);
    return null;
  }
};
