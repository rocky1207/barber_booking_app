import { forwardRef} from 'react';
import ApiButton from '@/components/Button/ApiButton';
import { ApiBtnType } from '@/types/Button/BtnType';

import styles from './ConfirmModal.module.css';



const ConfirmModal = forwardRef<HTMLDialogElement, ApiBtnType>(({ ...btn }, ref) => {
    const clickHandler = () => {
      if(ref && typeof ref !== 'function' && ref.current) ref.current.close();
    }
    const safeRef = (ref && typeof ref !== 'function') ? ref : undefined;
    return (
      <dialog ref={ref} className={styles.dialog}>
        <div>
          <h2>{btn.head}</h2>
            <div className={styles.buttonsDiv}>
              <ApiButton {...btn} dialogRef={safeRef} />
              <div>
                <button onClick={clickHandler}>NE</button>
              </div>
            </div>
        </div>
      </dialog>
    );
  }
);
export default ConfirmModal;