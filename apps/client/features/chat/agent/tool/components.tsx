import { ElementType } from "react";

import { CHAT_AGENT_TOOLS } from "@/chat/agent/tool/constants";
import { ChatMessageProductCard } from "@/chat/message/product/components/card";
import { ChatMessageProductController } from "@/chat/message/product/components/controller";
import { ProductSalesChart } from "@/product/sales/components/chart";

export const CHAT_AGENT_TOOL_COMPONENTS: Record<string, ElementType> = {
  [CHAT_AGENT_TOOLS.find_products]: ChatMessageProductController,
  [CHAT_AGENT_TOOLS.product_sales]: ProductSalesChart,
  [CHAT_AGENT_TOOLS.top_product]: ChatMessageProductCard,
};
