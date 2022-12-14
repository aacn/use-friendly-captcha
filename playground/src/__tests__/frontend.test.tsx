import { renderHook } from '@testing-library/react-hooks'
import { useCaptchaHook } from "@aacn.eu/use-friendly-captcha";

const DEMO_SITEKEY = "FC123456789ABC";

describe('useCaptchaHook', () => {
    const captchaManager = renderHook(() => useCaptchaHook({siteKey: DEMO_SITEKEY, showAttribution: false }));

    test('should return the initial status of the captcha', () => {
        expect(captchaManager.result.current.captchaStatus).toEqual({ solution: null, error: null });
    });
});

export {};
