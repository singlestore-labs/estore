import { ChatShortcut } from "@/chat/shortcut/types";
import { Chat } from "@/chat/types";

export const CHAT_SHORTCUTS: Record<Chat["name"], ChatShortcut[]> = {
  main: [
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
  ],
  dashboard: [
    {
      title: "Orders summary",
      description: "Provides a summary of orders",
      prompt: "Give me a summary of orders for the last month.",
    },
  ],
};
