import { ActionError } from "@/action/error/types";
import { IS_DEV } from "@/constants/config";

export function forwardActionError(error: unknown): ActionError {
  if (IS_DEV) console.error(error);

  let _error: ActionError["error"] = { name: "UnknownError" };

  if (error instanceof Error) {
    _error = {
      name: error.name,
      message: error.message,
      cause: error.cause,
      stack: error.stack,
    };
  }

  return { error: _error };
}
