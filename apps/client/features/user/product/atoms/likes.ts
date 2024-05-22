import { atom } from "jotai";

import { ProdcutLike } from "@/product/likes/types";

export type UserProductLikesAtomValue = ProdcutLike[];

export const userProdcutLikesAtom = atom<UserProductLikesAtomValue>([]);
