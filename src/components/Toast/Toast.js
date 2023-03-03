import clsx from "clsx";
import { AlertOctagon, AlertTriangle, CheckCircle, Info, X } from "react-feather";

import VisuallyHidden from "../VisuallyHidden";

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

function Toast({ message, variant, dismissToast }) {
  const Variant = ICONS_BY_VARIANT[variant];
  if (message === "") return <></>;
  return (
    <div
      className={clsx(
        BGS_BY_VARIANT[variant],
        "relative flex items-center gap-4 rounded-2xl",
        "text-black [color-scheme:light]",
        "max-w-full w-80 box-shadow-md"
      )}
    >
      <div className={clsx(TEXTS_BY_VARIANT[variant], "flex flex-shrink-0 p-4 pr-0")}>
        <Variant size={24} className="block" />
      </div>
      <p className="flex flex-1 py-3 font-semibold">{message}</p>
      <button className="flex shrink-0 border-none bg-transparent p-4 cursor-pointer" onClick={dismissToast}>
        <X size={24} className="block" />
        <VisuallyHidden>Dismiss message</VisuallyHidden>
      </button>
    </div>
  );
}

export default Toast;
