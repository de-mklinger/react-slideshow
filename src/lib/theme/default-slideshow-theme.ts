import {SlideshowTheme} from "./slideshow-theme.tsx";

export const defaultSlideshowTheme: SlideshowTheme = {
  screen: {
    width: "100%",
    height: "100vh",
    backgroundColor: "black",
    color: "white",
    lineHeight: 1.5,
  },
  meta: {
    hideEnabled: true,
    hideDelayMillis: 2000,
    fadeDurationMillis: 200,
    barsBackgroundColor: "rgba(0, 0, 0, 0.3)",
    topBarLeftChildrenPadding: "0.5rem 0.25rem",
    topBarLeftChildrenGap: "0.25rem",
    topBarRightChildrenPadding: "0.5rem 1.5rem",
    topBarRightChildrenGap: "1rem",
    thumbnailSizePx: 200,
    thumbnailBorderSizePx: 2,
    thumbnailPaddingPx: 4,
    thumbnailFit: undefined,
  },
  button: {
    // common:
    paddingX: "0.75rem",
    paddingY: "0.375rem",
    fontSize: "1rem",
    fontWeight: 400,
    // color: var(--bs-body-color);
    // backgroundColor: transparent;
    borderWidth: "1px",
    // borderColor: transparent;
    borderRadius: "0.375rem",
    // hoverBorderColor: "transparent",
    boxShadow:
      "inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075)",
    disabledOpacity: 0.65,
    focusBoxShadow: "0 0 0 0.25rem rgba(66, 70, 73, .5)",
    // dark:
    color: "#fff",
    backgroundColor: "#212529",
    borderColor: "#212529",
    hoverColor: "#fff",
    hoverBackgroundColor: "#424649",
    hoverBorderColor: "#373b3e",
    // focusShadowRgb: 66, 70, 73,
    activeColor: "#fff",
    activeBackgroundColor: "#4d5154",
    activeBorderColor: "#373b3e",
    activeShadow: "inset 0 3px 5px rgba(0, 0, 0, 0.125)",
    disabledColor: "#fff",
    disabledBackgroundColor: "#212529",
    disabledBorderColor: "#212529",
  },
};
