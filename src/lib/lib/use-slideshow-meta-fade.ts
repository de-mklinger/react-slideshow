import { useCallback, useEffect, useRef, useState } from "react";
import { useTimeout } from "./use-timeout";
import {
  useFadeInClass,
  useFadeOutClass,
  useInvisibleClass,
} from "../theme/use-slideshow-classes.ts";
import {useSlideshowTheme} from "../theme/use-slideshow-theme.ts";

type SlideshowMetaFadeHookResult = [
  string, // fadeClassName
  () => void, // onMouseOver
  () => void, // onMouseOut
];

export function useSlideshowMetaFade(
  metaFadeDurationMillis: number,
): SlideshowMetaFadeHookResult {
  const [fadeOut, setFadeOut] = useState<boolean | null>(null);
  const mouseOverRef = useRef(false);

  const theme = useSlideshowTheme();

  const displayNoneCallback = useCallback(() => {
    setFadeOut((oldFadeOut) => (oldFadeOut === true ? null : oldFadeOut));
  }, []);

  const [startDisplayNoneTimeout, clearDisplayNoneTimeout] = useTimeout(
    displayNoneCallback,
    metaFadeDurationMillis + 10,
  );

  let doFadeIn = useCallback(() => {
    clearDisplayNoneTimeout();
    setFadeOut(false);
  }, [clearDisplayNoneTimeout]);

  let doFadeOut = useCallback(() => {
    setFadeOut((oldFadeOut) => {
      if (oldFadeOut === false) {
        startDisplayNoneTimeout();
        return true;
      }

      return oldFadeOut;
    });
  }, [startDisplayNoneTimeout]);

  if (!theme.meta.hideEnabled) {
    doFadeIn = () => {};
    doFadeOut = () => {};
  }

  const [startFadeOutTimeout, clearFadeOutTimeout] = useTimeout(
    doFadeOut,
    theme.meta.hideDelayMillis,
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

    // TODO should bind listeners on slideshow screen

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

  const fadeOutClass = useFadeOutClass();
  const fadeInClass = useFadeInClass();
  const invisibleClass = useInvisibleClass();

  let fadeClassName: string | undefined;
  if (fadeOut === true) {
    fadeClassName = fadeOutClass;
  } else if (fadeOut === false || !theme.meta.hideEnabled) {
    fadeClassName = fadeInClass;
  } else if (!fadeOut) {
    fadeClassName = invisibleClass;
  } else {
    throw new Error();
  }

  return [fadeClassName, onMouseOver, onMouseOut];
}
