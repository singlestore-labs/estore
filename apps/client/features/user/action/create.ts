"use server";

import { db } from "@repo/db";
import { USERS_TABLE_NAME } from "@repo/db/constants";
import { serializeDate } from "@repo/db/lib/serialize-date";

import { User } from "@/user/types";

export async function createUser<T extends User = User>(user?: Partial<T>): Promise<User> {
  const created_at = serializeDate(new Date());
  return (await db.controllers.insertOne({
    collection: USERS_TABLE_NAME,
    value: { created_at, ...user },
  })) as User;
}
