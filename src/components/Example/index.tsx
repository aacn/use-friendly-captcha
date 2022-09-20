import React, { FC } from 'react';
import FriendlyCaptcha from '@/components/Friendly-captcha';
import useManageCaptchaHook from '@/components/Friendly-captcha/manageCaptchaHook';
import submitFormToServer from '@/components/Friendly-captcha/api/submitFormToServer';

export const Example: FC = () => {
  const captchaManager = useManageCaptchaHook('FCMP19T51HTMI9AS');

  function formExampleSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
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
      const sitekey = captchaManager.sitekey;
      submitFormToServer({ captcha: { solution, sitekey }, content });
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
        <FriendlyCaptcha
          siteKey={captchaManager.sitekey}
          endpoint={captchaManager.endpoint}
          doneCallback={captchaManager.solvedHandler}
          errorCallback={captchaManager.errorHandler}
        />
        {captchaManager.captchaStatus.solution !== null && (
          <React.Fragment>
            <p className="text-xl text-black absolute top-10">solved!</p>
            <button className="p-5 bg-yellow-600">Submit</button>
          </React.Fragment>
        )}
        {captchaManager.captchaStatus.error !== null && (
          <p className="text-xl text-red-500 absolute top-10">error!</p>
        )}
      </form>
    </div>
  );
};
