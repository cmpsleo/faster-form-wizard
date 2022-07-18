import { Formik } from "formik";
import * as yup from "yup";

import { Values, Steps } from "@/signup";

const validationSchema = yup.object().shape({
  zipcode: yup.string().required(),
  streetAddress: yup.string().required(),
  city: yup.string().required(),
});

export function Address({ initialValues, setStep, setValues }: Address.Props) {
  return (
    <Formik
      initialValues={{
        zipcode: initialValues?.zipcode || "",
        streetAddress: initialValues?.streetAddress || "",
        city: initialValues?.city || "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setStep("submitting");
        setValues(values);
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
            <label>Zipcode</label>
            <input
              type="tel"
              name="zipcode"
              placeholder="CEP"
              autoFocus
              aria-invalid={touched.zipcode && !!errors.zipcode}
              onBlur={handleBlur}
              value={values.zipcode}
              onChange={handleChange}
            />
            {!!errors.zipcode && <small>{errors.zipcode}</small>}
          </div>
          <div>
            <label>Street address</label>
            <input
              type="text"
              name="streetAddress"
              placeholder="Rua"
              aria-invalid={touched.streetAddress && !!errors.streetAddress}
              onBlur={handleBlur}
              value={values.streetAddress}
              onChange={handleChange}
            />
            {!!errors.streetAddress && <small>{errors.streetAddress}</small>}
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              name="city"
              placeholder="Cidade"
              aria-invalid={touched.city && !!errors.city}
              onBlur={handleBlur}
              value={values.city}
              onChange={handleChange}
            />
            {!!errors.city && <small>{errors.city}</small>}
          </div>

          <div className="grid">
            <button
              className="secondary outline"
              type="button"
              onClick={setStep.bind(null, "basic-info")}
            >
              Back
            </button>

            <button>Finish registration</button>
          </div>
        </form>
      )}
    </Formik>
  );
}

export namespace Address {
  export interface Props {
    initialValues: Partial<Values> | undefined;
    setValues: (values: Partial<Values>) => void;
    setStep: (nextStep: Steps) => void;
  }
}
