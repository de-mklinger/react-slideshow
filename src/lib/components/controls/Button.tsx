import { useBtnActiveClass, useBtnClass } from "../../theme";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import classNames from "classnames";

export type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    active?: boolean;
  }
>;

export default function Button({active, className, children, ...props}: ButtonProps) {
  const btnClass = useBtnClass();
  const btnActiveClass = useBtnActiveClass();

  return (
    <button
      className={classNames(btnClass, { [btnActiveClass]: active }, className)}
      aria-pressed={active}
      {...props}
    >
      {children}
    </button>
  )
}
