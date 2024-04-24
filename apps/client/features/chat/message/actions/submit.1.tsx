"use server";

import { createStreamableUI, createStreamableValue } from "ai/rsc";

import { createChatAgent } from "@/chat/agent/lib/create";
import { CHAT_AGENT_TOOL_COMPONENTS } from "@/chat/agent/tool/components";
import { parseChatAgentToolOutput } from "@/chat/agent/tool/lib/parse-output";
import { createChatMessage } from "@/chat/message/lib/create";
import { ChatMessage } from "@/chat/message/types";

export async function submitChatMessage(content: ChatMessage["content"]): Promise<ChatMessage> {
  let isLoading = true;

  const chatAgent = await createChatAgent();
  const textStream: ReturnType<typeof createStreamableValue<string>> = createStreamableValue("");
  const { node, ...message } = createChatMessage({ role: "assistant", content: textStream.value, isLoading });
  const nodeStream = createStreamableUI(node);

  (async () => {
    try {
      await chatAgent.invoke(
        { input: content },
        {
          callbacks: [
            {
              handleToolEnd(output) {
                const _output = parseChatAgentToolOutput(output);
                const Component = CHAT_AGENT_TOOL_COMPONENTS[_output.name];
                if (Component) {
                  nodeStream.update(<Component {..._output.props}>{_output.props.text}</Component>);
                }
              },

              handleLLMNewToken(token) {
                if (token.length && isLoading) {
                  isLoading = false;
                  nodeStream.update(
                    createChatMessage({ ...message, isLoading, content: textStream.value }).node,
                  );
                }

                textStream.update(token);
              },
            },
          ],
        },
      );
    } catch (error: unknown) {
      console.error(error);
      const message = error instanceof Error ? error.message : "UnknownError";
      nodeStream.update(<p>Error: {message}</p>);
    } finally {
      textStream.done();
      nodeStream.done();
    }
  })();

  return { ...message, node: nodeStream.value };
}
