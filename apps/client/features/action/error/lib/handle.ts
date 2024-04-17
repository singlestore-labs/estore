import { toast } from "sonner";

import { ActionError } from "@/action/error/types";

export function handleActionError(error: ActionError["error"]) {
  toast.error(error.message || error.name || "Unknown error");
}
