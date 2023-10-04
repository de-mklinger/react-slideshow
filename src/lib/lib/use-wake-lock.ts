import { useRef } from "react";

export function useWakeLock(enabled: boolean) {
  const wakeLockSentinel = useRef<WakeLockSentinel>();

  if (enabled && navigator.wakeLock && wakeLockSentinel.current === null) {
    navigator.wakeLock
      .request("screen")
      .then((wls) => {
        wakeLockSentinel.current = wls;
      })
      .catch((err) => {
        wakeLockSentinel.current = undefined;
        console.error(err);
      });
  }

  if (!enabled && wakeLockSentinel.current) {
    wakeLockSentinel.current.release().catch((err) => {
      console.error(err);
    });
    wakeLockSentinel.current = undefined;
  }
}
