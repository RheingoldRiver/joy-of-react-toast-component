import clsx from "clsx";
import React from "react";

const VisuallyHidden = ({ children, className = "", ...delegated }) => {
  const [forceShow, setForceShow] = React.useState(false);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const handleKeyDown = (ev) => {
        if (ev.key === "Alt") {
          setForceShow(true);
        }
      };

      const handleKeyUp = () => {
        setForceShow(false);
      };

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, []);

  if (forceShow) {
    return <span className="text-xxs">{children}</span>;
  }

  return (
    <span
      className={clsx(className, "absolute overflow-hidden [clip:rect(0_0_0_0)]", "h-px w-px m-[-1px] p-0 border-none")}
      {...delegated}
    >
      {children}
    </span>
  );
};

export default VisuallyHidden;
