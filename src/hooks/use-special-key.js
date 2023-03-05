import { useEffect } from "react";

const KEYDOWN_PROPERTIES = {
  Control: "ctrlKey",
  Alt: "altKey",
  OS: "metaKey",
  Shift: "shiftKey",
};

function useSpecialKey(key, modifiers, action) {
  useEffect(() => {
    function dismissAll(e) {
      let hasAllModifiers = true;
      if (e.key !== key) return;
      for (let item of modifiers) {
        if (!e[KEYDOWN_PROPERTIES[item]]) {
          hasAllModifiers = false;
        }
      }
      if (!hasAllModifiers) return;
      action(e);
    }

    window.addEventListener("keydown", dismissAll);
    return () => {
      window.removeEventListener("keydown", dismissAll);
    };
  }, [key, action, modifiers]);
}

export default useSpecialKey;
