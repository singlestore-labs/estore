import { differenceInMilliseconds } from "date-fns/differenceInMilliseconds";
import { format } from "date-fns/format";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addLocale(en);

export function getRandomArrayItem<T extends any[]>(arr: T): T[number] {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getRandomDate(from: Date) {
  const min = from.getTime();
  const max = new Date().getTime();
  const randomTime = Math.random() * (max - min) + min;
  return new Date(randomTime);
}

export function toChunks<T>(array: T[], chunkSize: number): T[][] {
  const chunks = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }

  return chunks;
}

export function formatMs(milliseconds: number) {
  let formattedTime: string;
  let unit: string;

  function formatMilliseconds(milliseconds: number): string {
    return Math.floor((milliseconds % 1000) / 10)
      .toString()
      .padStart(2, "0");
  }

  function formatSeconds(seconds: number): string {
    return seconds.toString().padStart(2, "0");
  }

  if (milliseconds < 1000) {
    formattedTime = milliseconds.toString();
    unit = "ms";
  } else if (milliseconds < 60000) {
    const seconds = Math.floor(milliseconds / 1000);
    const ms = formatMilliseconds(milliseconds);
    formattedTime = `${seconds}.${ms}`;
    unit = "s";
  } else {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = formatSeconds(Math.floor((milliseconds % 60000) / 1000));
    formattedTime = `${minutes}.${seconds}`;
    unit = "m";
  }

  return [formattedTime, unit] as const;
}

export async function withDuration<T extends (...args: any[]) => Promise<any>>(callback: T) {
  const startTime = performance.now();
  const result = await callback();
  const endTime = performance.now();
  const ms = Math.abs(differenceInMilliseconds(startTime, endTime));
  return [result, ms, ...formatMs(ms)] satisfies [Awaited<ReturnType<T>>, number, string, string];
}

export function formatDate(date: Date) {
  return format(date, "yyyy-MM-dd HH:mm:ss");
}

export function timeAgo(date: Date) {
  return new TimeAgo("en-US").format(date, "round");
}
