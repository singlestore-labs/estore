import { atom } from "jotai";

import { ChatConfig } from "@/chat/types";

export const chatConfigAtom = atom<ChatConfig>({
  name: "main",
  deleteUserLikesOnClear: false,
  deleteUserOrdersOnClear: false,
  affectedDataOnClear: [],
});
