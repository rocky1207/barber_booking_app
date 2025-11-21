import { forwardRef } from "react";
import { useRouter } from "next/navigation";
import styles from '../Modals.module.css';
const ResetPasswordModal = forwardRef<HTMLDialogElement>(({},ref) => {
    const router = useRouter();
    const clickHandler = () => {
        if(ref && typeof ref !== 'function' && ref.current) ref.current.close();
        router.push('/login');
    }
    return (
        <dialog className={styles.dialog} ref={ref}>
            <h2>Uspešno Ste resetovali lozinku</h2>
            <div>
                <button onClick={clickHandler}>OK</button>
            </div>
        </dialog>
    );
});
export default ResetPasswordModal;