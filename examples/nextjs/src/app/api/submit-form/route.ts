import {
  FCVerification,
  type CaptchaResponse,
  type FetcherRequestBody,
  type FetcherRequestHeaders,
} from '@aacn.eu/use-friendly-captcha/server';

type SubmitFormRequestBody = {
  data?: unknown;
  captcha?: {
    solution?: unknown;
    siteKey?: unknown;
  };
};

/**
 * Posts a completed puzzle to the Friendly Captcha v1 verification endpoint.
 * @param endpoint {string} Friendly Captcha verification URL.
 * @param requestBody {FetcherRequestBody} Puzzle solution and credentials.
 * @param headers {FetcherRequestHeaders} Required JSON request headers.
 * @returns {Promise<CaptchaResponse | null>} Parsed response or null on failure.
 * @sideEffects Performs an outbound HTTP request.
 */
function httpPostFetcher(
  endpoint: string,
  requestBody: FetcherRequestBody,
  headers: FetcherRequestHeaders
): Promise<CaptchaResponse | null> {
  return fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody),
  })
    .then((response) =>
      response.ok ? (response.json() as Promise<CaptchaResponse>) : null
    )
    .catch(() => null);
}

/**
 * Validates a submitted form and its Friendly Captcha solution.
 * @param request {Request} JSON request containing form and captcha values.
 * @returns {Promise<Response>} JSON response describing validation outcome.
 * @sideEffects Calls the Friendly Captcha verification API.
 */
export function POST(request: Request): Promise<Response> {
  return request
    .json()
    .then((body: SubmitFormRequestBody) => {
      const solution = body.captcha?.solution;
      const siteKey = body.captcha?.siteKey;
      const secret = process.env.FC_DEMO_SECRET_API_KEY;

      if (
        typeof body.data !== 'string' ||
        !body.data ||
        typeof solution !== 'string' ||
        !solution ||
        typeof siteKey !== 'string' ||
        !siteKey
      ) {
        return Response.json(
          { message: 'The form or captcha data is missing.' },
          { status: 400 }
        );
      }

      if (!secret) {
        return Response.json(
          { message: 'The server verification secret is not configured.' },
          { status: 500 }
        );
      }

      return FCVerification({
        endpoint: 'GLOBAL1',
        solution,
        sitekey: siteKey,
        secret,
        httpPostFetcher,
      }).then((verified) =>
        Response.json(
          {
            message: verified
              ? 'Your form was submitted successfully.'
              : 'Captcha verification failed.',
          },
          { status: verified ? 200 : 400 }
        )
      );
    })
    .catch(() =>
      Response.json(
        { message: 'The request body is invalid.' },
        { status: 400 }
      )
    );
}
