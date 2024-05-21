import { Provider } from "jotai";
import { ReactNode } from "react";

import { ComponentProps } from "@/types";
import { StoreHydrate } from "@/store/components/hydrate";
import { getUserProductLikes } from "@/user/product/lib/get-likes";

export type StoreProviderProps = ComponentProps<{ children?: ReactNode }>;

export async function StoreProvider({ children }: StoreProviderProps) {
  const [userProductLikes] = await Promise.all([getUserProductLikes()]);

  return (
    <Provider>
      <StoreHydrate userProductLikes={userProductLikes} />
      {children}
    </Provider>
  );
}
