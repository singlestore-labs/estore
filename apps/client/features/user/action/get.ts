"use server";

import { db } from "@repo/db";
import { USERS_TABLE_NAME } from "@repo/db/constants";

import { USER_ID_COOKIE_KEY } from "@/cookie/constants";
import { getCookie } from "@/cookie/lib/get";
import { setCookie } from "@/cookie/lib/set";
import { createUser } from "@/user/action/create";
import { User } from "@/user/types";

export async function getUser(id?: User["id"]): Promise<User> {
  const cookieId = await getCookie(USER_ID_COOKIE_KEY);
  const _id = id || (cookieId ? +cookieId : undefined);
  let user: User;

  if (!_id) {
    user = await createUser();
    await setCookie(USER_ID_COOKIE_KEY, user.id.toString());
  } else {
    user = await db.controllers.findOne({ collection: USERS_TABLE_NAME, where: `id = ${_id}` });
  }

  return user;
}
