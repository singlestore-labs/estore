import { ChatMessageProduct404 } from "@/chat/message/product/components/404";
import { ChatMessageProductCard } from "@/chat/message/product/components/card";
import { ChatMessageProductListRecommended } from "@/chat/message/product/components/list-recommended";
import { getProductByIds } from "@/product/lib/get-by-ids";
import { Product } from "@/product/types";

export type ChatMessageProductControllerProps = { products: Product[] } | { productIds: Product["id"][] };

export async function ChatMessageProductController(props: ChatMessageProductControllerProps) {
  let products: Product[] = [];

  if ("products" in props) {
    products = props.products;
  } else if ("productIds" in props) {
    products = await getProductByIds(props.productIds);
  }

  if (!products.length) return <ChatMessageProduct404 />;

  if (products.length === 1) {
    return <ChatMessageProductCard product={products[0]} />;
  }

  return <ChatMessageProductListRecommended products={products} />;
}
