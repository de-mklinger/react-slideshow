import { PropsWithChildren } from "react";
import { useTopBarLeftClass } from "../../settings";
export function TopBarLeft({ children }: PropsWithChildren) {
  const topBarLeftClass = useTopBarLeftClass();

  return <div className={topBarLeftClass}>{children}</div>;
}
