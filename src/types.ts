export type SlideshowItem = {
  id: string;
  url: string;
  thumbnailUrl: string;
  thumbnail2xUrl?: string;
  mediaType?: string;
};

export type MinimalMainItem = Pick<SlideshowItem, "url" | "mediaType">;

export type ShortcutHandler<ItemT extends SlideshowItem = SlideshowItem> = (
  item: ItemT,
  e: KeyboardEvent
) => void;

export type ShortcutAction<ItemT extends SlideshowItem = SlideshowItem> = {
  handler: ShortcutHandler<ItemT>;
  stopPropagation?: boolean;
  preventDefault?: boolean;
};

export type ShortcutsByKey<ItemT extends SlideshowItem = SlideshowItem> =
  Record<
    string,
    | ShortcutHandler<ItemT>
    | ShortcutAction<ItemT>
    | Array<ShortcutHandler<ItemT> | ShortcutAction<ItemT>>
    | undefined
  >;
