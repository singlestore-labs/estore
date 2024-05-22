import { db } from "@repo/db";
import { CHATS_TABLE_NAME } from "@repo/db/constants";

import { Chat } from "@/chat/types";

export function getChatByName(name: Chat["name"]) {
  return db.controllers.findOne<Chat>({ collection: CHATS_TABLE_NAME, where: `name = '${name}'` });
}
