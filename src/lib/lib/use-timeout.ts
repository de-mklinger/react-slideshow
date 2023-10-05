import { useCallback, useEffect, useRef } from "react";

type Timeout = ReturnType<typeof setTimeout>;

export function useTimeout(callback: () => void, delay: number) {
  const savedCallback = useRef(callback);
  const savedId = useRef<Timeout>();

  const doClear = useCallback(() => {
    if (savedId.current) {
      clearTimeout(savedId.current);
      savedId.current = undefined;
    }
  }, []);

  const doStart = useCallback(() => {
    doClear();
    savedId.current = setTimeout(() => {
      savedCallback.current();
    }, delay);
  }, [doClear, delay]);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
    return () => {
      doClear();
    };
  }, [doClear, callback]);

  return [doStart, doClear];
}
