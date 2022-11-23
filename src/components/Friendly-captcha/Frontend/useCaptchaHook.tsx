import React, { ReactElement, useEffect, useRef, useState } from 'react';
import {
  Localization,
  localizations,
  WidgetInstance,
} from 'friendly-challenge';

type FriendCaptchaEndpoint = 'GLOBAL1' | 'EU1';

type FriendlyCaptchaProps = {
  siteKey: string;
  endpoint?: FriendCaptchaEndpoint;
  language?: keyof typeof localizations | Localization;
  startMode?: 'auto' | 'focus' | 'none';
  showAttribution: boolean;
};

type FriendlyCaptchaWidgetProps = Required<FriendlyCaptchaProps> &
  React.HTMLAttributes<HTMLDivElement> & {
    solvedHandler: (solution: string) => void;
    errorHandler: (solution: string) => void;
  };

type CaptchaStatus = {
  solution: string | null;
  error: any | null;
};

function FC_PUZZLE_EP(endpoint: FriendCaptchaEndpoint): string {
  switch (endpoint) {
    case 'GLOBAL1':
      return 'https://api.friendlycaptcha.com/api/v1/puzzle';
    case 'EU1':
      return 'https://api.friendlycaptcha.eu/api/v1/puzzle';
  }
}

const FriendlyCaptcha = (props: FriendlyCaptchaWidgetProps) => {
  const container = useRef<HTMLDivElement | null>(null);
  const widget = useRef<WidgetInstance | null>(null);

  useEffect(() => {
    if (!widget.current && container.current) {
      widget.current = new WidgetInstance(container.current, {
        puzzleEndpoint: FC_PUZZLE_EP(props.endpoint),
        startMode: props.startMode,
        doneCallback: props.solvedHandler,
        errorCallback: props.errorHandler,
        sitekey: props.siteKey,
        language: props.language,
      });
    }

    return () => {
      if (widget.current != undefined) {
        widget.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <style>{!props.showAttribution && '.frc-banner { display: none }'}</style>
      <div
        ref={container}
        className={props.className}
        data-sitekey={props.siteKey}
      />
    </>
  );
};

const CaptchaWidget = React.memo(FriendlyCaptcha);

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
  showAttribution = true,
}: FriendlyCaptchaProps): {
  CaptchaWidget: (props: React.HTMLAttributes<HTMLDivElement>) => ReactElement;
  captchaStatus: CaptchaStatus;
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

  return {
    CaptchaWidget: (widgetProps) => {
      return (
        <CaptchaWidget
          siteKey={siteKey}
          endpoint={endpoint}
          language={language}
          startMode={startMode}
          showAttribution={showAttribution}
          solvedHandler={solvedHandler}
          errorHandler={errorHandler}
          {...widgetProps}
        />
      );
    },
    captchaStatus,
  };
}

export { useCaptchaHook };
