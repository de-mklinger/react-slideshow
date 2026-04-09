import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import { useIconClass } from "../../settings";

export default function Icon({
  children,
  className,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLSpanElement>>) {
  const btnIconClass = useIconClass();

  return (
    <span className={classNames(btnIconClass, className)} {...props}>
      {children}
    </span>
  );
}
