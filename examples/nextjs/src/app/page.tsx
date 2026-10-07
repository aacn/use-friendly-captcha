'use client';

import { useCaptchaHook } from '@aacn.eu/use-friendly-captcha/client';
import { useState, type FormEvent } from 'react';

type SubmitFormResponse = {
  message: string;
};

export default function Home() {
  const siteKey = process.env.NEXT_PUBLIC_FC_DEMO_SITE_KEY;
  const [name, setName] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const captcha = useCaptchaHook({
    siteKey: siteKey ?? '',
    endpoint: 'GLOBAL1',
    language: 'en',
    startMode: 'none',
    showAttribution: true,
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!captcha.captchaStatus.solution || !name) {
      return;
    }

    setMessage('Submitting…');
    fetch('/api/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: name,
        captcha: { solution: captcha.captchaStatus.solution, siteKey },
      }),
    })
      .then((response) =>
        response
          .json()
          .then((body: SubmitFormResponse) => ({ body, ok: response.ok }))
      )
      .then(({ body, ok }) => {
        setMessage(body.message);
        if (ok) {
          captcha.resetWidget();
        }
      })
      .catch(() => setMessage('The request failed. Please try again.'));
  }

  if (!siteKey) {
    return (
      <main className="grid min-h-screen place-items-center bg-gray-950 p-6 text-white">
        <p>
          Add <code>NEXT_PUBLIC_FC_DEMO_SITE_KEY</code> to{' '}
          <code>.env.local</code>.
        </p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-950 p-6 pt-20 text-white">
      <h1 className="mb-2 text-center text-4xl font-medium">
        use-friendly-captcha example
      </h1>
      <p className="text-xl text-cyan-400">Next.js App Router and TypeScript</p>
      <form className="mt-24 w-full max-w-96" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2 font-light" htmlFor="name">
          Name
          <input
            className="rounded bg-white p-2 text-gray-950"
            id="name"
            onChange={(event) => setName(event.target.value)}
            placeholder="Name"
            value={name}
          />
        </label>
        {captcha.CaptchaWidget(
          { className: 'mt-6 min-w-full rounded bg-cyan-900 pb-1 pl-2' },
          {
            icon: { stroke: 'turquoise' },
            button: { backgroundColor: 'turquoise', borderRadius: '50px' },
          }
        )}
        <button
          className="mt-8 w-full rounded bg-cyan-400 p-2 text-gray-950 disabled:cursor-not-allowed disabled:bg-gray-700"
          disabled={!name || !captcha.captchaStatus.solution}
          type="submit"
        >
          Submit
        </button>
        {message && <p className="mt-4 text-center">{message}</p>}
      </form>
    </main>
  );
}
