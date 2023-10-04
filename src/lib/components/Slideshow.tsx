import { type ReactNode, useState } from "react";
import { type ShortcutsByKey, type SlideshowItem } from "../types";
import { UnmanagedSlideshow } from "./UnmanagedSlideshow";

export type TopBarChildrenProps<ItemT extends SlideshowItem = SlideshowItem> = {
  itemIdx: number;
  items: ItemT[];
};

export type TopBarChildren<ItemT extends SlideshowItem = SlideshowItem> =
  | ReactNode
  | ((props: TopBarChildrenProps<ItemT>) => ReactNode);

export type SlideshowProps<ItemT extends SlideshowItem = SlideshowItem> = {
  items: ItemT[];
  itemIdx?: number;
  onItemIdxChange?: (itemIdx: number) => void;
  topBarLeftChildren?: TopBarChildren<ItemT>;
  topBarRightChildren?: TopBarChildren<ItemT>;
  getItemUrl?: (itemIdx: number) => string | undefined;
  customShortcuts?: ShortcutsByKey<ItemT>;
  disableDefaultShortcuts?: boolean;
};

export function Slideshow<ItemT extends SlideshowItem = SlideshowItem>({
  itemIdx = 0,
  onItemIdxChange,
  ...otherProps
}: SlideshowProps<ItemT>) {
  const [currentItemIdx, setCurrentItemIdx] = useState<number>(itemIdx);

  function handleItemIdxChange(itemIdx: number) {
    setCurrentItemIdx(itemIdx);
    if (onItemIdxChange) {
      onItemIdxChange(itemIdx);
    }
  }

  return (
    <UnmanagedSlideshow
      itemIdx={currentItemIdx}
      onItemIdxChange={handleItemIdxChange}
      {...otherProps}
    />
  );
}
