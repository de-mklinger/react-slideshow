import { SlideshowBaseSettings } from "./slideshow-base-settings.ts";

export const defaultSlideshowBaseSettings: SlideshowBaseSettings = {
  playIntervalMillis: 3000,
  thumbnailImageLoading: "lazy",
  thumbnailImageDecoding: "async",
  visibleImageLoading: "eager",
  visibleImageDecoding: "unset", // Was "sync" previously
  preloadImageLoading: "lazy",
  preloadImageDecoding: "unset", // Was "async" previously
};
