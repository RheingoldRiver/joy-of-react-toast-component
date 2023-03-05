import clsx from "clsx";
import { useEffect } from "react";
import { AlertOctagon, AlertTriangle, CheckCircle, Info, X } from "react-feather";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";
import styles from "./Toast.module.css";

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

const BGS_BY_VARIANT = {
  notice: "bg-noticebg",
  warning: "bg-warningbg",
  success: "bg-successbg",
  error: "bg-errorbg",
};

const TEXTS_BY_VARIANT = {
  notice: "text-notice",
  warning: "text-warning",
  success: "text-success",
  error: "text-error",
};

const PROGRESS_BY_VARIANT = {
  notice: "bg-notice",
  warning: "bg-warning",
  success: "bg-success",
  error: "bg-error",
};

function Toast({ title, message, variant, destroy, seconds, autoDestroy }) {
  useEffect(() => {
    autoDestroy();
  }, [autoDestroy]);

  const Variant = ICONS_BY_VARIANT[variant];
  if (message === "" || message === undefined) return <></>;
  return (
    <div
      className={clsx(
        BGS_BY_VARIANT[variant],
        "flex flex-col rounded-2xl",
        "text-black [color-scheme:light]",
        "max-w-full w-80 box-shadow-md"
      )}
    >
      <div className="relative flex items-center justify-between gap-4">
        <div className="flex flex-row gap-2">
          <div data-label="type-icon-container">
            <div className={clsx(TEXTS_BY_VARIANT[variant], "flex flex-shrink-0 p-4 pr-0")}>
              <Variant size={24} className="block" />
            </div>
            <VisuallyHidden>{variant} - </VisuallyHidden>
          </div>
          <div data-label="message-body">
            <p className="font-bold">{title}</p>
            <p className="flex flex-1 pb-3 font-normal">{message}</p>
          </div>
        </div>
        <button
          className="flex shrink-0 border-none bg-transparent p-4 cursor-pointer"
          onClick={destroy}
          aria-label="Dismiss message"
          aria-live="off"
        >
          <X size={24} className="block" />
        </button>
      </div>
      {seconds > 0 && (
        <div
          data-label="progress-container"
          className={clsx(
            "mx-auto mb-2 w-11/12 h-2 block",
            "border border-solid border-slate-400 rounded-lg text-center"
          )}
        >
          <div
            data-label="progress-bar"
            className={clsx(styles.progressBar, "flex items-start h-full text-xxs", PROGRESS_BY_VARIANT[variant])}
            style={{ "animation-duration": `${seconds}s` }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default Toast;
