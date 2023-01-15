import React, { ReactNode, useRef, useState } from "react";
import useEventListener from "@use-it/event-listener";
import { type SlideshowItem } from "./types";
import SlideshowMainItems from "./SlideshowMainItems";
import useZoom from "./use-zoom";
import SlideshowControls, { DefaultLeftChildren } from "./SlideshowControls";
import { useWakeLock } from "./use-wake-lock";
import { useSlideshowMetaFade } from "./use-slideshow-meta-fade";
import { useSlideshowPlay } from "./use-slideshow-play";
import {
  mergeShortcuts,
  type ShortcutsByKey,
  useSlideshowShortcuts,
} from "./use-slideshow-shortcuts";
import useShuffledArrayState from "./use-shuffled-array-state";

const metaFadeDurationMillis = 200; // TODO get from somewhere else

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

export type UnmanagedSlideshowProps<
  ItemT extends SlideshowItem = SlideshowItem
> = SlideshowProps<ItemT> &
  Required<Pick<SlideshowProps<ItemT>, "onItemIdxChange">>;

export function UnmanagedSlideshow<
  ItemT extends SlideshowItem = SlideshowItem
>({
  items,
  itemIdx = 0,
  onItemIdxChange,
  topBarLeftChildren,
  topBarRightChildren,
  getItemUrl,
  customShortcuts = {},
  disableDefaultShortcuts,
}: UnmanagedSlideshowProps<ItemT>) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const {
    getShuffledItemIdx,
    getUnshuffledItemIdx,
    toggleShuffled,
    isShuffled,
    shuffledItems,
  } = useShuffledArrayState<ItemT>(items);
  const [play, setPlay] = useState(false);
  const [loop, setLoop] = useState(false);
  const [hideControls, setHideControls] = useState(false);
  const zoomedDragImageRef = useRef<HTMLDivElement>(null);
  const { resetZoom, itemAdjust } = useZoom(zoomedDragImageRef);

  const setCurrentItemIdx = (itemIdx: number) => {
    onItemIdxChange(itemIdx);
    resetZoom();
    resetPlay();
  };

  const currentItemIdx = itemIdx;

  const next = () => {
    let newIdx = getShuffledItemIdx(currentItemIdx) + 1;
    if (newIdx >= items.length) {
      if (loop) {
        newIdx = 0;
      } else {
        newIdx = items.length - 1;
      }
    }

    setCurrentItemIdx(getUnshuffledItemIdx(newIdx));
  };

  const previous = () => {
    let newIdx = getShuffledItemIdx(currentItemIdx) - 1;
    if (newIdx < 0) {
      if (loop) {
        newIdx = items.length - 1;
      } else {
        newIdx = 0;
      }
    }

    setCurrentItemIdx(getUnshuffledItemIdx(newIdx));
  };

  const onClick = (e: React.MouseEvent) => {
    if (wrapperRef.current) {
      e.stopPropagation();
      if (e.clientX < wrapperRef.current.clientWidth / 2) {
        previous();
      } else {
        next();
      }
    }
  };

  const toggleHideControls = () => {
    setHideControls((oldHideControls) => !oldHideControls);
  };

  const toggleRandom = () => {
    toggleShuffled(currentItemIdx);
  };

  const togglePlay = () => {
    setPlay((oldPlay) => !oldPlay);
  };

  const toggleLoop = () => {
    setLoop((oldLoop) => !oldLoop);
  };

  const defaultShortcuts: ShortcutsByKey<ItemT> = disableDefaultShortcuts
    ? {}
    : {
        ArrowLeft: previous,
        ArrowRight: next,
        r: toggleRandom,
        p: togglePlay,
        l: toggleLoop,
        Escape: toggleHideControls,
      };

  const shortcuts = mergeShortcuts(customShortcuts, defaultShortcuts);

  const { onShortcutKey } = useSlideshowShortcuts(
    shortcuts,
    items[currentItemIdx]
  );

  useEventListener("keyup", onShortcutKey);

  const [fadeClassName, onMouseOver, onMouseOut] = useSlideshowMetaFade(
    metaFadeDurationMillis
  );

  const { resetPlay } = useSlideshowPlay(play, next, 3000);

  useWakeLock(play);

  const actualTopBarLeftChildren = topBarLeftChildren ?? (
    <DefaultLeftChildren
      hideControls={hideControls}
      toggleHideControls={toggleHideControls}
      random={isShuffled}
      toggleRandom={toggleRandom}
      play={play}
      togglePlay={togglePlay}
      loop={loop}
      toggleLoop={toggleLoop}
    />
  );

  return (
    <div ref={wrapperRef} onClick={onClick} className="slideshow-screen">
      <div
        style={{
          position: "absolute",
          opacity: 0,
          width: 1,
          height: 1,
        }}
        ref={zoomedDragImageRef}
      />

      <SlideshowMainItems
        items={shuffledItems}
        itemIdx={getShuffledItemIdx(currentItemIdx)}
        scale={`${itemAdjust.scalePercentage}%`}
        translateX={`${itemAdjust.offset.x}px`}
        translateY={`${itemAdjust.offset.y}px`}
      />

      <SlideshowControls
        className={fadeClassName}
        items={items}
        currentItemIdx={currentItemIdx}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        leftChildren={actualTopBarLeftChildren}
        rightChildren={topBarRightChildren}
        onItemClick={setCurrentItemIdx}
        getItemUrl={getItemUrl}
        hideControls={hideControls}
        toggleHideControls={toggleHideControls}
      />
    </div>
  );
}
