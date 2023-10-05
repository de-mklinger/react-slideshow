import {
  ToggleHideControlsButton,
  ToggleHideControlsButtonProps,
} from "./ToggleHideControlsButton";
import Button, { ButtonProps } from "./Button.tsx";
import Icon from "./Icon.tsx";

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
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 5H1m0 0 4 4M1 5l4-4"
          />
        </svg>
      </Icon>
    </Button>
  );
}

function NextButton(props: ButtonProps) {
  return (
    <Button title="Next" {...props}>
      <Icon>
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Icon>
    </Button>
  );
}

function PlayButton(props: ButtonProps) {
  return (
    <Button title="Play" {...props}>
      <Icon>
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1.984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L2.506 1.139A1 1 0 0 0 1 1.984Z"
          />
        </svg>
      </Icon>
    </Button>
  );
}

function LoopButton(props: ButtonProps) {
  return (
    <Button title="Loop" {...props}>
      <Icon>
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 14 3-3m-3 3 3 3m-3-3h16v-3m2-7-3 3m3-3-3-3m3 3H3v3"
          />
        </svg>
      </Icon>
    </Button>
  );
}

function RandomButton(props: ButtonProps) {
  return (
    <Button title="Random" {...props}>
      <Icon>
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11.484 6.166 13 4h6m0 0-3-3m3 3-3 3M1 14h5l1.577-2.253M1 4h5l7 10h6m0 0-3 3m3-3-3-3"
          />
        </svg>
      </Icon>
    </Button>
  );
}
