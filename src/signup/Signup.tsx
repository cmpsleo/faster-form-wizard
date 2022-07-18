import { useCallback, useEffect, useState, createElement } from "react";

import { useCreateSignup, Values, Steps, BasicInfo, Address } from "@/signup";

export function Signup() {
  const { error, success, loading, mutate, setSuccess } = useCreateSignup();

  const [values, setValues] = useState<Partial<Values> | undefined>(undefined);
  const [step, setStep] = useState<Steps>("basic-info");

  const handleSaveValues = useCallback((values: Partial<Values>) => {
    setValues((prev) => ({ ...prev, ...values }));
  }, []);

  const handleSave = useCallback(
    async (data: Values) => {
      setStep("basic-info");
      setValues(undefined);
      await mutate(data);
    },
    [mutate]
  );

  function StepRenderer() {
    const CurrentStep = {
      "basic-info": BasicInfo,
      address: Address,
      submitting: "submitting",
    }[step];

    return createElement(CurrentStep, {
      initialValues: values,
      setStep: setStep,
      setValues: handleSaveValues,
    });
  }

  useEffect(() => {
    if (step === "submitting") {
      handleSave(values as Values);
    }
  }, [step, handleSave, values]);

  return (
    <main className="container">
      {!!error && <article>{JSON.stringify(error)}</article>}

      <dialog open={success}>
        <article>
          <header>
            <a
              href="#close"
              aria-label="Close"
              className="close"
              onClick={setSuccess.bind(null, false)}
            ></a>
            Signup successfully completed
          </header>
          <p>Welcome aboard and enjoy the journey :)</p>
        </article>
      </dialog>

      {loading ? (
        <article aria-busy="true">setting your data. wait, please :)</article>
      ) : (
        <article>
          <header>
            <hgroup style={{ marginBottom: 0 }}>
              <h1>Signup</h1>
              <h3>A basic stepper signup.</h3>
            </hgroup>
          </header>
          <div>
            <StepRenderer />
          </div>
        </article>
      )}
    </main>
  );
}
