import React, { useCallback, useEffect, useRef, useState } from 'react';
import { WidgetInstance } from 'friendly-challenge';

import type {
  CaptchaStatus,
  CustomWidgetStyle,
  FriendlyCaptchaProps,
  FriendlyServerErrorResponse,
  UseCaptchaResult,
} from '../../../types';
import { getPuzzleEndpoint } from '../../../util/endpoints';

type FriendlyCaptchaWidgetProps = Required<FriendlyCaptchaProps> & {
  captchaWidget: React.RefObject<WidgetInstance | null>;
  customWidgetStyle?: CustomWidgetStyle;
  errorHandler: (error: FriendlyServerErrorResponse) => void;
  resetHandler: () => void;
  solvedHandler: (solution: string) => void;
  widgetProps: React.HTMLAttributes<HTMLDivElement>;
};

function cssToString(css: React.CSSProperties | undefined): string {
  return Object.entries(css ?? {})
    .map(
      ([property, value]) =>
        ` ${property.replace(
          /[A-Z]/g,
          (character) => `-${character.toLowerCase()}`
        )}: ${String(value)};`
    )
    .join('');
}

const FriendlyCaptcha = (props: FriendlyCaptchaWidgetProps) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) {
      return;
    }

    const widgetElement = document.createElement('div');
    container.current.append(widgetElement);
    props.resetHandler();
    const widget = new WidgetInstance(widgetElement, {
      puzzleEndpoint: getPuzzleEndpoint(props.endpoint),
      startMode: props.startMode,
      doneCallback: props.solvedHandler,
      errorCallback: props.errorHandler,
      sitekey: props.siteKey,
      language: props.language,
    });
    props.captchaWidget.current = widget;

    if (props.debug) {
      console.log('Created Friendly Captcha widget instance.');
    }

    return () => {
      widget.destroy();
      widgetElement.remove();

      if (props.captchaWidget.current === widget) {
        props.captchaWidget.current = null;
      }

      if (props.debug) {
        console.log('Destroyed Friendly Captcha widget instance.');
      }
    };
  }, [
    props.captchaWidget,
    props.debug,
    props.endpoint,
    props.errorHandler,
    props.language,
    props.resetHandler,
    props.siteKey,
    props.solvedHandler,
    props.startMode,
  ]);

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
        {...props.widgetProps}
        ref={container}
        id="use-friendly-captcha-container"
        data-sitekey={props.siteKey}
      />
    </>
  );
};

const MemoizedFriendlyCaptcha = React.memo(FriendlyCaptcha);

/**
 * Manages a Friendly Captcha v1 widget and its current solution state.
 * @param props {FriendlyCaptchaProps} Widget configuration.
 * @returns {UseCaptchaResult} Widget renderer, status, and reset function.
 */
function useCaptchaHook({
  siteKey,
  endpoint = 'GLOBAL1',
  language = 'de',
  startMode = 'auto',
  showAttribution = true,
  debug = false,
}: FriendlyCaptchaProps): UseCaptchaResult {
  const [captchaStatus, setCaptchaStatus] = useState<CaptchaStatus>({
    solution: null,
    error: null,
  });
  const captchaWidget = useRef<WidgetInstance>(null);

  const solvedHandler = useCallback(
    (solution: string) => {
      if (debug) {
        console.log(`Friendly Captcha solved with solution: ${solution}`);
      }

      setCaptchaStatus({ solution, error: null });
    },
    [debug]
  );

  const errorHandler = useCallback(
    (error: FriendlyServerErrorResponse) => {
      if (debug) {
        console.error(error.description);
      }

      setCaptchaStatus({ solution: null, error });
    },
    [debug]
  );

  const resetHandler = useCallback(() => {
    setCaptchaStatus({ solution: null, error: null });
  }, []);

  const resetWidget = useCallback(() => {
    captchaWidget.current?.reset();
    resetHandler();
  }, [resetHandler]);

  const CaptchaWidget = useCallback(
    (
      widgetProps: React.HTMLAttributes<HTMLDivElement> = {},
      customWidgetStyle?: CustomWidgetStyle
    ) => (
      <MemoizedFriendlyCaptcha
        siteKey={siteKey}
        endpoint={endpoint}
        language={language}
        startMode={startMode}
        showAttribution={showAttribution}
        solvedHandler={solvedHandler}
        errorHandler={errorHandler}
        resetHandler={resetHandler}
        captchaWidget={captchaWidget}
        customWidgetStyle={customWidgetStyle}
        debug={debug}
        widgetProps={widgetProps}
      />
    ),
    [
      debug,
      endpoint,
      errorHandler,
      language,
      resetHandler,
      showAttribution,
      siteKey,
      solvedHandler,
      startMode,
    ]
  );

  return { CaptchaWidget, captchaStatus, resetWidget };
}

export { useCaptchaHook };
