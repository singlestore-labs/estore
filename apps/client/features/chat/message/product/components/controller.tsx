import { ChatMessageProductCard } from "@/chat/message/product/components/card";
import { ChatMessageProductListRecommended } from "@/chat/message/product/components/list-recommended";
import { getProductByIDs } from "@/product/lib/get-many-by-ids";
import { Product } from "@/product/types";

export type ChatMessageProductControllerProps = { products: Product[] } | { productIDs: Product["id"][] };

export async function ChatMessageProductController(props: ChatMessageProductControllerProps) {
  let _products: Product[] = [];

  if ("products" in props) {
    _products = props.products;
  } else if ("productIDs" in props) {
    _products = await getProductByIDs(props.productIDs);
  }

  if (_products.length === 1) {
    return <ChatMessageProductCard product={_products[0]} />;
  }

  return <ChatMessageProductListRecommended products={_products} />;
}
