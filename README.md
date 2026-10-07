# use-friendly-captcha

React hook and server-side verification helper for Friendly Captcha v1.

> Friendly Captcha recommends v2 for new integrations. This package keeps its
> existing v1 API to avoid a breaking rewrite.

## Install

```sh
pnpm add @aacn.eu/use-friendly-captcha friendly-challenge
```

`npm install` and `yarn add` work as well. pnpm is only used to develop this
repository.

## React hook

```tsx
import { useCaptchaHook } from '@aacn.eu/use-friendly-captcha/client';

function Form() {
  const captcha = useCaptchaHook({
    siteKey: 'YOUR_PUBLIC_SITE_KEY',
    language: 'en',
  });

  return (
    <form>
      {captcha.CaptchaWidget({ className: 'captcha' })}
      <button disabled={!captcha.captchaStatus.solution}>Submit</button>
      <button type="button" onClick={captcha.resetWidget}>
        Reset captcha
      </button>
    </form>
  );
}
```

Changing `language`, `siteKey`, `endpoint`, or `startMode` recreates the widget
with the new configuration. `CaptchaWidget` accepts standard `div` attributes
and an optional second argument with `icon`, `button`, and `text` style objects.

### Site key security

The site key identifies the website and is intentionally included in browser
code. It is not a secret. The API secret used for server-side verification must
never be stored in a `REACT_APP_*`, `NEXT_PUBLIC_*`, or other client-exposed
environment variable.

## Server verification

The HTTP client is supplied by the application, so this package does not force
a request library on consumers.

```ts
import {
  FCVerification,
  type HttpPostFetcher,
} from '@aacn.eu/use-friendly-captcha/server';

const httpPostFetcher: HttpPostFetcher = (endpoint, body, headers) =>
  fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }).then((response) => (response.ok ? response.json() : null));

const accepted = await FCVerification({
  solution,
  sitekey: 'YOUR_PUBLIC_SITE_KEY',
  secret: process.env.FRIENDLY_CAPTCHA_SECRET!,
  httpPostFetcher,
});
```

Verification is fail-closed: failed requests, missing responses, and
`success: false` all return `false`.

## Development

```sh
corepack enable
pnpm install
pnpm check
```

`pnpm check` formats-checks, type-checks, tests, and builds the ESM and CommonJS
package.
