"use client";
import { useState } from "react";
import Input from "../../Input/Input";
import FileInput from "../../FileInput/FileInput";
import { updateValidationSchema } from "@/lib/validators/validationSchema";
import { useAppDispatch, useAppSelector } from "@/store/hooks/typizedHooks";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { updateItems } from "@/lib/api/updateItems";
import { barberActionDispatcher } from "@/lib/utils/barberActionDispatcher";
import NavigateButton from "@/components/Button/NavigateButton";
import { changePasswordBtn } from "@/datas/ButttonObjects";
import { createFormData } from "@/lib/utils/createFormData";
import { barberActions } from "@/store/slices/barberSlice";
import { formValidator } from "@/lib/validators/formValidator";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { SingleBarberReturnType } from "@/types/Api/ReturnBarberType";
import styles from '../../Form.module.css';
import extraStyles from './Update.module.css';

const Update: React.FC = () => {
    const barberState = useAppSelector((state: RootState) => state?.barber);
    const params = useSearchParams();
    const userId = params.get('barberId');
    const paramId = userId !== null ? parseInt(userId, 10) : undefined;
    const barber = barberState?.barbers.find(barberItem => paramId === barberItem.id);
    const [message, setMessage] = useState<string>('');
    const [fileName, setFileName] = useState<string>(barber?.file ?? '');
    const dispatch = useAppDispatch();
    const router = useRouter();
    let updateInputs;
   
    if(barberState?.loggedBarber.role === 'admin' || barberState?.loggedBarber.role === 'owner') {
    const checked = barber?.suspended === 1 ? true : false;
    updateInputs = [
        {type: 'text', name: 'full_name', defaultValue: barber?.full_name, placeholder: "Ime i prezime"},
        {type: 'text', name: 'username', defaultValue: barber?.username, placeholder: "Korisničko ime"},
        {type: 'text', name: 'role', defaultValue: barber?.role, placeholder: "Uloga"},
        {type: 'checkbox', name: 'suspended', defaultValue: barber?.suspended.toString(), defaultChecked:checked},
    ];
    } else {
        updateInputs = [
            {type: 'text', name: 'username', defaultValue: barber?.username, placeholder: "Korisničko ime"},
        ];
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(barberActions.setActionBarberId(paramId));
        const form = e.currentTarget as HTMLFormElement;
        const formData = createFormData(e);
        const suspendedInput = form.elements.namedItem('suspended') as HTMLInputElement | null;
        const suspendedValue = suspendedInput ? (suspendedInput.checked ? '1' : '0') : '0';
        const validateData = {
            ...formData,
            role: formData.role,
            file: fileName,
            suspended: suspendedValue 
        }
        const validateInputs = formValidator(validateData, updateValidationSchema);
        if(!validateInputs.status) {
            setMessage(validateInputs.message);
            return;
        }
        const updateData = {
           ...validateData,
            id: userId!,
            suspended: parseInt(validateData.suspended, 10)
        }
        setIsLoadingState(true, dispatch);
        const responseData = await updateItems(updateData, 'UPDATE_BARBER');
        const {success, data, message, actionDone} = responseData as SingleBarberReturnType;
        if(!success) {
            setMessage(message);
            setIsLoadingState(false, dispatch);
            return;
        }
        setMessage(message)
        data && actionDone && barberActionDispatcher(data, actionDone, dispatch);
         setIsLoadingState(false, dispatch);
    };
    
    const handleClick = () => {
        router.push(`/login/dashboard/user/changePassword?id=${paramId}`);
    }
    const newChangePasswordBtn = {
        ...changePasswordBtn,
        onAction: handleClick
    }

    let showButton: boolean;
    if(barberState?.loggedBarber.role === 'owner') {
        showButton = true;
    } else if(barberState?.loggedBarber.role === 'user' && barberState?.loggedBarber.id === paramId) {
        showButton = true;
    } else if(barberState?.loggedBarber.role === 'admin' && barberState?.loggedBarber.id === paramId) {
        showButton = true;
    }else {
        showButton = false;
    }
    return (
        <>
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input inputs={updateInputs} />
            <FileInput setFileName={setFileName} fileName={fileName} />
            <p>{message}</p>
            <button type="submit" className={styles.submitBtn}>POŠALJI</button>
        </form>
        <div className={extraStyles.changePasswordDiv}>
            {showButton &&<NavigateButton {...newChangePasswordBtn} />}
        </div>
        </>
    );
};
export default Update;