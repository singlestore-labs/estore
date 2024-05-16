import { formatDate } from "@repo/helpers/index";

export function serializeDate(date: Date) {
  return formatDate(date);
}
