import { atom } from "jotai";

import { createChatMessage } from "@/chat/message/lib/create";
import { ChatMessage } from "@/chat/message/types";
import { ProductCard } from "@/product/components/card";
import { ProductsCarousel } from "@/products/components/carousel";

export const chatMessagesAtom = atom<ChatMessage[]>([
  createChatMessage({
    role: "function",
    node: (
      <ProductsCarousel
        products={[
          {
            id: "1",
            description: "Air Vapormax 2019 CPFM sneakers",
            price: 992,
            image: "https://cdn-images.farfetch-contents.com/14/11/79/76/14117976_18684183_300.jpg",
          },
          {
            id: "2",
            description: "Air Vapormax 2019 CPFM sneakers",
            price: 992,
            image: "https://cdn-images.farfetch-contents.com/14/11/79/76/14117976_18684183_300.jpg",
          },
          {
            id: "3",
            description: "Air Vapormax 2019 CPFM sneakers",
            price: 992,
            image: "https://cdn-images.farfetch-contents.com/14/11/79/76/14117976_18684183_300.jpg",
          },
          {
            id: "4",
            description: "Air Vapormax 2019 CPFM sneakers",
            price: 992,
            image: "https://cdn-images.farfetch-contents.com/14/11/79/76/14117976_18684183_300.jpg",
          },
          {
            id: "5",
            description: "Air Vapormax 2019 CPFM sneakers",
            price: 992,
            image: "https://cdn-images.farfetch-contents.com/14/11/79/76/14117976_18684183_300.jpg",
          },
        ]}
      />
    ),
  }),

  createChatMessage({
    role: "function",
    node: (
      <ProductCard
        id="1"
        description="Air Vapormax 2019 CPFM sneakers"
        price={992}
        image="https://cdn-images.farfetch-contents.com/14/11/79/76/14117976_18684183_300.jpg"
      />
    ),
  }),
]);

export const hasMessagesAtom = atom<boolean>((get) => !!get(chatMessagesAtom).length);
