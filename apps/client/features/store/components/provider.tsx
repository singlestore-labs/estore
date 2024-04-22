import { Provider } from "jotai";
import { ReactNode } from "react";

import { getChatMessages } from "@/chat/message/lib/get-list";
import { StoreController } from "@/store/components/controller";
import { getUserProductLikes } from "@/user/product/lib/get-likes";

export type StoreProviderProps = {
  children: ReactNode;
};

export async function StoreProvider({ children }: StoreProviderProps) {
  const [messages, userProductLikes] = await Promise.all([getChatMessages(), getUserProductLikes()]);

  return (
    <Provider>
      <StoreController
        messages={messages}
        userProductLikes={userProductLikes}
      />
      {children}
    </Provider>
  );
}
