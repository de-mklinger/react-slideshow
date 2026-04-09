import classNames from "classnames";
import { useHoverEffect } from "../../lib/use-hover-effect";
import { stopPropagation } from "../../lib/util.ts";
import {
  useMetaClass,
  useTopBarClass,
  useTopBarMinimizedClass,
} from "../../settings";
import {
  ToggleHideControlsButton,
  ToggleHideControlsButtonProps,
} from "./ToggleHideControlsButton";
import { TopBarLeft } from "./TopBarLeft";

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
      className={classNames(
        metaClass,
        topBarClass,
        topBarMinimizedClass,
        className,
      )}
      ref={barRef}
      onClick={stopPropagation}
    >
      <TopBarLeft>
        <ToggleHideControlsButton {...otherProps} />
      </TopBarLeft>
    </div>
  );
}
