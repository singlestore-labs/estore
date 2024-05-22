import { RefObject, useEffect, useRef } from "react";

export function useResizeObserver(ref: RefObject<any>, callback: (...args: any[]) => void) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    const observer = new ResizeObserver(callbackRef.current);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
}
