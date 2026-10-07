import { act, StrictMode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import { FCVerification, useCaptchaHook, type UseCaptchaResult } from './index';

const widgetInstances = vi.hoisted(
  () =>
    [] as Array<{
      destroy: ReturnType<typeof vi.fn>;
      options: {
        doneCallback: (solution: string) => void;
        language: string;
      };
      reset: ReturnType<typeof vi.fn>;
    }>
);

vi.mock('friendly-challenge', () => ({
  localizations: { de: {}, en: {} },
  WidgetInstance: class {
    destroy = vi.fn();
    reset = vi.fn();

    constructor(
      _element: HTMLElement,
      public options: {
        doneCallback: (solution: string) => void;
        language: string;
      }
    ) {
      widgetInstances.push(this);
    }
  },
}));

let container: HTMLDivElement;
let root: Root;
let captcha: UseCaptchaResult;

function HookHarness({ language }: { language: 'de' | 'en' }) {
  captcha = useCaptchaHook({ siteKey: 'FC_TEST', language });
  return captcha.CaptchaWidget({ className: 'captcha' });
}

beforeAll(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
});

afterEach(() => {
  act(() => root?.unmount());
  widgetInstances.length = 0;
  container?.remove();
});

describe('useCaptchaHook', () => {
  it('updates status, resets, and recreates the widget when language changes', () => {
    container = document.createElement('div');
    document.body.append(container);
    root = createRoot(container);

    act(() =>
      root.render(
        <StrictMode>
          <HookHarness language="de" />
        </StrictMode>
      )
    );

    expect(captcha.captchaStatus).toEqual({ solution: null, error: null });
    expect(widgetInstances).toHaveLength(2);
    expect(widgetInstances[0].destroy).toHaveBeenCalledOnce();
    expect(widgetInstances[1].options.language).toBe('de');
    expect(container.querySelector('.captcha')).not.toBeNull();

    act(() => widgetInstances[1].options.doneCallback('solution'));
    expect(captcha.captchaStatus.solution).toBe('solution');

    act(() => captcha.resetWidget());
    expect(widgetInstances[1].reset).toHaveBeenCalledOnce();
    expect(captcha.captchaStatus.solution).toBeNull();

    act(() =>
      root.render(
        <StrictMode>
          <HookHarness language="en" />
        </StrictMode>
      )
    );
    expect(widgetInstances[1].destroy).toHaveBeenCalledOnce();
    expect(widgetInstances[2].options.language).toBe('en');
  });
});

describe('FCVerification', () => {
  it('uses the v1 request contract and only accepts successful responses', () => {
    const httpPostFetcher = vi.fn().mockResolvedValue({ success: true });

    return FCVerification({
      endpoint: 'EU1',
      solution: 'solution',
      secret: 'secret',
      sitekey: 'sitekey',
      httpPostFetcher,
    }).then((accepted) => {
      expect(accepted).toBe(true);
      expect(httpPostFetcher).toHaveBeenCalledWith(
        'https://eu-api.friendlycaptcha.eu/api/v1/siteverify',
        { solution: 'solution', secret: 'secret', sitekey: 'sitekey' },
        { 'Content-Type': 'application/json', 'Accept': 'application/json' }
      );

      return Promise.all([
        FCVerification({
          solution: 'invalid',
          secret: 'secret',
          httpPostFetcher: () => Promise.resolve({ success: false }),
        }),
        FCVerification({
          solution: 'unavailable',
          secret: 'secret',
          httpPostFetcher: () => Promise.reject(new Error('offline')),
        }),
      ]).then((results) => expect(results).toEqual([false, false]));
    });
  });
});
