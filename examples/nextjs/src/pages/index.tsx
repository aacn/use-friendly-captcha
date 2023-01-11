import { useCaptchaHook } from "@aacn.eu/use-friendly-captcha";
import { FormEvent, useState } from "react";
import axios, { AxiosResponse } from "axios";

type ServerResponseProps = {
    message: string
}

type ServerErrorResponse = {
    response: AxiosResponse<ServerResponseProps>;
}

export default function Home() {
    const sitekey = process.env.NEXT_PUBLIC_FC_DEMO_SITE_KEY;
    if (sitekey === undefined) {
        throw new Error("No sitekey found in .env file!");
    }

    const [formData, setFormData] = useState<string>("");
    const captchaHook = useCaptchaHook({
        siteKey: sitekey,
        endpoint: "GLOBAL1",
        language: "en",
        startMode: "none",
        showAttribution: true
    });

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (captchaHook.captchaStatus.solution === null) {
            console.error("Cant submit form, puzzle hasn't been solved yet!");
            return;
        }

        if (formData.length === 0) {
            console.error("Form input is empty!");
            return;
        }

        axios.post('/api/submit-form', {
            data: formData,
            captcha: { solution: captchaHook.captchaStatus.solution, siteKey: sitekey }
        })
            .then((res: AxiosResponse<ServerResponseProps>) => {
                alert(res.data.message);
            })
            .catch((err: ServerErrorResponse) => {
                alert(err.response.data.message);
            })
    }

  return (
    <>
      <main className="bg-gray-700 min-h-screen h-full p-4 pt-20 flex flex-col justify-start items-center">
          <h1 className="text-4xl font-medium text-center mb-2">Use friendly captcha example</h1>
          <h2 className="text-2xl text-cyan-400 font-thin">Nextjs with TypeScript</h2>
          <form className="w-96 mt-32" onSubmit={(e) => handleSubmit(e)}>
              <div className="flex flex-col">
                  <label htmlFor="input-elem" className="text-md font-light text-white">Name</label>
                  <input
                      id="input-elem"
                      type="text"
                      placeholder="Name"
                      value={formData}
                      className="p-1.5 mt-1.5 rounded"
                      onChange={(e) => setFormData(e.target.value)}
                  />
              </div>
              {captchaHook.captchaStatus.solution !== null &&
                  <input
                      type="submit"
                      value="Submit"
                      disabled={formData.length === 0}
                      className="w-full p-1.5 mt-10 bg-cyan-400 rounded cursor-pointer transition-colors hover:bg-cyan-300 disabled:cursor-default disabled:bg-gray-800"
                  />
              }
              {captchaHook.CaptchaWidget({ className: 'min-w-full pl-2 pb-1 mt-6 bg-cyan-800 rounded' })}
          </form>
      </main>
    </>
  )
}
