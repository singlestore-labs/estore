export function toChunks<T>(array: T[], chunkSize: number): T[][] {
  const chunks = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }

  return chunks;
}

export function getRandomArrayItem<T extends any[]>(arr: T): T[number] {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getRandomDate(from: Date) {
  const min = from.getTime();
  const max = new Date().getTime();
  const randomTime = Math.random() * (max - min) + min;
  return new Date(randomTime);
}

export function normalizeDate(date: Date) {
  return date.toISOString().slice(0, 19).replace("T", " ");
}
