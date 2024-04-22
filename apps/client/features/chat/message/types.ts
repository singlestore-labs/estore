import { StreamableValue } from "ai/rsc";
import { ReactNode } from "react";

export type ChatMessage = {
  id: string;
  createdAt: Date;
  role: "user" | "assistant" | "system" | "function";
  content?: string | StreamableValue<string>;
  node?: ReactNode;
  isLoading?: boolean;
};
