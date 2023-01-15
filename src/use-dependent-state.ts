import { type Dispatch, type SetStateAction, useState } from "react";

const safeIsNaN =
  Number.isNaN ||
  // eslint-disable-next-line func-names
  function ponyfill(value) {
    // eslint-disable-next-line no-self-compare
    return typeof value === "number" && value !== value;
  };

function isEqual(first: unknown, second: unknown) {
  if (first === second) {
    return true;
  }

  if (safeIsNaN(first) && safeIsNaN(second)) {
    return true;
  }

  return false;
}

function areInputsEqual(newInputs: unknown[], lastInputs: unknown[]) {
  if (newInputs.length !== lastInputs.length) {
    return false;
  }

  for (let i = 0; i < newInputs.length; i++) {
    if (!isEqual(newInputs[i], lastInputs[i])) {
      return false;
    }
  }

  return true;
}

export default function useDependentState<T>(
  initialState: T,
  currentState: T,
  deps: unknown[]
): [T, Dispatch<SetStateAction<T>>] {
  const [prevDeps, setPrevDeps] = useState(deps);
  const [state, setState] = useState(initialState);

  if (!areInputsEqual(prevDeps, deps)) {
    setPrevDeps(deps);
    setState(currentState);
  }

  return [state, setState];
}
