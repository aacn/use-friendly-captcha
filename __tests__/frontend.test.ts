import { useCaptchaHook } from '../dist/index.esm.js'
import { renderHook } from '@testing-library/react-hooks'

const DEMO_SITEKEY = "FC123456789ABC";

describe('useCaptchaHook', () => {
    const captchaManager = renderHook(() => useCaptchaHook({siteKey: DEMO_SITEKEY }));

    test('should return the initial status of the captcha', () => {
        expect(captchaManager.result.current.captchaStatus).toEqual({ solution: null, error: null });
    });
});

export {};
