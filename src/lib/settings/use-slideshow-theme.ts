import { useContext, useMemo } from "react";
import {
  SlideshowTheme,
} from "./slideshow-theme.tsx";
import { defaultSlideshowTheme } from "./default-slideshow-theme.ts";
import { SlideshowSettingsContext } from "./slideshow-settings-context.ts";

export function useSlideshowTheme(): SlideshowTheme {
  const settings = useContext(SlideshowSettingsContext);

  return useMemo(() => {
    if (settings?.theme?.name && settings.theme?.name !== "default") {
      throw new Error("Unsupported theme: " + settings.theme.name);
    }

    const overrides = settings?.theme?.overrides;

    if (!overrides) {
      return defaultSlideshowTheme;
    }

    const theme: SlideshowTheme = {
      screen: {
        ...defaultSlideshowTheme.screen,
        ...overrides.screen,
      },
      meta: {
        ...defaultSlideshowTheme.meta,
        ...overrides.meta,
      },
      button: {
        ...defaultSlideshowTheme.button,
        ...overrides.button,
      },
    };

    return theme;
  }, [settings?.theme?.name, settings?.theme?.overrides]);
}
