import { useField } from "@unform/core";
import React, { RefObject, useEffect, useRef } from "react";

interface Props {
  name: string;
}

type InputProps = JSX.IntrinsicElements["input"] & Props;

const Input: React.FC<InputProps> = ({ name, ...rest }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current?.value == "" ? null : ref.current?.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = "";
      },
    });
  }, [fieldName, registerField]);

  return <input name={fieldName} {...rest} id={fieldName} ref={inputRef}/>;
};

export default Input;
