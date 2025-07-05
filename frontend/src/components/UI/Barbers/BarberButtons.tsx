import { terminsBtn, modalActionBtn, updateActionBtn, servicesActionBtn } from "@/datas/ButttonObjects";
import ApiButton from "@/components/Button/ApiButton";
import NavigateButton from "@/components/Button/NavigateButton";
import { manageBarber } from "@/lib/api/manageBarber";
import { forwardRef } from "react";
import { barberActions } from "@/store/slices/barberSlice";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import styles from './Barbers.module.css';


const BarberButtons = forwardRef<HTMLDialogElement, {barberId: number}>(({barberId}, ref) => {
    const {loggedBarber} = useAppSelector((state: RootState) => state?.barber);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const openModal = () => {
        dispatch(barberActions.setCurrentBarberId(barberId));
        if(ref && typeof ref !== "function" && ref.current) ref.current.showModal();
    }
    const updatePage = () => {router.push(`/login/dashboard/update?id=${barberId}`)};
    const appointmentsPage = () => {router.push(`/login/dashboard/appointments?id=${barberId}`)};
    const servicesPage = () => {router.push(`/login/dashboard/service?id=${barberId}`)};
    const newTerminsBtn = {
        ...terminsBtn,
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
        <nav className={styles.itemButtonsNav}>
            <NavigateButton {...newTerminsBtn}/>
            {showButton && <NavigateButton {...newUpdateActionBtn}/>}
            {showButton && <NavigateButton {...newServicesActionBtn}/>} 
        </nav>
        {showButton && <NavigateButton {...newModalActionBtn}/>} 
        </>
    );
});
export default BarberButtons;
