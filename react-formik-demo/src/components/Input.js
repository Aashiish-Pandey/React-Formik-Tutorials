import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
function Input(props) {
  const { label, name, ...rest } = props;
  return (
    <div className="form-control">
      <lable htmlFor={name}>{label}</lable>
      <Field id={name} name={name} {...rest} />
      {console.log(rest)}
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default Input;
