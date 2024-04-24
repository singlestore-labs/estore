import { ChatMessageProductCard } from "@/chat/message/product/components/card";
import { ChatMessageProductListRecommended } from "@/chat/message/product/components/list-recommended";
import { Product } from "@/product/types";

export type ChatMessageProductControllerProps = { products: Product[] };

export function ChatMessageProductController({ products }: ChatMessageProductControllerProps) {
  if (products.length === 1) {
    return <ChatMessageProductCard product={products[0]} />;
  }

  return <ChatMessageProductListRecommended products={products} />;
}
