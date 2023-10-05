import { type MutableRefObject, useEffect, useRef } from "react";

export function useHoverEffect<ElementType extends HTMLElement>(
  onMouseOver: () => void,
  onMouseOut: () => void,
): MutableRefObject<ElementType | null> {
  const barRef = useRef<ElementType>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) {
      return;
    }

    const actualOnMouseOver = onMouseOver;
    const actualOnMouseOut = onMouseOut;

    bar.addEventListener("mouseover", actualOnMouseOver);
    bar.addEventListener("mouseout", actualOnMouseOut);

    return () => {
      bar.removeEventListener("mouseover", actualOnMouseOver);
      bar.removeEventListener("mouseout", actualOnMouseOut);
    };
  }, [onMouseOver, onMouseOut]);

  return barRef;
}
