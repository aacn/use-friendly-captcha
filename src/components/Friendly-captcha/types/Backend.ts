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

export type {
  FCVerificationProps,
  CaptchaResponseProps,
  FCVerificationEndpoint,
};
