"use client";
import { useState, useRef } from "react";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import Input from "../../Input/Input";
import { resetPasswordInputs } from "@/datas/Form/lnputObjects";
import { formValidator } from "@/lib/validators/formValidator";
import { resetPasswordValidationSchema } from "@/lib/validators/validationSchema";
import { createFormData } from "@/lib/utils/createFormData";
import { loginRegisterUser } from "@/lib/api/user/loginRegisterUser";
import ResetPasswordModal from "@/components/UI/Modals/ResetPasswordModal.tsx/ResetPasswordmodal";
import { useSearchParams } from "next/navigation";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import styles from '../../Form.module.css';

const ResetPassword: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>('');
    const dispatch = useAppDispatch();
    const dialog = useRef<HTMLDialogElement | null>(null);
    const params = useSearchParams();
    const id = params.get('user_id') ?? '';
    const userId = id !== '' ? parseInt(id, 10) : '';
    const token = params.get('token') ?? '';
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = createFormData(e);
        const validateData = formValidator(formData, resetPasswordValidationSchema);
        if(!validateData.status) {
            setErrorMessage(validateData.message);
            return;
        }
        const data = {
            newPassword: formData.newPassword,
            userId,
            token
        };
        setIsLoadingState(true, dispatch);
        const response = await loginRegisterUser(data, 'RESET_PASSWORD');
        console.log(response);
        if(!response.success/* || !response.data*/) {
            setErrorMessage(response.message || "Greška prilikom izvršenja upita");
            setIsLoadingState(false, dispatch);
            return;
        };
        form.reset();
        setErrorMessage(response.message);
        setIsLoadingState(false, dispatch);
        if(dialog && typeof dialog !== 'function' && dialog.current) dialog.current.showModal();
    };

return (
    <>
    <ResetPasswordModal ref={dialog} />
    <form className={styles.form} onSubmit={handleSubmit}>
        <Input inputs={resetPasswordInputs} />
        <p>{errorMessage}</p>
        <button type="submit" className={styles.submitBtn}>POŠALJI</button>
    </form>
    </>
    );
};
export default ResetPassword;