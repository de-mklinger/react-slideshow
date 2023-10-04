import {SlideshowItem} from "../../types";
import {useHoverEffect} from "../../lib/use-hover-effect";
import {useMetaClass, useTopBarClass} from "../../theme";
import {stopPropagation} from "../../lib/stop-propagation";
import {TopBarLeft} from "./TopBarLeft";
import {TopBarRight} from "./TopBarRight";
import {TopBarChildren} from "../Slideshow";
import classNames from "classnames";

export type TopBarProps<ItemT extends SlideshowItem = SlideshowItem> = {
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

export function TopBar<ItemT extends SlideshowItem = SlideshowItem>({
  className,
  items,
  currentItemIdx,
  onMouseOver,
  onMouseOut,
  leftChildren,
  rightChildren,
}: TopBarProps<ItemT>) {
  const barRef = useHoverEffect<HTMLDivElement>(onMouseOver, onMouseOut);

  const metaClass = useMetaClass();
  const topBarClass = useTopBarClass();

  return (
    <div
      className={classNames(metaClass, topBarClass, className)}
      ref={barRef}
      onClick={stopPropagation}
    >
      <TopBarLeft>
        {typeof leftChildren === "function"
          ? leftChildren({ itemIdx: currentItemIdx, items })
          : leftChildren}
      </TopBarLeft>
      <TopBarRight>
        {typeof rightChildren === "function"
          ? rightChildren({ itemIdx: currentItemIdx, items })
          : rightChildren}
      </TopBarRight>
    </div>
  );
}
