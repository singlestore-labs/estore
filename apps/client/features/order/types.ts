import { OrderRow } from "@repo/db/types";

export type Order = Omit<OrderRow, "id" | "groupId">;
