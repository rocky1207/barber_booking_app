"use client";
import { useState } from "react";
import Input from "../../Input/Input";
import FileInput from "../../FileInput/FileInput";
import { updateValidationSchema } from "@/lib/validators/validationSchema";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { useRouter } from "next/navigation";
import { updateItems } from "@/lib/api/updateItems";
import { barberActionDispatcher } from "@/lib/utils/barberActionDispatcher";
import { createFormData } from "@/lib/utils/createFormData";
import { formValidator } from "@/lib/validators/formValidator";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { SingleBarberReturnType } from "@/types/Api/ReturnBarberType";
import styles from '../../Form.module.css';
import extraStyles from './Update.module.css';

import { BasicBarberType } from "@/types/Barbers/BarbersType";

interface Props {
    barbers: BasicBarberType[];
    loggedBarber: BasicBarberType;
    actionBarberId: number | undefined;
}

const Update: React.FC<Props> = ({barbers, loggedBarber, actionBarberId}) => {
    const barber = barbers?.find(barberItem => /*paramId*/actionBarberId === barberItem.id);
    const [message, setMessage] = useState<string>('');
    const [fileName, setFileName] = useState<string>(barber?.file ?? '');
    const dispatch = useAppDispatch();
    let updateInputs;
    if(loggedBarber?.role === 'admin' || loggedBarber?.role === 'owner') {
    const checked = barber?.suspended === 1 ? true : false;
    updateInputs = [
        {type: 'text', name: 'full_name', defaultValue: barber?.full_name, placeholder: "Ime i prezime", required: false},
        {type: 'text', name: 'username', defaultValue: barber?.username, placeholder: "Korisničko ime", required: false},
        {type: 'text', name: 'role', defaultValue: barber?.role, placeholder: "Uloga", required: false},
        {type: 'checkbox', name: 'suspended', defaultValue: barber?.suspended.toString(), defaultChecked:checked, required: false},
    ];
    } else {
        updateInputs = [
            {type: 'text', name: 'username', defaultValue: barber?.username, placeholder: "Korisničko ime", required: false},
        ];
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       // dispatch(barberActions.setActionBarberId(paramId));
        const form = e.currentTarget as HTMLFormElement;
        const formData = createFormData(e);
        const suspendedInput = form.elements.namedItem('suspended') as HTMLInputElement | null;
        const suspendedValue = suspendedInput ? (suspendedInput.checked ? '1' : '0') : '0';
        
        const validateData = {
            ...formData,
            full_name: formData.full_name,
            role: formData.role,
            file: fileName,
            suspended: suspendedValue 
        }
        console.log(validateData);
        const validateInputs = formValidator(validateData, updateValidationSchema);
        if(!validateInputs.status) {
            setMessage(validateInputs.message);
            return;
        }
        const updateData = {
           ...validateData,
            id: /*userId!*/actionBarberId?.toString()!,
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
        setMessage(message);
        data && actionDone && barberActionDispatcher(data, actionDone, dispatch);
        setIsLoadingState(false, dispatch);
    };
    
    
    return (
        <>
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input inputs={updateInputs} />
            <FileInput setFileName={setFileName} fileName={fileName} />
            <p>{message}</p>
            <button type="submit" className={styles.submitBtn}>POTVRDI</button>
        </form>
        {/*<div className={extraStyles.changePasswordDiv}>
            {showButton &&<NavigateButton {...newChangePasswordBtn} />}
        </div>*/}
        </>
    );
};
export default Update;