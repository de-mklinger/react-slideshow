import { useCallback, useEffect, useRef, useState } from "react";
import { useTimeout } from "./use-timeout";

type SlideshowMetaFadeHookResult = [
  string, // fadeClassName
  () => void, // onMouseOver
  () => void // onMouseOut
];

export function useSlideshowMetaFade(
  metaFadeDurationMillis: number
): SlideshowMetaFadeHookResult {
  const [fadeOut, setFadeOut] = useState<boolean | null>(null);
  const mouseOverRef = useRef(false);

  const displayNoneCallback = useCallback(() => {
    setFadeOut((oldFadeOut) => (oldFadeOut === true ? null : oldFadeOut));
  }, []);

  const [startDisplayNoneTimeout, clearDisplayNoneTimeout] = useTimeout(
    displayNoneCallback,
    metaFadeDurationMillis + 10
  );

  const doFadeIn = useCallback(() => {
    clearDisplayNoneTimeout();
    setFadeOut(false);
  }, [clearDisplayNoneTimeout]);

  const doFadeOut = useCallback(() => {
    setFadeOut((oldFadeOut) => {
      if (oldFadeOut === false) {
        startDisplayNoneTimeout();
        return true;
      }

      return oldFadeOut;
    });
  }, [startDisplayNoneTimeout]);

  const [startFadeOutTimeout, clearFadeOutTimeout] = useTimeout(
    doFadeOut,
    2000
  );

  const onMouseMove = useCallback(() => {
    if (mouseOverRef.current) {
      return;
    }

    doFadeIn();

    startFadeOutTimeout();
  }, [doFadeIn, startFadeOutTimeout]);

  useEffect(() => {
    const actualDoFadeOut = doFadeOut;
    const actualDoClearTimeout = clearFadeOutTimeout;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", actualDoFadeOut);

    return () => {
      actualDoClearTimeout();
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", actualDoFadeOut);
    };
  }, [onMouseMove, doFadeOut, clearFadeOutTimeout]);

  const onMouseOver = useCallback(() => {
    mouseOverRef.current = true;
    clearFadeOutTimeout();
  }, [clearFadeOutTimeout]);

  const onMouseOut = useCallback(() => {
    mouseOverRef.current = false;
    startFadeOutTimeout();
  }, [startFadeOutTimeout]);

  let fadeClassName: string | undefined;
  if (fadeOut === true) {
    fadeClassName = "fade-out";
  } else if (fadeOut === false) {
    fadeClassName = "fade-in";
  } else if (!fadeOut) {
    fadeClassName = "invisible";
  } else {
    throw new Error();
  }

  return [fadeClassName, onMouseOver, onMouseOut];
}
