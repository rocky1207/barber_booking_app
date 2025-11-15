"use client";
import { forwardRef } from "react";
import NavigateButton from "@/components/Button/NavigateButton";
import { modalActionBtn, updateActionBtn } from "@/datas/ButttonObjects";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { serviceActions } from "@/store/slices/serviceSlice";

interface Props {
    serviceId: number;
    //setDeleteServiceId: React.Dispatch<React.SetStateAction<number>>;
}
const ServiceButtons = forwardRef<HTMLDialogElement, Props>(({serviceId}, ref) => {
    console.log(ref);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const openModal = () => {
        if(ref && typeof ref !== 'function' && ref.current) ref.current.showModal();
        //setDeleteServiceId(serviceId);
        dispatch(serviceActions.setActionServiceId(serviceId));
    }
    const newModalActionBtn = {
        ...modalActionBtn,
        onAction: openModal
    }
    const newUpdateActionBtn = {
        ...updateActionBtn,
        onAction: () => {
            router.push(`/login/dashboard/service/update?serviceId=${serviceId}`);
            dispatch(serviceActions.setActionServiceId(serviceId));
        }
    }
    return (
        <nav className="flexed">
            <NavigateButton {...newModalActionBtn} />
            <NavigateButton {...newUpdateActionBtn} />
        </nav>
    );
});
export default ServiceButtons;