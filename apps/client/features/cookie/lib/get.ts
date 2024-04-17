import Cookies from "js-cookie";

export async function getCookie(key: string) {
  if (!globalThis.window) {
    return (await import("next/headers")).cookies().get(key)?.value;
  }

  return Cookies.get(key);
}
