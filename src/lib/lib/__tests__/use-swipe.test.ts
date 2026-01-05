import { describe, it, mock } from "node:test";
import { act, renderHook } from "@testing-library/react";
import { useSwipe } from "../use-swipe";
import * as assert from "node:assert";
import { TouchEvent } from "react";

import "global-jsdom/register";

describe("useSwipe", () => {
  it("should call onSwipeLeft when the swipe is left", () => {
    const onSwipeLeft = mock.fn();

    const { result } = renderHook(() =>
      useSwipe({ onSwipeLeft, threshold: 50 }),
    );

    act(() => {
      result.current.onTouchStart({
        targetTouches: [{ clientX: 200, clientY: 100 }],
      } as unknown as TouchEvent);
      result.current.onTouchMove({
        targetTouches: [{ clientX: 100, clientY: 100 }],
      } as unknown as TouchEvent);
      result.current.onTouchEnd({} as unknown as TouchEvent);
    });

    assert.strictEqual(onSwipeLeft.mock.callCount(), 1);
  });

  it("should call onSwipeRight when the swipe is right", () => {
    const onSwipeRight = mock.fn();

    const { result } = renderHook(() =>
      useSwipe({ onSwipeRight, threshold: 50 }),
    );

    act(() => {
      result.current.onTouchStart({
        targetTouches: [{ clientX: 100, clientY: 100 }],
      } as unknown as TouchEvent);
      result.current.onTouchMove({
        targetTouches: [{ clientX: 200, clientY: 100 }],
      } as unknown as TouchEvent);
      result.current.onTouchEnd({} as unknown as TouchEvent);
    });

    assert.strictEqual(onSwipeRight.mock.callCount(), 1);
  });

  it("should call onSwipeUp when the swipe is up", () => {
    const onSwipeUp = mock.fn();

    const { result } = renderHook(() => useSwipe({ onSwipeUp, threshold: 50 }));

    act(() => {
      result.current.onTouchStart({
        targetTouches: [{ clientX: 100, clientY: 200 }],
      } as unknown as TouchEvent);
      result.current.onTouchMove({
        targetTouches: [{ clientX: 100, clientY: 100 }],
      } as unknown as TouchEvent);
      result.current.onTouchEnd({} as unknown as TouchEvent);
    });

    assert.strictEqual(onSwipeUp.mock.callCount(), 1);
  });

  it("should call onSwipeDown when the swipe is down", () => {
    const onSwipeDown = mock.fn();
    const { result } = renderHook(() =>
      useSwipe({ onSwipeDown, threshold: 50 }),
    );

    act(() => {
      result.current.onTouchStart({
        targetTouches: [{ clientX: 100, clientY: 100 }],
      } as unknown as TouchEvent);
      result.current.onTouchMove({
        targetTouches: [{ clientX: 100, clientY: 200 }],
      } as unknown as TouchEvent);
      result.current.onTouchEnd({} as unknown as TouchEvent);
    });

    assert.strictEqual(onSwipeDown.mock.callCount(), 1);
  });

  it("should not trigger any callback if the swipe does not exceed the threshold", () => {
    const onSwipeLeft = mock.fn();
    const onSwipeRight = mock.fn();
    const onSwipeUp = mock.fn();
    const onSwipeDown = mock.fn();

    const { result } = renderHook(() =>
      useSwipe({
        onSwipeLeft,
        onSwipeRight,
        onSwipeUp,
        onSwipeDown,
        threshold: 50,
      }),
    );

    act(() => {
      result.current.onTouchStart({
        targetTouches: [{ clientX: 100, clientY: 100 }],
      } as unknown as TouchEvent);
      result.current.onTouchMove({
        targetTouches: [{ clientX: 120, clientY: 120 }],
      } as unknown as TouchEvent);
      result.current.onTouchEnd({} as unknown as TouchEvent);
    });

    assert.strictEqual(onSwipeLeft.mock.callCount(), 0);
    assert.strictEqual(onSwipeRight.mock.callCount(), 0);
    assert.strictEqual(onSwipeUp.mock.callCount(), 0);
    assert.strictEqual(onSwipeDown.mock.callCount(), 0);
  });

  it("should not trigger any callback if disabled", () => {
    const onSwipeLeft = mock.fn();
    const onSwipeRight = mock.fn();
    const onSwipeUp = mock.fn();
    const onSwipeDown = mock.fn();

    const { result } = renderHook(() =>
      useSwipe({
        onSwipeLeft,
        onSwipeRight,
        onSwipeUp,
        onSwipeDown,
        threshold: 50,
        disabled: true,
      }),
    );

    act(() => {
      result.current.onTouchStart({
        targetTouches: [{ clientX: 100, clientY: 100 }],
      } as unknown as TouchEvent);
      result.current.onTouchMove({
        targetTouches: [{ clientX: 200, clientY: 200 }],
      } as unknown as TouchEvent);
      result.current.onTouchEnd({} as unknown as TouchEvent);
    });

    assert.strictEqual(onSwipeLeft.mock.callCount(), 0);
    assert.strictEqual(onSwipeRight.mock.callCount(), 0);
    assert.strictEqual(onSwipeUp.mock.callCount(), 0);
    assert.strictEqual(onSwipeDown.mock.callCount(), 0);
  });

  it("should not call any callback if touchStart or touchEnd is not defined", () => {
    const onSwipeLeft = mock.fn();
    const onSwipeRight = mock.fn();
    const onSwipeUp = mock.fn();
    const onSwipeDown = mock.fn();

    const { result } = renderHook(() => useSwipe({ onSwipeLeft }));

    act(() => {
      result.current.onTouchEnd({} as unknown as TouchEvent);
    });

    assert.strictEqual(onSwipeLeft.mock.callCount(), 0);
    assert.strictEqual(onSwipeRight.mock.callCount(), 0);
    assert.strictEqual(onSwipeUp.mock.callCount(), 0);
    assert.strictEqual(onSwipeDown.mock.callCount(), 0);
  });
});
