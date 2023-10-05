import { useMemo } from "react";
import { css, keyframes } from "@emotion/css";
import { getScrollbarSize } from "../window";
import { SlideshowTheme } from "./slideshow-theme.tsx";
import { useSlideshowTheme } from "./use-slideshow-theme.ts";

type FactoryFn<T> = (theme: SlideshowTheme) => T;

export function useSlideshowScreenClass() {
  return useThemeMemo(
    (theme) => css`
      height: ${theme.screen.height};
      width: ${theme.screen.width};
      position: relative;
      overflow: hidden;
      background-color: ${theme.screen.backgroundColor};
      color: ${theme.screen.color};
      line-height: ${theme.screen.lineHeight};

      &,
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
    `,
  );
}

export function useZoomedDragImageClass() {
  return css`
    position: absolute;
    opacity: 0;
    width: 1px;
    height: 1px;
  `;
}

export function useMetaClass() {
  return useThemeMemo(
    (theme) => css`
      opacity: 0;
      animation-delay: 0s;
      animation-duration: ${theme.meta.fadeDurationMillis}ms;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
      animation-timing-function: linear;

      // FIXME still required?
      &.fade-out {
        animation-name: fade-out;
      }

      &.fade-in {
        animation-name: fade-in;
      }
    `,
  );
}

export function useTopBarClass() {
  return useThemeMemo(
    (theme) => css`
      position: absolute;
      top: 0;
      left: 0;
      right: 0;

      background-color: ${theme.meta.barsBackgroundColor};

      display: flex;
      justify-content: space-between;

      // FIXME still required?
      &,
      & .btn-link {
        color: white;
        font-size: 0.8rem;
      }
    `,
  );
}

export function useTopBarMinimizedClass() {
  return css`
    right: auto !important;
  `;
}

export function useTopBarLeftClass() {
  return useThemeMemo(
    (theme) => css`
      display: flex;
      gap: ${theme.meta.topBarLeftChildrenGap};
      align-items: center;
      padding: ${theme.meta.topBarLeftChildrenPadding};
    `,
  );
}

export function useTopBarRightClass() {
  return useThemeMemo(
    (theme) => css`
      display: flex;
      gap: ${theme.meta.topBarRightChildrenGap};
      align-items: center;

      padding: ${theme.meta.topBarRightChildrenPadding};

      overflow: hidden;
    `,
  );
}

export function useBottomBarClass() {
  return useThemeMemo(
    (theme) => css`
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;

      background-color: ${theme.meta.barsBackgroundColor};
    }
    `,
  );
}

export function useThumbnailWrapperClass() {
  return useThemeMemo((theme) => {
    const size =
      theme.meta.thumbnailSizePx +
      theme.meta.thumbnailBorderSizePx * 2 +
      theme.meta.thumbnailPaddingPx * 2;

    return css`
      width: ${size}px;
      height: ${size}px;
      display: flex;
      align-items: center;
      padding: ${theme.meta.thumbnailPaddingPx}px;
      color: transparent;
    `;
  });
}

export function useThumbnailClass() {
  return useThemeMemo((theme) => {
    const maxSizePx = theme.meta.thumbnailSizePx;

    const size =
      !theme.meta.thumbnailFit ||
      theme.meta.thumbnailFit === "none" ||
      theme.meta.thumbnailFit === "unset"
        ? "auto"
        : maxSizePx + "px";

    return css`
      width: ${size};
      height: ${size};
      max-width: ${maxSizePx}px;
      max-height: ${maxSizePx}px;
      object-fit: ${theme.meta.thumbnailFit};
      margin: auto;
      border-style: solid;
      border-width: ${theme.meta.thumbnailBorderSizePx}px;
      border-color: transparent;
    `;
  });
}

export function useSelectedThumbnailClass() {
  return css`
    border-color: white !important;
  `;
}

export function useThumbnailsHorizontalListClass() {
  const outerThumbnailSize = useOuterThumbnailSize();
  return useThemeMemo(() => {
    return css`
      width: 100%;
      height: ${outerThumbnailSize + getScrollbarSize()}px;
      overflow-x: scroll;
    `;
  });
}

export function useOuterThumbnailSize() {
  return useThemeMemo((theme) => {
    return (
      theme.meta.thumbnailSizePx +
      theme.meta.thumbnailBorderSizePx * 2 +
      theme.meta.thumbnailPaddingPx * 2
    );
  });
}

export function useFadeOutClass() {
  const fadeOut = keyframes`
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  `;

  return css`
    animation-name: ${fadeOut};
  `;
}

export function useFadeInClass() {
  const fadeIn = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `;

  return css`
    animation-name: ${fadeIn};
  `;
}

export function useInvisibleClass() {
  return css`
    visibility: hidden !important;
  `;
}

export function useBtnClass() {
  return useThemeMemo((theme) => {
    const btn = theme.button;

    return css`
      &:not(:disabled) {
        cursor: pointer;
      }

      text-transform: none;
      margin: 0;
      font-family: inherit;

      display: inline-block;
      padding: ${btn.paddingY} ${btn.paddingX};
      font-size: ${btn.fontSize};
      font-weight: ${btn.fontWeight};
      color: ${btn.color};
      text-align: center;
      text-decoration: none;
      vertical-align: middle;
      cursor: pointer;
      user-select: none;
      border: ${btn.borderWidth} solid ${btn.borderColor};
      border-radius: ${btn.borderRadius};
      background-color: ${btn.backgroundColor};
      transition:
        color 0.15s ease-in-out,
        background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out,
        box-shadow 0.15s ease-in-out;

      &:hover {
        color: ${btn.hoverColor};
        background-color: ${btn.hoverBackgroundColor};
        border-color: ${btn.hoverBorderColor};
      }

      &:active,
      &.active {
        /* TODO */
        color: ${btn.activeColor};
        background-color: ${btn.activeBackgroundColor};
        border-color: ${btn.activeBorderColor};
      }

      &:focus:not(:focus-visible) {
        outline: 0;
      }

      &:focus-visible {
        color: ${btn.hoverColor};
        background-color: ${btn.hoverBackgroundColor};
        border-color: ${btn.hoverBorderColor};
        outline: 0;
        box-shadow: ${btn.focusBoxShadow};
      }

      &:disabled {
        opacity: ${btn.disabledOpacity};
        color: ${btn.disabledColor};
        background-color: ${btn.disabledBackgroundColor};
        border-color: ${btn.disabledBorderColor};
        cursor: default;
        pointer-events: none;
      }
    `;
  });
}

export function useBtnActiveClass() {
  return useThemeMemo((theme) => {
    const btn = theme.button;

    return css`
      color: ${btn.activeColor} !important;
      background-color: ${btn.activeBackgroundColor} !important;
      border-color: ${btn.activeBorderColor} !important;
    `;
  });
}

export function useIconClass() {
  return useThemeMemo((theme) => {
    let minHeight = theme.screen.lineHeight;

    if (minHeight === undefined || minHeight === null) {
      minHeight = "unset";
    } else if (typeof minHeight === "number" || minHeight.match(/^[\d.]+$/)) {
      minHeight = `${minHeight}em`;
    }

    return css`
      display: flex;
      min-height: ${minHeight};
      svg {
        width: 1em
      }
    `;
  });
}

function useThemeMemo<T>(fn: FactoryFn<T>): T {
  const theme = useSlideshowTheme();
  return useMemo(() => fn(theme), [theme, fn]);
}
