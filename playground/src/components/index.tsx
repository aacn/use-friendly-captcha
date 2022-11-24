import React, { FC, useState } from 'react';
import submitFormToServer from './api/submitFormToServer';
import { useCaptchaHook } from "@aacn/use-friendly-captcha";

const Example: FC = () => {
  const siteKey = process.env.REACT_APP_FC_DEMO_SITE_KEY!;
  const captchaManager = useCaptchaHook({ siteKey: siteKey, showAttribution: false });
  const [submitStatus, setSubmitStatus] = useState<boolean | null>(null);

  async function formExampleSubmitHandler(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    const ex_1 = document.querySelector('#form_1 #input_example_1')?.nodeValue;
    const ex_2 = document.querySelector('#form_1 #input_example_2')?.nodeValue;

    const content = {
      ex_1: ex_1 !== undefined ? ex_1 : null,
      ex_2: ex_2 !== undefined ? ex_2 : null,
    };

    if (
      captchaManager.captchaStatus.solution !== null &&
      captchaManager.captchaStatus.error === null
    ) {
      const solution: string = captchaManager.captchaStatus.solution;
      // Your submit handler here
      const response = await submitFormToServer({
        captcha: { solution: solution, siteKey: siteKey },
        content,
      });
      setSubmitStatus(response);
    }
  }

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center">
      <form
        className="w-full flex flex-col justify-center items-center p-10 bg-green-600"
        id="form_1"
        onSubmit={formExampleSubmitHandler}
      >
        <div className="mb-10">
          <label htmlFor="input_example_1">Label ex1</label>
          <input id="input_example_1" type="text" />
          <label className="mt-3" htmlFor="input_example_2">
            Label ex2
          </label>
          <input id="input_example_2" type="text" />
        </div>
        {captchaManager.CaptchaWidget({ className: 'bg-cyan-800' })}
        {captchaManager.captchaStatus.solution !== null && (
          <React.Fragment>
            <p className="text-xl text-black absolute top-10">solved!</p>
            <button id="submit-btn" className="p-5 bg-yellow-600">Submit</button>
          </React.Fragment>
        )}
        {captchaManager.captchaStatus.error !== null && (
          <p className="text-xl text-red-500 absolute top-10">error!</p>
        )}
        {submitStatus !== null &&
          (submitStatus ? (
            <p>Successfully submitted!</p>
          ) : (
            <p>Couldn't submit form, please try again.</p>
          ))}
      </form>
    </div>
  );
};

export { Example };
