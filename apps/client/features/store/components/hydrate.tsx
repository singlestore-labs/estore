import { createStore } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { ReactNode } from "react";

import { ProdcutLike } from "@/product/likes/types";
import { userProdcutLikesAtom } from "@/user/product/atoms/likes";

export type StoreHydrateProps = {
  children?: ReactNode;
  store: ReturnType<typeof createStore>;
  userProductLikes: ProdcutLike[];
};

export function StoreHydrate({ children, store, userProductLikes }: StoreHydrateProps) {
  useHydrateAtoms([[userProdcutLikesAtom, userProductLikes]], { store });

  return children;
}
