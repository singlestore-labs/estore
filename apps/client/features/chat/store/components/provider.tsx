import { Provider } from "jotai";
import { ReactNode } from "react";

import { ChatStoreController, ChatStoreControllerProps } from "@/chat/store/components/controller";

export type ChatStoreProviderProps = {
  children: ReactNode;
} & ChatStoreControllerProps;

export async function ChatStoreProvider({ children, ...props }: ChatStoreProviderProps) {
  return (
    <Provider>
      <ChatStoreController {...props} />
      {children}
    </Provider>
  );
}
