import { type SlideshowItem } from "./types";
import { useHoverEffect } from "./use-hover-effect";
import classNames from "classnames";
import React, {
  type CSSProperties,
  type MutableRefObject,
  type RefCallback,
  useCallback,
  useRef,
} from "react";
import { type Control, FixedSizeList, getScrollbarSize } from "./window";
import { type TopBarChildren } from "./Slideshow";

type SlideshowControlsProps<ItemT extends SlideshowItem = SlideshowItem> =
  TopBarProps<ItemT> & BottomBarProps<ItemT> & ToggleHideControlsButtonProps;

export default function SlideshowControls<
  ItemT extends SlideshowItem = SlideshowItem
>(props: SlideshowControlsProps<ItemT>) {
  if (props.hideControls) {
    return <MinimizedControls {...props} />;
  }

  return (
    <>
      <TopBar {...props} />
      <BottomBar {...props} />
    </>
  );
}

type MinimizedControlsProps = {
  className: string;
  onMouseOver: () => void;
  onMouseOut: () => void;
} & ToggleHideControlsButtonProps;

function MinimizedControls({
  className,
  onMouseOver,
  onMouseOut,
  ...otherProps
}: MinimizedControlsProps) {
  const barRef = useHoverEffect<HTMLDivElement>(onMouseOver, onMouseOut);

  return (
    <div
      className={classNames("top-bar", "minimized", "meta", className)}
      ref={barRef}
      onClick={stopPropagation}
    >
      <div className="top-bar-left">
        <ToggleHideControlsButton {...otherProps} />
      </div>
    </div>
  );
}

type TopBarProps<ItemT extends SlideshowItem = SlideshowItem> = {
  className: string;
  items: ItemT[];
  currentItemIdx: number;
  directoryPath?: string;
  recursive?: boolean;
  onMouseOver: () => void;
  onMouseOut: () => void;
  leftChildren?: TopBarChildren<ItemT>;
  rightChildren?: TopBarChildren<ItemT>;
};

function TopBar<ItemT extends SlideshowItem = SlideshowItem>({
  className,
  items,
  currentItemIdx,
  onMouseOver,
  onMouseOut,
  leftChildren,
  rightChildren,
}: TopBarProps<ItemT>) {
  const barRef = useHoverEffect<HTMLDivElement>(onMouseOver, onMouseOut);

  return (
    <div
      className={classNames("top-bar", "meta", className)}
      ref={barRef}
      onClick={stopPropagation}
    >
      <div className="top-bar-left">
        {typeof leftChildren === "function"
          ? leftChildren({ itemIdx: currentItemIdx, items })
          : leftChildren}
      </div>
      <div className="top-bar-right">
        {typeof rightChildren === "function"
          ? rightChildren({ itemIdx: currentItemIdx, items })
          : rightChildren}
      </div>
    </div>
  );
}

type DefaultLeftChildrenProps = {
  random: boolean;
  toggleRandom: () => void;
  play: boolean;
  togglePlay: () => void;
  loop: boolean;
  toggleLoop: () => void;
} & ToggleHideControlsButtonProps;

export function DefaultLeftChildren({
  hideControls,
  toggleHideControls,
  random,
  toggleRandom,
  play,
  togglePlay,
  loop,
  toggleLoop,
}: DefaultLeftChildrenProps) {
  return (
    <>
      <ToggleHideControlsButton
        hideControls={hideControls}
        toggleHideControls={toggleHideControls}
      />
      <button
        className={classNames("btn", "btn-dark", { active: random })}
        aria-pressed={random}
        onClick={() => {
          toggleRandom();
        }}
      >
        Random
      </button>
      <button
        className={classNames("btn", "btn-dark", { active: play })}
        aria-pressed={random}
        onClick={() => {
          togglePlay();
        }}
      >
        Play
      </button>
      <button
        className={classNames("btn", "btn-dark", { active: loop })}
        aria-pressed={random}
        onClick={() => {
          toggleLoop();
        }}
      >
        Loop
      </button>
    </>
  );
}

type ToggleHideControlsButtonProps = {
  hideControls: boolean;
  toggleHideControls: () => void;
};

function ToggleHideControlsButton({
  hideControls,
  toggleHideControls,
}: ToggleHideControlsButtonProps) {
  return (
    <button
      className={classNames("btn", "btn-dark", { active: hideControls })}
      aria-pressed={hideControls}
      onClick={() => {
        toggleHideControls();
      }}
    >
      {hideControls ? "▼" : "▲"}
    </button>
  );
}

type BottomBarProps<ItemT extends SlideshowItem = SlideshowItem> = {
  className: string;
  // DirectoryPath: string
  // recursive: boolean
  items: ItemT[];
  currentItemIdx: number;
  onMouseOver: () => void;
  onMouseOut: () => void;
  onItemClick: (itemIdx: number) => void;
  getItemUrl?: (itemIdx: number) => string | undefined;
};

const itemInnerSize = 200;
const itemBorder = 2;
const itemMargin = 4;
const itemSize = 200 + itemBorder * 2 + itemMargin * 2;

const horizontalListStyle: CSSProperties = {
  width: "100%",
  height: `${itemSize + getScrollbarSize()}px`,
  overflowX: "scroll",
};

const itemWrapperStyle: CSSProperties = {
  width: itemSize,
  height: itemSize,
  display: "flex",
  alignItems: "center",
  padding: `${itemMargin}px`,
  color: "transparent",
};

const itemStyle: CSSProperties = {
  maxWidth: itemInnerSize + itemBorder,
  maxHeight: itemInnerSize + itemBorder,
  margin: "auto",
  borderStyle: "solid",
  borderWidth: `${itemBorder}px`,
  borderColor: "transparent",
};

const itemStyleSelected: CSSProperties = {
  ...itemStyle,
  borderColor: "#fff",
};

function BottomBar({
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

  const renderThumbnail = useCallback(
    (idx: number) => {
      const currentItemStyle =
        idx === currentItemIdxRef.current ? itemStyleSelected : itemStyle;

      const itemUrl = getItemUrl(idx) ?? "#";

      return (
        <a
          href={itemUrl}
          onClick={() => {
            onItemClick(idx);
          }}
          style={itemWrapperStyle}
        >
          <img alt="" src={items[idx].thumbnailUrl} style={currentItemStyle} />
        </a>
      );
    },
    [items, onItemClick, getItemUrl]
  );

  // eslint-disable-next-line @typescript-eslint/ban-types
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

  function stopPropagation(e: React.UIEvent) {
    console.log("BottomBar click, stop propagation");
    e.stopPropagation();
  }

  return (
    <div
      className={classNames("bottom-bar", "meta", className)}
      ref={barRef}
      onClick={stopPropagation}
    >
      <FixedSizeList
        orientation="horizontal"
        itemWidth={itemSize}
        itemHeight={itemSize}
        itemCount={items.length}
        itemRenderFunction={renderThumbnail}
        style={horizontalListStyle}
        controlRef={controlRefCallback}
      />
    </div>
  );
}

function stopPropagation(e: React.UIEvent) {
  e.stopPropagation();
}
