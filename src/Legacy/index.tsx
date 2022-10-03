/*
import React, { useEffect, useRef, memo } from 'react';
import { WidgetInstance } from 'friendly-challenge';

type FriendlyCaptchaProps = {
  siteKey: string;
  endpoint: string;
  doneCallback: (solution: string) => void;
  errorCallback: (error: any) => void;
};

const FriendlyCaptcha: React.FC<
  FriendlyCaptchaProps & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const container = useRef<HTMLDivElement | null>(null);
  const widget = useRef<WidgetInstance | null>(null);

  useEffect(() => {
    if (!widget.current && container.current) {
      widget.current = new WidgetInstance(container.current, {
        puzzleEndpoint: props.endpoint,
        startMode: 'auto',
        doneCallback: props.doneCallback,
        errorCallback: props.errorCallback,
        sitekey: props.siteKey,
        language: 'de',
      });
    }

    return () => {
      if (widget.current != undefined) {
        widget.current.destroy();
      }
    };
  }, [props]);

  return (
    <div
      ref={container}
      className={props.className}
      data-sitekey={props.siteKey}
    />
  );
};

export default memo(FriendlyCaptcha);


 */
