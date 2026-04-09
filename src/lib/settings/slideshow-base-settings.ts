export type LoadingSetting = "eager" | "lazy" | "unset";
export type DecodingSetting = "async" | "sync" | "auto" | "unset";

export type SlideshowBaseSettings = {
  playIntervalMillis: number;
  thumbnailImageLoading: LoadingSetting;
  thumbnailImageDecoding: DecodingSetting;
  visibleImageLoading: LoadingSetting;
  visibleImageDecoding: DecodingSetting;
  preloadImageLoading: LoadingSetting;
  preloadImageDecoding: DecodingSetting;
};
