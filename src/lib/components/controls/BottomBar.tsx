import classNames from "classnames";
import { MutableRefObject, RefCallback, useCallback, useRef } from "react";
import { useHoverEffect } from "../../lib/use-hover-effect";
import { ImageProps, useImageProps } from "../../lib/use-image-props.ts";
import { stopPropagation } from "../../lib/util.ts";
import {
  useBottomBarClass,
  useMetaClass,
  useOuterThumbnailSize,
  useSelectedThumbnailClass,
  useThumbnailClass,
  useThumbnailsHorizontalListClass,
  useThumbnailWrapperClass,
} from "../../settings";
import { useSlideshowBaseSettings } from "../../settings/use-slideshow-base-settings.ts";
import { SlideshowItem } from "../../types";
import { Control, FixedSizeList } from "../../window";

export type BottomBarProps<ItemT extends SlideshowItem = SlideshowItem> = {
  className?: string;
  // DirectoryPath: string
  // recursive: boolean
  items: ItemT[];
  currentItemIdx: number;
  onMouseOver: () => void;
  onMouseOut: () => void;
  onItemClick: (itemIdx: number) => void;
  getItemUrl?: (itemIdx: number) => string | undefined;
};

export function BottomBar({
  className,
  items,
  currentItemIdx,
  onMouseOver,
  onMouseOut,
  onItemClick,
  getItemUrl = () => undefined,
}: BottomBarProps) {
  const barRef = useHoverEffect<HTMLDivElement>(onMouseOver, onMouseOut);

  const currentItemIdxRef = useRef(currentItemIdx);
  currentItemIdxRef.current = currentItemIdx;

  const thumbnailWrapperClass = useThumbnailWrapperClass();
  const thumbnailClass = useThumbnailClass();
  const selectedThumbnailClass = useSelectedThumbnailClass();

  const imageProps = useThumbnailImageProps();

  const renderThumbnail = useCallback(
    (idx: number) => {
      const selected = idx === currentItemIdxRef.current;

      const itemUrl = getItemUrl(idx) ?? "#";

      return (
        <a
          href={itemUrl}
          onClick={(e) => {
            e.preventDefault();
            onItemClick(idx);
          }}
          className={thumbnailWrapperClass}
        >
          <img
            alt=""
            src={items[idx].thumbnailUrl}
            className={classNames(thumbnailClass, {
              [selectedThumbnailClass]: selected,
            })}
            {...imageProps}
          />
        </a>
      );
    },
    [
      items,
      onItemClick,
      getItemUrl,
      thumbnailWrapperClass,
      thumbnailClass,
      selectedThumbnailClass,
      imageProps,
    ],
  );

  const controlRef: MutableRefObject<Control | null> = useRef(null);
  const controlRefCallback: RefCallback<Control> = useCallback((control) => {
    if (control) {
      // Console.log("Mounted, initial scroll");
      control.scrollToItemIdx(currentItemIdxRef.current, "center", "auto");
    }

    controlRef.current = control;
  }, []);

  if (controlRef.current) {
    // Console.log("Render, subsequent scroll");
    controlRef.current.scrollToItemIdx(currentItemIdx, "center", "smart");
  }

  const metaClass = useMetaClass();
  const bottomBarClass = useBottomBarClass();
  const thumbnailHorizontalListClass = useThumbnailsHorizontalListClass();
  const outerThumbnailSize = useOuterThumbnailSize();

  return (
    <div
      className={classNames(metaClass, bottomBarClass, className)}
      ref={barRef}
      onClick={stopPropagation}
    >
      <FixedSizeList
        orientation="horizontal"
        itemWidth={outerThumbnailSize}
        itemHeight={outerThumbnailSize}
        itemCount={items.length}
        itemRenderFunction={renderThumbnail}
        className={thumbnailHorizontalListClass}
        controlRef={controlRefCallback}
      />
    </div>
  );
}

function useThumbnailImageProps(): ImageProps {
  const { thumbnailImageLoading, thumbnailImageDecoding } =
    useSlideshowBaseSettings();

  return useImageProps(thumbnailImageLoading, thumbnailImageDecoding);
}
