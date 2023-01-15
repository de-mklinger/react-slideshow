import { useCallback, useEffect, useRef } from "react";

export function useTimeout(callback: () => void, delay: number) {
  const savedCallback = useRef(callback);
  const savedId = useRef<any>(null);

  const doClear = useCallback(() => {
    if (savedId.current !== null) {
      clearTimeout(savedId.current);
      savedId.current = null;
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
