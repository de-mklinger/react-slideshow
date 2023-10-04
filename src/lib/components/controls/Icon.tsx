import {PropsWithChildren} from "react";
import {useIconClass} from "../../theme";

export default function Icon({children}: PropsWithChildren) {
  const btnIconClass = useIconClass();

  return (
    <span className={btnIconClass}>
      {children}
    </span>
  )
}
