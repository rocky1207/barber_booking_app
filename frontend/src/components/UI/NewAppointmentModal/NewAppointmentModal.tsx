import { forwardRef} from 'react';
import { useRouter } from "next/navigation";
import { setIsLoadingState } from '@/lib/utils/setIsLoadingState';
import { useAppDispatch } from '@/store/hooks/typizedHooks';
import styles from './NewAppointmentModal.module.css';

interface Props {
    date: string;
    time: string;
}

const NewAppointmentModal = forwardRef<HTMLDialogElement, Props>(({...dialogData}, ref) => {
    console.log(dialogData);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const clickHandler = () => {
      localStorage.removeItem('appointmentSuccess');
      if(ref && typeof ref !== 'function' && ref.current) ref.current.close();
      setIsLoadingState(true, dispatch);
      router.push('/');
    }
    
    return (
      <dialog ref={ref}  className={styles.dialog}>
        <div>
            <h2>Uspešno ste zakazali termin</h2>
            <div>
                <p>Datum: <span>{dialogData.date}</span></p>
                <p>Vreme: <span>{dialogData.time}</span></p>
            </div>
            <div className={styles.buttonDiv}>
              <button  onClick={clickHandler}>OK</button>
            </div>
        </div>
      </dialog>
    );
  }
);
export default NewAppointmentModal;