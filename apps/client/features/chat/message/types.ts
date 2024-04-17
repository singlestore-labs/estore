import { ReactNode } from "react";

export type ChatMessage = {
  id: string;
  createdAt: Date;
  role: "user" | "assistant" | "system" | "function";
  content?: string;
  node?: ReactNode;
};
