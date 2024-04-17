"use client";

import { useHydrateAtoms } from "jotai/utils";

export type StoreControllerProps = {};

export function StoreController({}: StoreControllerProps) {
  useHydrateAtoms([]);

  return null;
}
