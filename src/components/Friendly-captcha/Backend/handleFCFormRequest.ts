import type { FCVerificationProps } from '../../../types';
import { getVerificationEndpoint } from '../../../util/endpoints';

/**
 * Verifies a completed Friendly Captcha v1 solution.
 * @param input {FCVerificationProps} Verification values and HTTP fetcher.
 * @returns {Promise<boolean>} Whether Friendly Captcha accepted the solution.
 * @sideEffects Invokes the supplied HTTP fetcher.
 */
async function FCVerification({
  endpoint = 'GLOBAL1',
  solution,
  secret,
  sitekey,
  httpPostFetcher,
}: FCVerificationProps): Promise<boolean> {
  return httpPostFetcher(
    getVerificationEndpoint(endpoint),
    { solution, secret, sitekey },
    { 'Content-Type': 'application/json', 'Accept': 'application/json' }
  )
    .then((response) => response?.success === true)
    .catch(() => false);
}

export { FCVerification };
