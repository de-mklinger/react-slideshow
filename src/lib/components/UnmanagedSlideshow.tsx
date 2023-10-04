import { ShortcutsByKey, SlideshowItem } from "../types";
import { useRef, useState } from "react";
import useShuffledArrayState from "../lib/use-shuffled-array-state";
import useZoom from "../lib/use-zoom";
import {
  mergeShortcuts,
  useSlideshowShortcuts,
} from "../lib/use-slideshow-shortcuts";
import useEventListener from "../lib/use-event-listener";
import { useSlideshowMetaFade } from "../lib/use-slideshow-meta-fade";
import { useSlideshowPlay } from "../lib/use-slideshow-play";
import { useWakeLock } from "../lib/use-wake-lock";
import { DefaultLeftChildren } from "./controls/DefaultLeftChildren";
import {
  useSlideshowScreenClass,
  useZoomedDragImageClass,
} from "../theme/use-slideshow-classes.ts";
import SlideshowMainItems from "./SlideshowMainItems";
import SlideshowControls from "./controls/SlideshowControls";
import { SlideshowProps } from "./Slideshow";
import {useSlideshowTheme} from "../theme/use-slideshow-theme.ts";

export type UnmanagedSlideshowProps<
  ItemT extends SlideshowItem = SlideshowItem,
> = SlideshowProps<ItemT> &
  Required<Pick<SlideshowProps<ItemT>, "onItemIdxChange">>;

export function UnmanagedSlideshow<
  ItemT extends SlideshowItem = SlideshowItem,
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

  const haveNext = () => loop || getShuffledItemIdx(currentItemIdx) + 1 < items.length;

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

  const havePrevious = () => loop || getShuffledItemIdx(currentItemIdx) > 0;

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
    items[currentItemIdx],
  );

  useEventListener("keyup", onShortcutKey, window);

  const theme = useSlideshowTheme();

  const [fadeClassName, onMouseOver, onMouseOut] = useSlideshowMetaFade(
    theme.meta.fadeDurationMillis,
  );

  const { resetPlay } = useSlideshowPlay(play, next, 3000);

  useWakeLock(play);

  const actualTopBarLeftChildren = topBarLeftChildren ?? (
    <DefaultLeftChildren
      hideControls={hideControls}
      previous={havePrevious() ? previous : undefined}
      next={haveNext() ? next : undefined}
      toggleHideControls={toggleHideControls}
      random={isShuffled}
      toggleRandom={toggleRandom}
      play={play}
      togglePlay={togglePlay}
      loop={loop}
      toggleLoop={toggleLoop}
    />
  );

  const slideshowScreenClass = useSlideshowScreenClass();
  const zoomedDragImageClass = useZoomedDragImageClass();

  return (
    <div ref={wrapperRef} onClick={onClick} className={slideshowScreenClass}>
      <div className={zoomedDragImageClass} ref={zoomedDragImageRef} />

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
