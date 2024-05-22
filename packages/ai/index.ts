import OpenAI from "openai";

import { OPENAI_API_KEY } from "@repo/ai/constants";
import { ChatCompletionCreateParamsStreaming } from "openai/resources/chat/completions.mjs";

export const llm = new OpenAI({ apiKey: OPENAI_API_KEY });

export function createLLMChatCompletion(
  prompt: string,
  {
    systemRole = "You are a helpful assistant.",
    ...options
  }: { systemRole?: string } & Partial<ChatCompletionCreateParamsStreaming> = {},
) {
  return llm.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0,
    stream: false,
    ...options,
    messages: [
      { role: "system", content: systemRole },
      { role: "user", content: prompt },
    ],
  });
}
