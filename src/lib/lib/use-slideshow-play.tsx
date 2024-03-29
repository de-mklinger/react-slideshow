import { useEffect, useRef } from "react";

type UseSlideshowPlayResult = {
  resetPlay: () => void;
};

type Timeout = ReturnType<typeof setInterval>;

export function useSlideshowPlay(
  play: boolean,
  next: () => void,
  timeout: number,
): UseSlideshowPlayResult {
  const nextRef = useRef<() => void | undefined>();
  nextRef.current = next;
  const playIntervalIdRef = useRef<Timeout>();
  const resetFnRef = useRef<() => void>(() => {});

  useEffect(() => {
    const doClearInterval = () => {
      if (playIntervalIdRef.current) {
        clearInterval(playIntervalIdRef.current);
        playIntervalIdRef.current = undefined;
      }
    };

    if (play) {
      const doSetInterval = () => {
        playIntervalIdRef.current = setInterval(() => {
          if (typeof nextRef.current === "function") {
            nextRef.current();
          }
        }, timeout);
      };

      doSetInterval();

      resetFnRef.current = () => {
        doClearInterval();
        doSetInterval();
      };
    } else {
      doClearInterval();

      resetFnRef.current = () => {};
    }

    return doClearInterval;
  }, [play, timeout]);

  return {
    resetPlay() {
      resetFnRef.current();
    },
  };
}
