import { renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useCaptchaHook } from '@aacn.eu/use-friendly-captcha/client';

const DEMO_SITEKEY = 'FC123456789ABC';

describe('useCaptchaHook', () => {
  test('should return the initial status of the captcha', () => {
    const { result } = renderHook(() =>
      useCaptchaHook({ siteKey: DEMO_SITEKEY, showAttribution: false })
    );

    expect(result.current.captchaStatus).toEqual({
      solution: null,
      error: null,
    });
  });
});
