import { type SlideshowItem } from "./types";

export type KeyHandler = (e: KeyboardEvent) => void;

export type ShortcutHandler<ItemT extends SlideshowItem = SlideshowItem> = (
  item: ItemT,
  e: KeyboardEvent
) => void;

type ShortcutAction<ItemT extends SlideshowItem = SlideshowItem> = {
  handler: ShortcutHandler<ItemT>;
  stopPropagation?: boolean;
  preventDefault?: boolean;
};

const defaultShortcutAction: ShortcutAction = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handler() {},
  stopPropagation: true,
  preventDefault: true,
};

export type ShortcutsByKey<ItemT extends SlideshowItem = SlideshowItem> =
  Record<
    string,
    | ShortcutHandler<ItemT>
    | ShortcutAction<ItemT>
    | Array<ShortcutHandler<ItemT> | ShortcutAction<ItemT>>
    | undefined
  >;

export type SlideshowShortcutsResult = {
  onShortcutKey: KeyHandler;
};

export function useSlideshowShortcuts<
  ItemT extends SlideshowItem = SlideshowItem
>(
  shortcutsByKey: ShortcutsByKey<ItemT>,
  item: ItemT
): SlideshowShortcutsResult {
  const onKey = (e: KeyboardEvent) => {
    let shortcuts = shortcutsByKey[e.key];
    if (!shortcuts) {
      return;
    }

    // Normalize shortcuts:

    if (!Array.isArray(shortcuts)) {
      shortcuts = [shortcuts];
    }

    const shortcutActions: Array<ShortcutAction<ItemT>> = [];

    for (const shortcut of shortcuts) {
      console.log("shortcut:", shortcut);

      const configuredShortcutAction: Partial<ShortcutAction<ItemT>> =
        typeof shortcut === "function"
          ? {
              handler: shortcut,
            }
          : shortcut;

      const shortcutAction: ShortcutAction<ItemT> = {
        ...defaultShortcutAction,
        ...configuredShortcutAction,
      };

      shortcutActions.push(shortcutAction);
    }

    // Execute shortcut(s):

    for (const shortcutAction of shortcutActions) {
      shortcutAction.handler(item, e);

      if (shortcutAction.stopPropagation === true) {
        e.stopPropagation();
      }

      if (shortcutAction.preventDefault === true) {
        e.preventDefault();
      }

      // Stop execution of subsequent actions, if default was prevented
      if (e.defaultPrevented) {
        break;
      }
    }
  };

  return {
    onShortcutKey: onKey,
  };
}

export function mergeShortcuts<ItemT extends SlideshowItem = SlideshowItem>(
  ...shortcuts: Array<ShortcutsByKey<ItemT>>
): ShortcutsByKey<ItemT> {
  const merged: ShortcutsByKey<ItemT> = {};

  for (const s of shortcuts) {
    for (const key of Object.keys(s)) {
      const newValue = s[key];

      if (!newValue) {
        continue;
      }

      if (key in merged) {
        const currentValue = merged[key];
        if (Array.isArray(currentValue)) {
          if (Array.isArray(newValue)) {
            currentValue.push(...newValue);
          } else {
            currentValue.push(newValue);
          }
        }
      } else {
        merged[key] = newValue;
      }
    }
  }

  return merged;
}
