"use server";

import { db } from "@repo/db";
import { USERS_TABLE_NAME } from "@repo/db/constants";
import { normalizeDate } from "@repo/helpers";

import { User } from "@/user/types";

export async function createUser<T extends User = User>(user?: Partial<T>): Promise<User> {
  const created_at = normalizeDate(new Date());
  return (await db.controllers.insertOne({
    collection: USERS_TABLE_NAME,
    value: { created_at, ...user },
  })) as User;
}
