import { FC, KeyboardEventHandler, WheelEventHandler } from "react";
import { useFormContext, useController } from "react-hook-form";

import styles from "./Input.module.scss";

interface IInputProps {
  type?: "text" | "number";
  title: string;
  name: string;
  placeholder: string;
}

export const Input: FC<IInputProps> = ({
  type = "text",
  title,
  placeholder,
  name,
}) => {
  const { control } = useFormContext();

  const {
    field: { value, ref, onChange },
    fieldState: { error },
  } = useController({ control, name });

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (type === "number") {
      const exceptThisSymbols = ["e", "E", "+", "-", "."];
      if (
        e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        exceptThisSymbols.includes(e.key)
      ) {
        e.preventDefault();
      }
    }
  };

  const handleWheel: WheelEventHandler<HTMLInputElement> = (e) => {
    e.currentTarget.blur();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <p>{title}</p>
      </div>
      <input
        value={value}
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
        onChange={onChange}
        ref={ref}
        className={styles.input}
        type={type}
        placeholder={placeholder}
      />
      {error?.message && <p className={styles.error}>{error?.message}</p>}
    </div>
  );
};
