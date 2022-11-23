import axios from 'axios';

type FCVerificationEndpoint = 'GLOBAL1' | 'EU1';

type FCVerificationProps = {
  endpoint?: FCVerificationEndpoint;
  solution: string;
  secret: string;
  sitekey?: string;
};

type CaptchaResponseProps = {
  success: boolean;
  errors: any;
};

function FC_VERIFICATION_EP(endpoint: FCVerificationEndpoint): string {
  switch (endpoint) {
    case 'GLOBAL1':
      return 'https://api.friendlycaptcha.com/api/v1/siteverify';
    case 'EU1':
      return 'https://eu-api.friendlycaptcha.eu/api/v1/siteverify';
  }
}

/**
 * Backend verification function that uses the FC verification API to check if the form from the submitted puzzle is valid
 * @param endpoint the endpoint to send the solved puzzle to for verification (default: global endpoint)
 * @param props including all necessary data for the verification. Sitekey is optional, if you want to make sure that the puzzle is generated from your expected site
 * @returns boolean depending on if the request yields a success or an error
 */
async function FCVerification({
  endpoint = 'GLOBAL1',
  ...props
}: FCVerificationProps): Promise<boolean> {
  return new Promise<boolean>(async (res) => {
    try {
      const { data } = await axios.post<CaptchaResponseProps>(
        FC_VERIFICATION_EP(endpoint),
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
        res(data.errors.status != '200');
      } else {
        res(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('axios error: ', error.message);
      } else {
        console.log('unexpected error: ', error);
      }
      res(false);
    }
  });
}

export { FCVerification };
