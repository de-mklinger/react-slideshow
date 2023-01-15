import Alea from "alea";
import { useState } from "react";

type ShuffledIndices = {
  shuffledToUnshuffledIndices: number[];
  unshuffledToShuffledIndices: number[];
};

type ShuffledState<T> = {
  shuffledItems: T[];
} & ShuffledIndices;

export default function useShuffledArrayState<T>(items: T[]) {
  const [shuffledState, setShuffledState] = useState<
    ShuffledState<T> | undefined
  >();

  function getShuffledItemIdx(unshuffledItemIdx: number): number {
    if (!shuffledState) {
      return unshuffledItemIdx;
    }

    return shuffledState.unshuffledToShuffledIndices[unshuffledItemIdx];
  }

  function getUnshuffledItemIdx(shuffledItemIdx: number): number {
    if (!shuffledState) {
      return shuffledItemIdx;
    }

    return shuffledState.shuffledToUnshuffledIndices[shuffledItemIdx];
  }

  const toggleShuffled = (keepIdx: number) => {
    setShuffledState((oldShuffledState) => {
      if (oldShuffledState) {
        return undefined;
      }

      return newShuffledState(items, keepIdx);
    });
  };

  return {
    shuffledItems: shuffledState?.shuffledItems ?? items,
    getUnshuffledItemIdx,
    getShuffledItemIdx,
    toggleShuffled,
    isShuffled: Boolean(shuffledState),
  };
}

type AleaT = {
  uint32(): number;
};

function newShuffledState<T>(items: T[], keepIdx: number): ShuffledState<T> {
  // @ts-expect-error No TS for Alea
  const alea = new Alea() as AleaT;

  const shuffledToUnshuffledIndices = [];
  const unshuffledToShuffledIndices = [];
  const shuffledItems = [];

  const size = items.length;

  for (let idx = 0; idx < size; idx++) {
    if (idx === keepIdx) {
      shuffledToUnshuffledIndices[idx] = idx;
      unshuffledToShuffledIndices[idx] = idx;
      shuffledItems[idx] = items[idx];
    } else {
      let shuffledIdx;

      do {
        shuffledIdx = alea.uint32() % size;
      } while (
        shuffledIdx === keepIdx ||
        shuffledToUnshuffledIndices[shuffledIdx] !== undefined
      );

      shuffledToUnshuffledIndices[shuffledIdx] = idx;
      unshuffledToShuffledIndices[idx] = shuffledIdx;
      shuffledItems[shuffledIdx] = items[idx];
    }
  }

  return {
    shuffledToUnshuffledIndices,
    unshuffledToShuffledIndices,
    shuffledItems,
  };
}
