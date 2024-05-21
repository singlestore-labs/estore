"use client";

import { useHydrateAtoms } from "jotai/utils";

import { ProdcutLike } from "@/product/likes/types";
import { userProdcutLikesAtom } from "@/user/product/atoms/likes";

export type StoreControllerProps = {
  userProductLikes: ProdcutLike[];
};

export function StoreController({ userProductLikes }: StoreControllerProps) {
  useHydrateAtoms([[userProdcutLikesAtom, userProductLikes]]);

  return null;
}
