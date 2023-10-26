import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useTimeout } from "./use-timeout";
import {
  useSlideshowTheme,
  useFadeInClass,
  useFadeOutClass,
  useInvisibleClass,
} from "../theme";

type SlideshowMetaFadeHookResult = [
  string, // fadeClassName
  () => void, // onMouseOver
  () => void, // onMouseOut
];

export function useSlideshowMetaFade(
  metaFadeDurationMillis: number,
  rootElementRef?: RefObject<HTMLElement>
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

  const rootElement = rootElementRef?.current

  useEffect(() => {
    if (rootElement === null) {
      // Not yet initialized
      return;
    }

    const actualRootElement = rootElement ?? window;

    if (!actualRootElement.addEventListener || !actualRootElement.removeEventListener) {
      // Not supported
      return;
    }

    const actualDoFadeOut = doFadeOut;
    const actualDoClearTimeout = clearFadeOutTimeout;

    actualRootElement.addEventListener("mousemove", onMouseMove);
    actualRootElement.addEventListener("mouseleave", actualDoFadeOut);

    return () => {
      actualDoClearTimeout();
      actualRootElement.removeEventListener("mousemove", onMouseMove);
      actualRootElement.removeEventListener("mouseleave", actualDoFadeOut);
    };
  }, [onMouseMove, doFadeOut, clearFadeOutTimeout, rootElement]);

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
