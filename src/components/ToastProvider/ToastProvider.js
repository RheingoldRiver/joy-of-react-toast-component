import { createContext, useCallback, useState } from "react";
import useSpecialKey from "../../hooks/use-special-key";

export const ToastContext = createContext();

export const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const clearToasts = useCallback(() => {
    // Use a useCallback hook when we're invoking a custom hook because that hook will be
    // updating any time the piece of state it depends on changes otherwise
    setToasts([]);
  }, []);

  useSpecialKey("Escape", () => {
    clearToasts();
  });

  function addToast(variant, message) {
    let newId = crypto.randomUUID();
    let newToasts = [...toasts];
    newToasts.push({
      id: newId,
      message: message === "" ? "message" : message,
      variant: variant,
      destroy: () => {
        setToasts((prev) =>
          prev.filter((toast) => {
            return toast.id !== newId;
          })
        );
      },
    });
    setToasts(newToasts);
  }

  return (
    <ToastContext.Provider
      value={{
        toasts,
        setToasts,
        addToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
