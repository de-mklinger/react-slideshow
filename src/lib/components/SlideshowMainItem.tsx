import { type CSSProperties, memo, type SyntheticEvent } from "react";
import { ImageProps, useImageProps } from "../lib/use-image-props.ts";
import { isVideo } from "../lib/util";
import { useSlideshowBaseSettings } from "../settings/use-slideshow-base-settings.ts";
import { type MinimalMainItem } from "../types";

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

  const imageProps = useSlideshowImageProps(visible);

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

  return (
    <img onLoad={onLoad} alt="" style={style} src={item.url} {...imageProps} />
  );
}

const SlideshowMainItem = memo(WrappedSlideshowMainItem);

export default SlideshowMainItem;

function useSlideshowImageProps(visible: boolean): ImageProps {
  const {
    visibleImageLoading,
    visibleImageDecoding,
    preloadImageLoading,
    thumbnailImageDecoding,
  } = useSlideshowBaseSettings();

  const imageLoading = visible ? visibleImageLoading : preloadImageLoading;
  const imageDecoding = visible ? visibleImageDecoding : thumbnailImageDecoding;

  return useImageProps(imageLoading, imageDecoding);
}
