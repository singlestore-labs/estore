import { ActionError } from "@/action/error/types";

export function isActionError(value: unknown): value is ActionError {
  return typeof value === "object" && value !== null && "error" in value;
}
