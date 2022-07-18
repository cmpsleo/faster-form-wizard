import { Formik } from "formik";
import * as yup from "yup";

import { Steps, Values } from "@/signup";

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  document: yup.string().required(),
  name: yup.string().required(),
});

export function BasicInfo({
  initialValues,
  setValues,
  setStep,
}: BasicInfo.Props) {
  return (
    <Formik
      initialValues={{
        email: initialValues?.email || "",
        document: initialValues?.document || "",
        name: initialValues?.name || "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setValues(values);
        setStep("address");
      }}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              autoFocus
              aria-invalid={touched.email && !!errors.email}
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
            />
            {!!errors.email && <small>{errors.email}</small>}
          </div>
          <div>
            <label>Identity document</label>
            <input
              type="tel"
              name="document"
              placeholder="CPF"
              aria-invalid={touched.document && !!errors.document}
              onBlur={handleBlur}
              value={values.document}
              onChange={handleChange}
            />
            {!!errors.document && <small>{errors.document}</small>}
          </div>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              aria-invalid={touched.name && !!errors.name}
              onBlur={handleBlur}
              value={values.name}
              onChange={handleChange}
            />
            {!!errors.name && <small>{errors.name}</small>}
          </div>
          <button type="submit">Next step</button>
        </form>
      )}
    </Formik>
  );
}

export namespace BasicInfo {
  export interface Props {
    initialValues: Partial<Values> | undefined;
    setValues: (values: Partial<Values>) => void;
    setStep: (nextStep: Steps) => void;
  }
}
