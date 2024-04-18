#!/usr/bin/env -S node --import tsx --test

import { isVideo, stopEvent, StoppableEvent, withStopEvent } from "../util";
import test from "node:test";
import * as assert from "node:assert";

test("isVideo", () => {
  assert.strictEqual(
    isVideo({ url: "test.jpg", mediaType: "video/something" }),
    true,
  );

  assert.strictEqual(isVideo({ url: "test.jpg" }), false);

  assert.strictEqual(isVideo({ url: "test.mp4", mediaType: "x" }), false);

  assert.strictEqual(isVideo({ url: "test.mp4" }), true);

  assert.strictEqual(isVideo({ url: "noextension" }), false);

});

await test.describe("stopEvent", () => {
  test.it("calls stopPropagation", (t) => {
    const stopPropagation = t.mock.fn();

    const e: Partial<StoppableEvent> = {
      stopPropagation,
    };

    stopEvent(e);

    assert.strictEqual(stopPropagation.mock.callCount(), 1);
  });

  test.it("calls preventDefault", (t) => {
    const preventDefault = t.mock.fn();

    const e: Partial<StoppableEvent> = {
      preventDefault,
    };

    stopEvent(e);

    assert.strictEqual(preventDefault.mock.callCount(), 1);
  });

  test.it("ignores missing methods", () => {
    const e: Partial<StoppableEvent> = {};
    stopEvent(e);
  });
});

await test.describe("withStopEvent", () => {
  test.it("calls stopPropagation", (t) => {
    const stopPropagation = t.mock.fn();

    const e: StoppableEvent = {
      stopPropagation,
      preventDefault: t.mock.fn(),
    };

    withStopEvent(e);

    assert.strictEqual(stopPropagation.mock.callCount(), 1);
  });

  test.it("calls preventDefault", (t) => {
    const preventDefault = t.mock.fn();

    const e: StoppableEvent = {
      stopPropagation: t.mock.fn(),
      preventDefault,
    };

    withStopEvent(e);

    assert.strictEqual(preventDefault.mock.callCount(), 1);
  });

  test.it("calls callback", (t) => {
    const e: StoppableEvent = {
      stopPropagation: t.mock.fn(),
      preventDefault: t.mock.fn(),
    };

    const callback = t.mock.fn((cbe: unknown) => {
      assert.strictEqual(cbe, e);
    });

    withStopEvent(e, callback);

    assert.strictEqual(callback.mock.callCount(), 1);
  });
});
test("withStopEvent", (t) => {
  const stopPropagation = t.mock.fn();
  const preventDefault = t.mock.fn();

  const e: StoppableEvent = {
    stopPropagation,
    preventDefault,
  };

  withStopEvent(e);

  assert.strictEqual(stopPropagation.mock.callCount(), 1);
  assert.strictEqual(preventDefault.mock.callCount(), 1);
});
