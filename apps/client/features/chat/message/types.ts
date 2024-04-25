import { StreamableValue } from "ai/rsc";
import { ReactNode } from "react";

import { ChatLLMMessage } from "@/chat/llm/message/types";

export type ChatMessage = {
  id: string;
  createdAt: Date;
  role: ChatLLMMessage["role"];
  content: string | StreamableValue<string>;
  node?: ReactNode;
  isLoading?: boolean;
};
