import { FC, HTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";
import styles from "./Button.module.scss";

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

export const Button: FC<PropsWithChildren<IButtonProps>> = ({
  children,
  className,
  disabled = false,
  ...rest
}) => {
  return (
    <button
      disabled={disabled}
      className={clsx(className, styles.btn, disabled && styles.disabled)}
      {...rest}
    >
      {children}
    </button>
  );
};
