import { Provider } from "jotai";
import { ReactNode } from "react";

import { StoreController } from "@/store/components/controller";

export type StoreProviderProps = {
  children: ReactNode;
};

export async function StoreProvider({ children }: StoreProviderProps) {
  const [] = await Promise.all([]);

  return (
    <Provider>
      <StoreController />
      {children}
    </Provider>
  );
}
