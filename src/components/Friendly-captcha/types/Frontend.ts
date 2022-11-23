import { Localization, localizations } from 'friendly-challenge';

type FriendCaptchaEndpoint = 'GLOBAL1' | 'EU1';

type FriendlyCaptchaProps = {
  siteKey: string;
  endpoint?: FriendCaptchaEndpoint;
  language?: keyof typeof localizations | Localization;
  startMode?: 'auto' | 'focus' | 'none';
};

export type { FriendlyCaptchaProps, FriendCaptchaEndpoint };
