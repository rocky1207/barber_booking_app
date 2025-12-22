import { forwardRef } from "react";
import { useRouter } from "next/navigation";
import { setIsLoadingState } from '@/lib/utils/setIsLoadingState';
import { useAppDispatch } from '@/store/hooks/typizedHooks';
import styles from '../Modals.module.css';
const ResetPasswordModal = forwardRef<HTMLDialogElement>(({},ref) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const clickHandler = () => {
        setIsLoadingState(true, dispatch);
        router.push('/login');
        if(ref && typeof ref !== 'function' && ref.current) ref.current.close();
    }
    return (
        <dialog ref={ref} className={styles.overlay}>
            <div className={styles.dialog}>
            <h2>Uspešno Ste resetovali lozinku</h2>
            <div>
                <button onClick={clickHandler}>OK</button>
            </div>
            </div>
        </dialog>
    );
});
export default ResetPasswordModal;