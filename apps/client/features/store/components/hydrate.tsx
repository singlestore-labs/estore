"use client";

import { useHydrateAtoms } from "jotai/utils";

import { ProdcutLike } from "@/product/likes/types";
import { userProdcutLikesAtom } from "@/user/product/atoms/likes";

export type StoreHydrateProps = {
  userProductLikes: ProdcutLike[];
};

export function StoreHydrate({ userProductLikes }: StoreHydrateProps) {
  useHydrateAtoms([[userProdcutLikesAtom, userProductLikes]]);

  return null;
}
