import Button from "./Button.tsx";
import Icon from "./Icon.tsx";
import { CaretDownSvg, CaretUpSvg } from "./icons";

export type ToggleHideControlsButtonProps = {
  hideControls: boolean;
  toggleHideControls: () => void;
};

export function ToggleHideControlsButton({
  hideControls,
  toggleHideControls,
}: ToggleHideControlsButtonProps) {
  return (
    <Button
      onClick={() => {
        toggleHideControls();
      }}
    >
      {hideControls ? <ShowIcon /> : <HideIcon />}
    </Button>
  );
}

function ShowIcon() {
  return (
    <Icon>
      <CaretDownSvg />
    </Icon>
  );
}

function HideIcon() {
  return (
    <Icon>
      <CaretUpSvg />
    </Icon>
  );
}
