import { atom } from "jotai";

import { ChatName } from "@/chat/types";

export const chatNameAtom = atom<ChatName>("main");
