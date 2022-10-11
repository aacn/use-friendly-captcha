import { FCVerification } from '../dist/index.esm.js'
import axios, { AxiosStatic } from "axios";

interface AxiosMock extends AxiosStatic {
    mockResolvedValue: Function,
    mockRejectedValue: Function
}

describe('Captcha verification', () => {
    const mockedAxios = axios as AxiosMock

    test('should return the initial status of the captcha', () => {
        mockedAxios.mockRejectedValue('Error');
        FCVerification()
    });
});

export {};
