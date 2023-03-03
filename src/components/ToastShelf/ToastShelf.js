import Toast from "../Toast";
// Some animation styles can't really be done in tailwind
import styles from "./ToastShelf.module.css";

function ToastShelf({ toasts }) {
  return (
    <ol className="fixed right-0 bottom-0 flex flex-col gap-4 p-4 list-none">
      {toasts.map(({ id, message, variant, destroy }) => (
        <li className={styles.toastWrapper} key={id}>
          <Toast message={message} variant={variant} destroy={destroy}></Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
