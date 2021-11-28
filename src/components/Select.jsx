import ReactSelect from "react-select";
import { useField } from "@unform/core";import { useEffect, useRef } from "react";
;

const Select = ({ name, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, clearError } =
    useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef,
      getValue: ref => {
        if (ref.current.getValue()[0]) {
          return ref.current.getValue()[0].value;
        } 
        return null;
      },
      setValue: (ref, valor) => {
        ref.current.defaultValue = valor;
      }
    });
  }, [fieldName, registerField]);

  return (
    <ReactSelect
      defaultValue={defaultValue}
      ref={selectRef}
      classNamePrefix="react-select"
      placeholder="Selecione"
      onFocus={clearError}
      {...rest}
      isMulti={false}
    />
  );
};

export default Select;
