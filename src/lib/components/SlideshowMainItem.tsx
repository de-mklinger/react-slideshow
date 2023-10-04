import { type CSSProperties, memo, type SyntheticEvent } from "react";
import { type MinimalMainItem } from "../types";
import { isVideo } from "../lib/util";

export type SlideshowMainItemProps = {
  item: MinimalMainItem;
  scale?: string;
  translateX?: string;
  translateY?: string;
  visible?: boolean;
  onLoad?: (e: SyntheticEvent<HTMLImageElement | HTMLVideoElement>) => void;
};

const defaultStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
};

const invisibleStyle: CSSProperties = {
  ...defaultStyle,
  position: "absolute",
  top: "10px",
  left: "10px",
  width: "1px",
  height: "1px",
  zIndex: "-1",
  opacity: "0",
  pointerEvents: "none",
};

function WrappedSlideshowMainItem({
  item,
  scale,
  translateX,
  translateY,
  visible = true,
  onLoad,
}: SlideshowMainItemProps) {
  let style;
  if (visible) {
    style = { ...defaultStyle };

    if (scale) {
      style.scale = scale;
    }

    if (translateX && translateY) {
      style.transform = `translate(${translateX}, ${translateY})`;
    }
  } else {
    style = invisibleStyle;
  }

  if (isVideo(item)) {
    return (
      <video
        onCanPlayThrough={onLoad}
        controls
        muted
        loop
        autoPlay={visible}
        style={style}
        src={item.url}
      />
    );
  }

  return <img onLoad={onLoad} alt="" style={style} src={item.url} />;
}

const SlideshowMainItem = memo(WrappedSlideshowMainItem);

export default SlideshowMainItem;
