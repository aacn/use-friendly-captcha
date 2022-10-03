import axios from 'axios';

type FCVerificationProps = {
  endpoint?: string;
  solution: string;
  secret: string;
  sitekey?: string;
};

type CaptchaResponseProps = {
  success: boolean;
  errors: any;
};

/**
 * Backend verification function that uses the FC verification API to check if the form from the submitted puzzle is valid
 * @param endpoint the endpoint to send the solved puzzle to for verification (default: global endpoint)
 * @param props including all necessary data for the verification. Sitekey is optional, if you want to make sure that the puzzle is generated from your expected site
 * @returns boolean depending on if the request yields a success or an error
 */
async function FCVerification({
  endpoint = 'https://api.friendlycaptcha.com/api/v1/siteverify',
  ...props
}: FCVerificationProps): Promise<boolean> {
  try {
    const { data } = await axios.post<CaptchaResponseProps>(
      endpoint,
      {
        solution: props.solution,
        secret: props.secret,
        siteKey: props.sitekey,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    if (!data.success) {
      // recommended best practice, still return true if status doesn't match 200
      console.log(data.errors.toString());
      return data.errors.status !== 200;
    } else {
      return true;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('axios error: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return false;
  }
}

export default FCVerification;
