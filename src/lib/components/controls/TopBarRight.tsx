import { PropsWithChildren } from "react";
import { useTopBarRightClass } from "../../theme";
export function TopBarRight({ children }: PropsWithChildren) {
  const topBarRightClass = useTopBarRightClass();

  return <div className={topBarRightClass}>{children}</div>;
}
