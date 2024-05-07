"use server";

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function sleep(delay = getRandomInt(100, 5000)) {
  await new Promise((res) => setTimeout(() => res(true), delay));
  return true;
}
