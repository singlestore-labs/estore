import Cookies from "js-cookie";

export async function deleteCookie(key: string) {
  if (!globalThis.window) {
    return (await import("next/headers")).cookies().delete(key);
  }

  return Cookies.remove(key);
}
