import type { FriendlyCaptchaEndpoint } from '../types';

const endpoints: Record<
  FriendlyCaptchaEndpoint,
  { puzzle: string; verification: string }
> = {
  GLOBAL1: {
    puzzle: 'https://api.friendlycaptcha.com/api/v1/puzzle',
    verification: 'https://api.friendlycaptcha.com/api/v1/siteverify',
  },
  EU1: {
    puzzle: 'https://eu-api.friendlycaptcha.eu/api/v1/puzzle',
    verification: 'https://eu-api.friendlycaptcha.eu/api/v1/siteverify',
  },
};

function getPuzzleEndpoint(endpoint: FriendlyCaptchaEndpoint): string {
  return endpoints[endpoint].puzzle;
}

function getVerificationEndpoint(endpoint: FriendlyCaptchaEndpoint): string {
  return endpoints[endpoint].verification;
}

export { getPuzzleEndpoint, getVerificationEndpoint };
