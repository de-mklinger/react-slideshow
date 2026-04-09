import { PropsWithChildren } from "react";
import { SlideshowSettingsContext } from "./slideshow-settings-context.ts";
import { type SlideshowSettings } from "./slideshow-settings.ts";

export type SlideshowThemeSettingsProps = PropsWithChildren<{
  settings: SlideshowSettings;
}>;

export const SlideshowSettingsProvider = ({
  children,
  settings
}: SlideshowThemeSettingsProps) => {
  return (
    <SlideshowSettingsContext.Provider value={settings}>
      {children}
    </SlideshowSettingsContext.Provider>
  );
};
