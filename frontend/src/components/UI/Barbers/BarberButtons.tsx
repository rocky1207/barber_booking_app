import { termsBtn, modalActionBtn, updateActionBtn, servicesActionBtn } from "@/datas/ButttonObjects";
import NavigateButton from "@/components/Button/NavigateButton";
import { forwardRef } from "react";
import { barberActions } from "@/store/slices/barberSlice";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import styles from './Barbers.module.css';


const BarberButtons = forwardRef<HTMLDialogElement, {barberId: number;}>(({barberId}, ref) => {
    const {loggedBarber} = useAppSelector((state: RootState) => state?.barber);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const openModal = () => {
        dispatch(barberActions.setActionBarberId(barberId));
        if(ref && typeof ref !== "function" && ref.current) ref.current.showModal();
    }
    const updatePage = () => {
        //setIsLoadingState(true, dispatch);
        dispatch(barberActions.setActionBarberId(barberId));
        router.push(`/login/dashboard/user/update?barberId=${barberId}`);
    };
    const appointmentsPage = () => {
        setIsLoadingState(true, dispatch);
        dispatch(barberActions.setActionBarberId(barberId));
        router.push(`/login/dashboard/appointments?barberId=${barberId}`);
    };
    const servicesPage = () => {
        //setIsLoadingState(true, dispatch);
        dispatch(barberActions.setActionBarberId(barberId));
        router.push(`/login/dashboard/service?barberId=${barberId}`);
    };
    const newTermsBtn = {
        ...termsBtn,
        id: barberId,
        onAction: appointmentsPage
    }
    const newUpdateActionBtn = {
        ...updateActionBtn,
        id: barberId,
        onAction: updatePage
    }
   const newModalActionBtn = {
        ...modalActionBtn,
        id: barberId,
        onAction: openModal
    }
    const newServicesActionBtn = {
        ...servicesActionBtn,
        id: barberId,
        onAction: servicesPage
    }
    let showButton: boolean;
    if(loggedBarber.role === 'owner' || loggedBarber.role === 'admin') {
        showButton = true;
    } else if(loggedBarber.role === 'user' && loggedBarber.id === barberId) {
        showButton = true;
    } else {
        showButton = false;
    }
    return (
        <>
        <nav>
            <div className={styles.itemButtonsNav}>
                <NavigateButton {...newTermsBtn}/>
                {showButton && <NavigateButton {...newUpdateActionBtn}/>}
                {showButton && <NavigateButton {...newServicesActionBtn}/>} 
            </div>
            {showButton &&
            <div className="marginBottom">
             <NavigateButton {...newModalActionBtn}/>
            </div>} 
        </nav>
        </>
    );
});
export default BarberButtons;
