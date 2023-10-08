import {
  ToggleHideControlsButton,
  ToggleHideControlsButtonProps,
} from "./ToggleHideControlsButton";
import Button, { ButtonProps } from "./Button.tsx";
import Icon from "./Icon.tsx";
import {ArrowLeftSvg, ArrowRightSvg, PlaySvg, RepeatSvg, ShuffleSvg} from "./icons";

type DefaultLeftChildrenProps = {
  previous?: () => void;
  next?: () => void;
  random: boolean;
  toggleRandom: () => void;
  play: boolean;
  togglePlay: () => void;
  loop: boolean;
  toggleLoop: () => void;
} & ToggleHideControlsButtonProps;

export function DefaultLeftChildren({
  hideControls,
  previous,
  next,
  toggleHideControls,
  random,
  toggleRandom,
  play,
  togglePlay,
  loop,
  toggleLoop,
}: DefaultLeftChildrenProps) {
  return (
    <>
      <ToggleHideControlsButton
        hideControls={hideControls}
        toggleHideControls={toggleHideControls}
      />
      <PreviousButton
        disabled={!previous}
        onClick={() => {
          previous && previous();
        }}
      />
      <NextButton
        disabled={!next}
        onClick={() => {
          next && next();
        }}
      />
      <PlayButton
        active={play}
        onClick={() => {
          togglePlay();
        }}
      />
      <LoopButton
        active={loop}
        onClick={() => {
          toggleLoop();
        }}
      />
      <RandomButton
        active={random}
        onClick={() => {
          toggleRandom();
        }}
      />
    </>
  );
}

// SVGs from https://flowbite.com/icons/

function PreviousButton(props: ButtonProps) {
  return (
    <Button title="Previous" {...props}>
      <Icon>
        <ArrowLeftSvg />
      </Icon>
    </Button>
  );
}

function NextButton(props: ButtonProps) {
  return (
    <Button title="Next" {...props}>
      <Icon>
        <ArrowRightSvg />
      </Icon>
    </Button>
  );
}

function PlayButton(props: ButtonProps) {
  return (
    <Button title="Play" {...props}>
      <Icon>
        <PlaySvg />
      </Icon>
    </Button>
  );
}

function LoopButton(props: ButtonProps) {
  return (
    <Button title="Loop" {...props}>
      <Icon>
        <RepeatSvg />
      </Icon>
    </Button>
  );
}

function RandomButton(props: ButtonProps) {
  return (
    <Button title="Random" {...props}>
      <Icon>
        <ShuffleSvg />
      </Icon>
    </Button>
  );
}
