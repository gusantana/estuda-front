import { useField } from "@unform/core";
import { useEffect, useRef } from "react";

const Select = ({ name, children, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, clearError } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
    });
  }, [fieldName, registerField]);

  return (
    <select name={name} {...rest} ref={selectRef}>
      {children}
      {/* {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))} */}
    </select>
  );
};

export default Select;
