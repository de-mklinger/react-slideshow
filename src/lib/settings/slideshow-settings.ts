import { SlideshowTheme } from "./slideshow-theme.tsx";
import { SlideshowBaseSettings } from "./slideshow-base-settings.ts";

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object | undefined
      ? RecursivePartial<T[P]>
      : T[P];
};

export type SlideshowBaseSettingsOverrides = RecursivePartial<SlideshowBaseSettings>;

export type SlideshowThemeOverrides = RecursivePartial<SlideshowTheme>;

export type SlideshowSettings = {
  base?: SlideshowBaseSettingsOverrides;
  theme?: {
    name?: "default";
    overrides?: SlideshowThemeOverrides;
  };
};
