import clsx from "clsx";
import { useState } from "react";
import Button from "../Button";
import Toast from "../Toast/Toast";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

const styles = {
  label: "basis-40 text-right font-bold",
  row: "flex items-center flex-wrap gap-4 min-h-[3rem]",
};

function ToastPlayground() {
  const [variant, setVariant] = useState(VARIANT_OPTIONS[0]);
  const [message, setMessage] = useState("");
  const [toasts, setToasts] = useState([]);

  function destroyToast(id) {
    return () => {
      console.log("dismissing toast");
      let newToasts = [...toasts];
      console.log(id);
      for (let i in newToasts) {
        if (newToasts[i].id === id) {
          newToasts.splice(i, i);
        }
      }
      setToasts(newToasts);
    };
  }

  function addToast(e) {
    e.preventDefault();
    e.stopPropagation();
    let newToasts = [...toasts];
    const newId = crypto.randomUUID();
    newToasts.push({
      id: newId,
      message: "message",
      variant: variant,
      destroy: destroyToast(newId),
    });
    setToasts(newToasts);
  }

  return (
    <div className="py-16 px-8 max-w-[50rem] my-0 mx-auto">
      <header className="flex items-end relative mb-16 min-h-[300px]">
        <img
          className="absolute right-0 bottom-0 block w-[200px] rounded-lg shadow-xxlg"
          alt="Obama making a toast"
          src="/obama_toast.jpg"
        />
        <h1 className="relative text-6xl pb-8 text-white drop-shadow-md">Toast Playground</h1>
      </header>
      <Toast message={toasts.at(-1)?.message} variant={toasts.at(-1)?.variant} destroy={toasts.at(-1)?.destroy} />
      <div
        className={clsx(
          "[color-scheme:light] rounded p-4 mt-8",
          "outline-[2px] outline-dashed outline-slate-400/60 outline-offset-4",
          "bg-white text-black text-base",
          "divide-y-2 divide-slate-700/60 divide-dotted space-y-4"
        )}
      >
        <form onSubmit={addToast}>
          <div className={styles.row}>
            <label htmlFor="message" className={styles.label} style={{ alignSelf: "baseline" }}>
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
          <div className={styles.row}>
            <div className={styles.label} />
            <div className="flex flex-1 pt-4">
              <Button>Pop Toast!</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ToastPlayground;
