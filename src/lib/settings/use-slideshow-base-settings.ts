import { useContext, useMemo } from "react";
import { SlideshowSettingsContext } from "./slideshow-settings-context.ts";
import { SlideshowBaseSettings } from "./slideshow-base-settings.ts";
import { defaultSlideshowBaseSettings } from "./default-slideshow-base-settings.ts";

export function useSlideshowBaseSettings(): SlideshowBaseSettings {
  const settings = useContext(SlideshowSettingsContext);

  return useMemo(
    () => ({
      ...defaultSlideshowBaseSettings,
      ...settings?.base,
    }),
    [settings?.base],
  );
}
