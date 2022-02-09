import React ,{useState} from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import TextError from "./TextError";

const initialValues = {
  name: "ashish",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: ["888"],
};
const savedValues = {
  name: "ashish",
  email: "abc@gmail.com",
  channel: "sskjf",
  comments: "keu asf kasfh kashf kajsfh ",
  address: " gr noida ",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: ["888"],
};

const onSubmit = (values, onSubmitProp) => {
  console.log("form data", values);
  console.log("onSubmitProp", onSubmitProp)
  onSubmitProp.setSubmitting(false)
  onSubmitProp.resetForm()
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("invalid email format").required("Required"),
  channel: Yup.string().required("Required"),
});

const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Required";
  }

  return error;
};
function MyYouTubeForm() {
  const[formValues,setFormValues] = useState(null)
  return (
    <Formik
      initialValues={formValues || initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize
      // validateOnMount
    >
      {(formik) => {
        console.log("Formik Prps", formik);

        return (
          <Form>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component={TextError} />
            </div>
            <div className="form-control">
              <label htmlFor="email">E-mail</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email">
                {(errorMessage) => <div className="error">{errorMessage}</div>}
              </ErrorMessage>
            </div>
            <div className="form-control">
              <label htmlFor="channel">Channel</label>
              <Field type="text" id="channel" name="channel" />{" "}
              <ErrorMessage name="channel" />
            </div>

            <div className="form-control">
              <label htmlFor="comments">Comments</label>
              <Field
                as="textarea"
                id="comments"
                name="comments"
                validate={validateComments}
              />{" "}
              <ErrorMessage name="comments" component={TextError} />
            </div>
            <div className="form-control">
              <label htmlFor="address">Address</label>
              <FastField name="address">
                {(props) => {
                  console.log("Hello....");
                  const { field, form, meta } = props;
                  return (
                    <div>
                      <input type="text" id="address" {...field} />
                      {meta.touched && meta.error ? (
                        <div>{meta.error}</div>
                      ) : null}
                    </div>
                  );
                }}
              </FastField>
            </div>
            <div className="form-control">
              <label htmlFor="facebook">Facebook</label>
              <Field type="text" id="facebook" name="social.facebook" />{" "}
              <ErrorMessage name="social.facebook" />
            </div>
            <div className="form-control">
              <label htmlFor="twitter">Twitter</label>
              <Field type="text" id="twitter" name="social.twitter" />{" "}
              <ErrorMessage name="social.twitter" />
            </div>
            <div className="form-control">
              <label htmlFor="PhoneNo1">PrimaryPh </label>
              <Field type="text" id="PhoneNo1" name="phoneNumbers[0]" />{" "}
              <ErrorMessage name="social.twitter" />
            </div>
            <div className="form-control">
              <label htmlFor="PhoneNo2">Alternate Phone </label>
              <Field type="text" id="PhoneNo2" name="phoneNumbers[1]" />{" "}
              <ErrorMessage name="social.twitter" />
            </div>
            <div className="form-control">
              <lable>List of Phone numbers</lable>
              <FieldArray name="phNumbers">
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps;
                  console.log("form errors", form.errors);
                  console.log(fieldArrayProps);
                  const { values } = form;
                  const { phNumbers } = values;
                  return (
                    <div>
                      {phNumbers.map((phNumber, index) => (
                        <div key={index}>
                          <Field name={`phNumber[${index}]`} />
                          {index > 0 && (
                            <button type="button" onClick={() => remove(index)}>
                              -
                            </button>
                          )}
                          <button type="button" onClick={() => push("")}>
                            +
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
            </div>
            {/* <button onClick={() => formik.validateField("comments")}>
              Validate Comments
            </button>
            <button onClick={() => formik.validateForm()}> validate All</button> */}

            <button type ="button" onClick={()=>setFormValues(savedValues)}>Load saved data </button>
            <button type ="reset">Reset</button>

            <button disabled ={!formik.isValid && formik.isSubmitting}>Submit</button>

          </Form>
        );
      }}
    </Formik>
  );
}

export default MyYouTubeForm;
