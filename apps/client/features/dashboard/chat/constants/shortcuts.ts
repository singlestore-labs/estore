import { ChatShortcut } from "@/chat/shortcut/types";

export const DASHBOARD_CHAT_SHORTCUTS: ChatShortcut[] = [
  {
    title: "Random products",
    description: "Displays random products.",
    prompt: "Find 5 random products",
  },
  {
    title: "Recommended products",
    description: "Displays reccomended products based on your preferences.",
    prompt: "Recommend 5 products",
  },
];
