import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Localization,
  localizations,
  WidgetInstance,
} from 'friendly-challenge';
import type * as CSS from 'csstype';

type FriendCaptchaEndpoint = 'GLOBAL1' | 'EU1';

type FriendlyCaptchaProps = {
  siteKey: string;
  endpoint?: FriendCaptchaEndpoint;
  language?: keyof typeof localizations | Localization;
  startMode?: 'auto' | 'focus' | 'none';
  showAttribution: boolean;
  debug?: boolean;
};

type CustomWidgetStyle = {
  icon?: CSS.Properties;
  button?: CSS.Properties;
  text?: CSS.Properties;
};

type FriendlyCaptchaWidgetProps = Required<FriendlyCaptchaProps> &
  React.HTMLAttributes<HTMLDivElement> & {
    solvedHandler: (solution: string) => void;
    errorHandler: (error: FriendlyServerErrorResponse) => void;
    resetHandler: () => void;
    captchaRendered: boolean;
    captchaWidget: React.MutableRefObject<WidgetInstance | null>;
    setCaptchaRendered: Dispatch<SetStateAction<boolean>>;
    customWidgetStyle?: CustomWidgetStyle;
  };

type FriendlyServerErrorResponse = {
  code: string;
  description: string;
};

type CaptchaStatus = {
  solution: string | null;
  error: FriendlyServerErrorResponse | null;
};

function FC_PUZZLE_EP(endpoint: FriendCaptchaEndpoint): string {
  switch (endpoint) {
    case 'GLOBAL1':
      return 'https://api.friendlycaptcha.com/api/v1/puzzle';
    case 'EU1':
      return 'https://eu-api.friendlycaptcha.eu/api/v1/puzzle';
  }
}

function hasUppercase(str: string): boolean {
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== str[i].toLowerCase()) {
      return true;
    }
  }
  return false;
}

function transformToKebabCase(str: string): string {
  return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

function cssToString(css: CSS.Properties | undefined): string {
  if (css === undefined) {
    return '';
  }

  let cssString = '';

  Object.entries(css).forEach(([key, value]) => {
    if (hasUppercase(key)) {
      key = transformToKebabCase(key);
    }

    cssString = cssString + ` ${key}: ${value};`;
  });
  return cssString;
}

const FriendlyCaptcha = (props: FriendlyCaptchaWidgetProps) => {
  // container is set in return function, where the <div> gets the container as ref attribute.
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (props.debug) {
      console.log(
        `Called useEffect hook with params:\ncaptchaRendered: ${props.captchaRendered}\ncontainer: ${container.current}`
      );
    }
    if (!props.captchaRendered && container.current) {
      if (props.debug) {
        console.log('Creating new widget instance');
      }
      props.captchaWidget.current = new WidgetInstance(container.current, {
        puzzleEndpoint: FC_PUZZLE_EP(props.endpoint),
        startMode: props.startMode,
        doneCallback: props.solvedHandler,
        errorCallback: props.errorHandler,
        sitekey: props.siteKey,
        language: props.language,
      });

      if (props.debug) {
        console.log('Set captcha to rendered: true');
      }
      props.setCaptchaRendered(true);
    }

    return () => {
      if (props.captchaWidget.current !== null && props.captchaRendered) {
        if (props.debug) {
          console.log('Destroying current widget instance');
        }
        props.captchaWidget.current.destroy();
        props.setCaptchaRendered(false);
        props.resetHandler();
      }
    };
  }, []);

  return (
    <>
      {!props.showAttribution && (
        <style>{'.frc-banner { display: none }'}</style>
      )}
      {props.customWidgetStyle?.icon && (
        <style>{`#use-friendly-captcha-container .frc-icon {${cssToString(
          props.customWidgetStyle.icon
        )}}`}</style>
      )}
      {props.customWidgetStyle?.button && (
        <style>{`#use-friendly-captcha-container .frc-button {${cssToString(
          props.customWidgetStyle.button
        )}}`}</style>
      )}
      {props.customWidgetStyle?.text && (
        <style>{`#use-friendly-captcha-container .frc-text {${cssToString(
          props.customWidgetStyle.text
        )}}`}</style>
      )}
      <div
        ref={container}
        id="use-friendly-captcha-container"
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
 * @param showAttribution boolean to determine if the friendly captcha banner should be shown.
 * @param debug enable debug mode, which logs the hooks process, which helps with debugging.
 * @returns { CaptchaWidget, captchaStatus } CaptchaWidget the JSX widget to add in the DOM tree and captchaStatus the state of the current captcha, containing if it's solved successfull, not successfull or hasn't been checked yet
 */
function useCaptchaHook({
  siteKey,
  endpoint = 'GLOBAL1',
  language = 'de',
  startMode = 'auto',
  showAttribution = true,
  debug = false,
}: FriendlyCaptchaProps): {
  CaptchaWidget: (
    props: React.HTMLAttributes<HTMLDivElement>,
    customWidgetStyle?: CustomWidgetStyle
  ) => ReactElement;
  captchaStatus: CaptchaStatus;
  resetWidget: () => void;
} {
  const [captchaStatus, setCaptchaStatus] = useState<{
    solution: string | null;
    error: FriendlyServerErrorResponse | null;
  }>({ solution: null, error: null });
  const [captchaRendered, setCaptchaRendered] = useState<boolean>(false);
  const captchaWidget = useRef<WidgetInstance | null>(null);

  const solvedHandler = (solution: string) => {
    if (debug) {
      console.log(`Set captcha to solved, with solution: ${solution}`);
    }
    setCaptchaStatus({ solution: solution, error: null });
  };

  const errorHandler = (error: FriendlyServerErrorResponse) => {
    console.log(error.description);
    setCaptchaStatus({ solution: null, error: error });
  };

  const resetHandler = () => {
    if (debug) {
      console.log('Reseting captcha status');
    }
    setCaptchaStatus({ solution: null, error: null });
  };

  const resetWidget = () => {
    if (debug) {
      console.log('Captcha is getting resetted.');
    }

    if (captchaWidget.current !== null) {
      captchaWidget.current?.reset();
      setCaptchaStatus({ solution: null, error: null });
    } else {
      if (debug) {
        console.log(
          "Couldn't reset widget, as widget wasn't instantiated yet."
        );
      }
    }
  };

  return {
    CaptchaWidget: (widgetProps, customWidgetStyle?) => {
      return (
        <CaptchaWidget
          siteKey={siteKey}
          endpoint={endpoint}
          language={language}
          startMode={startMode}
          showAttribution={showAttribution}
          solvedHandler={solvedHandler}
          errorHandler={errorHandler}
          resetHandler={resetHandler}
          captchaRendered={captchaRendered}
          captchaWidget={captchaWidget}
          setCaptchaRendered={setCaptchaRendered}
          customWidgetStyle={customWidgetStyle}
          debug={debug}
          {...widgetProps}
        />
      );
    },
    captchaStatus,
    resetWidget,
  };
}

export { useCaptchaHook };
