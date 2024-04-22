"use server";

import { createStreamableUI, createStreamableValue } from "ai/rsc";

import { createChatAgent } from "@/chat/agent/lib/create";
import { createChatMessage } from "@/chat/message/lib/create";
import { ChatMessage } from "@/chat/message/types";

export async function submitChatMessage(content: ChatMessage["content"]): Promise<ChatMessage> {
  let isLoading = true;

  const chatAgent = await createChatAgent();
  const textStream: ReturnType<typeof createStreamableValue<string>> = createStreamableValue("");
  const { node, ...message } = createChatMessage({ role: "assistant", content: textStream.value, isLoading });
  const nodeStream = createStreamableUI(node);

  (async () => {
    await chatAgent.invoke(
      { input: content },
      {
        callbacks: [
          {
            handleLLMNewToken(token) {
              if (token.length && isLoading) {
                isLoading = false;
                nodeStream.update(createChatMessage({ ...message, isLoading, content: textStream.value }).node);
              }

              textStream.update(token);
            },
          },
        ],
      },
    );

    textStream.done();
    nodeStream.done();
  })();

  return { ...message, node: nodeStream.value };
}
