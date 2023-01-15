import useDependentState from "./use-dependent-state";
import { type Dispatch, type SetStateAction } from "react";

/**
 * Use a state that is reset to the given `resetState` whenever one
 * of the given `deps` changes.
 *
 * This is useful for state that is dependent on properties and
 * should be reset whenever properties change.
 */
export default function useResetState<T>(
  resetState: T,
  deps: unknown[]
): [T, Dispatch<SetStateAction<T>>] {
  return useDependentState(resetState, resetState, deps);
}
