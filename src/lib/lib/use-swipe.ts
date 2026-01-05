import { TouchEventHandler, TouchEvent, useRef, useMemo } from "react";

export type UseSwipeOptions = {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  disabled?: boolean;
};

export type UseSwipeResult = {
  onTouchStart: TouchEventHandler;
  onTouchMove: TouchEventHandler;
  onTouchEnd: TouchEventHandler;
};

type ClientCoords = { x: number; y: number };

export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 64,
  disabled = false,
}: UseSwipeOptions): UseSwipeResult {
  const touchStart = useRef<ClientCoords>();
  const touchEnd = useRef<ClientCoords>();

  return useMemo(() => {
    if (disabled) {
      return {
        onTouchStart: () => {},
        onTouchMove: () => {},
        onTouchEnd: () => {},
      }
    }

    const onTouchStart: TouchEventHandler = (e) => {
      touchStart.current = getClientCoords(e);
    };

    const onTouchMove: TouchEventHandler = (e) => {
      touchEnd.current = getClientCoords(e);
    };

    const onTouchEnd: TouchEventHandler = () => {
      if (!touchStart.current || !touchEnd.current) {
        return;
      }

      const diffX = touchEnd.current.x - touchStart.current.x;
      const diffY = touchEnd.current.y - touchStart.current.y;

      touchStart.current = undefined;
      touchEnd.current = undefined;

      if (diffX < -threshold) {
        onSwipeLeft?.();
      } else if (diffX > threshold) {
        onSwipeRight?.();
      }

      if (diffY < -threshold) {
        onSwipeUp?.();
      } else if (diffY > threshold) {
        onSwipeDown?.();
      }
    };

    return {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    };
  }, [
    disabled,
    touchStart,
    touchEnd,
    threshold,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
  ]);
}

function getClientCoords(e: TouchEvent): ClientCoords {
  return {
    x: e.targetTouches[0].clientX,
    y: e.targetTouches[0].clientY,
  };
}
