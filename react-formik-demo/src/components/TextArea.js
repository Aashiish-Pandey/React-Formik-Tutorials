import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

function TextArea(props) {
  const { lable, name, ...rest } = props;
  return (
    <div className="form-control">
      <lable htmlFor={name}>{lable}</lable>
      <Field as="textarea" id={name} name={name} {...rest} />
      <ErrorMessage name ={name} component={TextError} />
    </div>
  );
}

export default TextArea;
