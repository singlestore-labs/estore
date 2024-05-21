"use client";

import { createStore } from "jotai";
import { useHydrateAtoms } from "jotai/utils";

import { ProdcutLike } from "@/product/likes/types";
import { userProdcutLikesAtom } from "@/user/product/atoms/likes";

export type StoreHydrateProps = {
  store: ReturnType<typeof createStore>;
  userProductLikes: ProdcutLike[];
};

export function StoreHydrate({ store, userProductLikes }: StoreHydrateProps) {
  useHydrateAtoms([[userProdcutLikesAtom, userProductLikes]], { store });

  return null;
}
