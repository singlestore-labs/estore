import { ChatMessageProduct404 } from "@/chat/message/product/components/404";
import { ChatMessageProductCard } from "@/chat/message/product/components/card";
import { ChatMessageProductCarousel } from "@/chat/message/product/components/carousel";
import { Product } from "@/product/types";

export type ChatMessageProductControllerProps = { products: Product[] };

export async function ChatMessageProductController({ products = [] }: ChatMessageProductControllerProps) {
  if (!products.length) return <ChatMessageProduct404 />;

  if (products.length === 1) {
    return <ChatMessageProductCard product={products[0]} />;
  }

  return <ChatMessageProductCarousel products={products} />;
}
