import clsx from "clsx";
import { useCallback, useContext, useState } from "react";
import useSpecialKey from "../../hooks/use-special-key";
import Button from "../Button";
import { ToastContext, VARIANT_OPTIONS } from "../ToastProvider/ToastProvider";
import ToastShelf from "../ToastShelf/ToastShelf";

const styles = {
  label: "basis-40 text-right font-bold",
  row: "flex items-center flex-wrap gap-4 min-h-[3rem]",
};

function ToastPlayground() {
  const [variant, setVariant] = useState(VARIANT_OPTIONS[0]);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const { addToast, toasts } = useContext(ToastContext);

  const pushToast = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      addToast(variant, message, title);
    },
    [variant, message, title, addToast]
  );

  useSpecialKey("Enter", ["Control"], (e) => {
    pushToast(e);
  });

  return (
    <div className="py-16 px-8 max-w-[50rem] my-0 mx-auto" data-label="container">
      <header className="flex items-end relative mb-16 min-h-[300px]">
        <img
          className="absolute right-0 bottom-0 block w-[200px] rounded-lg shadow-xxlg"
          alt="Obama making a toast"
          src="/obama_toast.jpg"
        />
        <h1 className="relative text-6xl pb-8 text-white drop-shadow-md">Toast Playground</h1>
      </header>
      <div
        className={clsx(
          "[color-scheme:light] rounded p-4 mt-8",
          "outline-[2px] outline-dashed outline-slate-400/60 outline-offset-4",
          "bg-white text-black text-base",
          "divide-y-2 divide-slate-700/60 divide-dotted space-y-4"
        )}
        data-label="form-container"
      >
        <form onSubmit={pushToast}>
          <div className={clsx(styles.row)} data-label="form-container">
            <label htmlFor="title" className={styles.label}>
              Title
            </label>
            <div className="flex flex-1" data-label="title-input">
              <input
                id="title"
                className="w-full block border-slate-600 border-solid border"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></input>
            </div>
          </div>
          <div className={styles.row} data-label="message-container">
            <label htmlFor="message" className={clsx(styles.label, "self-baseline")}>
              Message
            </label>
            <div className="flex flex-1">
              <textarea
                id="message"
                className="h-16 w-full border-slate-600 border"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            {VARIANT_OPTIONS.map((option) => (
              <div key={option} className="flex flex-1 flex-wrap gap-[0.25rem_1rem]">
                <label className="flex items-center gap-2 w-full cursor-pointer" htmlFor={`variant-${option}`}>
                  <input
                    id={`variant-${option}`}
                    type="radio"
                    name="variant"
                    value={option}
                    checked={variant === option}
                    onChange={(e) => {
                      setVariant(e.target.value);
                    }}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
          <div className={styles.row} data-label="submit-button-container">
            <div className={styles.label} />
            <div className="flex flex-1 pt-4">
              <Button>Pop Toast!</Button>
            </div>
          </div>
        </form>
        <ToastShelf toasts={toasts} />
      </div>
    </div>
  );
}

export default ToastPlayground;
