// Custom comparison function for React.memo().
// It knows to compare individual style props and ignore the wrapper object.
// See https://reactjs.org/docs/react-api.html#reactmemo
import shallowDiffers from "./shallowDiffers";

export type PropsWithStyle = {
  [key: string]: unknown;
  style?: Record<string, string>;
};

export default function areEqual(
  prevProps: PropsWithStyle,
  nextProps: PropsWithStyle,
): boolean {
  const { style: prevStyle = {}, ...prevRest } = prevProps;
  const { style: nextStyle = {}, ...nextRest } = nextProps;

  return (
    !shallowDiffers(prevStyle, nextStyle) && !shallowDiffers(prevRest, nextRest)
  );
}
