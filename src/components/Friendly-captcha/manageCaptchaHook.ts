import { useState } from 'react';

/**
 * React hook that manages the callbacks for the friendly captcha
 * @param siteKeyValue defined sitekey for the particular domain
 * @param endpoint captcha url that is used to create the puzzle (global endpoint by default)
 */
function useManageCaptchaHook(
  siteKeyValue: string,
  endpoint: string = 'https://api.friendlycaptcha.com/api/v1/puzzle'
) {
  const [captchaStatus, setCaptchaStatus] = useState<{
    solution: string | null;
    error: any | null;
  }>({ solution: null, error: null });
  const sitekey: string = siteKeyValue;

  const solvedHandler = (solution: string) => {
    setCaptchaStatus({ solution: solution, error: null });
  };

  const errorHandler = (error: any) => {
    setCaptchaStatus({ solution: null, error: error });
  };

  return { captchaStatus, errorHandler, solvedHandler, sitekey, endpoint };
}

export default useManageCaptchaHook;
