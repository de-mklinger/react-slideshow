import {useRef, useState} from "react";

type HTMLOrSVGElement = HTMLElement | SVGElement;

type FadeState = "show" | "fade-out" | "fade-in" | "hide";

type TimeoutId = ReturnType<typeof setTimeout>;

type State = {
  rootRef: HTMLOrSVGElement | null,
  disableFadeRefs: Map<DisableFadeRefId, HTMLOrSVGElement>
  nextDisableFadeRefId: DisableFadeRefId,
  transitionTarget: FadeState
  transitionTimeoutId: TimeoutId | undefined,
  fadeState: FadeState
}

type DisableFadeRefId = number;

type Result = {
  fadeState: FadeState,
  show: () => void
  hide: () => void,
  setRootRef: (rootRef: HTMLOrSVGElement | null) => void,
  addDisableFadeRef: (disableFadeRef: HTMLOrSVGElement) => DisableFadeRefId,
  removeDisableFadeRef: (disableFadeRefId: DisableFadeRefId) => void
}

export function useSlideshowMetaFade2(
  hideDelayMillis: number,
  fadeDurationMillis: number,
): Result {
  const [renderFadeState, setRenderFadeState] = useState<FadeState>("hide");

  const state = useRef<State>({
    rootRef: null,
    disableFadeRefs: new Map(),
    nextDisableFadeRefId: 1,
    transitionTimeoutId: undefined,
    transitionTarget: "hide",
    fadeState: "hide"
  })

  const clearTransitionTimeout = () => {
    if (state.current.transitionTimeoutId) {
      clearTimeout(state.current.transitionTimeoutId);
      state.current.transitionTimeoutId = undefined;
    }
  }

  const show = () => {
    if (state.current.fadeState === "show") {
      prepareState("fade-out", hideDelayMillis);
    } else if (state.current.fadeState !== "fade-in") {
      setState("fade-in");
    }
  }

  const hide = () => {
    if (state.current.fadeState !== "hide" && state.current.fadeState !== "fade-out") {
      setState("fade-out")
    }
  }

  const setState = (newState: FadeState) => {
    if (state.current.fadeState !== newState) {
      state.current.fadeState = newState;
      setRenderFadeState(newState);
      switch (newState) {
        case "show": {
          prepareState("fade-out", hideDelayMillis);
          break;
        }
        case "fade-out": {
          prepareState("hide", fadeDurationMillis);
          break;
        }
        case "fade-in": {
          prepareState("show", fadeDurationMillis);
          break;
        }
      }
    }
  }

  const prepareState = (toState: FadeState, timeoutMillis: number) => {
    // console.log("prepare", toState, "in", timeoutMillis)

    clearTransitionTimeout();

    state.current.transitionTimeoutId = setTimeout(
      () => {
        setState(toState);
      },
      timeoutMillis
    );
  }

  const removeListeners = () => {
    // TODO
    // console.log("Remove listeners");
  }

  const addListeners = () => {
    // console.log("Add listeners");

    if (state.current.rootRef) {
      state.current.rootRef.addEventListener("mousemove", () => {
        // console.log("move");
        show();
      });
    }
  }

  return {
    fadeState: renderFadeState,
    show,
    hide,
    setRootRef: (ref) => {
      removeListeners();
      state.current.rootRef = ref;
      addListeners();
    },
    addDisableFadeRef: (ref) => {
      removeListeners();
      const id = state.current.nextDisableFadeRefId;
      state.current.nextDisableFadeRefId++;
      state.current.disableFadeRefs.set(id, ref);
      addListeners();
      return id;
    },
    removeDisableFadeRef: (id) => {
      removeListeners();
      state.current.disableFadeRefs.delete(id);
      addListeners();
    }
  }
}
