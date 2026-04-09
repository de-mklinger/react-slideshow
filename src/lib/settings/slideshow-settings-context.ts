import { createContext } from "react";
import { SlideshowSettings } from "./slideshow-settings.ts";

export const SlideshowSettingsContext = createContext<
  SlideshowSettings | undefined
>(undefined);
