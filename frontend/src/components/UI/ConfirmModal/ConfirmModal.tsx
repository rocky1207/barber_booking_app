import { forwardRef} from 'react';
import styles from './ConfirmModal.module.css';



const ConfirmModal = forwardRef<HTMLDialogElement, {text: string}>(({ text }, ref) => {
    
    return (
      <dialog ref={ref} className={styles.dialog}>
        <div>
        <h2>{text}</h2>
        <form method="dialog">
          <button>Da</button>
          <button>Ne</button>
        </form>
        </div>
      </dialog>
    );
  }
);
export default ConfirmModal;