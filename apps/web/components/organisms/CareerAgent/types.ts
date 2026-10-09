import type { PortfolioProject } from "@/lib/portfolio-projects";

export type ChatMessage = {
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
