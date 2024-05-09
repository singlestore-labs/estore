import { QUERY_SLUGS } from "@/query/constants/slugs";

export type QuerySlugs = (typeof QUERY_SLUGS)[keyof typeof QUERY_SLUGS];

export type Query<T extends (...args: any[]) => string = (...args: any[]) => string> = {
  slug: QuerySlugs;
  title: string;
  description: string;
  getQuery: T;
};

export type QueryResult<T extends any = any> = [object, T[]] | T[];
