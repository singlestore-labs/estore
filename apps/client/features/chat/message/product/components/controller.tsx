import { ChatMessageProductCard, ChatMessageProductCardProps } from "@/chat/message/product/components/card";
import {
  ChatMessageProductListRecommended,
  ChatMessageProductListRecommendedProps,
} from "@/chat/message/product/components/list-recommended";

export type ChatMessageProductControllerProps =
  | ChatMessageProductListRecommendedProps
  | ChatMessageProductCardProps;

export function ChatMessageProductController({ className, ...props }: ChatMessageProductControllerProps) {
  if ("product" in props) {
    return <ChatMessageProductCard {...props} />;
  } else if ("products" in props) {
    if (props.products.length === 1) {
      const { products, ..._props } = props;
      return (
        <ChatMessageProductCard
          {..._props}
          product={products[0]}
        />
      );
    }

    return <ChatMessageProductListRecommended {...props} />;
  }

  return null;
}
