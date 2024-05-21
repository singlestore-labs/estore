import { ChatShortcut } from "@/chat/shortcut/types";

export const MAIN_CHAT_SHORTCUTS: ChatShortcut[] = [
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
  {
    title: "Random product sales",
    description: "Displays a chart of a product's sales history.",
    prompt: "Get a product sales chart",
  },
  {
    title: "The top product",
    description: "Displays the top product based on sales and likes.",
  },
];
