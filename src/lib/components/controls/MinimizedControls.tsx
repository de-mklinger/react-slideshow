import {
  ToggleHideControlsButton,
  ToggleHideControlsButtonProps,
} from "./ToggleHideControlsButton";
import { useHoverEffect } from "../../lib/use-hover-effect";
import {
  useMetaClass,
  useTopBarClass,
  useTopBarMinimizedClass,
} from "../../theme";
import { TopBarLeft } from "./TopBarLeft";
import classNames from "classnames";
import { stopEvent } from "../../lib/util.ts";

type MinimizedControlsProps = {
  className?: string;
  onMouseOver: () => void;
  onMouseOut: () => void;
} & ToggleHideControlsButtonProps;

export function MinimizedControls({
  className,
  onMouseOver,
  onMouseOut,
  ...otherProps
}: MinimizedControlsProps) {
  const barRef = useHoverEffect<HTMLDivElement>(onMouseOver, onMouseOut);

  const metaClass = useMetaClass();
  const topBarClass = useTopBarClass();
  const topBarMinimizedClass = useTopBarMinimizedClass();

  return (
    <div
      className={classNames(metaClass, topBarClass, topBarMinimizedClass, className)}
      ref={barRef}
      onClick={stopEvent}
    >
      <TopBarLeft>
        <ToggleHideControlsButton {...otherProps} />
      </TopBarLeft>
    </div>
  );
}
