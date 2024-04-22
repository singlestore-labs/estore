import { Provider } from "jotai";
import { ReactNode } from "react";

import { getChatMessages } from "@/chat/message/lib/get-list";
import { StoreController } from "@/store/components/controller";

export type StoreProviderProps = {
  children: ReactNode;
};

export async function StoreProvider({ children }: StoreProviderProps) {
  const [messages] = await Promise.all([getChatMessages()]);

  return (
    <Provider>
      <StoreController messages={messages} />
      {children}
    </Provider>
  );
}
