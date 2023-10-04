import { PropsWithChildren } from "react";
import { useTopBarLeftClass } from "../../theme";
export function TopBarLeft({ children }: PropsWithChildren) {
  const topBarLeftClass = useTopBarLeftClass();

  return <div className={topBarLeftClass}>{children}</div>;
}
