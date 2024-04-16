import { MutableRefObject, useEffect } from "react";

export function useSetScrollbarWidth<T extends HTMLElement>(ref: MutableRefObject<T | null>) {
  useEffect(() => {
    if (ref.current) {
      const width = ref.current.offsetWidth - ref.current.clientWidth;
      document.documentElement.style.setProperty("--app-scrollbar-width", `${width}px`);
    }
  }, [ref]);
}
