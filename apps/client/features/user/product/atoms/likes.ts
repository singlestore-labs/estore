import { atom } from "jotai";

import { ProdcutLike } from "@/product/likes/types";

export const userProdcutLikesAtom = atom<ProdcutLike[]>([]);
