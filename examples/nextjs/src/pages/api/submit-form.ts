import type { NextApiRequest, NextApiResponse } from 'next'
import { FCVerification } from "@aacn.eu/use-friendly-captcha";
import axios from "axios";

type SubmitFormRequestBody = NextApiRequest & {
  body: {
    data: string
    captcha: { solution: string, siteKey: string }
  }
}
type SubmitFormResponse = {
  message: string;
}

type CaptchaResponse = {
  success: boolean;
  errors: any;
};

async function httpPostFetcherExample(
    endpoint: string,
    requestBody: { solution: string; secret: string; siteKey: string },
    headers: { 'Content-Type': 'application/json'; 'Accept': 'application/json' }
): Promise<CaptchaResponse | null> {
  return new Promise<CaptchaResponse | null>(async (res) => {
    try {
      const { data } = await axios.post<CaptchaResponse>(
          endpoint,
          { ...requestBody },
          {
            headers: { ...headers },
          }
      );

      res(data);
    } catch (err) {
      res(null);
    }
  });
}

export default function handler(req: SubmitFormRequestBody, res: NextApiResponse<SubmitFormResponse>) {
  const solution = req.body.captcha.solution;
  const sitekey = req.body.captcha.siteKey;
  const secret = process.env.FC_DEMO_SECRET_API_KEY;

  if (secret === undefined) {
    throw new Error("No secret found in .env file!");
  }

  if (!solution || !sitekey) {
    return res.status(400).json({ message: "Missing crucial information in request body!"});
  }

  FCVerification({
    endpoint: "GLOBAL1",
    solution: solution,
    sitekey: sitekey,
    secret: secret,
    httpPostFetcher: httpPostFetcherExample
  })
      .then(_res => {
        if (_res) {
          return res.status(200).json({ message: "Your form has been submitted successfully!" });
        }
        return res.status(500).json({ message: "Something went wrong while submitting your form!" });
      })
      .catch(_err => {
        return res.status(500).json({ message: "Something went wrong while submitting your form!" });
      })
}
