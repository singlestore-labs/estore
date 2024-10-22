"use server";

import { createStreamableUI, createStreamableValue } from "ai/rsc";

import { forwardActionError } from "@/action/error/lib/forward";
import { createChatLLM } from "@/chat/llm/lib/create";
import { createChatMessage } from "@/chat/message/lib/create";
import { Chat } from "@/chat/types";

export async function submitChatMessage(chatName: Chat["name"], content: string) {
  try {
    const chatLLM = await createChatLLM(chatName);
    let isLoading = true;

    const textStream: ReturnType<typeof createStreamableValue<string>> = createStreamableValue("");
    const { node, ...message } = createChatMessage({ role: "assistant", content: textStream.value, isLoading });

    const nodeStream = createStreamableUI(node);

    (async () => {
      try {
        await chatLLM.sendMessage(content, {
          onTextToken: async (textToken) => {
            if (textToken && isLoading) {
              isLoading = false;
              nodeStream.done(createChatMessage({ ...message, isLoading }).node);
            }
            textStream.update(textToken);
          },

          onToolCall: async (node) => {
            isLoading = false;
            nodeStream.done(createChatMessage({ ...message, isLoading, node }).node);
          },

          onError: async (error) => {
            isLoading = false;
            nodeStream.done(
              createChatMessage({
                ...message,
                isLoading,
                error:
                  typeof error === "object" && error && "message" in error && typeof error.message === "string"
                    ? error.message
                    : "UnknownError",
              }).node,
            );
          },
        });
      } catch (error) {
        console.error(error);
      }

      textStream.done();
    })();

    return { ...message, node: nodeStream.value };
  } catch (error) {
    return forwardActionError(error);
  }
}
