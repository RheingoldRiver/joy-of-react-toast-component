import Toast from "../Toast";
// Some animation styles can't really be done in tailwind
import styles from "./ToastShelf.module.css";

function ToastShelf({ toasts }) {
  return (
    <ol
      className="fixed right-0 bottom-0 flex flex-col gap-4 p-4 list-none"
      role="region"
      aria-live="assertive"
      aria-label="Notification"
    >
      {toasts.map(({ id, ...rest }) => (
        <li className={styles.toastWrapper} key={id}>
          <Toast {...rest}></Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
