import { MutableRefObject, useEffect, useState } from "react";

export function useScrollbarWidth<T extends HTMLElement>(ref: MutableRefObject<T | null>) {
  const [width, setWidth] = useState(15);

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth - ref.current.clientWidth);
    }
  }, [ref]);

  return width;
}
