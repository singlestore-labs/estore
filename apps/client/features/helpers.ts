export function sleep(delay: number = 2000) {
  return new Promise((res) => setTimeout(() => res(true), delay));
}
