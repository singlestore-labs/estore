import Cookies from "js-cookie";

export async function setCookie(key: string, value: string) {
  if (!globalThis.window) {
    return (await import("next/headers")).cookies().set({
      name: key,
      value,
      path: "/",
    });
  }

  return Cookies.set(key, value, { path: "/" });
}
