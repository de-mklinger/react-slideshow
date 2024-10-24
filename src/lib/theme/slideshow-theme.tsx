import { createContext, CSSProperties, PropsWithChildren } from "react";

export type SlideshowTheme = {
  screen: {
    width: CSSProperties["width"];
    height: CSSProperties["height"];
    backgroundColor: CSSProperties["backgroundColor"];
    color: CSSProperties["color"];
    lineHeight: CSSProperties["lineHeight"];
  };
  meta: {
    hideEnabled: boolean;
    hideDelayMillis: number;
    fadeDurationMillis: number;
    barsBackgroundColor: CSSProperties["backgroundColor"];
    barsColor: CSSProperties["color"];
    barsFontSize: CSSProperties["fontSize"];
    topBarLeftChildrenPadding: CSSProperties["padding"];
    topBarLeftChildrenGap: CSSProperties["gap"];
    topBarRightChildrenPadding: CSSProperties["padding"];
    topBarRightChildrenGap: CSSProperties["gap"];
    thumbnailSizePx: number;
    thumbnailBorderSizePx: number;
    thumbnailPaddingPx: number;
    thumbnailFit: CSSProperties["objectFit"] | undefined;
  };
  button: {
    paddingX: string;
    paddingY: string;
    fontSize: CSSProperties["fontSize"];
    fontWeight: CSSProperties["fontWeight"];
    // color: var(--bs-body-color);
    // backgroundColor: transparent;
    borderWidth: CSSProperties["borderWidth"];
    // borderColor: transparent;
    borderRadius: CSSProperties["borderRadius"];
    // hoverBorderColor: transparent;
    boxShadow: CSSProperties["boxShadow"];
    disabledOpacity: CSSProperties["opacity"];
    focusBoxShadow: CSSProperties["boxShadow"];

    // ----
    color: CSSProperties["color"];
    backgroundColor: CSSProperties["color"];
    borderColor: CSSProperties["color"];
    hoverColor: CSSProperties["color"];
    hoverBackgroundColor: CSSProperties["color"];
    hoverBorderColor: CSSProperties["color"];
    // focusShadowColor: 66, 70, 73;
    activeColor: CSSProperties["color"];
    activeBackgroundColor: CSSProperties["color"];
    activeBorderColor: CSSProperties["color"];
    activeShadow: string; // TODO
    disabledColor: CSSProperties["color"];
    disabledBackgroundColor: CSSProperties["color"];
    disabledBorderColor: CSSProperties["color"];
  };
};

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object | undefined
      ? RecursivePartial<T[P]>
      : T[P];
};

export type SlideshowThemeOverrides = RecursivePartial<SlideshowTheme>;

export type SlideshowThemeSettingsContextType = {
  theme?: "default";
  overrides?: SlideshowThemeOverrides;
};

export const SlideshowThemeSettingsContext = createContext<
  SlideshowThemeSettingsContextType | undefined
>(undefined);

export type SlideshowThemeSettingsProps =
  PropsWithChildren<SlideshowThemeSettingsContextType>;

export const SlideshowThemeSettings = ({
  theme,
  overrides,
  children,
}: SlideshowThemeSettingsProps) => {
  return (
    <SlideshowThemeSettingsContext.Provider value={{ theme, overrides }}>
      {children}
    </SlideshowThemeSettingsContext.Provider>
  );
};
