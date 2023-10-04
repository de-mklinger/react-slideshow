import { type RefObject, useRef, useState } from "react";
import { withStopEvent } from "./util";
import useEventListener from "./use-event-listener";

type Offset = {
  x: number;
  y: number;
};

type DragState = {
  dragStartX: number;
  dragStartY: number;
  initialOffsetX: number;
  initialOffsetY: number;
};

type ItemAdjust = {
  offset: Offset;
  scalePercentage: number;
};

const defaultOffset: Offset = {
  x: 0,
  y: 0,
};

const defaultItemAdjust: ItemAdjust = {
  offset: defaultOffset,
  scalePercentage: 100,
};

export type UseZoomResult = {
  itemAdjust: ItemAdjust;
  resetZoom: () => void;
};

export default function useZoom(
  dragImageRef?: RefObject<Element>,
): UseZoomResult {
  const [itemAdjust, setItemAdjust] = useState(defaultItemAdjust);

  const onWheel = (e: WheelEvent) => {
    withStopEvent(e);
    setItemAdjust((oldItemAdjust) => {
      const newScalePercentage = Math.max(
        100,
        Math.round(
          oldItemAdjust.scalePercentage -
            oldItemAdjust.scalePercentage * (e.deltaY / 100) * 0.05,
        ),
      );

      const newItemAdjust: ItemAdjust = {
        ...oldItemAdjust,
        scalePercentage: newScalePercentage,
      };

      if (newScalePercentage <= 100) {
        newItemAdjust.offset = defaultOffset;
      }

      return newItemAdjust;
    });
  };

  useEventListener("wheel", onWheel, window, { passive: false });

  const dragStartOffset = useRef<DragState>();

  useEventListener(
    "dragstart",
    (event) => {
      const e = event as DragEvent;
      //console.log("dragstart", e);
      dragStartOffset.current = {
        dragStartX: e.screenX,
        dragStartY: e.screenY,
        initialOffsetX: itemAdjust.offset.x,
        initialOffsetY: itemAdjust.offset.y,
      };

      if (e.dataTransfer && dragImageRef && dragImageRef.current) {
        //console.log("Setting drag image:", dragImageRef.current);
        e.dataTransfer.setDragImage(dragImageRef.current, 0, 0);
      }
    },
    window,
  );

  useEventListener(
    "dragend",
    (event) => {
      const e = event as DragEvent;
      withStopEvent(e);
      dragStartOffset.current = undefined;
    },
    window,
  );

  useEventListener(
    "drop",
    (event) => {
      const e = event as DragEvent;
      withStopEvent(e);
      dragStartOffset.current = undefined;
    },
    window,
  );

  useEventListener(
    "drag",
    (event) => {
      const e = event as DragEvent;
      withStopEvent(e);
      if (
        dragStartOffset.current &&
        itemAdjust.scalePercentage > 100 &&
        e.screenX &&
        e.screenY
      ) {
        const dragMovementX = e.screenX - dragStartOffset.current.dragStartX;
        const dragMovementY = e.screenY - dragStartOffset.current.dragStartY;

        const scaleFactor = itemAdjust.scalePercentage / 100;

        const newOffsetX = Math.round(
          dragStartOffset.current.initialOffsetX + dragMovementX / scaleFactor,
        );
        const newOffsetY = Math.round(
          dragStartOffset.current.initialOffsetY + dragMovementY / scaleFactor,
        );

        setItemAdjust((oldItemAdjust) => ({
          ...oldItemAdjust,
          offset: {
            x: newOffsetX,
            y: newOffsetY,
          },
        }));
      }
    },
    window,
  );

  return {
    itemAdjust,
    resetZoom() {
      setItemAdjust(defaultItemAdjust);
    },
  };
}
