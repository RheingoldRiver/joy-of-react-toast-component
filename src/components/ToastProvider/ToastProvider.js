import { createContext, useState } from "react";
import useSpecialKey from "../../hooks/use-special-key";

export const ToastContext = createContext();

export const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastProvider({ children }) {
  const [variant, setVariant] = useState(VARIANT_OPTIONS[0]);
  const [message, setMessage] = useState("");
  const [toasts, setToasts] = useState([]);

  useSpecialKey("Escape", () => {
    setToasts([]);
  });

  function addToast(e) {
    e.preventDefault();
    e.stopPropagation();
    let newToasts = [...toasts];
    let newId = crypto.randomUUID();
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
        variant,
        setVariant,
        message,
        setMessage,
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
