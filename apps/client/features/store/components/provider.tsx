import { Provider } from "jotai";
import { ReactNode } from "react";

import { StoreController } from "@/store/components/controller";
import { getUserProductLikes } from "@/user/product/lib/get-likes";

export type StoreProviderProps = {
  children: ReactNode;
};

export async function StoreProvider({ children }: StoreProviderProps) {
  const [userProductLikes] = await Promise.all([getUserProductLikes()]);

  return (
    <Provider>
      <StoreController userProductLikes={userProductLikes} />
      {children}
    </Provider>
  );
}
