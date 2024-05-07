import { useCallback, useState, useTransition } from "react";

import { handleActionError } from "@/action/error/lib/handle";
import { isActionError } from "@/action/error/lib/is";
import { ActionError } from "@/action/error/types";

export function useAction(initialIsPending = false) {
  const [isPending, setIsPending] = useState(initialIsPending);
  const [error, setError] = useState<ActionError["error"] | undefined>();
  const [, startTransition] = useTransition();

  const execute = useCallback(<T extends (...args: any[]) => Promise<any>>(action: T) => {
    setError(undefined);

    return new Promise<Exclude<Awaited<ReturnType<T>>, ActionError>>((resolve, reject) => {
      setIsPending(true);

      startTransition(async () => {
        const result = await action();

        if (isActionError(result)) {
          setError(result.error);
          reject(result.error);
          handleActionError(result.error);
        }

        setIsPending(false);
        resolve(result);
      });
    });
  }, []);

  return {
    error,
    isPending,
    setError,
    execute,
  };
}
