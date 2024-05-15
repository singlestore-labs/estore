import { QueryResult } from "@/query/types";

export function parseQueryResult<T>(result: QueryResult<T>) {
  let _result: T[];

  if (Array.isArray(result)) {
    _result = (Array.isArray(result[1]) ? result[1] : result) as T[];
  } else {
    throw new Error("Invalid query result");
  }

  if (typeof _result[0] === "object" && _result[0]) {
    const dateKeys = Object.keys(_result[0]).filter(
      (key) => _result[0][key as keyof (typeof _result)[0]] instanceof Date,
    );

    if (dateKeys.length) {
      _result = _result.map((i) => {
        return {
          ...i,
          ...dateKeys.reduce((acc, key) => {
            const date = i[key as keyof typeof i] as Date;
            return { ...acc, [key]: new Date(date).toLocaleDateString("en-US", { hour12: false }) };
          }, {}),
        };
      });
    }
  }

  return _result;
}
