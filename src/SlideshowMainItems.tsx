import React, { memo, useState } from "react";
import { type SlideshowItem } from "./types";
import SlideshowMainItem from "./SlideshowMainItem";

export type SlideshowMainItemsProps = {
  items: SlideshowItem[];
  itemIdx: number;
  scale?: string;
  translateX?: string;
  translateY?: string;
};

type ItemBag = {
  item: SlideshowItem;
  itemIdx: number;
  visible: boolean;
};

function WrappedSlideshowMainItems({
  items,
  itemIdx,
  translateX,
  translateY,
  scale,
}: SlideshowMainItemsProps) {
  const [primaryLoaded, setPrimaryLoaded] = useState(false);

  const loadItems: ItemBag[] = [];
  const overscan = primaryLoaded ? 1 : 0;
  for (let idx = itemIdx - overscan; idx <= itemIdx + overscan; idx++) {
    if (idx >= 0 && idx < items.length) {
      loadItems.push({
        item: items[idx],
        itemIdx: idx,
        visible: idx === itemIdx,
      });
    }
  }

  return (
    <>
      {loadItems.map((loadItem) => (
        <SlideshowMainItem
          key={loadItem.itemIdx}
          item={loadItem.item}
          scale={loadItem.visible ? scale : undefined}
          translateX={loadItem.visible ? translateX : undefined}
          translateY={loadItem.visible ? translateY : undefined}
          visible={loadItem.visible}
          onLoad={
            loadItem.visible && !primaryLoaded
              ? () => {
                  setPrimaryLoaded(true);
                }
              : undefined
          }
        />
      ))}
    </>
  );
}

const SlideshowItems = memo(WrappedSlideshowMainItems);

export default SlideshowItems;
