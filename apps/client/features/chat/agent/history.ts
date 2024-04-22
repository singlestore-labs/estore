import {
  BaseMessage,
  mapChatMessagesToStoredMessages,
  mapStoredMessagesToChatMessages,
} from "@langchain/core/messages";
import { db } from "@repo/db";
import { CHAT_MESSAGES_TABLE_NAME } from "@repo/db/constants";
import { normalizeDate } from "@repo/helpers";
import { ChatMessageHistory } from "langchain/memory";
import { nanoid } from "nanoid";

export class ChatAgentHistory extends ChatMessageHistory {
  tableName;
  userId;

  constructor({ tableName = CHAT_MESSAGES_TABLE_NAME, userId }: { tableName?: string; userId: number }) {
    super();
    this.tableName = tableName;
    this.userId = userId;
  }

  async getMessages(): Promise<BaseMessage[]> {
    const messages = (
      await db.controllers.findMany({
        collection: this.tableName,
        where: `userId = ${this.userId}`,
        extra: "ORDER BY createdAt ASC",
      })
    ).map(({ message }) => message);

    return mapStoredMessagesToChatMessages(messages);
  }

  async addMessage(message: BaseMessage): Promise<void> {
    const createdAt = new Date().getTime();
    message.additional_kwargs = { id: nanoid(), createdAt };

    const value = mapChatMessagesToStoredMessages([message]).map((message) => ({
      createdAt,
      userId: this.userId,
      message: JSON.stringify(message),
    }));

    await db.controllers.insertOne({ collection: this.tableName, value });
  }

  async addMessages(messages: BaseMessage[]): Promise<void> {
    const createdAt = new Date().getTime();

    messages.forEach((message) => {
      message.additional_kwargs = { id: nanoid(), createdAt };
    });

    const values = mapChatMessagesToStoredMessages(messages).map((message) => ({
      createdAt,
      userId: this.userId,
      message: JSON.stringify(message),
    }));

    await db.controllers.insertMany({ collection: this.tableName, values });
  }

  async clear(): Promise<void> {
    await db.controllers.deleteMany({ collection: this.tableName, where: `userId = ${this.userId}` });
  }
}
