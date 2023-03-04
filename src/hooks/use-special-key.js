import { useEffect } from "react";

function useSpecialKey(key, action) {
  useEffect(() => {
    function dismissAll(e) {
      if (e.key !== key) return;
      action();
    }

    window.addEventListener("keydown", dismissAll);
    return () => {
      window.removeEventListener("keydown", dismissAll);
    };
  }, [key, action]);
}

export default useSpecialKey;
