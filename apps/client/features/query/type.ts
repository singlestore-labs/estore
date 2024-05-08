export type Query<T extends (...args: any[]) => string = (...args: any[]) => string> = {
  title: string;
  description: string;
  getQuery: T;
};
