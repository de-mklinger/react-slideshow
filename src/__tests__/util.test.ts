import { isVideo } from "../util";

test("isVideo", () => {
  expect(isVideo({ url: "test.jpg", mediaType: "video/something" })).toBe(true);
  expect(isVideo({ url: "test.jpg" })).toBe(false);
  expect(isVideo({ url: "test.mp4", mediaType: "x" })).toBe(false);
  expect(isVideo({ url: "test.mp4" })).toBe(true);
});
