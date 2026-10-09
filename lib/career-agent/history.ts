import { hashValue, maskSensitiveContent } from "@/lib/career-agent/privacy";

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
  onConflict?: string,
) => {
  if (!isEnabled()) return null;

  const response = await fetch(
    `${process.env.SUPABASE_URL?.replace(/\/$/, "")}/rest/v1/${table}${
      onConflict ? `?on_conflict=${encodeURIComponent(onConflict)}` : ""
    }`,
    {
      method: "POST",
      headers: {
        ...getSupabaseHeaders(),
        ...(onConflict
          ? { Prefer: "resolution=merge-duplicates,return=representation" }
          : {}),
      },
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

export const logCareerAgentMessage = async (input: LogMessageInput) => {
  try {
    const hashingSecret =
      process.env.CAREER_AGENT_HASH_SECRET ||
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      "";
    const clientAddressHash = input.clientAddress
      ? await hashValue(input.clientAddress, hashingSecret)
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
    if (!isEnabled() || !input.sessionId) return null;

    const response = await fetch(
      `${process.env.SUPABASE_URL?.replace(/\/$/, "")}/rest/v1/rpc/save_career_agent_feedback`,
      {
        method: "POST",
        headers: getSupabaseHeaders(),
        body: JSON.stringify({
          p_session_id: input.sessionId,
          p_chat_id: input.flowiseChatId,
          p_message_id: input.flowiseMessageId,
          p_feedback_id: input.flowiseFeedbackId || null,
          p_rating: input.rating,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Supabase feedback transaction failed.");
    }

    return (await response.json()) as string | null;
  } catch (error) {
    console.error("Career agent feedback logging failed.", error);
    return null;
  }
};
