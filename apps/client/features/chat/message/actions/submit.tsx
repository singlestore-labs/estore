"use server";

import { createStreamableUI, createStreamableValue } from "ai/rsc";

import { createChatLLM } from "@/chat/llm/lib/create";
import { createChatMessage } from "@/chat/message/lib/create";
import { ChatMessage } from "@/chat/message/types";

const chatLLM = createChatLLM();

export async function submitChatMessage(
  content: Extract<ChatMessage["content"], string>,
): Promise<ChatMessage> {
  let isLoading = true;

  const textStream: ReturnType<typeof createStreamableValue<string>> = createStreamableValue("");
  const { node, ...message } = createChatMessage({ role: "assistant", content: textStream.value, isLoading });

  const nodeStream = createStreamableUI(node);

  (async () => {
    try {
      await chatLLM.send(content, {
        onContent: (content) => {
          if (content && isLoading) {
            isLoading = false;
            nodeStream.update(createChatMessage({ ...message, isLoading }).node);
          }
          textStream.update(content);
        },

        onTool: async ({ getNode }) => {
          isLoading = false;
          console.log("onTool");
          const node = await getNode();
          if (node) nodeStream.update(createChatMessage({ ...message, isLoading, node }).node);
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      textStream.done();
      nodeStream.done();
    }
  })();

  return { ...message, node: nodeStream.value };
}
