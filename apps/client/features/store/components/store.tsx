import { ReactNode } from "react";

import { StoreProvider } from "@/store/components/provider";
import { getUserProductLikes } from "@/user/product/lib/get-likes";

export type StoreProps = { children?: ReactNode };

export async function Store({ children }: StoreProps) {
  const [userProductLikes] = await Promise.all([getUserProductLikes()]);

  return <StoreProvider userProductLikes={userProductLikes}>{children}</StoreProvider>;
}
