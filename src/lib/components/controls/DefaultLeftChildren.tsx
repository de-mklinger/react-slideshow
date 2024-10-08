import {
  ToggleHideControlsButton,
  ToggleHideControlsButtonProps,
} from "./ToggleHideControlsButton";
import Button, { ButtonProps } from "./Button.tsx";
import Icon from "./Icon.tsx";
import {
  ArrowLeftSvg,
  ArrowRightSvg,
  ExpandSvg,
  PlaySvg,
  RepeatSvg,
  ShuffleSvg,
} from "./icons";

type DefaultLeftChildrenProps = {
  previous?: () => void;
  next?: () => void;
  random: boolean;
  toggleRandom: () => void;
  play: boolean;
  togglePlay: () => void;
  loop: boolean;
  toggleLoop: () => void;
  toggleFullscreen: () => void
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
  toggleFullscreen,
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
          if (previous) {
            previous();
          }
        }}
      />
      <NextButton
        disabled={!next}
        onClick={() => {
          if (next) {
            next();
          }
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
      <FullscreenButton
        onClick={() => {
          toggleFullscreen();
        }}
      />
    </>
  );
}

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

function FullscreenButton(props: ButtonProps) {
  return (
    <Button title="Fullscreen" {...props}>
      <Icon>
        <ExpandSvg />
      </Icon>
    </Button>
  );
}
