import { ElementType } from "react";

import { CHAT_AGENT_TOOLS } from "@/chat/agent/tool/constants";
import { ChatMessageProductCard } from "@/chat/message/product/components/card";
import { ChatMessageProductController } from "@/chat/message/product/components/controller";
import { ChatMessageProdcutSalesChart } from "@/chat/message/product/components/sales-chart";

export const CHAT_AGENT_TOOL_COMPONENTS: Record<string, ElementType> = {
  [CHAT_AGENT_TOOLS.find_products]: ChatMessageProductController,
  [CHAT_AGENT_TOOLS.recommend_products]: ChatMessageProductController,
  [CHAT_AGENT_TOOLS.product_sales]: ChatMessageProdcutSalesChart,
  [CHAT_AGENT_TOOLS.top_product]: ChatMessageProductCard,
};
