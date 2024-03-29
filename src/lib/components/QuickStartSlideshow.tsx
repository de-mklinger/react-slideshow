import { useState } from "react";
import { Slideshow, type SlideshowProps } from "./Slideshow";
import { type MinimalMainItem, type SlideshowItem } from "../types";
import SlideshowMainItem from "./SlideshowMainItem";
import {
  UnmanagedSlideshow,
  type UnmanagedSlideshowProps,
} from "./UnmanagedSlideshow";
import {useSlideshowScreenClass} from "../theme/use-slideshow-classes.ts";

export function QuickStartSlideshow<
  ItemT extends SlideshowItem = SlideshowItem,
>(props: SlideshowProps<ItemT>) {
  const [initialItemLoaded, setInitialItemLoaded] = useState<boolean>(false);

  if (initialItemLoaded) {
    return <Slideshow {...props} />;
  }

  console.log("Render placeholder");
  const initialItem = props.items[props.itemIdx ?? 0];
  return (
    <SlideshowPlaceholder
      item={initialItem}
      onLoad={() => {
        console.log("Initial item loaded");
        setInitialItemLoaded(true);
      }}
    />
  );
}

export function UnmanagedQuickStartSlideshow<
  ItemT extends SlideshowItem = SlideshowItem,
>(props: UnmanagedSlideshowProps<ItemT>) {
  const [initialItemLoaded, setInitialItemLoaded] = useState<boolean>(false);

  if (initialItemLoaded) {
    return <UnmanagedSlideshow {...props} />;
  }

  console.log("Render placeholder");
  const initialItem = props.items[props.itemIdx ?? 0];
  return (
    <SlideshowPlaceholder
      item={initialItem}
      onLoad={() => {
        console.log("Initial item loaded");
        setInitialItemLoaded(true);
      }}
    />
  );
}

type SlideshowPlaceholderProps = {
  item: MinimalMainItem;
  onLoad?: () => void;
};

export function SlideshowPlaceholder({
  item,
  onLoad,
}: SlideshowPlaceholderProps) {
  const slideshowScreenClass = useSlideshowScreenClass();

  return (
    <div className={slideshowScreenClass}>
      <SlideshowMainItem item={item} onLoad={onLoad} />
    </div>
  );
}
