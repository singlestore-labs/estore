import { Provider } from "jotai";
import { ReactNode } from "react";

import { ChatStoreHydrate, ChatStoreHydrateProps } from "@/chat/store/components/hydrate";

export type ChatStoreProviderProps = {
  children: ReactNode;
} & ChatStoreHydrateProps;

export function ChatStoreProvider({ children, ...props }: ChatStoreProviderProps) {
  return (
    <Provider>
      <ChatStoreHydrate {...props}>{children}</ChatStoreHydrate>
    </Provider>
  );
}
