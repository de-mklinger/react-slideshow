import { useContext, useMemo } from "react";
import {
  SlideshowTheme,
  SlideshowThemeSettingsContext,
} from "./slideshow-theme.tsx";
import { defaultSlideshowTheme } from "./default-slideshow-theme.ts";

export function useSlideshowTheme(): SlideshowTheme {
  const settings = useContext(SlideshowThemeSettingsContext);

  return useMemo(() => {
    if (settings?.theme && settings.theme !== "default") {
      throw new Error("Unsupported theme: " + settings.theme);
    }

    if (!settings?.overrides) {
      return defaultSlideshowTheme;
    }

    const theme: SlideshowTheme = {
      screen: {
        ...defaultSlideshowTheme.screen,
        ...settings.overrides.screen,
      },
      meta: {
        ...defaultSlideshowTheme.meta,
        ...settings.overrides.meta,
      },
      button: {
        ...defaultSlideshowTheme.button,
        ...settings.overrides.button,
      },
    };

    return theme;
  }, [settings?.theme, settings?.overrides]);
}
