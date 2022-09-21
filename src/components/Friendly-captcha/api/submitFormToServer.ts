type FormDataProps<T> = {
  captcha: FormValidationProps;
  content: T;
};

type ExampleForm = {
  ex_1: string | null;
  ex_2: string | null;
};

type FormValidationProps = {
  solution: string;
  sitekey: string;
};

type CaptchaResponseProps = {
  success: boolean;
  errors: any;
};

function submitFormToServer(data: FormDataProps<ExampleForm>) {
  //TODO: check res status code -> let form pass if code != 200
  checkFormValidation(data.captcha).then((res: CaptchaResponseProps) => {
    if (res.success) {
      console.log('Sending data to server...');
    } else {
      console.log('Captcha validation failed! ', res.errors);
    }
  });
}

async function checkFormValidation(
  optionValues: FormValidationProps
): Promise<CaptchaResponseProps> {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      solution: optionValues.solution,
      secret: process.env.REACT_APP_AACN_FC_API_KEY,
      sitekey: optionValues.sitekey,
    }),
  };
  const res = await fetch(
    'https://api.friendlycaptcha.com/api/v1/siteverify',
    options
  );
  return await res.json();
}

export default submitFormToServer;
