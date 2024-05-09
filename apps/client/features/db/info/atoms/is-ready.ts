import { atom } from "jotai";

export const isDbInfoReadyAtom = atom<boolean>(false);

export const isDbInfoReadyValue = atom<boolean>((get) => get(isDbInfoReadyAtom));
