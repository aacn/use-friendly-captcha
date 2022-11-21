import React, { useEffect, useRef, useState } from 'react';
import {
  FriendlyCaptchaProps,
  FriendCaptchaEndpoint,
} from '@/components/Friendly-captcha/types';
import { WidgetInstance } from 'friendly-challenge';

function FC_PUZZLE_EP(endpoint: FriendCaptchaEndpoint): string {
  switch (endpoint) {
    case 'GLOBAL1':
      return 'https://api.friendlycaptcha.com/api/v1/puzzle';
    case 'EU1':
      return 'https://api.friendlycaptcha.eu/api/v1/puzzle';
  }
}

/**
 * React hook that manages the widget and the states for the friendly captcha
 * @param siteKey defined sitekey for the particular domain
 * @param language sets the widget language (default: de)
 * @param startMode sets the widget startmode (default: auto)
 * @param endpoint captcha url that is used to create the puzzle (default: global endpoint)
 * @returns { CaptchaWidget, captchaStatus } CaptchaWidget the JSX widget to add in the DOM tree and captchaStatus the state of the current captcha, containing if it's solved successfull, not successfull or hasn't been checked yet
 */
function useCaptchaHook({
  siteKey,
  endpoint = 'GLOBAL1',
  language = 'de',
  startMode = 'auto',
}: FriendlyCaptchaProps): {
  CaptchaWidget: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  captchaStatus: { solution: string | null; error: any | null };
} {
  const [captchaStatus, setCaptchaStatus] = useState<{
    solution: string | null;
    error: any | null;
  }>({ solution: null, error: null });

  const solvedHandler = (solution: string) => {
    setCaptchaStatus({ solution: solution, error: null });
  };

  const errorHandler = (error: any) => {
    setCaptchaStatus({ solution: null, error: error });
  };

  const CaptchaWidget = React.useMemo(() => {
    const FriendlyCaptcha: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
      props
    ) => {
      const container = useRef<HTMLDivElement | null>(null);
      const widget = useRef<WidgetInstance | null>(null);

      useEffect(() => {
        if (!widget.current && container.current) {
          widget.current = new WidgetInstance(container.current, {
            puzzleEndpoint: FC_PUZZLE_EP(endpoint),
            startMode: startMode,
            doneCallback: solvedHandler,
            errorCallback: errorHandler,
            sitekey: siteKey,
            language: language,
          });
        }

        return () => {
          if (widget.current != undefined) {
            widget.current.destroy();
          }
        };
      }, []);

      return (
        <div
          ref={container}
          className={props.className}
          data-sitekey={siteKey}
        />
      );
    };

    return FriendlyCaptcha;
  }, []);

  return { CaptchaWidget, captchaStatus };
}

export { useCaptchaHook };
