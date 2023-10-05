import { type SlideshowItem } from "../types";

export type StoppableEvent = Pick<Event, "preventDefault" | "stopPropagation">;

export function stopEvent(e: Partial<StoppableEvent>) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  if (e.stopPropagation) {
    e.stopPropagation();
  }
}

export function withStopEvent<Event extends StoppableEvent>(
  e: Event,
  handler?: (e: Event) => void,
) {
  stopEvent(e);
  if (handler) {
    handler(e);
  }
}

type MinimalMainItem = Pick<SlideshowItem, "url" | "mediaType">;

export function isVideo(item: MinimalMainItem): boolean {
  if (item.mediaType) {
    return item.mediaType.toLowerCase().startsWith("video/");
  }

  try {
    const base =
      typeof window === "object"
        ? window.location.href
        : "https://doesnotexist";

    const url = new URL(item.url, base);

    const extension = getFileExtension(url.pathname);

    return !!extension && videoExtensions.includes(extension.toLowerCase());
  } catch (e: unknown) {
    console.warn("Error in isVideo() for ", item, e);
    return false;
  }
}

const videoExtensions = [
  "avi",
  "mpg",
  "mpeg",
  "mp4",
  "webm",
  "mkv",
  "flv",
  "mov",
  "asf",
];

function getFileExtension(filename: string): string | undefined {
  const idx = filename.lastIndexOf(".");

  if (idx === -1 || idx === filename.length - 1) {
    return undefined;
  }

  return filename.substring(idx + 1);
}
