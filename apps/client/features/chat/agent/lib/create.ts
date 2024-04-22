import { BaseMessage, AIMessage } from "@langchain/core/messages";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import { BufferMemory } from "langchain/memory";

import { ChatAgentHistory } from "@/chat/agent/history";
import { createChatAgentToolList } from "@/chat/agent/tool/lib/create-list";
import { createChatMessage } from "@/chat/message/lib/create";
import { ChatMessage } from "@/chat/message/types";
import { OPENAI_API_KEY } from "@/constants/env";
import { getUserId } from "@/user/lib/get-id";

export async function createChatAgent() {
  const userId = await getUserId();
  if (!userId) throw new Error("userId is undefined");

  const llm = new ChatOpenAI({ openAIApiKey: OPENAI_API_KEY, modelName: "gpt-3.5-turbo", temperature: 0 });

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful assistant."],
    new MessagesPlaceholder("history"),
    ["human", "{input}"],
    new MessagesPlaceholder("agent_scratchpad"),
  ]);

  const tools = createChatAgentToolList();

  const chatHistory = new ChatAgentHistory({ userId });

  const memory = new BufferMemory({
    chatHistory,
    inputKey: "input",
    outputKey: "output",
    memoryKey: "history",
    returnMessages: true,
  });

  const executor = new AgentExecutor({
    agent: await createOpenAIFunctionsAgent({ llm, prompt, tools }),
    tools,
    memory,
  });

  async function getMessages(...args: Parameters<typeof chatHistory.getMessages>): Promise<ChatMessage[]> {
    const messages = await chatHistory.getMessages(...args);
    return Promise.all(messages.map(normalizeBaseMessage));
  }

  return Object.assign(executor, { chatHistory, getMessages });
}

async function normalizeBaseMessage(message: BaseMessage): Promise<ChatMessage> {
  let node: ChatMessage["node"];

  // if (typeof message.content === "string") {
  //   try {
  //     const output = parseChatAgentToolOutput(message.content);
  //     const component = chatSessionAgentToolComponents[output.name];
  //     if (component) node = component({ ...output.props, children: output.props.text });
  //   } catch (error) {}
  // }

  return createChatMessage({
    id: message.additional_kwargs.id as string,
    createdAt: new Date(message.additional_kwargs.createdAt as number),
    role: message instanceof AIMessage ? "assistant" : "user",
    content: message.content.toString(),
    node,
  });
}
