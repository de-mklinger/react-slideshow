import { ImgHTMLAttributes, useMemo } from "react";

export type ImageProps = Pick<
  ImgHTMLAttributes<HTMLImageElement>,
  "loading" | "decoding"
>;

export function useImageProps(
  imageLoading?: "eager" | "lazy" | "unset",
  imageDecoding?: "async" | "sync" | "auto" | "unset",
): ImageProps {
  return useMemo(() => {
    const staticImgProps: ImageProps = {};

    if (imageLoading && imageLoading !== "unset") {
      staticImgProps.loading = imageLoading;
    }

    if (imageDecoding && imageDecoding !== "unset") {
      staticImgProps.decoding = imageDecoding;
    }

    return staticImgProps;
  }, [imageLoading, imageDecoding]);
}
