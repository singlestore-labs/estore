"use client";

import { useEffect } from "react";

import { useAction } from "@/action/hooks/use-action";
import { getUser } from "@/user/action/get";

export function UserController() {
  const { execute } = useAction();

  useEffect(() => {
    (async () => {
      await execute(getUser);
    })();
  }, [execute]);

  return null;
}
