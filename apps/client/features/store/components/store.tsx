import { ReactNode } from "react";

import { getChatMessages } from "@/chat/message/lib/get-list";
import { StoreProvider } from "@/store/components/provider";
import { getUserProductLikes } from "@/user/product/lib/get-likes";

export type StoreProps = { children?: ReactNode };

export async function Store({ children }: StoreProps) {
  const [mainChatMessages, dashboardChatMessages, userProductLikes] = await Promise.all([
    getChatMessages("main"),
    getChatMessages("dashboard"),
    getUserProductLikes(),
  ]);

  return (
    <StoreProvider
      chatMessages={{ main: mainChatMessages, dashboard: dashboardChatMessages }}
      userProductLikes={userProductLikes}
    >
      {children}
    </StoreProvider>
  );
}
