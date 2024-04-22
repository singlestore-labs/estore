import { USER_ID_COOKIE_KEY } from "@/cookie/constants";
import { getCookie } from "@/cookie/lib/get";

export async function getUserId() {
  const cookieValue = await getCookie(USER_ID_COOKIE_KEY);
  return cookieValue ? +cookieValue : undefined;
}
