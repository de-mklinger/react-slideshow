import { useBtnIconSvgClass } from "../../theme";
import Button from "./Button.tsx";
import Icon from "./Icon.tsx";

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
      {hideControls ? <ShowIcon/> : "✖"}
    </Button>
  );
}

function ShowIcon() {
  const svgClass = useBtnIconSvgClass()

  return (
    <Icon>
      <svg className={svgClass} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 10">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1.707 2.707 5.586 5.586a1 1 0 0 0 1.414 0l5.586-5.586A1 1 0 0 0 13.586 1H2.414a1 1 0 0 0-.707 1.707Z"/>
      </svg>
    </Icon>
  )
}

// function HideIcon() {
//   const svgClass = useBtnIconSvgClass()
//
//   return (
//     <ButtonIcon>
//       <svg className={svgClass} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
//         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
//       </svg>
//     </ButtonIcon>
//   )
// }
