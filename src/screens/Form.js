import React from "react";
import { Formik, Form, Field } from "formik";
import Select from "react-select";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  topics: Yup.array()
    .min(3, "Pick at least 3 tags")
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      })
    )
    .required("Required"),
  agree: Yup.bool()
    .oneOf([true], "Accept Terms & Conditions is required")
    .required("Accept Terms & Conditions is required"),
});

const ValidationSchemaExample = () => {
  return (
    <div>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Signup
      </h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          console.log(values);
          alert(JSON.stringify(values))
        }}
      >
        {({
          errors,
          touched,
          values,
          handleBlur,
          handleChange,
          setFieldTouched,
          setFieldValue,
        }) => (
          <Form>
            <div>
              <label
                style={{
                  color: "darkblue",
                  fontSize: 18,
                  fontWeight: "bold",
                  width: "150px",
                }}
              >
                first name:
              </label>
              <Field name="firstName" />
              {errors.firstName && touched.firstName ? (
                <div style={{ fontWeight: "bold", color: "red" }}>
                  *{errors.firstName}
                </div>
              ) : null}
            </div>
            <div>
              <label
                style={{
                  color: "darkblue",
                  fontSize: 18,
                  fontWeight: "bold",
                  width: "150px",
                }}
              >
                last name:
              </label>
              <Field name="lastName" />
              {errors.lastName && touched.lastName ? (
                <div style={{ fontWeight: "bold", color: "red" }}>
                  *{errors.lastName}
                </div>
              ) : null}
            </div>
            <div>
              <label
                style={{
                  color: "darkblue",
                  fontSize: 18,
                  fontWeight: "bold",
                  width: "150px",
                }}
              >
                Email :
              </label>

              <Field name="email" type="email" />
              {errors.email && touched.email ? (
                <div style={{ fontWeight: "bold", color: "red" }}>
                  *{errors.email}
                </div>
              ) : null}
            </div>
            <div>
              <MySelect
                value={values.topics}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.topics}
                touched={touched.topics}
              />
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Field name="agree" type="checkbox" />
                <p style={{ margin: 0 }}> agree to terms and conditions</p>
              </div>
              {errors.agree ? (
                <div style={{ fontWeight: "bold", color: "red" }}>
                  *{errors.agree}
                </div>
              ) : null}
            </div>
            <button type="submit" style={{ marginLeft: "120px" }}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const options = [
  { value: "Food", label: "Food" },
  { value: "Being Fabulous", label: "Being Fabulous" },
  { value: "Ken Wheeler", label: "Ken Wheeler" },
  { value: "ReasonML", label: "ReasonML" },
  { value: "Unicorns", label: "Unicorns" },
  { value: "Kittens", label: "Kittens" },
];

function MySelect(props) {
  const handleChange = (value) => {
    props.onChange("topics", value);
  };

  const handleBlur = () => {
    props.onBlur("topics", true);
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <label htmlFor="color">Topics (select at least 3) </label>
      <Select
        id="color"
        name="topics"
        options={options}
        isMulti
        onChange={handleChange}
        onBlur={handleBlur}
        value={props.value}
      />
      {!!props.error && (
        <div style={{ color: "red", marginTop: ".5rem" }}>{props.error}</div>
      )}
    </div>
  );
}

export default ValidationSchemaExample;
