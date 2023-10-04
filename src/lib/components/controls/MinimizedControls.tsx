import {ToggleHideControlsButton, ToggleHideControlsButtonProps,} from "./ToggleHideControlsButton";
import {useHoverEffect} from "../../lib/use-hover-effect";
import {useMetaClass, useTopBarClass, useTopBarMinimizedClass,} from "../../theme";
import {stopPropagation} from "../../lib/stop-propagation";
import {TopBarLeft} from "./TopBarLeft";
import classNames from "classnames";

type MinimizedControlsProps = {
  className: string;
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
      onClick={stopPropagation}
    >
      <TopBarLeft>
        <ToggleHideControlsButton {...otherProps} />
      </TopBarLeft>
    </div>
  );
}
