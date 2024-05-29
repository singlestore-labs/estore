import { llm } from "@repo/ai/index";

export function createLLMChatCompletion(
  prompt: string,
  { systemRole = "You are a helpful assistant.", ...options }: { systemRole?: string; stream?: boolean } = {},
) {
  return llm.chat.completions.create({
    model: "gpt-4o",
    temperature: 0,
    stream: false,
    ...options,
    messages: [
      { role: "system", content: systemRole },
      { role: "user", content: prompt },
    ],
  });
}
