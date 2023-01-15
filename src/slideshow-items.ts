import { type SlideshowItem } from "./types";

export function getItemIdx(items: SlideshowItem[], id: string): number {
  const idx = items.findIndex((item) => item.id === id);
  if (idx === -1) {
    throw new Error(`Item not found with id ${id}`);
  }
  return idx;
}
