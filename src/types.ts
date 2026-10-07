import type { CSSProperties, HTMLAttributes, ReactElement } from 'react';
import type { Localization, localizations } from 'friendly-challenge';

type FriendlyCaptchaEndpoint = 'GLOBAL1' | 'EU1';

/** Configuration for a Friendly Captcha v1 widget. */
type FriendlyCaptchaProps = {
  /** Public site key for the protected website. */
  siteKey: string;
  /** Infrastructure used for puzzle generation. Defaults to `GLOBAL1`. */
  endpoint?: FriendlyCaptchaEndpoint;
  /** Built-in language code or complete custom localization. Defaults to German. */
  language?: keyof typeof localizations | Localization;
  /** Event that starts solving the puzzle. Defaults to `auto`. */
  startMode?: 'auto' | 'focus' | 'none';
  /** Whether to display Friendly Captcha attribution. Defaults to `true`. */
  showAttribution?: boolean;
  /** Enables lifecycle logging intended for local debugging. */
  debug?: boolean;
};

/** Optional style overrides for elements rendered by the v1 widget. */
type CustomWidgetStyle = {
  icon?: CSSProperties;
  button?: CSSProperties;
  text?: CSSProperties;
};

type FriendlyServerErrorResponse = {
  code: string;
  description: string;
};

type CaptchaStatus = {
  solution: string | null;
  error: FriendlyServerErrorResponse | null;
};

/** Value returned by {@link useCaptchaHook}. */
type UseCaptchaResult = {
  CaptchaWidget: (
    props?: HTMLAttributes<HTMLDivElement>,
    customWidgetStyle?: CustomWidgetStyle
  ) => ReactElement;
  captchaStatus: CaptchaStatus;
  resetWidget: () => void;
};

type FetcherRequestBody = {
  solution: string;
  secret: string;
  /** Optional public site key expected to have generated the puzzle. */
  sitekey?: string;
};

type FetcherRequestHeaders = {
  'Content-Type': 'application/json';
  'Accept': 'application/json';
};

type CaptchaResponse = {
  success: boolean;
  errors?: Array<string>;
};

type HttpPostFetcher = (
  endpoint: string,
  requestBody: FetcherRequestBody,
  headers: FetcherRequestHeaders
) => Promise<CaptchaResponse | null>;

/** Input accepted by the server-side v1 verification helper. */
type FCVerificationProps = {
  endpoint?: FriendlyCaptchaEndpoint;
  solution: string;
  /** Private API key. This value must never be exposed to browser code. */
  secret: string;
  sitekey?: string;
  httpPostFetcher: HttpPostFetcher;
};

export type {
  CaptchaResponse,
  CaptchaStatus,
  CustomWidgetStyle,
  FCVerificationProps,
  FetcherRequestBody,
  FetcherRequestHeaders,
  FriendlyCaptchaEndpoint,
  FriendlyCaptchaProps,
  FriendlyServerErrorResponse,
  HttpPostFetcher,
  UseCaptchaResult,
};
