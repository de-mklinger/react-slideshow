import {
  type CSSProperties,
  type MutableRefObject,
  type ReactElement,
  type RefCallback,
  useCallback,
  useRef,
  useState,
} from "react";
import memoizeOne, { type MemoizedFn } from "memoize-one";

export type ItemRenderFunction = (
  idx: number,
) => ReactElement | string | number;

export type Orientation = "horizontal" | "vertical";

export type Align = "auto" | "center" | "start" | "end" | "smart";

export type ExtendedScrollBehavior = ScrollBehavior | "smart";

export type ScrollToItemIdxFn = (
  idx: number,
  align?: Align,
  behavior?: ExtendedScrollBehavior,
) => void;

export type Control = {
  scrollToItemIdx: ScrollToItemIdxFn;
};

export type ControlRef =
  // eslint-disable-next-line @typescript-eslint/ban-types
  | MutableRefObject<Control | null>
  // eslint-disable-next-line @typescript-eslint/ban-types
  | RefCallback<Control | null>;

export type FixedSizeListProps = {
  orientation: Orientation;
  style?: CSSProperties;
  className?: string;
  itemCount: number;
  itemHeight: number;
  itemWidth: number;
  itemRenderFunction: ItemRenderFunction;
  overscanCount?: number;
  controlRef?: ControlRef;
};

type VisibleIndices = {
  firstVisibleIdx: number;
  lastVisibleIdx: number;
};

type OrientationDependentAttributes = {
  sizeAttr: "width" | "height";
  scrollPositionAttr: "scrollLeft" | "scrollTop";
  clientSizeAttr: "clientWidth" | "clientHeight";
  positionAttr: "left" | "top";
  itemSize: number;
};

export function FixedSizeList({
  style,
  className,
  orientation,
  itemCount,
  itemWidth,
  itemHeight,
  itemRenderFunction,
  overscanCount = 1,
  controlRef,
}: FixedSizeListProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_renderInc, setRenderInc] = useState(0);
  const render = useCallback(() => {
    setRenderInc((oldRenderInc) => oldRenderInc + 1);
  }, [setRenderInc]);

  const attrs = useMemoizeOne(getOrientationDependentAttributes)(
    orientation,
    itemWidth,
    itemHeight,
  );

  // eslint-disable-next-line @typescript-eslint/ban-types
  const outerRef = useRef<HTMLHeadingElement | null>(null);

  const visibleIndices = outerRef.current
    ? getVisibleIndices(outerRef.current, attrs, overscanCount, itemCount)
    : undefined;

  const outerRefCallback: RefCallback<HTMLDivElement> = useCallback(
    (div) => {
      outerRef.current = div;
      initializeControlRef(controlRef, outerRef.current, itemCount, attrs);
      //console.log("Trigger render from outerRefCallback");
      render();
    },
    [attrs, itemCount, controlRef, render],
  );

  const fullSize = itemCount * attrs.itemSize;

  const innerStyle: CSSProperties = {
    [attrs.sizeAttr]: `${fullSize}px`,
    position: "relative",
  };

  const children: Array<ReactElement | string | number> = [];
  if (visibleIndices) {
    for (
      let itemIdx = visibleIndices.firstVisibleIdx;
      itemIdx <= visibleIndices.lastVisibleIdx;
      itemIdx++
    ) {
      const itemWrapperStyle: CSSProperties = {
        position: "absolute",
        [attrs.positionAttr]: `${itemIdx * itemWidth}px`,
        [attrs.sizeAttr]: `${itemWidth}px`,
        overflow: "hidden",
      };
      children.push(
        <div key={itemIdx} style={itemWrapperStyle}>
          {itemRenderFunction(itemIdx)}
        </div>,
      );
    }
  }

  function handleScroll() {
    if (outerRef.current) {
      if (visibleIndices) {
        const newVisibleIndices = getVisibleIndices(
          outerRef.current,
          attrs,
          overscanCount,
          itemCount,
        );
        if (
          newVisibleIndices.firstVisibleIdx !==
            visibleIndices.firstVisibleIdx ||
          newVisibleIndices.lastVisibleIdx !== visibleIndices.lastVisibleIdx
        ) {
          render();
        }
      } else {
        render();
      }
    }
  }

  return (
    <div
      style={style}
      className={className}
      ref={outerRefCallback}
      onScroll={handleScroll}
    >
      <div style={innerStyle}>{children}</div>
    </div>
  );
}

function getOrientationDependentAttributes(
  orientation: Orientation,
  itemWidth: number,
  itemHeight: number,
): OrientationDependentAttributes {
  if (orientation === "horizontal") {
    return {
      sizeAttr: "width",
      scrollPositionAttr: "scrollLeft",
      clientSizeAttr: "clientWidth",
      positionAttr: "left",
      itemSize: itemWidth,
    };
  }

  return {
    sizeAttr: "height",
    scrollPositionAttr: "scrollTop",
    clientSizeAttr: "clientHeight",
    positionAttr: "top",
    itemSize: itemHeight,
  };
}

// eslint-disable-next-line
function useMemoizeOne<FuncT extends (this: any, ...newArgs: any[]) => any>(
  func: FuncT,
) {
  const memoizedFnRef = useRef<MemoizedFn<FuncT>>(memoizeOne(func));
  return memoizedFnRef.current;
}

function getFirstVisibleIdx(
  outerDiv: HTMLHeadingElement,
  attrs: OrientationDependentAttributes,
  overscanCount: number,
) {
  return Math.max(
    Math.floor(outerDiv[attrs.scrollPositionAttr] / attrs.itemSize) -
      overscanCount,
    0,
  );
}

function getLastVisibleIdx(
  outerDiv: HTMLHeadingElement,
  attrs: OrientationDependentAttributes,
  overscanCount: number,
  itemCount: number,
) {
  return Math.min(
    Math.floor(
      (outerDiv[attrs.scrollPositionAttr] + outerDiv[attrs.clientSizeAttr]) /
        attrs.itemSize,
    ) + overscanCount,
    itemCount - 1,
  );
}

function getVisibleIndices(
  outerDiv: HTMLHeadingElement,
  attrs: OrientationDependentAttributes,
  overscanCount: number,
  itemCount: number,
): VisibleIndices {
  return {
    firstVisibleIdx: getFirstVisibleIdx(outerDiv, attrs, overscanCount),
    lastVisibleIdx: getLastVisibleIdx(
      outerDiv,
      attrs,
      overscanCount,
      itemCount,
    ),
  };
}

function initializeControlRef(
  controlRef: ControlRef | undefined,
  // eslint-disable-next-line @typescript-eslint/ban-types
  div: HTMLDivElement | null,
  itemCount: number,
  attrs: OrientationDependentAttributes,
) {
  if (!controlRef) {
    return;
  }

  const control = div ? newControl(div, itemCount, attrs) : null;

  if ("current" in controlRef) {
    controlRef.current = control;
  } else {
    controlRef(control);
  }
}

function newControl(
  div: HTMLDivElement,
  itemCount: number,
  attrs: OrientationDependentAttributes,
): Control {
  return {
    scrollToItemIdx(idx, align, behavior) {
      const newOffset = getOffsetForIndexAndAlignment(
        idx,
        itemCount,
        attrs.itemSize,
        div[attrs.clientSizeAttr],
        div[attrs.scrollPositionAttr],
        align,
      );

      if (behavior === "smart") {
        if (
          Math.abs(div[attrs.scrollPositionAttr] - newOffset) >
          div[attrs.clientSizeAttr]
        ) {
          behavior = "auto";
        } else {
          behavior = "smooth";
        }
      }

      div.scrollTo({
        [attrs.positionAttr]: newOffset,
        behavior,
      });
    },
  };
}

// Mostly taken from react-window
function getOffsetForIndexAndAlignment(
  itemIndex: number,
  itemCount: number,
  itemSize: number,
  scrollWindowSize: number,
  scrollOffset: number,
  align: Align = "auto",
): number {
  const lastItemOffset = Math.max(0, itemCount * itemSize - scrollWindowSize);
  const maxOffset = itemIndex * itemSize;
  const boundedMaxOffset = Math.min(lastItemOffset, maxOffset);
  const minOffset = itemIndex * itemSize - scrollWindowSize + itemSize;
  const boundedMinOffset = Math.max(0, minOffset);

  if (align === "smart") {
    if (
      scrollOffset >= boundedMinOffset - scrollWindowSize &&
      scrollOffset <= boundedMaxOffset + scrollWindowSize
    ) {
      align = "auto";
    } else {
      align = "center";
    }
  }

  switch (align) {
    case "start":
      return boundedMaxOffset;
    case "end":
      return boundedMinOffset;
    case "center": {
      const middleOffset = Math.round(minOffset + (maxOffset - minOffset) / 2);
      return Math.max(0, Math.min(lastItemOffset, middleOffset));
    }

    case "auto":
    default:
      if (
        scrollOffset >= boundedMinOffset &&
        scrollOffset <= boundedMaxOffset
      ) {
        return scrollOffset;
      }

      if (scrollOffset < boundedMinOffset) {
        return boundedMinOffset;
      }

      return boundedMaxOffset;
  }
}
