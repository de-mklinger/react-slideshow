import { type SlideshowItem } from "../../types";
import { BottomBar, BottomBarProps } from "./BottomBar";
import { MinimizedControls } from "./MinimizedControls";
import { ToggleHideControlsButtonProps } from "./ToggleHideControlsButton";
import { TopBar, TopBarProps } from "./TopBar";

type SlideshowControlsProps<ItemT extends SlideshowItem = SlideshowItem> =
  TopBarProps<ItemT> & BottomBarProps<ItemT> & ToggleHideControlsButtonProps;

export default function SlideshowControls<
  ItemT extends SlideshowItem = SlideshowItem,
>(props: SlideshowControlsProps<ItemT>) {
  if (props.hideControls) {
    return <MinimizedControls {...props} />;
  }

  return (
    <>
      <TopBar {...props} />
      <BottomBar {...props} />
    </>
  );
}
